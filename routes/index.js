var express = require('express');
var router = express.Router();

var orderController = require('../controller/orderController');
var itemController = require('../controller/itemController');
var balanceController = require('../controller/balanceController');
var createCharge = require('../payment/createCharge');
var paymentResult = require('../payment/paymentResult');
var couponController = require('../controller/couponController');

var db = require('../utils/db');

//prepare : set OpenID in Session
var session = require('express-session');
router.use(session({
    secret: "hello",
    cookie: {maxAge: 600000},
    resave: true,
    saveUninitialized: true
}));
var API_KEY = "sk_test_rDa1e5env5aPqPqHC8v1azv9";
var _url = require('url');
var pingpp = require('pingpp')(API_KEY);
//get openid and store into session first,then render home page
router.get('/',function (req,res,next){
    if (req.session.openid){
        console.log("QR code scan :" + req.session.orderItems);
        res.render('home',{order_items:req.session.orderItems});
    }
    else{
        var oauthUrl = pingpp.wxPubOauth.createOauthUrlForCode('wx5bc13508fcdbca3c',    //本地注释
            'http://wechat.qiancs.cn/getopenid?showwxpaytitle=1');                                             //本地注释
        res.redirect(oauthUrl);                                                         //本地注释
    }
    res.end();
});
// router.get("/", function (req, res, next) {
//     res.render('home');
//
// })

router.get('/getopenid', function (req, res, next) {
    pingpp.wxPubOauth.getOpenid('wx5bc13508fcdbca3c', '30337a4abdfb0a2c2ef892f23e141847',
        req.query.code, function (err, openid) {
            console.log(openid);
            req.session.openid = openid;
            res.render('home',{order_items:req.session.orderItems});
            res.end();
        });
});

// QR code scanning
router.get('/addByQRCode',itemController.scanQR);

//if openid exists, then return home page directly
router.get('/home', function (req, res, next) {
    if (req.session.openid)
        res.render('home',{order_items:req.session.orderItems});
    else
        res.redirect('/');
    res.end();
});

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

//generate charge and send it to client
router.post('/getCharge', createCharge.create);

router.post('/getChargeForUnfinished', createCharge.createForUnfinishedOrder);

//get the payment result .  After payment,the third part sever will sent a post request to this url
router.post('/paymentResult', paymentResult.handleResult);


//send items information to front end
router.get('/items', itemController.getItems);

//get order records
router.get('/order', orderController.searchOrder);

// fetch for more orders
router.post('/getMoreOrder', orderController.order);

router.post('/updateOrder_test', orderController.updateOrder);

router.get('/haha', function (req, res, next) {
    res.render('test', {arr: 'aaarrr'});
});

router.post('/recharge', balanceController.recharge);

router.post('/deduct', balanceController.deduct);

router.post('/inquire', balanceController.inquire);

router.get('/test', function (req, res, next) {
    res.render("test");
});
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
module.exports = router;

