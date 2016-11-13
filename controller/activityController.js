var balance = require("../models/activity");

exports.inquire = function(req, res, next){
    console.log('info: ' + 'in inquire');
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