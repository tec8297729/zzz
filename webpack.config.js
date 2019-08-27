const webpack = require('webpack');
const path = require('path');
const os = require('os');
const merge = require('webpack-merge'); // 合并webpack配置插件
const argv = require('yargs-parser')(process.argv.slice(2)); // 可以解析参数成对象，也可以读取到webpack系统变量
const _mode = argv.mode || 'development'; // 通过argv插件读取webpack环境变量，默认开发环境
const _mergeConfig = require(`./config/webpack.${_mode}.js`); // 加载适合环境的配置
const _modeflag = (_mode == 'production' ? true : false); // 判断是否线上环境，用于配置参数

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成解析html页面
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 引入分离打包CSS
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const HappyPack = require('happypack');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin') ; // 多核压缩
const tsImportPluginFactory = require('ts-import-plugin'); // 抽离antd没用到的css
// const { CheckerPlugin } = require('awesome-typescript-loader'); // 缓存编译ts

const { GenerateSW } = require('workbox-webpack-plugin'); // PWA插件
const CopyWebpackPlugin = require('copy-webpack-plugin'); // 复制目录插件
const CompressionPlugin = require('compression-webpack-plugin'); // gzip压缩文件，打包出一份.gz文件，nginx开启gzip加载速度提升
// 转换目录函数
function resolve (relatedPath) {
  return path.resolve(__dirname, relatedPath);
}

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

// 配置webpack选项
let config = {
  // entry: { // 入口文件
  //   app: [resolve('./app/client')]
  // },
  module: {
    rules: [
      /* 解析css,并不生成CSS */
      {
        test: /\.(c|le)ss?$/,
        include: [ // 只编译指定文件夹下的
          resolve('./src/'),
          resolve('./node_modules/antd'),
          resolve('./node_modules/draft-js'),
          resolve('./node_modules/react-draft-wysiwyg/dist/'),
        ],
        use: [
          !_modeflag ? 'style-loader' : MiniCssExtractPlugin.loader,
          'happypack/loader?id=css'
        ],
      },
      // tsx文件解析使用ts-loader
      {
        test: /\.t(s|sx)?$/,
        include: [
          resolve('src/'),
          // resolve('./node_modules/antd'),
          // resolve('./node_modules/draft-js'),
          // resolve('./node_modules/react-draft-wysiwyg/dist/'),
          // resolve('./node_modules/echarts'),
        ], // 只编译指定文件夹下的
        use: [
          // 'cache-loader',
          {
            loader: 'ts-loader',
            options: {
              getCustomTransformers: () => ({
                before: [tsImportPluginFactory({
                  libraryName: 'antd',
                  libraryDirectory: 'lib',
                  style: true
                })]
              }),
              transpileOnly: true
            },
          },
        ],
      },
      // 把js错误映射到TS源文件中去
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      // js相关文件,备用
      {
        test: /\.(js|jsx|mjs)?$/,
        exclude: /node_modules/, // 排除目录
        include: resolve('./src'), // 指定编译目录
        use: 'happypack/loader?id=js',
      },

      /* 解析图片-放到指定img路径 */
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        include: [
          resolve('./src'),
          // resolve('./node_modules/antd'),
        ],
        options: {
          limit: 8192, // 小于8KB都会转换成base64代码
          name: 'img/[name].[ext]' // [path]原路径存放
        }
      },
      /* 字体文件加载器-放到指定路径 */
      {
        test: /\.(woff|eot|ttf)$/,
        loader: 'url-loader',
        exclude: /node_modules/,
        include: [resolve('./src')],
        options: {
          limit: 8192,
          name: 'font/[name].[ext]'
        }
      },
    ]
  },
  watch: !_modeflag, // 监听文件变化，如有变动实时编译
  plugins: [
    // 处理moment插件被全量打包，按需打包功能
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

    // 复制共用模板及不需要编译的JS文件
    new CopyWebpackPlugin([
      // 复制文件到指定目录去，可多个
      {
        from: path.resolve(__dirname, './src/webApp/public'),
        // 移动到assets下面，由output.path决定的
        to: path.join('./'),
        cache: true, // 缓存
        // transform (content, path) {
        //   // 压缩、html hint
        //   return Promise.resolve(optimize(content))
        // },
      },
    ]),
    // 文件gzip压缩
    new CompressionPlugin({
      // cache: true, // 启用缓存
      algorithm: 'gzip',
      threshold: 10240, // 大于此文件大写的才进行处理
      minRatio: 0.8 // 压缩比例，默认0.8
    }),

    // 生成HTML插件，指定HTML模板文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/webApp/index.template.html'), // html模板文件路径
      // filename: `index.html`, //生成文件的路径
      inject: true, // 当为true时，会把js自动插入到底部
      // runtime是webpack要跑的核心包文件
      // chunks: ["runtime", "commons"], //需要引入的JS模块文件
      minify: { //压缩HTML文件
        removeComments: _modeflag, //移除HTML中的注释
        collapseWhitespace: _modeflag, //删除空白符与换行符
        removeAttributeQuotes: true, //去除属性引用
        minifyJS: true,
        minifyCSS: true,
      },
      chunksSortMode: 'dependency',
    }),
    // 压缩css
    // new OptimizeCssAssetsPlugin({
    //   // 一个正则表达式，指示应优化/最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
    //   assetNameRegExp: /\.css$/g,
    //   cssProcessor: require('cssnano'), // 用于优化\最小化CSS的CSS处理器，默认为cssnano
    //   //传递给cssProcessor的选项，默认为{}
    //   cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
    //   canPrint: true // 一个布尔值，指示插件是否可以将消息打印到控制台，默认为true
    // }),

    // 输出CSS文件
    new MiniCssExtractPlugin({
      filename: _modeflag ? 'css/[name].[contenthash:5].css' : 'css/[name].css',
      chunkFilename: _modeflag ? 'css/[name].[contenthash:5].css' : 'css/[name].css'
    }),
    // 启用PWA服务
    new GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true, // 强制跳过生命周期
      // include: [/\.html$/, /\.js$/, /\.css$/], // 只缓存js和html
      // 排除图片不缓存
      // exclude: [/\.(?:png|jpg|jpeg|svg)$/],
      // maximumFileSizeToCacheInBytes: 4 * 1024 * 1024, // 缓存大小空间4mb
      // 通过传入urlPatterns、handlers和可用的一些options，在生成的service worker中去添加适当的代码来处理运行时的缓存。

      // 里面可以配置多个{}，写不同后缀文件缓存不同配置
      runtimeCaching: [{
        // urlPattern: '/api/', // 可以使用正则new RegExp('^https://cors\.example\.com/')
        urlPattern: /.*\.js/, // 匹配文件，也可以匹配网络地址

        // handler应用网络优先策略。
        /* 
          staleWhileRevalidate 请求的路由有对应的 cache 缓存就直接返回，同时在后台再次发起请求并更新 Cache
          networkFirst 请求后，首先尝试拿到网路请求的返回结果，请求到就直接返回并且更新 cache，否则返回缓存中的内容
          cacheFirst 请求后，直接从 Cache 中取得结果，没有的话在发起网络请求
          networkOnly 强制使用网络请求
          cacheOnly 强制使用 Cache 资源
        */
        handler: 'NetworkFirst',

        options: {
          networkTimeoutSeconds: 10, // 超过10s使用缓存做为回退方案。
          cacheName: 'my-api-cache', // 为此路由指定自定义缓存名称。
          // 配置自定义缓存过期。
          // expiration: {
          //   maxEntries: 100, // 缓存条数限制（超过会删除最旧的一条）
          //   maxAgeSeconds: 24 * 60 * 60, // 缓存时间（秒） 24小时
          // },
          // 配置background sync.
          // backgroundSync: {
          //   name: 'my-queue-name',
          //   options: {
          //     maxRetentionTime: 60 * 60,
          //   },
          // },
          // 配置哪些response是可缓存的。
          cacheableResponse: {
            statuses: [0, 200],
            // headers: {'x-test': 'true'},
          },
          // 配置广播缓存更新插件。
          // broadcastUpdate: {
          //   channelName: 'my-update-channel',
          // },
          // // 添加您需要的任何其他逻辑插件。
          // plugins: [
          //   {cacheDidUpdate: () => /* 自定义插件代码 */}
          // ],
          // // matchOptions 和 fetchOptions 用于配置 handler.
          // fetchOptions: {
          //   mode: 'no-cors',
          // },
          // matchOptions: {
          //   ignoreSearch: true,
          // },
        }
      }],

      // navigateFallback: '/app-shell', // 预先缓存单页应用
      // // // 指定部份URL以外的才缓存，以`/_`开头或包含`admin`的URL，加入黑名单，优先级最高
      // navigateFallbackBlacklist: [/^\/_/, /admin/],
      // // // 以`/pages`开头的URL加入白名单, 优先级没上面的高
      // navigateFallbackWhitelist: [/^\/pages/],
      // directoryIndex: 'index.html', // 当url路由没有匹配到时，自动添加后缀
      // navigationPreload: true, // 是否启用预加载，需要配合runtimeCaching使用
      // modifyURLPrefix: {'/dist': ''}, // 从网址中删除dist前缀
    }),

    new HappyPack({
      id: 'js',
      threadPool: happyThreadPool,
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            plugins: [],
            compact: true,
          }
        },
      ],
    }),
    new HappyPack({
      id: 'css',
      threadPool: happyThreadPool,
      loaders: [
        // 'cache-loader',
        'css-loader',
        'postcss-loader',
        {
          loader: 'less-loader', // compiles Less to CSS
          options: {
            modifyVars: {
              // 修改css主题颜色，其它参数antd官网可看
              // '@primary-color': '#1DA57A',
              // 'link-color': '#1DA57A',
              // 'border-radius-base': '2px',
            },
            javascriptEnabled: true,
          },
        },
      ],
    }),
  ],
  resolve: {
    // 别名
    alias: {
      // 给目录创建别名,以后在使用直接写'util/文件名.js'，而不用繁锁的../..写路径了
      '@': path.resolve(__dirname),
      '@constant': path.resolve(__dirname, 'src/webApp/constant'),
      '@components': path.resolve(__dirname, 'src/webApp/components'),
      '@views': path.resolve(__dirname, 'src/webApp/views'),
      '@style': path.resolve(__dirname, 'src/webApp/style'),
      '@routes': path.resolve(__dirname, 'src/webApp/routes'),
      '@reduxConfig': path.resolve(__dirname, 'src/webApp/reduxConfig'),
      '@utils': path.resolve(__dirname, 'src/webApp/utils'),
    },
    // 指定文件后缀名，这样导入模块文件就不用写后续，从左至右顺序读取
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    // 配置webpack去哪些目录下寻找第三方模块。默认是去node_modules目录下寻找，提升性能
    modules: ['src', 'node_modules'],
  },
  // 配置优化选项，从4版本中默认配置好了一些参数的
  optimization: {
    // 把公用JS文件分组
    // splitChunks: {
    //   cacheGroups:{
    //     // 创建不同分组的名称，配置不同的规则
    //     commons: {
    //       chunks: 'initial', // 默认都抽取出来,只对入口文件处理
    //       name: 'commons', // 生成的文件名称,html引入组件就引此名称
    //       minChunks: 3, // 最少引用几次就打包到此文件内
    //       priority: 10,  //优先级，一个chunk很可能满足多个缓存组，会被抽取到优先级高的缓存组中
    //       enforce: true  // 如果cacheGroup中没有设置minSize，则据此判断是否使用上层的minSize，true：则使用0，false：使用上层minSize
    //     },
    //     // 提取公用CSS文件
    //     styles: {
    //       name: 'styles',
    //       test: /\.css$/,
    //       chunks: 'all',
    //       enforce: true
    //     }
    //   },
    // },
    // 单独把runtime核心包提取成一个单独文件，放入页面（webpack运行时核心文件）
    // runtimeChunk: {
    //   name: 'runtime'
    // },
    // nodeEnv: 'production', // 移除无用的框架的代码的警告
    // 多核压缩
    // minimizer: [
    //   new UglifyJsPlugin({
    //     test: /\.(js|ts|tsx)(\?.*)?$/i,
    //     include: /\/src/,
    //     exclude: /\/node_modules/,
    //     extractComments: 'all', // 提取注释
    //     cache: true, // 开启缓存
    //     parallel: true, // 多线程数量
    //   })
    // ],
  },
  // 关闭第三方css提取会有大量无效信息输出
  stats: {
    entrypoints: false,
    children: false
  },
};

module.exports = merge(_mergeConfig, config); // 合并配置文件输出
