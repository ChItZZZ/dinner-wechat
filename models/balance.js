var db = require("../utils/db");
var sd = require('silly-datetime');

exports.recharge = function(openid, amount, callback){

    var balanceInquire = "SELECT * FROM BLC_MASTER WHERE BLC_OPENID = ?";
    var balanceUpdate = "UPDATE BLC_MASTER SET BLC_BALANCE = ?, BLC_LAST_CHANGE = ? WHERE BLC_OPENID = ?";
    var balanceInsert = "INSERT INTO BLC_MASTER (BLC_CARD_NUMBER,BLC_OPENID,BLC_BALANCE,BLC_LAST_CHANGE,BLC_CARD_TYPE)" +
        "VALUES(?,?,?,?,?)";
    var rechargeInsert = "INSERT INTO CHG_MASTER (BLC_CARD_NUMBER,CHG_DATE,CHG_AMOUNT,CHG_AFTER_AMOUNT)" +
        "VALUES(?,?,?,?)";
    var time = sd.format(new Date(), 'YYYY/MM/DD/hh:mm');

    var inquireValues = [openid];
    de.exec(balanceInquire, inquireValues, function(err, result){
        if (err) {
            callback(err);
            return;
        }
    });

    if(result.length == 1){
        var currentBalance = result[0].blc_balance;
        var cardNumber = result[0].blc_card_number;

        var updateValues = [currentBalance + amount, time, openid];
        db.exec(balanceUpdate, updateValues,  function(err, result){
            if (err) {
                callback(err);
                return;
            }
        });

        var rechargeValues = [cardNumber, time, amount, amount+currentBalance];
        db.exec(rechargeInsert, rechargeValues, function(err,result){
            if(err){
                callback(err);
                return;
            }
        });
    }else if(result.length == 0){

        var insertValues = ["122222", openid, amount, time, "hahaha"];
        db.exec(balanceInsert, insertValues, function(err, result){
           if(err){
               callback(err);
               return;
           }
        });

        var rechargeValues = ["122222", time, amount, amount];
        db.exec(rechargeInsert, rechargeValues, function(err,result){
            if(err){
                callback(err);
                return;
            }
        });
    }else{
        callback("not 1 or 0!");
        return;
    }
};

exports.deduct = function(openid, amount, callback){
    var balanceInquire = "SELECT * FROM BLC_MASTER WHERE BLC_OPENID = ?";
    var balanceUpdate = "UPDATE BLC_MASTER SET BLC_BALANCE = ?, BLC_LAST_CHANGE = ? WHERE BLC_OPENID = ?"
    var rechargeInsert = "INSERT INTO CHG_MASTER (BLC_CARD_NUMBER,CHG_DATE,CHG_AMOUNT,CHG_AFTER_AMOUNT)" +
        "VALUES(?,?,?,?)";
    var time = sd.format(new Date(), 'YYYY/MM/DD/hh:mm');

    var inquireValues = [openid];
    de.exec(balanceInquire, values, function(err, result){
        if (err) {
            callback(err);
            return;
        }
    });

    if(result.length == 1 && currentBalance >= amount){
        var currentBalance = result[0].blc_balance;

        var updateValues = [currentBalance - amount, time, openid];
        db.exec(balanceUpdate, updateValues,  function(err, result){
            if (err) {
                callback(err);
                return;
            }
        });

        var rechargeValues = [cardNumber, time, amount, currentBalance-amount];
        db.exec(rechargeInsert, rechargeValues, function(err, result){
            if(err){
                callback(err);
                return;
            }
        });
    }else{
        return;
    }
};

exports.inquire = function(openid, callback){
    var balanceInquire = "SELECT * FROM BLC_MASTER WHERE BLC_OPENID = ?";
    var inquireValues = [openid];
    de.exec(balanceInquire, inquireValues, function(err, result){
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