module.exports = {
  // 配置文件
  plugins: {
    // 需要安装postcss-preset-env，在此插件官网看相关配置需求
    'postcss-preset-env': {
      stage: 0, // 编译不同阶段，类似babel编译阶段
      features: {
        'nesting-rules': true // 是否嵌套规则
      }
    },
    // 配置cssnano（需要安装），相关参数看此插件官网
    // 'cssnano': {}
  }
}

