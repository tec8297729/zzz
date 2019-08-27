// guLp组件区域
var gulp = require('gulp'),
  watch = require('gulp-watch'), //监听
  rollup = require('gulp-rollup'), // 集成的rollup
  babel = require('gulp-babel'), // babel编译
  ts = require('gulp-typescript'), // ts编译
  eslint = require('gulp-eslint'), // 语法检查
  strip = require('gulp-strip-comments') // 删除注释
// const changed = require('gulp-changed'); // 监听文件。暂用

const shell = require('shelljs'); // shell脚本
// 并行工具gulp-sequence
// 以下rollup组件
var replace = require('rollup-plugin-replace') // 可在源码中读取环境变量
// 读取TS配置文件,配置编译参数
var tsProject = ts.createProject('./tsconfig.node.json', {
  // 增加配置或覆盖配置某个参数
});
// 处理文件的路径变量
var path = {
  entry: {
    nodeui: './src/nodeui/**/*.ts',
  },
  dist: 'dist',
}

// 开发环境-需要处理编译的
function builddev () {
  // 监听文件
  return watch(path.entry.nodeui, { ignoreInitial: false }, function () {
    gulp.src(path.entry.nodeui)
      // .pipe(babel({
      //   babelrc:false, // 外部.babelrc设置的参数无效
      //   'plugins': [
      //     // 用于编译修饰器--面向切面容器需要编译
      //     ['@babel/plugin-proposal-decorators', { 'legacy': true }],
      //     ['@babel/plugin-proposal-class-properties', { 'loose' : true }],
      //     'transform-es2015-modules-commonjs' // 编译成ES5
      //   ]
      // }))
      .pipe(tsProject())
      .pipe(gulp.dest(path.dist))
  })
}

// 线上环境需要处理的
function buildprod () {

  // 使用shell脚本处理源文件
  // shell.ls(path.entry.nodeui).forEach(function (file) {
  //   shell.sed('-i', /@ioc/, './ioc', file)
  // });
  return gulp.src(path.entry.nodeui)
    // .pipe(changed(path.dist))
    // .pipe(shell.sed('-i','@/ioc', './ioc', 'app.ts'))
    // .pipe(babel({
    //   babelrc:false, // 外部.babelrc设置的参数无效
    //   ignore: ['./src/nodeui/config/*.ts'], // 忽略此文件夹下面的所有js文件
    //   'plugins': [
    //     // 用于编译修饰器--面向切面容器需要编译
    //     ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    //     ['@babel/plugin-proposal-class-properties', { 'loose' : true }],
    //     'transform-es2015-modules-commonjs' // 编译成ES5
    //   ]
    // }))
    .pipe(tsProject())
    // .pipe(strip())
    .pipe(gulp.dest(path.dist))
}

// 清洗node配置文件-rollup
function buildconfig () {
  return gulp.src(path.entry.nodeui) // 要是所有文件夹，不然输出不会显示目录
    .pipe(rollup({
      input: './src/nodeui/config/index.ts', // rollup入口文件
      output: {
        // 产出文件使用umd规范（即兼容 amd cjs 和 iife）
        format: 'cjs', // node只用cjs即可
      },
      plugins: [
        replace({
          // 设置全局环境变量为 线上环境，清理生产环境代码
          'process.env.NODE_ENV': JSON.stringify('production'),
        })
      ]
    }))
    .pipe(tsProject()) // 清除注释
    .pipe(gulp.dest(path.dist))
}

// 代码规范检查
function buildlint () {
  return gulp.src(path.entry.nodeui)
    .pipe(eslint()) // 语法检查
    .pipe(eslint.format()) // 语法错误显示
    .pipe(eslint.failAfterError())
}


let build = gulp.series(builddev) // 默认走开发环境编译
// 判断环境设置不同运行机制
if (process.env.NODE_ENV == 'production') {
  // build = gulp.series(buildprod,buildconfig)
  build = gulp.series(buildprod)
}
if (process.env.NODE_ENV == 'lint') {
  build = gulp.series(buildlint)
}

// 默认任务配置
gulp.task('default', build)

// 实时监听编译
gulp.task('watch', function () {
  // 监听文件
  gulp.watch(path.entry.nodeui, build)
})
