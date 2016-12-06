// Ping++ Server SDK

var env = require('../app');
// api_key 获取方式：登录 [Dashboard](https://dashboard.pingxx.com)->点击管理平台右上角公司名称->开发信息-> Secret Key
//var API_KEY = "sk_test_ibbTe5jLGCi5rzfH4OqPW9KC"
// 设置 api_key
var pingpp = env.pingpp;

// 通过发起一次退款请求创建一个新的 refund 对象，只能对已经发生交易并且没有全额退款的 charge 对象发起退款
pingpp.charges.createRefund(
  "ch_bLWP80Ci9S4ODaXLSKLOGe5S",
  // amount 为退款的金额, 单位为对应币种的最小货币单位，例如：人民币为分（如退款金额为 1 元，此处请填 100）。必须小于等于可退款金额，默认为全额退款
  { amount: 1, description: "Refund Description" },
  function(err, refund) {
    // YOUR CODE
  }
);
