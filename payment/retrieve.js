// Ping++ Server SDK

var env = require('../app');
// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
//var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC"
// 设置 api_key
var pingpp = env.pingpp;

pingpp.charges.retrieve(
  "ch_bLWP80Ci9S4ODaXLSKLOGe5S",// 通过 Charge 对象的 id 查询一个已创建的 Charge 对象
  function(err, charge) {
    // YOUR CODE
  }
);
