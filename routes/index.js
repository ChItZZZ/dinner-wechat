var express = require('express');
var router = express.Router();
var Order = require('../controller/order');
var iG = require('../models/items');

var db = require('../utils/db');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/order', function (req, res, next) {
    res.render('order');
})

router.get('/demo', function (req, res, next) {
    res.render('file');
})

router.get('/items', function (req, res, next) {
    //console.log(typeof iG.items);
    res.json(iG);
    //res.send('hello world');
})
router.get('/test', function (req, res, next) {
    res.write('hello world');
    res.write('again');
    res.end();
})

router.get('/user', function (req, res, next) {
    db.select();
    res.end();
})

router.post('/createorder', function (req,res,next) {
    var data = req.body;

    console.log(data);
    var orderid = Order.createOrder(data);
    console.log(orderid);
})
module.exports = router;
