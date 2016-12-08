'use strict';
// Ping++ Server SDK
var env = require('../app');
var orderController = require('../controller/orderController');
var funds = require('../models/funds');
var sd = require('silly-datetime');
var moment = require('moment');
// var API_KEY_TEST = "sk_test_rDa1e5env5aPqPqHC8v1azv9";
// var API_KEY_LIVE = "sk_live_Ki9Ke1X9WLSS0qrj1OCKGGK4";
var APP_ID = "app_8en54GC0iHmH1ajL";

var crypto = require('crypto');


exports.createNew = function (req,res,next) 
{
    var pingpp = env.pingpp;
  pingpp.parseHeaders(req.headers); // 把从客户端传上来的 Headers 传到这里
  // 设置你的私钥路径，用于请求的签名，对应的公钥请填写到 Ping++ 管理平台
  pingpp.setPrivateKeyPath(__dirname + "/your_rsa_private_key.pem");
  req.setEncoding('utf-8');
  var data = req.body;
  var channel = data.channel;
  var openid = data.openId || '123';
  var amount = data.amount;
  //var client_ip = req.connection.remoteAddress;
  var client_ip = '127.0.0.1';
  var extra = {};
  switch (channel) {
    case 'alipay_wap':
      extra = {
        'success_url': 'http://mddm.qiancs.cn',
        'cancel_url': 'http://mddm.qiancs.cn'
      };
      break;
    case 'wx_pub':
      extra = {
        'open_id': openid
      };
      break;
  }

  orderController.createOrderInfoNew(data,function(err,order_id){
      if(err){
	    console.log('err' + err);
        res.end();
        return;
      }
      var timestamp = moment();
      var timestamp_order_id = timestamp+"o"+order_id;
      pingpp.charges.create({
      order_no:  timestamp_order_id,
      app:       {id: APP_ID},
      channel:   channel,
      amount:    amount,
      client_ip: client_ip,
      currency:  "cny",
      subject:   "Charge Subject",
      body:      "Charge Body",
      extra:     extra
      }, function(err,charge){
      if(err){
        console.log("生成charge失败" + err);
        res.end();
        return;
      }
      console.log('生成charge成功');
      res.send(charge);
      res.end();
    });
  });  
              
}


exports.createForUnfinishedOrder = function (req,res,next)
{
    var pingpp = env.pingpp;
    pingpp.parseHeaders(req.headers);
    pingpp.setPrivateKeyPath(__dirname + "/your_rsa_private_key.pem");
    req.setEncoding('utf-8');
    var data = req.body;
    data.open_id = req.body.openId || '123';
    console.log('session id ' + req.session.openid);
    var timestamp = moment();
    var order_id = timestamp+"o"+data.order_id;
    var channel = data.channel;
    var openid = data.open_id;
    var amount = data.amount;
    var client_ip = req.connection.remoteAddress;
    var extra = {};
    switch (channel) {
        case 'alipay_wap':
            extra = {
                'success_url': 'http://wechat.qiancs.cn',
                'cancel_url': 'http://wechat.qiancs.cn'
            };
            break;
        case 'wx_pub':
            extra = {
                'open_id': openid
            };
            break;
    }

        pingpp.charges.create({
            order_no:  order_id,
            app:       {id: APP_ID},
            channel:   channel,
            amount:    amount,
            client_ip: client_ip,
            currency:  "cny",
            subject:   "Charge Subject",
            body:      "Charge Body",
            extra:     extra
        }, function(err,charge){
            if(err){
                console.log("生成charge失败" + err);
                res.end();
                return;
            }
            console.log('生成charge成功');
            res.send(charge);
            res.end();
        });


}

exports.createForRecharge = function (req,res,next)
{
    var pingpp = env.pingpp;
    pingpp.parseHeaders(req.headers);
    pingpp.setPrivateKeyPath(__dirname + "/your_rsa_private_key.pem");
    req.setEncoding('utf-8');
    var data = req.body;
    data.open_id = req.body.openId || '123';
    console.log('session id ' + req.session.openid);
    var time = sd.format(new Date(), 'YYYY/MM/DD/HH:mm');
    var timestamp = moment();
    //var order_id = timestamp+"f"+data.open_id;
    var channel = data.channel;
    var openid = data.open_id;
    var price = data.price;
    var amount = data.amount;
    funds.addFundFlow(time, openid, price, function (err, results) {
        if(err){
            console.log(err);
            res.send(err);
        }
        var fundId = results.fund_id;
        var order_id = timestamp + "f"+ results;
        console.log(order_id);
        var client_ip = "127.0.0.1";
        var extra = {};
        switch (channel) {
            case 'alipay_wap':
                extra = {
                    'success_url': 'htttp://wechat.qiancs.cn',
                    'cancel_url': 'htp://wechat.qiancs.cn'
                };
                break;
            case 'wx_pub':
                extra = {
                    'open_id': openid
                };
                break;
        }

        pingpp.charges.create({
            order_no:  order_id,
            app:       {id: APP_ID},
            channel:   channel,
            amount:    amount,
            client_ip: client_ip,
            currency:  "cny",
            subject:   "Charge Subject",
            body:      "Charge Body",
            extra:     extra
        }, function(err,charge){
            if(err){
                console.log("生成charge失败" + err);
                res.end();
                return;
            }
            console.log('生成charge成功');
            res.send(charge);
            res.end();
        });
    });
}
