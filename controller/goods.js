/**
 * Created by my on 9/7/16.
 */
var db = require('../utils/db');
exports.listItems = function(userid) {
    var sql = "SELECT * FROM stf_mst ";
    db.select(sql);
    //......
}

exports.listOrder = function () {
    var sql = "SELECT * FROM "
}


