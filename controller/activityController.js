var activity = require("../models/activity");

exports.inquire = function(req, res, next){
    activity.inquire(function (err, result) {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });
};