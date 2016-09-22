/**
 * Created by 重书 on 2016/9/7.
 */
var db = require('../utils/db');
var config = require('../config/app_config');
var sd = require('silly-datetime');
var https = require('https');

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

    if(order_obj != null){
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
	    var j = 0;
            for (var i in order_obj) {
                var sql_food = 'INSERT INTO od_ln (od_id,od_line_number,gd_name,gd_quantity,od_price) ' +
                    'VALUES (?,?,?,?,?)';
                var food_name = order_obj[i].name;
                var food_quantity = order_obj[i].counter;
                var food_price = order_obj[i].price;
                var values_food = [order_id, j + 1, food_name, food_quantity, food_price];
                db.exec(sql_food, values_food, function (err, result) {
                    if (err) {
                        //callback(err);
                        return;
                    } else {
                        console.log("food inserted");
                    }
                });
		++j;
            }
        });
        res.end();
    }

}

exports.searchOrder = function (req, res, next) {
    // var data = req.body;
    // var userOpenId = data.open_id || 123;
    // var openIdCode = data.code;
    // var values_order = [userOpenId];
    var sql_order = 'SELECT * FROM od_hdr where od_wechatopenid = ? ';
    db.exec(sql_order, values_order, function (err, result) {
        if (err) {
            //callback(err);
            return;
        }
        //callback(null, result);
        console.log(result);
        var order_detail = {};
        var order_list = [];
        if (result.length > 0) {
            for (var i = 0; i < result.length; ++i) {
                var items= new Array();
                var item_list = [];
                var item_detail = {};
                items=result[i].od_string.split(";");
                for (var j = 0; j < items.length; j++) {
                    var item = items[j].split("*");
                    if(item[0] != null && item[0] != ''){
                        item_detail['name'] = item[0];
                        item_detail['counter'] = item[1];
                        item_list.push(item_detail);
                        item_detail = {};
                    }

                }
                order_detail['id'] = result[i].od_id;
                order_detail['date'] = sd.format(result[i].od_date,'YYYY/MM/DD/hh:mm');
                order_detail['items'] = item_list;
                order_detail['price'] = result[i].od_total_price;
                order_detail['state'] = result[i].od_state;
                order_list.push(order_detail);
                order_detail = {};
            }
        }
        var a = {};
        a.arr = order_list;
        console.log(a.arr);
        res.render('order',a);

    });
}
exports.order = function (req, res, next) {
    var data = req.body;
    var userOpenId = data.open_id || 123;
    var values_order = [userOpenId];
    var sql_order = 'SELECT * FROM od_hdr where od_wechatopenid = ? ';
    db.exec(sql_order, values_order, function (err, result) {
        if (err) {
            //callback(err);
            return;
        }
        //callback(null, result);
        console.log(result);
        var order_detail = {};
        var order_list = [];
        if (result.length > 0) {
            for (var i = 0; i < result.length; ++i) {
                var items= new Array();
                var item_list = [];
                var item_detail = {};
                items=result[i].od_string.split(";");
                for (var j = 0; j < items.length; j++) {
                    var item = items[j].split("*");
                    if(item[0] != null && item[0] != ''){
                        item_detail['name'] = item[0];
                        item_detail['counter'] = item[1];
                        item_list.push(item_detail);
                        item_detail = {};
                    }

                }
                order_detail['id'] = result[i].od_id;
                order_detail['date'] = result[i].od_date;
                order_detail['items'] = item_list;
                order_detail['price'] = result[i].od_total_price;
                order_detail['state'] = result[i].od_state;
                order_list.push(order_detail);
                order_detail = {};
            }
        }
        var a = {};
        a.arr = order_list;
        //res.render('order',order_list);
        res.json(order_list)
    });
}
