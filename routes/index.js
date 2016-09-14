var express = require('express');
var router = express.Router();

var orderController = require('../controller/orderController');
var itemController = require('../controller/itemController');

var db = require('../utils/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home');
});


router.get('/react', function (req, res, next) {
    res.render('test');

})
router.get('/order', function (req, res, next) {
    res.render('order');
});

//database operation demo
router.get('/demo', itemController.demo);

//send items information to front end
router.get('/items', itemController.getItems);

router.post('/createOrder', orderController.createOrder);

router.post('/searchOrder', orderController.order);
router.get('/searchOrder', orderController.searchOrder);

router.get('/haha', function (req,res,next) {
    res.render('haha');
})
module.exports = router;

