var recruit = require("../models/recruit");

exports.inquire = function(req, res, next){
    console.log('info: ' + 'in inquire');
    var data = req.body;
    console.log('info: ' + 'recruit.js err 1');
    recurit.inquire(function (err, result) {
        if (err) {
            console.log('info: ' + 'in recruit.js inquire controller err1');
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });
};