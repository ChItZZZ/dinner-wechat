/**
 * Created by 重书 on 2016/9/7.
 */
var db = require('../utils/db');
var sd = require('silly-datetime');

exports.createOrder = function (req, res, next) {
    console.log(req.body);
    //var data = JSON.parse(req.body);
    var data = req.body;
    var order_str = data.order_str;

    var userOpenId = data.open_id;
    var time = sd.format(new Date(), 'YYYY/MM/DD/hh:mm');
    var store_id = parseInt(data.store_id || 1);
    var desk_id = parseInt(data.desk_id || 1);
    var order_obj = JSON.parse(data.order_str);
    var price = data.price;
    var string = '';

    for (var i in order_obj) {
        string += order_obj[i].name + "*" + order_obj[i].counter + ";";
    }

    var values_order = [store_id, desk_id, time, userOpenId, 0, price, string];

    var sql_order = 'INSERT INTO od_hdr (od_store_id,od_desk_id,od_date,od_wechatopenid,od_state,od_total_price,od_string) ' +
        'VALUES (?,?,?,?,?,?,?)';
    db.exec(sql_order, values_order, function (err, result) {
        if (err) {
            return;
        }
        console.log(result.insertId);
        var order_id = result.insertId;
        var count = 0;
        for (var i in order_obj) {
            // var food_id = order_obj[i].food_id;
            var sql_food = 'INSERT INTO od_ln (od_id,od_line_number,gd_name,gd_quantity,od_price) ' +
                'VALUES (?,?,?,?,?)';
            var food_name = order_obj[i].name;
            var food_quantity = order_obj[i].counter;
            var food_price = order_obj[i].price;
            var values_food = [order_id, count + 1, food_name, food_quantity, food_price];
            db.exec(sql_food, values_food, function (err, result) {
                if (err) {
                    //callback(err);
                    return;
                } else {
                    console.log("food inserted");
                }
            });
            count++;
        }
    });
    res.end();

}

exports.searchOrder = function (req, res, next) {
    console.log(req.body);
    //var data = JSON.parse(req.body);
    var data = req.body;
    var userOpenId = data.open_id;
    var values_order = [userOpenId];
    var sql_order = 'SELECT * FROM od_hdr where od_wechatopenid = ? ';
    db.exec(sql_order, values_order, function (err, result) {
        if (err) {
            //callback(err);
            return;
        }
        //callback(null, result);
        console.log(result);
    });
    res.end();

}