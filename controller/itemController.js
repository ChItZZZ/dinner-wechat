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
}
exports.demo = function(req, res, next) {
    item.demo(function(err, result) {
        if (err) {
            res.end();
            return;
        }
        res.send(result);
        res.end();
    });
}