var express = require('express');
var router = express.Router();

var orderController = require('../controller/orderController');
var itemController = require('../controller/itemController');
var createCharge = require('../payment/createCharge');
var paymentResult = require('../payment/paymentResult');

var db = require('../utils/db');


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

