var express = require('express');
var router = express.Router();

var orderController = require('../controller/orderController');
var itemController = require('../controller/itemController');
var createCharge = require('../payment/createCharge');
var paymentResult = require('../payment/paymentResult');

var db = require('../utils/db');

//prepare : set OpenID in Session
var session = require('express-session');
router.use(session({
    secret:"hello",
    cookie:{ maxAge: 600000 },
    resave :true,
    saveUninitialized :true
}));
var API_KEY = "sk_test_rDa1e5env5aPqPqHC8v1azv9";
var _url = require('url');
var pingpp = require('pingpp')(API_KEY);
//get openid and store into session first,then render home page
router.get('/',function (req,res,next){
    var oauthUrl = pingpp.wxPubOauth.createOauthUrlForCode('wx5bc13508fcdbca3c',
     'http://wechat.qiancs.cn/getopenid?showwxpaytitle=1');
    res.redirect(oauthUrl);
    res.end();
});

router.get('/getopenid',function (req,res,next){
    pingpp.wxPubOauth.getOpenid('wx5bc13508fcdbca3c', '30337a4abdfb0a2c2ef892f23e141847', 
    req.query.code, function(err, openid){
        console.log(openid);
	req.session.openid = openid;
	res.render('home');
	res.end();
    });
});

router.get('/pay',function(req,res,next){
    var data = req.query;
    res.render('pingpp_pay',{price:data.price, order_str:data.order_str,
                             desk_id:data.desk_id, store_id:data.store_id});
});

router.post('/getCharge',createCharge.create);

router.post('/createCharge', function(req,res,next){
    var data = req.body;
    console.log(JSON.stringify(data));
    res.end();
});

router.post('/paymentResult',paymentResult.handleResult);


router.get('/order', function (req, res, next) {
    console.log('order');
    res.render('order');
});

//send items information to front end
router.get('/items', itemController.getItems);

router.post('/createOrder', orderController.createOrder);

router.post('/searchOrder', orderController.order);
router.get('/searchOrder', orderController.searchOrder);

router.post('/updateOrder_test', orderController.updateOrder);

router.get('/haha', function (req,res,next) {
    res.render('test',{arr:'aaarrr'});
});

router.get('/cart', function (req,res,next) {
    res.render('cart');
});
module.exports = router;

