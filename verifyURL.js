var PORT = 3000; //监听80端口号

var http = require('http');

var qs = require('qs');

var TOKEN = 'nicky'; //必须与测试号所填写的Token相同

function checkSignature(params, token) {

    var key = [token, params.timestamp, params.nonce].sort().join('');

    //将token (自己设置的) 、timestamp(时间戳)、nonce(随机数)三个参数进行字典排序

    var sha1 = require('crypto').createHash('sha1');

    //将上面三个字符串拼接成一个字符串再进行sha1加密

    sha1.update(key);

    return sha1.digest('hex') == params.signature;

    //将加密后的字符串与signature进行对比，若成功，返回echostr

}

var server = http.createServer(function(request, response) {

    var query = require('url').parse(request.url).query;

    var params = qs.parse(query);

    console.log(params);

    console.log("token :", TOKEN);

    if (!checkSignature(params, TOKEN)) {

        //如果签名不对，结束请求并返回

        response.end('signature fail');

    }

    if (request.method == "GET") {

        //如果请求是GET，返回echostr用于通过服务器有效校验

        response.end(params.echostr);

    } else {

        //否则是微信给开发者服务器的POST请求

        var postdata = '';

        request.addListener("data", function(postchunk) {

            postdata += postchunk;

        });

        //获取到了POST数据

        request.addListener("end", function() {

            console.log(postdata);

            response.end('success ');

        });

    }

});

server.listen(PORT, function() {

    console.log('Server running at port:' + PORT);

});
