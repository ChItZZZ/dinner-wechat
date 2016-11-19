var recruit = require("../models/recruit");

exports.inquire = function(req, res, next){
    console.log('info: ' + 'in inquire');
    var data = req.body;
    recurit.inquire(function (err, result) {
        if (err) {
            console.log('info: ' + 'in recruit inquire controller err1');
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });
};