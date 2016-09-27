/**
 *
 * Created by my on 9/27/16.
 */
var webpack = require('webpack');
var path = require('path');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

var devConfig = {
    entry: {
        Main: ['./public/js/home.js', hotMiddlewareScript]
        //ListMenu: ['./public/component/Main.js', hotMiddlewareScript]
    },
    output: {
        filename: './build/[name].js',
        path: path.resolve('./public'),
        publicPath: publicPath
    },
    devtool: 'source-map',
    module: {
        loaders: [{
            test: /\.(png|jpg)$/,
            //loader: 'url?limit=8192&context=client&name=[path][name].[ext]'
            loader: 'url?limit=8192&name=[path][name].[ext]'
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/,
            // babel6 才需要配置这个，presets里面两个预编译插件，前一个用于编译es6，后一个用于编译react。按需配置。这个工程都需要。
            query: {
                presets: ['react', 'es2015']
            }
        }]
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    externals: {    // 指定采用外部 CDN 依赖的资源，不被webpack打包
        "react": "React",
        "react-dom": "ReactDOM"
    }
};

module.exports = devConfig;
