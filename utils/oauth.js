/**
 *
 * Created by my on 9/7/16.
 */
var OAuth = require('wechat-oauth');
var app = require('../config/app_config');
var client = new OAuth(app.appid, app.appsecret);
var oauthApi = new OAuth(app.appid, app.appsecret, function (openid, callback) {
    // 传入一个根据openid获取对应的全局token的方法
    // 在getUser时会通过该方法来获取token
    fs.readFile(openid +':access_token.txt', 'utf8', function (err, txt) {
        if (err) {return callback(err);}
        callback(null, JSON.parse(txt));
    });
}, function (openid, token, callback) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    // 这样才能在cluster模式及多机情况下使用，以下为写入到文件的示例
    // 持久化时请注意，每个openid都对应一个唯一的token!
    fs.writeFile(openid + ':access_token.txt', JSON.stringify(token), callback);
});

var url = client.getAuthorizeURLForWebsite('http://123.206.218.240:3000');
client.getAccessToken('code', function (err, result) {
    var accessToken = result.data.access_token;
    var openid = result.data.openid;
    console.log(accessToken);
    console.log(openid);
});

//client.getUser(openid, function (err, result) {
//    var userInfo = result;
//});


