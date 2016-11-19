var balance = require("../models/activity");

exports.inquire = function(req, res, next){
    var data = req.body;
    balance.inquire(function (err, result) {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });
};