/**
 * Created by bennettqian on 3/12/2016.
 */
var db = require('../utils/db');

exports.addFundFlow = function (time, openid, amount, callback){
    var sql = 'insert into fund_master (fund_time, fund_openid, fund_amount, fund_status) values (?,?,?,?)';
    var values = [time,openid, amount, 0];
    db.exec(sql,values, function (err, result) {
        if(err){
            callback(err);
            return;
        }
        var fund_id = result.insertId;
        callback(null, fund_id);
    })
};

exports.update = function (fund_id, callback) {
    var sql_select = 'select fund_openid from fund_master where fund_id = ?';
    var sql_update = 'update fund_master set fund_status = 1 where fund_id = ?';
    var value = [fund_id];
    db.exec(sql_select, value, function (err, results) {
        if(err){
            callback(err);
        }
        if(results.length > 0){
            callback(null, results[0].fund_openid);
        }

    });
    db.exec(sql_update, value, function (err, results) {
        if(err){
            callback(err);
        }
    })
}
