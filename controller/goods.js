/**
 * Created by my on 9/7/16.
 */


// controller demo
var db = require('../utils/db');
exports.demo = function(callback) {
    var sql = "SELECT * FROM stf_mst where stf_id = ? or stf_id = ? ";
    var values = [5, 6];
    //var sql = "SELECT * FROM stf_mst";
    //var values = [];
    db.exec(sql, values, function(err, result) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });

}

exports.listOrder = function() {
    var sql = "SELECT * FROM ";
}