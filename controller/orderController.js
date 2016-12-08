/**
 * Created by 重书 on 2016/9/7.
 */
var db = require('../utils/db');
var config = require('../config/app_config');
var sd = require('silly-datetime');
var https = require('https');
var async = require('async');
var couponController = require('../controller/couponController');
var balanceController = require('../controller/balanceController');


/**
 * new order data ={
 *                  channel:"wx_pub",
 *                  amount:1000,
 *                  orderInfo: [ {id:'1',name:"food1",count:2,price:10} , 
 *                               {id:'2',name:"food2",count:3,price:20} ,
 *                             ],
 *                  desk_id: 1,
 *                  store_id: 1,
 *                  price: 10,
 *                  open_id : "ofgw6w_9U_gXWa74bVa1Wjwixqbo"
 *                 }
 */

exports.createOrderInfoNew = function (data,callback){
    console.log('info New ' + JSON.stringify(data));
    var orderInfo = data.orderInfo;
    var userOpenId = data.openId || 123 ;
    var time = sd.format(new Date(), 'YYYY/MM/DD/HH:mm');
    var store_id = parseInt(data.store_id || 1);
    var desk_id = parseInt(data.desk_id || 1);
    var price = data.price;
    var realPrice = data.realPrice;
    var coupon_id = data.coupon_id;
    var couponDes = data.couponDes;
    var string = '';

    if (orderInfo.length != 0) {
        for (var i in orderInfo) {
            if(orderInfo[i].detail == null){
                string += orderInfo[i].name + "*" + orderInfo[i].count + ";";
            }else{
                string += orderInfo[i].name + "("+orderInfo[i].detail+")  "+"*" + orderInfo[i].count + ";";
            }
        }

        var values_order = [store_id, desk_id, time, userOpenId,string,price, realPrice,0,'N',coupon_id,couponDes];

        var sql_order = 'INSERT INTO od_hdr (od_store_id,od_desk_id,od_date,od_wechatopenid,od_string,od_fixed_total_price,od_total_price,od_state,od_isprint,od_coupon_id,od_coupon_description) ' +
            'VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        db.exec(sql_order, values_order, function (err, result) {
            if (err) {
		        callback(err);
                return;
            }
            var order_id = result.insertId;
            var j = 0;
            for (var i in orderInfo) {
                var sql_food = 'INSERT INTO od_ln (od_id,od_line_number,gd_name,gd_quantity,od_price,gd_id,gd_detail) ' +
                    'VALUES (?,?,?,?,?,?,?)';
                var food_id = orderInfo[i].id;
                var food_name = orderInfo[i].name;
                var food_quantity = orderInfo[i].count;
                var food_price = orderInfo[i].price;
                var food_detail = orderInfo[i].detail;
                var values_food = [order_id, j + 1, food_name, food_quantity, food_price,food_id,food_detail];
                db.exec(sql_food, values_food, function (err, result) {
                    if (err) {
                        callback(err);
                        return;
                    } else {
            	        callback(null,order_id);
                        console.log("food inserted");
                    }
                });
                ++j;
            }
            if(coupon_id != null){
                    couponController.useCoupon(coupon_id,function (err,result) {
                        if(err){
                            console.log(err);
                            return;
                        }
                        console.log(result);
                    })
                }
        });
    }
};

exports.finishOrderWithValueCard = function (req,res,next){
    var data = req.body;
    var orderInfo = data.orderInfo;
    var userOpenId = data.openId ||123 ;
    var time = sd.format(new Date(), 'YYYY/MM/DD/HH:mm');
    var store_id = parseInt(data.store_id || 1);
    var desk_id = parseInt(data.desk_id || 1);
    var price = data.price;
    var realPrice = data.realPrice;
    var coupon_id = data.coupon_id;
    var couponDes = data.couponDes;
    //var card_number = data.card_number;
    var string = '';

    if (orderInfo.length != 0) {
        for (var i in orderInfo) {
            if(orderInfo[i].detail == null){
                string += orderInfo[i].name + "*" + orderInfo[i].count + ";";
            }else{
                string += orderInfo[i].name + "("+orderInfo[i].detail+")  "+"*" + orderInfo[i].count + ";";
            }
            
        }

        var values_order = [store_id, desk_id, time, userOpenId,string,price, realPrice,1,'N',coupon_id,couponDes];

        var sql_order = 'INSERT INTO od_hdr (od_store_id,od_desk_id,od_date,od_wechatopenid,od_string,od_fixed_total_price,od_total_price,od_state,od_isprint,od_coupon_id,od_coupon_description) ' +
            'VALUES (?,?,?,?,?,?,?,?,?,?,?)';
        db.exec(sql_order, values_order, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            var order_id = result.insertId;
            //callback(null,order_id);
            var j = 0;
            for (var i in orderInfo) {
                var sql_food = 'INSERT INTO od_ln (od_id,od_line_number,gd_name,gd_quantity,od_price,gd_id,gd_detail) ' +
                    'VALUES (?,?,?,?,?,?,?)';
                var food_id = orderInfo[i].id;
                var food_name = orderInfo[i].name;
                var food_quantity = orderInfo[i].count;
                var food_price = orderInfo[i].price;
                var food_detail = orderInfo[i].detail;
                var values_food = [order_id, j + 1, food_name, food_quantity, food_price,food_id,food_detail];
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
            if(coupon_id != null){
                couponController.useCoupon(coupon_id,function (err,result) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log(result);
                })
            }
            balanceController.deduct(userOpenId,realPrice,function (err,result) {
                if(err){
                    console.log(err);
                    return;
                }
                console.log(result);
            });
            var r = {};
            r.code = "success";
            res.json(r);
            res.end();
        });
    }
};


/**
 * history order : 
 * order_list ={ historyOrder:
 *                 [
 *                  {"id":176,"date":"2016/11/18/05:05","items":[{"name":"蛋挞","counter":"3"}],"price":30,"state":0},
 *                  {"id":177,"date":"2016/11/18/05:05","items":[{"name":"蛋挞","counter":"1"},{"name":"慕斯","counter":"1"}],"price":30,"state":1}
 *                 ]
 *             }
 */

exports.searchOrder = function (req, res, next) {
    var data = req.body;
    var userOpenId = req.body.openId || '123';
    // var openIdCode = data.code;
    var values_order = [userOpenId,0,5];
    var sql_order = 'SELECT * FROM od_hdr where od_wechatopenid = ? order by od_date DESC LIMIT ?,? ';
    db.exec(sql_order, values_order, function (err, result) {
        if (err) {
            console.log('get historyOrder from db err');
            res.end();
            return;
        }
        var order_detail = {};
        var order_list = [];
        if (result.length > 0) {
            for (var i = 0; i < result.length; ++i) {
                var items = new Array();
                var item_list = [];
                var item_detail = {};
                items = result[i].od_string.split(";");
                for (var j = 0; j < items.length; j++) {
                    var item = items[j].split("*");
                    if (item[0] != null && item[0] != '') {
                        item_detail['name'] = item[0];
                        item_detail['counter'] = item[1];
                        item_list.push(item_detail);
                        item_detail = {};
                    }

                }
                order_detail['id'] = result[i].od_id;
                order_detail['date'] = sd.format(result[i].od_date, 'YYYY/MM/DD/HH:mm');
                order_detail['items'] = item_list;
                order_detail['price'] = result[i].od_fixed_total_price;
                order_detail['realPrice'] = result[i].od_total_price;
                order_detail['state'] = result[i].od_state;
                order_detail['couponId'] = result[i].od_coupon_id;
                order_detail['couponDes'] = result[i].od_coupon_description;
                order_list.push(order_detail);
                order_detail = {};
            }
        }
        var obj = {};
        obj.historyOrder = order_list;
        res.json(obj);
        res.end();
    });
};
exports.order = function (req, res, next) {
    var data = req.body;
    var userOpenId = req.body.openId || '123';
    var offset = (data.page - 1)*5;
    // var openIdCode = data.code;
    var values_order = [userOpenId,offset,5];
    //var sql_order = 'SELECT TOP 5 * FROM od_hdr WHERE od_id NOT IN ( SELECT TOP 5*(?-1) od_id FROM od_hdr where od_wechatopenid = ? order by od_date DESC ) and od_wechatopenid = ? order by od_date DESC';
    var sql_order = 'SELECT * FROM od_hdr where od_wechatopenid = ? order by od_date DESC LIMIT ?,? ';
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
                var items = new Array();
                var item_list = [];
                var item_detail = {};
                items = result[i].od_string.split(";");
                for (var j = 0; j < items.length; j++) {
                    var item = items[j].split("*");
                    if (item[0] != null && item[0] != '') {
                        item_detail['name'] = item[0];
                        item_detail['counter'] = item[1];
                        item_list.push(item_detail);
                        item_detail = {};
                    }

                }
                order_detail['id'] = result[i].od_id;
                order_detail['date'] = sd.format(result[i].od_date, 'YYYY/MM/DD/HH:mm');
                order_detail['items'] = item_list;
                order_detail['price'] = result[i].od_fixed_total_price;
                order_detail['realPrice'] = result[i].od_total_price;
                order_detail['state'] = result[i].od_state;
                order_detail['couponId'] = result[i].od_coupon_id;
                order_detail['couponDes'] = result[i].od_coupon_description;
                order_list.push(order_detail);
                order_detail = {};
            }
        }
        var a = {};
        a.moreOrder = order_list;
        console.log(a.moreOrder);
        res.json(a);
    });
}

exports.updateOrder = function (req) {    // ***** 定义 0为未支付，1为支付成功，2为已出，3为取消 *******
    var jsonSet = req;
    var orderId = jsonSet.data.object.order_no || '123';
    // var openIdCode = data.code;
    var values_order = [orderId];
    var sql_order = 'UPDATE od_hdr SET od_state = 1 where od_id = ? ';
    var sql_get_items =  'SELECT gd_id,gd_quantity FROM od_ln where od_id = ? ';
    var sql_get_coupon = 'SELECT od_coupon_id FROM od_hdr where od_id = ?';
    var sql_update_inventory = 'UPDATE gd_mst SET gd_inventory = gd_inventory - ? where gd_id = ? ';
    async.series({
            // update
            step_update: function(callback) {
                db.exec(sql_order, values_order, function (err, result) {
                    if (err) {
                        //callback(err);
                        console.log(err);
                        return;
                    }
                    //callback(null, result);
                    callback(null, 'update order successfully');
                });

            },
            //getcoupon
            step_getcoupon: function(callback){
                db.exec(sql_get_coupon,values_order,function (err, result) {
                    if(err){
                        console.log(err);
                        callback(err)
                    }
                    console.log(result);
                    callback(null,result);
                })
            },
            // get items
            step_get:function(callback) {
                db.exec(sql_get_items, values_order, function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    //callback(null, result);
                    console.log(result);
                    //var item_detail = {};
                    //var item_list = [];
                    if (result.length > 0) {
                        var item_list = [];
                        var item_detail = {};
                        for (var i = 0; i < result.length; ++i) {

                            item_detail['id'] = result[i].gd_id;
                            item_detail['quantity'] = result[i].gd_quantity;

                            item_list.push(item_detail);
                            item_detail = {};
                        }
                        callback(null, item_list);
                    }

                });

            }
        },
        function(err, results) {
            // update inventory in parallel
            var item_list = results.step_get;
            var couponUsed = results.step_getcoupon;
            // if(couponUsed.length >0){
            //     couponController.useCoupon(couponUsed[0].od_coupon_id,function (err,result) {
            //         if(err){
            //             console.log(err);
            //             return;
            //         }
            //         console.log(result);
            //     })
            // }
            if(item_list.length > 0){
                async.each(item_list, function(item, callback) {
                    var values_item = [item.quantity,item.id];
                    db.exec(sql_update_inventory, values_item, function (err, result) {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        //callback(null, result);
                        console.log(result);

                    });
                }, function(err) {
                    log('1.1 err: ' + err);
                    return;
                });
            }
        });
};

exports.cancelOrder = function (req,res,next) {
    var data = req.body;
    var orderId = data.order_id;
    // var openIdCode = data.code;
    var values_order = [orderId];
    var sql_order = 'UPDATE od_hdr SET od_state = 3 where od_id = ? ';
    var sql_get_coupon = 'SELECT od_coupon_id FROM od_hdr where od_id = ?';
    async.series({
            // update
            step_update: function(callback) {
                db.exec(sql_order, values_order, function (err, result) {
                    if (err) {
                        //callback(err);
                        console.log(err);
                        return;
                    }
                    //callback(null, result);
                });
                callback(null, 'cancel order successfully');
            },
            //getcoupon
            step_getcoupon: function(callback){
                db.exec(sql_get_coupon,values_order,function (err, result) {
                    if(err){
                        console.log(err);
                        callback(err)
                    }
                    console.log(result);
                    callback(null,result);
                })
            }
        },
        function(err, results) {
            // update inventory in parallel

            var couponUsed = results.step_getcoupon;
            if(couponUsed.length >0){
                couponController.rollbackCoupon(couponUsed[0].od_coupon_id,function (err,result) {
                    if(err){
                        console.log(err);
                        return;
                    }
                    console.log(result);
                })
            }
            res.end();
        });
}
