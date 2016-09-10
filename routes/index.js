var express = require('express');
var router = express.Router();

var orderController = require('../controller/orderController');
var itemController = require('../controller/itemController');

var db = require('../utils/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home');
});

router.get('/order', function (req, res, next) {
    res.render('order');
});

//database operation demo
router.get('/demo', itemController.demo);

//send items information to front end
router.get('/items', itemController.getItems);

router.post('/createorder', orderController.createOrder);

router.post('/pay', function (req, res, next) {

    //var open_id = req.body.open_id;
    //var price = req.body.price;
    //var order = req.body.order;

    var order_obj = JSON.parse(req.body.order_str);
    var price = req.body.price;
    var open_id = req.body.open_id;
    console.log(order_obj);
    console.log(price + open_id)
    res.send(order_obj);
})

router.get('test1', function (req, res, next) {
    var code = req.query.code;

    res.send(code);
})


router.post('/createorder', orderController.createOrder);

router.post('/searchorder', orderController.searchOrder);

module.exports = router;

