'use strict';
// Ping++ Server SDK

// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
var API_KEY = "sk_test_rDa1e5env5aPqPqHC8v1azv9"
// app_id 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击你创建的应用->应用首页->应用 ID(App ID)
var APP_ID = "app_8en54GC0iHmH1ajL"

var crypto = require('crypto');
var pingpp = require('pingpp')(API_KEY);

var createPayment = function(channel, amount, client_ip, open_id, cb){
  // 以下 channel 仅为部分需要 extra 参数的示例，详见 https://www.pingxx.com/document/api#api-c-new
  var extra = {};
  switch (channel) {
    case 'alipay_wap':
      extra = {
        // success_url 和 cancel_url 在本地测试不要写 localhost ，请写 127.0.0.1。URL 后面不要加自定义参数
        'success_url': 'http://www.yourdomain.com/success',
        'cancel_url': 'http://www.yourdomain.com/cancel'
      };
      break;
    case 'wx_pub':
      extra = {
        'open_id': open_id// 用户在商户微信公众号下的唯一标识，获取方式可参考 wxPubOauth.js
      };
      break;
  }
  // 商户系统自己生成的订单号。如果是【壹收款】，则使用客户端传上来的 'order_no'。
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
  }, cb);
};


exports.create = function (req,res,next) 
{
  pingpp.parseHeaders(req.headers); // 把从客户端传上来的 Headers 传到这里
  
  // 设置你的私钥路径，用于请求的签名，对应的公钥请填写到 Ping++ 管理平台
  pingpp.setPrivateKeyPath(__dirname + "your_rsa_private_key.pem");

  req.setEncoding('utf-8');

  req.addListener("data", function (chunk) {
    post_data += chunk;
  });
  req.addListener("end", function () {
    var resp = function (ret, http_code) {
      http_code = typeof http_code == "undefined" ? 200 : http_code;
      res.writeHead(http_code, {
        "Content-Type": "application/json;charset=utf-8"
      });
      if (typeof ret != "string") {
        ret = JSON.stringify(ret)
      }
      res.end(ret);
    }
    var client_ip = req.connection.remoteAddress;
    var params;
    try {
        params = JSON.parse(post_data);
    } catch (err) {
        return resp({error:"json_parse_error"});
    }
    var channel = params["channel"].toLocaleLowerCase();
    var amount = params["amount"];
    var open_id = params["open_id"];
    createPayment(channel, amount, client_ip, open_id, function(err, charge) {
        if (charge != null) {
        return resp(charge);
        }
        return resp({error:err.raw});
    });
  });
}