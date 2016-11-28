var db = require("../utils/db");
var sd = require('silly-datetime');

exports.recharge = function(openid, amount, callback) {
    console.log('info: ' + 'in recharge model');
    console.log('amount: ' + amount);
    var balanceInquire = "SELECT * FROM blc_master WHERE BLC_OPENID = ?";
    var balanceUpdate = "UPDATE blc_master SET BLC_BALANCE = ?, BLC_LAST_CHANGE = ?, BLC_TOTAL_RECHARGE = ?, BLC_VIP_LEVEL = ? WHERE BLC_OPENID = ?";
    var balanceInsert = "INSERT INTO blc_master (BLC_OPENID,BLC_BALANCE,BLC_LAST_CHANGE,BLC_CARD_TYPE,BLC_TOTAL_RECHARGE,BLC_VIP_LEVEL)" +
        "VALUES(?,?,?,?,?,?)";
    var rechargeInsert = "INSERT INTO chg_master (BLC_CARD_NUMBER,CHG_DATE,CHG_AMOUNT,CHG_AFTER_AMOUNT)" +
        "VALUES(?,?,?,?)";
    var couponInsert = "INSERT INTO coupon_master (coupon_card_number, coupon_start_date, coupon_end_date, coupon_number, coupon_id, coupon_status)" +
        " VALUES (?,?,?,1,15,'Y')";
    var time = sd.format(new Date(), 'YYYY/MM/DD/hh:mm');

    var inquireValues = [openid];
    var rechargeResult = {};
    db.exec(balanceInquire, inquireValues, function (err, result) {
        console.log('info: ' + 'in recharge model db1');
        if (err) {
            callback(err);
            return;
        }

        if (result.length == 1) {
            var currentBalance = result[0].blc_balance + amount;
            var cardNumber = result[0].blc_card_number;
            var totalRecharge = result[0].blc_total_recharge + amount;
            var vipLevel = Math.ceil(totalRecharge / 100);

            var updateValues = [currentBalance, time, totalRecharge, vipLevel, openid];
            db.exec(balanceUpdate, updateValues, function (err, result) {
                console.log('info: ' + 'in recharge model db2');
                if (err) {
                    rechargeResult['successful'] = 0;
                    callback(err,rechargeResult);
                    return;
                }
            });
            var rechargeValues = [cardNumber, time, amount, amount + currentBalance];
            db.exec(rechargeInsert, rechargeValues, function (err, result) {
                console.log('info: ' + 'in recharge model db3');
                if (err) {
                    rechargeResult['successful'] = 1;
                    rechargeResult['cardNumber'] = cardNumber;
                    rechargeResult['balance'] = amount+currentBalance;
                }
            });
            rechargeResult['successful'] = 1;
            rechargeResult['cardNumber'] = cardNumber;
            rechargeResult['balance'] = amount+currentBalance;
            callback(err, rechargeResult);
            return;
        } else if (result.length == 0) {
            var totalRecharge = amount;
            var vipLevel = Math.ceil(amount / 100);

            var insertValues = [openid, amount, time, "hahaha", totalRecharge, vipLevel];
            db.exec(balanceInsert, insertValues, function (err, result) {
                console.log('info: ' + 'in recharge model db4');
                if (err) {
                    rechargeResult['successful'] = 0;
                    callback(err,rechargeResult);
                    return;
                }
            });
            rechargeResult['successful'] = '1';
            rechargeResult['cardNumber'] = cardNumber;
            rechargeResult['balance'] = amount;

            db.exec(balanceInquire, inquireValues, function (err, result) {
                if (err) {
                    rechargeResult['successful'] = 0;
                    callback(err,rechargeResult);
                    return;
                }
            });

            var cardNumber = result[0].blc_card_number;

            var rechargeValues = [cardNumber,time, amount, amount];
            db.exec(rechargeInsert, rechargeValues, function (err, result) {
                console.log('info: ' + 'in recharge model db5');
                if (err) {
                    rechargeResult['successful'] = 0;
                    callback(err,rechargeResult);
                    return;
                }
            });

            var end_date = time + 7 * 24 * 60 * 60 * 1000;
            var couponValues = [cardNumber, time, end_date];
            db.exec(couponInsert,couponValues, function(err, result) {
                console.log('info: ' + 'in recharge model db5');
                if (err) {
                    rechargeResult['successful'] = 2;
                    callback(err,rechargeResult);
                    return;
                }
            });
            rechargeResult['successful'] = 1;
            rechargeResult['cardNumber'] = cardNumber;
            rechargeResult['balance'] = amount;
            callback(err,rechargeResult);
            return;
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
    var balanceInquire = "SELECT * FROM blc_master WHERE BLC_OPENID = ?";
    var balanceUpdate = "UPDATE blc_master SET BLC_BALANCE = ?, BLC_LAST_CHANGE = ? WHERE BLC_OPENID = ?";
    var rechargeInsert = "INSERT INTO chg_master (BLC_CARD_NUMBER,CHG_DATE,CHG_AMOUNT,CHG_AFTER_AMOUNT)" +
        "VALUES(?,?,?,?)";
    var time = sd.format(new Date(), 'YYYY/MM/DD/hh:mm');

    var inquireValues = [openid];
    var deductResult = {};
    console.log('info: ' + 'in deduct model05');
    db.exec(balanceInquire, inquireValues, function(err, result){
        console.log('info: ' + 'in deduct model db1');
        if (err) {
            deductResult['successful'] = 0;
            callback(err,deductResult);
            return;
        }

        var currentBalance = result[0].blc_balance;
        var cardNumber = result[0].blc_card_number;

        if(result.length == 1 && currentBalance >= amount){
            console.log('info: ' + 'in deduct model db2');

            var updateValues = [currentBalance - amount, time, openid];
            db.exec(balanceUpdate, updateValues,  function(err, result){
                if (err) {
                    deductResult['successful'] = 0;
                    callback(err,deductResult);
                    return;
                }
            });
            deductResult['successful'] = 1;
            deductResult['cardNumber'] = cardNumber;
            deductResult['balance'] = currentBalance - amount;

            var rechargeValues = [cardNumber, time, amount, currentBalance-amount];
            db.exec(rechargeInsert, rechargeValues, function(err, result){
                console.log('info: ' + 'in deduct model db3');
                if(err){
                    callback(err,deductResult);
                    return;
                }
            });
            callback(err,deductResult);
            return;
        }else{
            deductResult['successful'] = 0;
            callback(err,deductResult);
            return;
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