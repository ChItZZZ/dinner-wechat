/**
 * Created by my on 9/10/16.
 */
var item = require('../models/item');

exports.getItems = function(req, res, next) {
    item.getItems(function (err, result) {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });
};

exports.scanQR = function (req,res,next) {
    var data = req.query;
    var itemId = data.item_id;
    var itemList = req.session.orderItems || [];
    itemList.push(itemId);
    req.session.orderItems = itemList;
    res.redirect('/');
};


exports.getConfiguration = function (req,res,next) {
    var data = req.query;
    var itemId = data.item_id;
    var value = [itemId];

    item.getConfig(value, function (err, result) {
        if (err) {
            //callback(err);
            return;
        }
        //callback(null, result);
        console.log(result);
        res.json(result);
        res.end();
    });
}



