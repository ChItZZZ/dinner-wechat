var db = require("../utils/db");
var sd = require('silly-datetime');

exports.recharge = function(openid, amount, callback) {
    console.log('info: ' + 'in recharge model');
    console.log('amount: ' + amount);
    var balanceInquire = "SELECT * FROM blc_master WHERE BLC_OPENID = ?";
    var balanceUpdate = "UPDATE blc_master SET BLC_BALANCE = ?, BLC_LAST_CHANGE = ? WHERE BLC_OPENID = ?";
    var balanceInsert = "INSERT INTO blc_master (BLC_OPENID,BLC_BALANCE,BLC_LAST_CHANGE,BLC_CARD_TYPE)" +
        "VALUES(?,?,?,?)";
    var rechargeInsert = "INSERT INTO chg_master (BLC_CARD_NUMBER,CHG_DATE,CHG_AMOUNT,CHG_AFTER_AMOUNT)" +
        "VALUES(?,?,?,?)";
    var time = sd.format(new Date(), 'YYYY/MM/DD/hh:mm');

    var inquireValues = [openid];
    db.exec(balanceInquire, inquireValues, function (err, result) {
        console.log('info: ' + 'in recharge model db1');
        if (err) {
            callback(err);
            return;
        }

        if (result.length == 1) {
            var currentBalance = result[0].blc_balance;
            var cardNumber = result[0].blc_card_number;

            var updateValues = [currentBalance + amount, time, openid];
            db.exec(balanceUpdate, updateValues, function (err, result) {
                console.log('info: ' + 'in recharge model db2');
                if (err) {
                    callback(err);
                    return;
                }
            });
            var rechargeValues = [cardNumber, time, amount, amount + currentBalance];
            db.exec(rechargeInsert, rechargeValues, function (err, result) {
                console.log('info: ' + 'in recharge model db3');
                if (err) {
                    callback(err);
                    return;
                }
            });
        } else if (result.length == 0) {

            var insertValues = [openid, amount, time, "hahaha"];
            db.exec(balanceInsert, insertValues, function (err, result) {
                console.log('info: ' + 'in recharge model db4');
                if (err) {
                    callback(err);
                    return;
                }
            });

            db.exec(balanceInquire, inquireValues, function (err, result) {
                console.log('info: ' + 'in recharge model db6');
                if (err) {
                    callback(err);
                    return;
                }
            });

            var cardNumber = result[0].blc_card_number;

            var rechargeValues = [cardNumber,time, amount, amount];
            db.exec(rechargeInsert, rechargeValues, function (err, result) {
                console.log('info: ' + 'in recharge model db5');
                if (err) {
                    callback(err);
                    return;
                }
            });
        } else {
            callback(err);
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
    console.log('info: ' + 'in deduct model05');
    db.exec(balanceInquire, inquireValues, function(err, result){
        console.log('info: ' + 'in deduct model db1');
        if (err) {
            callback(err);
            return;
        }

        var currentBalance = result[0].blc_balance;
        var cardNumber = result[0].blc_card_number;

        if(result.length == 1 && currentBalance >= amount){
            console.log('info: ' + 'in deduct model db2');

            var updateValues = [currentBalance - amount, time, openid];
            db.exec(balanceUpdate, updateValues,  function(err, result){
                if (err) {
                    callback(err);
                    return;
                }
            });

            var rechargeValues = [cardNumber, time, amount, currentBalance-amount];
            db.exec(rechargeInsert, rechargeValues, function(err, result){
                console.log('info: ' + 'in deduct model db3');
                if(err){
                    callback(err);
                    return;
                }
            });
        }else{
            return;
        }
    });
};

exports.inquire = function(openid, callback){
    console.log('info: ' + 'in inquire model');
    var balanceInquire = "SELECT * FROM blc_master WHERE BLC_OPENID = ?";
    var inquireValues = [openid];
    console.log('info: ' + 'in inquire model01');
    db.exec(balanceInquire, inquireValues, function(err, result){
        console.log('info: ' + 'in inquire model db1');
        if (err) {
            callback(err);
            return;
        }
        var balance = {};
        if(result.length == 1){
            balance['cardNumber'] = result[0].blc_card_number;
            balance['openid'] = result[0].blc_openid;
            balance['balance'] = result[0].blc_balance + '';
            balance['lastChangeDate'] = result[0].blc_last_change + '';
            balance['type'] = result[0].blc_card_type;
        }
        callback(null, balance);
        return;
    });
};