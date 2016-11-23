var db = require("../utils/db");
var sd = require('silly-datetime');

exports.add = function (openid, content, name, phone, callback) {
    var commentInsert = "INSERT INTO comment_matser (comment_openid,comment_content,comment_date,comment_name,comment_phone)" +
        "VALUES(?,?,?,?,?)";
    var time = sd.format(new Date(), 'YYYY/MM/DD/hh:mm');
    var insertValues = [openid,content,time,name,phone];
    db.exec(commentInsert, insertValues, function (err, result) {
        var addCommentResult = {};
        if(err){
            addCommentResult['successful'] = '0';
            callback(err, addCommentResult);
            return;
        }
        addCommentResult['successful'] = '1';
        callback(err, addCommentResult);
        return;
    });
};