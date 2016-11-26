var balance = require("../models/balance");

exports.recharge = function(req, res, next){
    console.log('info: ' + 'in recharge');
    var data = req.body;
    var openId = data.session.openId;
    var amount = data.amount;
    balance.recharge(openId, amount, function (err, result) {
        if (err) {
            res.json(result);
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });

};

exports.deduct = function(openid, amount, callback){
    balance.deduct(openid,amount, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        callback(null,result);
    });

};

exports.inquire = function(req, res, next){
    var openId = req.session.openid || '123';
    balance.inquire(openId, function (err, result) {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });
};