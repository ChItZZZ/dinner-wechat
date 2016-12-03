var balance = require("../models/balance");

exports.recharge = function(openId, amount, callback){
    // console.log('info: ' + 'in recharge');
    // var data = req.body;
    // var openId = req.session.openid || '123';
    // var amount = data.amount || 233;
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