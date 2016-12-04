/**
 * Created by Qianc on 2016/11/25.
 */

var db = require('../utils/db');

exports.updateCoupon = function(value,callback){
    var sql = 'UPDATE coupon_master SET coupon_number = coupon_number - 1 where coupon_master_id = ?';
    var sql_delete = 'delete from coupon_master where coupon_number = 0 and coupon_master_id = ?';
    var values = [value];
    db.exec(sql, values, function(err, result) {
        if (err) {
            callback(err);
            return;
        }
        db.exec(sql_delete, values, function (err, result) {});
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
};

exports.addCoupon = function(values, callback){
    var couponInsert = "INSERT INTO coupon_master (coupon_card_number, coupon_start_date, coupon_end_date, coupon_number, coupon_id, coupon_status)" +
        " VALUES (?,?,?,?,?,?)";
    db.exec(couponInsert, values, function(err, result) {
        if (err) {
            callback(err);
            return;
        }
        callback(null, result);
    });
};