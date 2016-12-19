var express = require('express');
var env = require('../app');
var router = express.Router();

var orderController = require('../controller/orderController');
var itemController = require('../controller/itemController');
var balanceController = require('../controller/balanceController');
var createCharge = require('../payment/createCharge');
var paymentResult = require('../payment/paymentResult');
var couponController = require('../controller/couponController');
var activityController = require('../controller/activityController');
var recruitController = require('../controller/recruitController');
var commentController = require('../controller/commentController');
var itemtest = require('../models/item_test');

var db = require('../utils/db');

var session = require('express-session');
router.use(session({
    secret: "hello",
    cookie: {maxAge: 600000},
    resave: true,
    saveUninitialized: true
}));


var APP_ID = "wxf811f21d2630dfad";
var APP_SECRET = "00c30abcf3865e953681c76e31560a2d";

var _url = require('url');
var pingpp = require('pingpp');

//get openid first,then redirect home page
router.get('/homeMenu',function (req,res,next){
    console.log(env.config.APP_ID+" "+env.config.URL_NODE+'getopenid?showwxpaytitle=1');
    var oauthUrl = pingpp.wxPubOauth.createOauthUrlForCode(env.config.APP_ID,
        env.config.URL_NODE+'getopenid1?showwxpaytitle=1');
    res.redirect(oauthUrl);                                                       
    res.end();
});

router.get('/getopenid1', function (req, res, next) {
    pingpp.wxPubOauth.getOpenid(env.config.APP_ID, env.config.APP_SECRET,
        req.query.code, function (err, openid) {
            console.log(openid);
          //  req.session.openid = openid;
            res.redirect(env.config.URL_VUE + '?openId=' + openid + '&tab=1');
            res.end();
        });
});

router.get('/homeOrder',function (req,res,next){
    console.log(env.config.APP_ID+" "+env.config.URL_NODE+'getopenid?showwxpaytitle=1');
    var oauthUrl = pingpp.wxPubOauth.createOauthUrlForCode(env.config.APP_ID,
        env.config.URL_NODE+'getopenid2?showwxpaytitle=1');
    res.redirect(oauthUrl);                                                       
    res.end();
});

router.get('/getopenid2', function (req, res, next) {
    pingpp.wxPubOauth.getOpenid(env.config.APP_ID, env.config.APP_SECRET,
        req.query.code, function (err, openid) {
            console.log(openid);
          //  req.session.openid = openid;
            res.redirect(env.config.URL_VUE + '?openId=' + openid + '&tab=2');
            res.end();
        });
});

router.get('/homeUs',function (req,res,next){
    console.log(env.config.APP_ID+" "+env.config.URL_NODE+'getopenid?showwxpaytitle=1');
    var oauthUrl = pingpp.wxPubOauth.createOauthUrlForCode(env.config.APP_ID,
        env.config.URL_NODE+'getopenid3?showwxpaytitle=1');
    res.redirect(oauthUrl);                                                       
    res.end();
});

router.get('/getopenid3', function (req, res, next) {
    pingpp.wxPubOauth.getOpenid(env.config.APP_ID, env.config.APP_SECRET,
        req.query.code, function (err, openid) {
            console.log(openid);
          //  req.session.openid = openid;
            res.redirect(env.config.URL_VUE + '?openId=' + openid + '&tab=3');
            res.end();
        });
});

// QR code scanning
router.get('/addByQRCode',itemController.scanQR);

//return payment page
router.get('/pay', function (req, res, next) {
    var data = req.query;
    res.render('pingpp_pay', {
        price: data.price,order_id:0, order_str: data.order_str,
        desk_id: data.desk_id, store_id: data.store_id
    });
});

router.get('/payForUnfinishedOrder', function (req, res, next) {
    var data = req.query;
    res.render('pingpp_pay', {
        price: data.price, order_id:data.order_id,order_str: data.order_str,
        desk_id: data.desk_id, store_id: data.store_id
    });
});


//get charge new
router.post('/getChargeNew', createCharge.createNew);

//cancel order
router.post('/cancelOrder', orderController.cancelOrder);

router.post('/getChargeForUnfinished', createCharge.createForUnfinishedOrder);

//get the payment result .  After payment,the third part sever will sent a post request to this url
router.post('/paymentResult', paymentResult.handleResult);

var item = require('../models/item');
//send items information to front end
router.get('/items',itemController.getItems);

router.get('/itemConfig',itemController.getConfiguration);

//get order records
router.post('/order', orderController.searchOrder);

// fetch for more orders
router.post('/getMoreOrder', orderController.order);

router.post('/updateOrder_test', orderController.updateOrder);

router.get('/haha', function (req, res, next) {
    res.render('test', {arr: 'aaarrr'});
});

router.post('/recharge', createCharge.createForRecharge);

router.post('/deduct', orderController.finishOrderWithValueCard);

router.post('/finishOrderWithValueCard', balanceController.deductForUnfinished);

router.post('/inquire', balanceController.inquire);

router.get('/getActivity', activityController.inquire);

router.get('/getRecruit', recruitController.inquire);

router.post('/addComment', commentController.add);

router.post('/test', itemtest.showlist);
//router.get("/cart", function (req, res, next) {
//    var orStr = req.query.order;
//    var order = JSON.parse(orStr);
//    res.render("cart",order);
//})
router.get("/recharge", function (req, res, next) {
    res.render("recharge");
});

//优惠券status: 0未生效，1已过期，2可用
router.post("/coupon",couponController.getCoupons);

router.get("/getHeaderPic",activityController.getHeaderPic);

router.get("/testENV", function (req, res, next) {
    console.log(env.config.printInProd);
    res.end();
});

module.exports = router;

