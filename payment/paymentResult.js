

exports.handleResult = function (req,res,next) 
{
  req.setEncoding('utf8');
  var data = req.body;
  console.log(data);
  var resp = function (ret, status_code) {
      res.writeHead(status_code, {
        "Content-Type": "text/plain; charset=utf-8"
      });
      res.end(ret);
    }
  switch (data.type) {
        case "charge.succeeded":
            // 开发者在此处加入对支付异步通知的处理代码
            console.log("支付成功");
            return resp("OK", 200);
            break;
        case "refund.succeeded":
            // 开发者在此处加入对退款异步通知的处理代码
            console.log("退款成功");
            return resp("OK", 200);
            break;
        default:
            console.log("支付错误");
            return resp("未知 Event 类型", 400);
            break;
  }
}
