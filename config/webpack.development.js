// 开发环境配置
// const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const path = require('path');
// 基础检测环境体验
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'); // 友好提示
const ProgressBarPlugin = require('progress-bar-webpack-plugin'); // 显示打包进度条
const DashboardPlugin = require('webpack-dashboard/plugin'); // 增强了 webpack 的输出

module.exports = {
  devtool: 'eval', // 生成map捕获错误映射到源文件source-map eval
  mode: 'development',
  entry:{
    app: [
      'react-hot-loader/patch',
      path.join(__dirname, '../src/webApp/client.tsx')
    ]
  },
  output: { // 打包输出目录及名称
    filename: '[name].bundle.js', // 生产环境就不用hash了
    path: path.join(__dirname, '../dist/public'),
    // publicPath: '/public', // 打包后文件前缀
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'), //默认会以根文件夹提供本地服务器，这里指定文件夹
    historyApiFallback: true, //在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    publicPath: '/',
    compress: true,
    port: 8888, //如果省略，默认8080
    hot: true, // 开启热模块替换
    overlay: {
      // 只显示错误信息，wran警告不显示
      errors: true
    },
    // 把当前客户端api请求的，代理转发到指定服务器上
    // proxy: {
    //   '/api': 'http://localhost:3333'
    // }
    // 用来关闭提示Entrypoint mini-css-extract-plugin = *
    stats: {// 使用了第三方css组件，局部加载会大量提示在窗口内
      children: false,
    },
  },
  plugins: [
    new ProgressBarPlugin(), // 显示打包进度条
    new webpack.HotModuleReplacementPlugin(), // 开启热更新
    new FriendlyErrorsWebpackPlugin(), // 友好提示错误
    new DashboardPlugin(), // 深度分析打包后的文件
  ]
}
