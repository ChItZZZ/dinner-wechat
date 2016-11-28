/**
 * Created by Qianc on 2016/11/25.
 */

var db = require('../utils/db');

exports.updateCoupon = function(value,callback){
    var sql = 'UPDATE coupon_master SET coupon_number = coupon_number - 1 where coupon_master_id = ?';
    var values = [value];
    db.exec(sql, values, function(err, result) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });
};

exports.rollback = function(value,callback){
    var sql = 'UPDATE coupon_master SET coupon_number = coupon_number + 1 where coupon_master_id = ?';
    var values = [value];
    db.exec(sql, values, function(err, result) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });
}

