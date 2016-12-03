var comment = require("../models/comment");

exports.add = function(req, res, next){
    var data = req.body;
    var content = data.content;
    var name = data.name;
    var phone = data.phone;
    var openId = req.body.openId || '123';
    comment.add(openId, content, name, phone, function (err, result) {
        if (err) {
            res.json(result);
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });
};