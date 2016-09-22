/**
 * Created by Lawliet on 2016/9/22.
 */
'use strict';
const request = require('request');
const qs = require('querystring');
const config = require('../config/app_config');

function getToken(code) {
    var reqUrl = 'https://api.weixin.qq.com/sns/oauth2/access_token?';
    var params = {
        appid: config.appid,
        secret: config.appsecret,
        code: code,
        grant_type: 'authorization_code'
    };

    var options = {
        method: 'get',
        url: reqUrl+qs.stringify(params)
    };
    console.log(options.url);
    return new Promise(function (resolve, reject) {
            request(options, function (err, res, body) {
                if (res) {
                    resolve(body);
                } else {
                    reject(err);
                }
            })
    })
}

module.exports = getToken;