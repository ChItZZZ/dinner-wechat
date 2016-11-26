var activity = require("../models/activity");
var db = require('../utils/db');

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

exports.getHeaderPic = function(req,res,next){
    var sql = 'SELECT * FROM wechat_index_picture';
    db.exec(sql,[],function (err,result) {
        if(err){
            res.send("error load pic");
            console.log(err);
            return;
        }
        var r = {};
        r.HeaderPicture = result;
        res.json(r);
        res.end();
    });
}