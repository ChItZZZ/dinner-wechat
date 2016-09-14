var path = require('path');

module.exports = {
  entry: {
    'index': './public/component/Main.js' //key只是个名字，可以自由改
  },
  output: {
    path: './build',
    filename: 'entry.js',//也可以动态生成文件名 filename:'[name].js',将根据entry中的key生成名字
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      // babel6 才需要配置这个，presets里面两个预编译插件，前一个用于编译es6，后一个用于编译react。按需配置。这个工程都需要。
      query:{
        presets: ['react']
      }
    }]
  }
};
