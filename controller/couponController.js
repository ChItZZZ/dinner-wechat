/**
 * Created by Qianc on 2016/11/5.
 */

var db = require('../utils/db');
var config = require('../config/app_config');
var sd = require('silly-datetime');
var coupon = require('../models/coupon')
var https = require('https');
var async = require('async');

exports.getCoupons = function(req,res,next){
    var data = req.body;
    var card_id = data.card_id || 11111;
    var fetch_coupons = 'SELECT * FROM coupon_master where coupon_card_number = ?';
    var value_card = [card_id];
    var fetch_coupon_details = 'SELECT * FROM coupon_config where coupon_id = ?';
    db.exec(fetch_coupons, value_card, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        console.log(result);
        var coupon_list = [];
        var coupon_detail = {};
        if (result.length > 0) {
            var today = new Date();
            console.log(today);
            async.every(result, function(coupon, callback) {
                var value_coupon = [coupon.coupon_id];
                db.exec(fetch_coupon_details, value_coupon, function (err, detail) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    //callback(null, result);
                    console.log(detail);
                    if(detail.length>0){
                        coupon_detail['id']=coupon.coupon_master_id;
                        coupon_detail['start_date']=coupon.coupon_start_date;
                        coupon_detail['end_date']=coupon.coupon_end_date;
                        coupon_detail['number']=coupon.coupon_number;
                        if(today<coupon.coupon_start_date){   // 未生效
                            coupon_detail['status']= 0;
                        }else if(today>coupon.coupon_end_date || coupon.coupon_number < 1){  //已过期
                            coupon_detail['status']= 1;
                        }else {
                            coupon_detail['status']= 2;
                        }
                        switch(detail[0].coupon_type) {
                            case 1:
                                coupon_detail['condition']=detail[0].coupon_amount1;
                                coupon_detail['discount']=detail[0].coupon_amount2;

                                break;
                            case 2:
                                coupon_detail['discount']=detail[0].coupon_amount1;
                                break;
                            default:
                                break;
                        }
                        coupon_detail['type'] = detail[0].coupon_type;
                        coupon_detail['description']=detail[0].coupon_description;
                        coupon_detail['catalogue']=detail[0].coupon_catalogue;
                        coupon_list.push(coupon_detail);
                        coupon_detail={};
                        //console.log(coupon_list);
                        callback(null, !err)
                    }
                });
            }, function(err ,result) {
                if( !result ) {
                    console.log('fetching err: ' + err);
                    return;
                } else {
                    var a = {};
                    a.couponList = coupon_list;
                    console.log("coupon list :"+a.couponList);
                    res.json(a);
                }
            });
        }

    });
}

exports.useCoupon = function (coupon_id,callback){
    coupon.updateCoupon(coupon_id,function (err, result) {
        if (err) {
            calback(err);
            return;
        }
        callback(null);
    });
};

exports.rollbackCoupon = function (coupon_id,callback){
    coupon.rollback(coupon_id,function (err, result) {
        if (err) {
            calback(err);
            return;
        }
        callback(null);
    });
};