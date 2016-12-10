/**
 * Created by my on 9/10/16.
 */
var item = require('../models/item');
var async = require('async');

exports.getItems = function(req, res, next) {
    async.series({
                    priority: function(callback) {
                        item.getCatlogPriority(function(err, result){
                            if(err){
                                console.log(err);
                                return;
                            }
                            callback(null, result);
                        });
                    },
                    items: function(callback){
                        item.getItems(function (err, result) {
                        if (err) {
                           console.log(err);
                           return;
                         }
                        //res.json(result);
                         callback(null,result);
                         });
                    }
                },
                function(err, results) {
                    // update inventory in parallel
                    if(err){
                        return;
                    }else{
                        var resultList = results.items;
                        resultList['priority']= results.priority;
                        res.json(resultList);
                        res.end();
                    }
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
        //console.log(result);
        res.json(result);
        res.end();
    });
}

exports.getCtlg = function(req, res, next){
    item.getCatlogPriority(function (err, result) {
        if (err) {
            res.end();
            return;
        }
        res.json(result);
        res.end();
    });
}



