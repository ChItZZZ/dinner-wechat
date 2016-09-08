var config = require('./config/app_config');
var API = require('wechat-api');
var fs = require('fs');


var api = new API(config.appid, config.appsecret);
/*null
 { accessToken: 'bMawBdyY5idQLeX_-ODTWZVhOd51yIklU3oYPeeLTg_8BmqrmUAEEvszsKGDLconZxHOx6Nwd32W50X7ThzBWzgOCQanOeg4Vwv3xMhN7KU',
 expireTime: 1445244891114 }
 { errcode: 0, errmsg: 'ok' }*/
api.getAccessToken(function (err, token) {
    console.log(err);
    console.log(token);
    fs.writeFile('./token', JSON.stringify(token), function (err) {
    });
});

var menu = JSON.stringify(require('./fixture/wx_menu.json'));
api.createMenu(menu, function (err, result) {
    console.log(result);
});  