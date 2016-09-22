/**
 * Created by Lawliet on 2016/9/22.
 */
'use strict';
const request = require('request');
const qs = require('querystring');

function getUserInfo(AccessToken, openId) {
    var reqUrl = 'https://api.weixin.qq.com/sns/userinfo?';
    var params = {
        access_token: AccessToken,
        openid: openId,
        lang: 'zh_CN'
    };

    var options = {
        method: 'get',
        url: reqUrl+qs.stringify(params)
    };

    return new Promise(function (resolve, reject) {
            request(options, function (err, res, body) {
                if (res) {
                    resolve(body);
                } else {
                    reject(err);
                }
            });
    })
}

module.exports = getUserInfo;