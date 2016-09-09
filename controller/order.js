/**
 * Created by 重书 on 2016/9/7.
 */
var db = require('../utils/db');
var sd = require('silly-datetime');

exports.createOrder = function (req,res,next) {
    var data = req.body;
    var userOpenId = data.wechatopenid;
    var time=sd.format(new Date(), 'YYYY/MM/DD');
    var store_id = parseInt(data.store_id);
    var desk_id = parseInt(data.desk_id);
    var price = 100;
    var values = [store_id, desk_id,time,userOpenId,0,price,"ss"];

    console.log(typeof (time));
    var sql = 'INSERT INTO od_hdr (od_store_id,od_desk_id,od_date,od_wechatopenid,od_state,od_total_price,od_string) ' +
        'VALUES (?,?,?,?,?,?,?)';
    db.exec(sql, values, function(err, result) {
        if (err) {
            //callback(err);
            return;
        }
        //callback(null, result);
        console.log(result.insertId);

    });
    res.end();

}
