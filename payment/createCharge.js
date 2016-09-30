'use strict';
// Ping++ Server SDK

var API_KEY = "sk_test_rDa1e5env5aPqPqHC8v1azv9";
var APP_ID = "app_8en54GC0iHmH1ajL";

var crypto = require('crypto');
var pingpp = require('pingpp')(API_KEY);

exports.create = function (req,res,next) 
{
  
  pingpp.parseHeaders(req.headers); // 把从客户端传上来的 Headers 传到这里
  // 设置你的私钥路径，用于请求的签名，对应的公钥请填写到 Ping++ 管理平台
  pingpp.setPrivateKeyPath(__dirname + "/your_rsa_private_key.pem");
  req.setEncoding('utf-8');
  var data = req.body;
  var channel = data.channel;
  var openid = data.openid;
  var amount = data.amount;
  var client_ip = req.connection.remoteAddress;
  var extra = {};
  switch (channel) {
    case 'alipay_wap':
      extra = {
        // success_url 和 cancel_url 在本地测试不要写 localhost ，请写 127.0.0.1。URL 后面不要加自定义参数
        'success_url': 'http://wechat.qiancs.cn',
        'cancel_url': 'http://wechat.qiancs.cn'
      };
      break;
    case 'wx_pub':
      extra = {
        'open_id': openid// 用户在商户微信公众号下的唯一标识，获取方式可参考 wxPubOauth.js
      };
      break;
  }
  var order_no = crypto.createHash('md5')
              .update(new Date().getTime().toString())
              .digest('hex').substr(0, 12);
  pingpp.charges.create({
      order_no:  order_no,// 推荐使用 8-20 位，要求数字或字母，不允许其他字符
      app:       {id: APP_ID},
      channel:   channel,// 支付使用的第三方支付渠道取值，请参考：https://www.pingxx.com/api#api-c-new
      amount:    amount,//订单总金额, 人民币单位：分（如订单总金额为 1 元，此处请填 100）
      client_ip: client_ip,// 发起支付请求客户端的 IP 地址，格式为 IPV4，如: 127.0.0.1
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
