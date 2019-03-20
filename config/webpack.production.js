// 生产环境配置
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin'); // 多核压缩
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // cs压缩
module.exports = {
  devtool: 'none', // 生产环境nosources-source-map，没有源文件映射cheap-module-source-map
  mode: 'production', // 默认环境，命令直接--mode production
  entry: { // 入口文件
    app: [
      path.resolve(__dirname, '../src/webApp/client.tsx')
    ]
  },
  output: { // 打包输出目录及名称
    filename: '[name].[contenthash:5].js', // 生产环境就contenthash
    path: path.resolve(__dirname, '../dist/assets'),
    chunkFilename: '[name].[contenthash:8].js',
    // libraryTarget: 'commonjs2' // 设置打包规范模式，common2是可以用在nodejs中的
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.ModuleConcatenationPlugin(), // 启动域编译功能，提升作用域
    new webpack.NoEmitOnErrorsPlugin(),
  ],
  optimization: {
    splitChunks: {
      chunks: 'async', // 异步加载代码块
      minSize: 30000, // 30kb
      minChunks: 1,
      maxAsyncRequests: 5, // 最大的异步请求数
      maxInitialRequests: 5, // 最大初始请求数
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        // 公用组件
        commons: {
          test: /[\\/]src[\\/]common[\\/]/,
          name: 'commons',
          minSize: 30000,
          minChunks: 2,
          chunks: 'initial',
          priority: 0,
          reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
        },
        // 单独打包react插件
        'react-vendor': {
          chunks: 'initial', // 'initial', 'async', 'all',
          test: /[\\/]node_modules[\\/]react/, // <- window | mac -> /node_modules/vue/
          name: 'react-vendor',
          minChunks: 1,
          enforce: true,
          priority: -1,
        },
        // 单独打包echarts图表插件
        'echarts-vendor': {
          chunks: 'initial',
          test: /[\\/]node_modules[\\/]echarts/,
          name: 'echarts-vendor',
          minChunks: 1,
          enforce: true,
          priority: -8,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 把node_modules模块分离出来，分离出共享模块
          name: 'vendors',
          minSize: 30000,
          minChunks: 1,
          chunks: 'initial',  // 'initial', 'async', 'all'
          priority: -10 // 该配置项是设置处理的优先级，数值越大越优先处理
        },

      }
    },
    minimizer: [
      // 自定义js优化配置，将会覆盖默认配置
      new UglifyJsPlugin({
        include: /\/src/,
        // exclude: /\/node_modules/,
        exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码，没必要进行二次压缩
        cache: true, // 开启缓存
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: false,
        extractComments: false, // 移除注释
        uglifyOptions: {
          compress: {
            unused: true,
            warnings: false,
            drop_debugger: true
          },
          output: {
            comments: false
          }
        }
      }),
      // 用于优化css文件
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessorOptions: {
          safe: true,
          autoprefixer: {
            disable: true
          }, // 这里是个大坑，稍后会提到
          mergeLonghand: false,
          discardComments: {
            removeAll: true // 移除注释
          }
        },
        canPrint: true
      })
    ],

  }
}
