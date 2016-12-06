var db = require("../utils/db");
var sd = require('silly-datetime');
var coupon = require('./coupon');
var async = require('async');

exports.recharge = function(openid, amount, callback) {
    console.log('info: ' + 'in recharge model');
    console.log('amount: ' + amount);
    var balanceInquire = "SELECT * FROM blc_master WHERE BLC_OPENID = ?";
    var balanceUpdate = "UPDATE blc_master SET BLC_BALANCE = ?, BLC_LAST_CHANGE = ?, BLC_TOTAL_RECHARGE = ?, BLC_VIP_LEVEL = ? WHERE BLC_OPENID = ?";
    var balanceInsert = "INSERT INTO blc_master (BLC_OPENID,BLC_CARD_NUMBER,BLC_BALANCE,BLC_LAST_CHANGE,BLC_CARD_TYPE,BLC_TOTAL_RECHARGE,BLC_VIP_LEVEL)" +
        "VALUES(?,?,?,?,?,?,?)";
    var rechargeInsert = "INSERT INTO chg_master (BLC_CARD_NUMBER,CHG_DATE,CHG_AMOUNT,CHG_AFTER_AMOUNT)" +
        "VALUES(?,?,?,?)";
    var inquireCardNumber = "SELECT * FROM number_counter;";
    var updateCardNumber = "update number_counter set card_number_counter = ?";
    var time = sd.format(new Date(), 'YYYY/MM/DD/hh:mm');

    var inquireValues = [openid];
    var rechargeValues = [];
    var rechargeResult = {};
    var totalRecharge = 0;
    var vipLevel = 0;
    db.exec(balanceInquire, inquireValues, function (err, result) {
        console.log('info: ' + 'in recharge model db1');
        if (err) {
            callback(err);
            return;
        }
        if (result.length == 1) {
            var currentBalance = result[0].blc_balance;
            var cardNumber = result[0].blc_card_number;
            totalRecharge = result[0].blc_total_recharge;
            vipLevel = Math.ceil((totalRecharge + amount) / 100);
            var newBalance = currentBalance + amount;
            var newTotalRecharge = totalRecharge + amount;
            var length = 0;
            if (newBalance.toString().split('.')[1] != null){
                length = newBalance.toString().split('.')[1].length;
            }
            if (length > 2){
                newBalance = Math.round(newBalance*100)/100;
            }
            if (newTotalRecharge.toString().split('.')[1] != null){
                length = newTotalRecharge.toString().split('.')[1].length;
            }
            if (length > 2){
                newTotalRecharge = Math.round(newTotalRecharge*100)/100;
            }

            var updateValues = [newBalance , time, newTotalRecharge, vipLevel, openid];
            db.exec(balanceUpdate, updateValues, function (err, result) {
                console.log('info: ' + 'in recharge model db2');
                if (err) {
                    rechargeResult['successful'] = 0;
                    callback(err,rechargeResult);
                    return;
                }
            });
            rechargeValues = [cardNumber, time, amount, newBalance];
            db.exec(rechargeInsert, rechargeValues, function (err, result) {
                console.log('info: ' + 'in recharge model db3');
                if (err) {
                    rechargeResult['successful'] = 1;
                    rechargeResult['cardNumber'] = cardNumber;
                    rechargeResult['balance'] = newBalance;
                }
            });
            rechargeResult['successful'] = 1;
            rechargeResult['cardNumber'] = cardNumber;
            rechargeResult['balance'] = newBalance;
            callback(err, rechargeResult);
            return;
        } else if (result.length == 0) {
            vipLevel = Math.ceil(amount / 100);
            var newBalance = amount;
            var newTotalRecharge = amount;
            var length = 0;
            if (newBalance.toString().split('.')[1] != null){
                length = newBalance.toString().split('.')[1].length;
            }
            if (length > 2){
                newBalance = Math.round(newBalance*100)/100;
            }
            if (newTotalRecharge.toString().split('.')[1] != null){
                length = newTotalRecharge.toString().split('.')[1].length;
            }
            if (length > 2){
                newTotalRecharge = Math.round(newTotalRecharge*100)/100;
            }

            var newCardNumber = 0;
            var cardNumberValues = [];
            db.exec(inquireCardNumber, cardNumberValues, function (err,result) {
                if (err){
                    console.log("can not get card number counter!");
                    callback(err);
                }
                newCardNumber = result[0].card_number_counter;
                console.log("after get card number counter: " + newCardNumber);
                cardNumberValues = [newCardNumber + 1];
                console.log("before update card number counter: " + newCardNumber);
                db.exec(updateCardNumber,cardNumberValues, function (err, result) {
                    if (err){
                        console.log("can not update card number counter!");
                        callback(err);
                    }
                });
                console.log('Info: card number' + newCardNumber);
                var insertValues = [openid, newCardNumber, newBalance, time, "星光", newTotalRecharge, vipLevel];
                db.exec(balanceInsert, insertValues, function (err, result) {
                    console.log('info: ' + 'in recharge model db4');
                    if (err) {
                        rechargeResult['successful'] = 0;
                        callback(err,rechargeResult);
                        return;
                    }
                });
                rechargeValues = [newCardNumber,time, newBalance, newTotalRecharge];
                db.exec(rechargeInsert, rechargeValues, function (err, result) {
                    console.log('info: ' + 'in recharge model db5');
                    if (err) {
                        rechargeResult['successful'] = 0;
                        callback(err,rechargeResult);
                        return;
                    }
                });

                var end_date = new Date();
                end_date.setFullYear(2016, 12, 31);
                var end_format_date = sd.format(end_date, 'YYYY/MM/DD/hh:mm');
                var couponValues = [newCardNumber, time, end_format_date, 1, 1, 'Y'];
                coupon.addCoupon(couponValues, function(err){
                    if (err) {
                        rechargeResult['successful'] = 2;
                        callback(err,rechargeResult);
                        return;
                    }
                });
                rechargeResult['successful'] = 1;
                rechargeResult['cardNumber'] = newCardNumber;
                rechargeResult['balance'] = newBalance;
                callback(err,rechargeResult);
                return;
            });
        } else {
            rechargeResult['successful'] = 0;
            callback(err,rechargeResult);
            return;
        }
    });
};

exports.deduct = function(openid, amount, callback){
    console.log('info: ' + 'in deduct model');
    console.log('amount: ' + amount);
    //var currentBalance = balance;
    var id = openid;
    var cardNumber = null;
    var balanceInquire = "SELECT * FROM blc_master WHERE BLC_OPENID = ?";
    var balanceUpdate = "UPDATE blc_master SET BLC_BALANCE = BLC_BALANCE - ?, BLC_LAST_CHANGE = ? WHERE BLC_CARD_NUMBER = ?";
    var rechargeInsert = "INSERT INTO chg_master (BLC_CARD_NUMBER,CHG_DATE,CHG_AMOUNT,CHG_AFTER_AMOUNT)" +
        "VALUES(?,?,?,?)";
    var time = sd.format(new Date(), 'YYYY/MM/DD/hh:mm');

     var inquireValues = [id];
    // var deductResult = {};
    console.log('info: ' + 'in deduct model05');

    db.exec(balanceInquire, inquireValues, function(err, result) {
        console.log('info: ' + 'in deduct model db1');
        if (err) {

            callback(err);
            return;
        }
        if(result.length>0) {
            var currentBalance = result[0].blc_balance;
            cardNumber = result[0].blc_card_number;

            var newBalance = currentBalance - amount;
            var length = 0;
            if (newBalance.toString().split('.')[1] != null){
                length = newBalance.toString().split('.')[1].length;
            }
            if (length > 2){
                newBalance = Math.round(newBalance*100)/100;
            }
            async.series({
                    // update
                    step_update: function(callback) {
                        var updateValues = [amount, time, cardNumber];
                        db.exec(balanceUpdate, updateValues,  function(err, result){
                            if (err) {
                                callback(err);
                                return;
                            }

                                callback(null, 'update balance successfully');


                        });
                    },
                    //transaction
                    step_transaction: function(callback){
                        var rechargeValues = [cardNumber, time, amount, newBalance];
                        db.exec(rechargeInsert, rechargeValues, function(err, result){
                            console.log('info: ' + 'in deduct model db3');
                            if(err){
                                callback(err,deductResult);
                                return;
                            }
                            callback(null, 'insert transaction successfully');
                        });
                    }
                },
                function(err, results) {
                    // update inventory in parallel
                    if(err){
                        return;
                    }else{
                        callback(null, "success");
                    }
                });
        }

    });

};

exports.inquire = function(openid, callback){
    var balanceInquire = "SELECT * FROM blc_master WHERE BLC_OPENID = ?";
    var inquireValues = [openid];
    db.exec(balanceInquire, inquireValues, function(err, result){
        if (err) {
            callback(err);
            return;
        }
        var balance = {};
        if(result.length == 1){
            balance['hasCard'] = 1;
            balance['cardNumber'] = result[0].blc_card_number;
            balance['openid'] = result[0].blc_openid;
            balance['balance'] = result[0].blc_balance ;
            balance['lastChangeDate'] = result[0].blc_last_change + '';
            balance['total'] = result[0].blc_total_recharge;
            balance['level'] = result[0].blc_vip_level;
            balance['type'] = result[0].blc_card_type;
        }
        else{
            balance['hasCard'] = 0;
        }
        console.log('balance '+ JSON.stringify(balance));
        callback(null, balance);
        return;
    });
};