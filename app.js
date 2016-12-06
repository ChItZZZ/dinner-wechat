
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.engine('html',ejs.renderFile);
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
    else  next();
});

//var webpack = require('webpack'),
//    webpackDevMiddleware = require('webpack-dev-middleware'),
//    webpackHotMiddleware = require('webpack-hot-middleware'),
//    webpackDevConfig = require('./webpack.config.js');

//var compiler = webpack(webpackDevConfig);

//app.use(webpackDevMiddleware(compiler, {
//    publicPath: webpackDevConfig.output.publicPath,
//    noInfo: true,
//    stats: {
//        colors: true
//    }
//}));
//app.use(webpackHotMiddleware(compiler));
//
//
//// browsersync is a nice choice when modifying only views (with their css & js)
//var bs = require('browser-sync').create();
//app.listen(3000, function(){
//    bs.init({
//        open: false,
//        ui: false,
//        notify: false,
//        proxy: 'localhost:3000',
//        files: ['./views/**','public/js/home.js'],
//        port: 8080
//    });
//    console.log('App (dev) is going to be running on port 8080 (by browsersync).');
//});


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    console.log("dev mode");
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}
if(app.get('env') === 'production'){
    console.log("prod mode");
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
