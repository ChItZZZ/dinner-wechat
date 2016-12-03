
var db = require('../utils/db');
var config = require('../config/app_config');
var sd = require('silly-datetime');
var https = require('https');
var async = require('async');


exports.searchBenefit = function (req, res, next) {
    var data = req.body;
    var userOpenId = req.session.openid || '123';

    var values = [userOpenId];

    var sql_benefit = 'select bbc.blc_card_number,bbc.blc_benefit_type,bbc.blc_benefit_balance,bbc.blc_benefit_unit from blc_benefit_config bbc'+
                        'left join blc_master bm on bm.blc_card_number = bbc.blc_card_number'+
                        'where bm.blc_openid = ?';
    db.exec(sql_benefit, values, function (err, result) {
        if (err) {
            //callback(err);
            return;
        }
        //callback(null, result);
        console.log(result);
        var benefit_detail = {};
        var benefit_list = [];
        if (result.length > 0) {
            for (var i = 0; i < result.length; ++i) {
                benefit_detail['id'] = result[i].blc_card_number;
                benefit_detail['type'] = result[i].blc_benefit_type;
                benefit_detail['balance'] = result[i].blc_benefit_balance;
                benefit_detail['unit'] = result[i].blc_benefit_unit;
                benefit_list.push(benefit_detail);
                benefit_detail = {};
            }
        }
        var a = {};
        a.arr = benefit_list;
        console.log(a.arr);
        res.render('order', a);
    });
}