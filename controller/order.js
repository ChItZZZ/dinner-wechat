/**
 * Created by 重书 on 2016/9/7.
 */
var db = require('../utils/db');
var sd = require('silly-datetime');

exports.createOrder = function (req,res,next) {
    console.log(req.body);
    //var data = JSON.parse(req.body);
    var data = req.body;
    var userOpenId = data.wechatopenid;
    var time=sd.format(new Date(), 'YYYY/MM/DD');
    var store_id = parseInt(data.store_id);
    var desk_id = parseInt(data.desk_id);
    var foods = data.foods;
    var price = 0;
    var string = "";
    for(var i = 0;i<foods.length;i++){
        price = price + foods[i].food_price * foods[i].food_quantity;
        string = string + foods[i].food_name+"*"+foods[i].food_quantity +";";
    }
    var values_order = [store_id, desk_id,time,userOpenId,0,price,string];

    console.log(typeof (time));
    var sql_order = 'INSERT INTO od_hdr (od_store_id,od_desk_id,od_date,od_wechatopenid,od_state,od_total_price,od_string) ' +
        'VALUES (?,?,?,?,?,?,?)';
    db.exec(sql_order, values_order, function(err, result) {
        if (err) {
            //callback(err);
            return;
        }
        //callback(null, result);
        console.log(result.insertId);
        var order_id = result.insertId;
        for(var i = 0;i<foods.length;i++){
            var sql_food = 'INSERT INTO od_ln (od_id,od_line_number,gd_name,gd_quantity,od_price) ' +
                'VALUES (?,?,?,?,?)';
           // var food_id = foods[i].food_id;
            var food_name = foods[i].food_name;
            var food_quantity= foods[i].food_quantity;
            var food_price = foods[i].food_price;
            var values_food = [order_id, i+1,food_name,food_quantity,food_price];
            db.exec(sql_food,values_food, function(err, result) {
                if (err) {
                    //callback(err);
                    return;
                }else {
                    console.log("food inserted");
                }
            });
        }


    });
    res.end();

}
