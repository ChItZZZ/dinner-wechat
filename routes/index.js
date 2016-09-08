var express = require('express');
var router = express.Router();
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

router.get('/pay', function (req, res, next) {
    res.render('pay');
})

router.get('/user', function (req, res, next) {
    db.select(function (err, rs) {
        if (err) return;
        console.log(rs);
        res.send(rs);
    });
    //console.log(obj);
    //res.render('test',obj);
    //db.select()
    //res.send(obj);

})
module.exports = router;
