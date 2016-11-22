var comment = require("../models/comment");

exports.add = function(req, res, next){
    var data = req.body;
    var content = data.content;
    var openId = data.session.openId;
    comment.add(openId, content, function (err, result) {
        if (err) {
            res.json(result);
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });
};