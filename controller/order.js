/**
 * Created by 重书 on 2016/9/7.
 */
var db = require('../utils/db');
var sd = require('silly-datetime');

exports.createOrder = function (data) {
    var userOpenId = data.openid;
    var time=sd.format(new Date(), 'YYYY/MM/DD');
    var store_id = parseInt(data.store_id);
    var desk_id = parseInt(data.desk_id);
    var price = 100;
    console.log(time);
    var sql = 'INSERT INTO od_hdr (od_store_id,od_desk_id,od_date,od_wechatopenid,od_state,od_total_price,od_string) ' +
        'VALUES ('+store_id+','+desk_id+',"'+time+'","'+data.wechatopenid+'",0,'+price+','+'"ff"'+')';

    return db.create(sql);

}
