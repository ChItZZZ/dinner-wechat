var express = require('express');
var router = express.Router();
var itemController = require('../controller/goods')

var db = require('../utils/db');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/order', function(req, res, next) {
    res.render('order');
});


//database operation demo
router.get('/demo', function(req, res, next) {

    itemController.demo(function(err, result) {
        if (err) {
            res.end();
            return;
        }
        res.send(result);
        res.end();
    });

});

//send items information to front end
router.get('/items', function(req, res, next) {

    itemController.getItems(function(err, result) {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });

});

router.get('/test', function(req, res, next) {
    res.write('hello world');
    res.write('again');
    res.end();
});

router.get('/user', function(req, res, next) {
    db.select();
    res.end();
});
module.exports = router;