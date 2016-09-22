var express = require('express');
var router = express.Router();
const getToken = require('../websdk/getWebToken');
const getUserInfo = require('../websdk/getWebUserInfo');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/userInfoTest', function (req, res) {
  getToken(req.query.code)
      .then(function (data) {
        return JSON.parse(data);
      })
      .then(function (data) {
        getUserInfo(data['access_token'], data['openid']).then(function _(){
          res.render('userInfoTest.html', {userinfo: _});
        })
      });
});

module.exports = router;
