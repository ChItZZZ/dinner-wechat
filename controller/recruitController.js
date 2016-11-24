var recruit = require("../models/recruit");

exports.inquire = function(req, res, next){
    recruit.inquire(function (err, result) {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });
};