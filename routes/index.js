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
//..end prepare

router.get('/pay',function(req,res,next){
    res.render('pingpp_pay');
});

router.get('/payone',function(req,res,next){
    res.render('pay_one');
});

router.post('/getCharge',createCharge.create);

router.post('/createCharge', function(req,res,next){
    var data = req.body;
    console.log(JSON.stringify(data));
    res.end();
});

router.post('/paymentResult',paymentResult.handleResult);

/* GET home page. */
router.get('/', function (req, res, next) {
    if(!req.session.openID) {
        var urlParts = _url.parse(req.url, true);
        pingpp.wxPubOauth.getOpenid('wx5bc13508fcdbca3c', '30337a4abdfb0a2c2ef892f23e141847 ',
            urlParts.query.code, function (err, openid) {
                req.session.openID = openid;
            });
    }
    res.render('home');
});

router.get('/order', function (req, res, next) {
    console.log('order');
    res.render('order');
});

//database operation demo
router.get('/demo', itemController.demo);

//send items information to front end
router.get('/items', itemController.getItems);

router.post('/createOrder', orderController.createOrder);

router.post('/searchOrder', orderController.order);
router.get('/searchOrder', orderController.searchOrder);

router.post('/updateOrder_test', orderController.updateOrder);

router.get('/haha', function (req,res,next) {
    res.render('test',{
        arr:[{
            id:1
        },{
            id:"2"
        }]
    })
})
module.exports = router;

