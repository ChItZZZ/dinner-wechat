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

exports.deduct = function(req, res, next){
    var data = req.body;
    var openId = req.session.openid || '123';
    var amount = data.amount;
    balance.deduct(openId, amount, function (err, result) {
        if (err) {
            res.json(result);
            res.end();
            return;
        }
        res.json(result);
        res.end();
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