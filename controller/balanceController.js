var balance = require("../models/balance");

exports.recharge = function(req, res, next){
    console.log('info: ' + 'in recharge');
    var data = req.body;
    //var openId = data.session.openId;
    var amount = data.amount;
    balance.recharge('testOpenId', amount, function (err, result) {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });

};

exports.deduct = function(req, res, next){
    console.log('info: ' + 'in deduct');
    var data = req.body;
    //var openId = data.session.openId;
    var amount = data.amount;
    balance.deduct('testOpenId', amount, function (err, result) {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });

};

exports.inquire = function(req, res, next){
    console.log('info: ' + 'in inquire');
    var data = req.body;
    //var openId = data.session.openId;
    balance.inquier('testOpenId', function (err, result) {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });
};