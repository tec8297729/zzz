// const path = require('path'); // 路径组件
// const _ = require('lodash'); // 模块化JS组件包-函数式编程
import path from 'path';  // 路径组件
import extend from 'lodash/extend'; // 模块化JS组件包-函数式编程

// 接口定义
interface Iconfig{
  staticDir: string;
  port?: number;
  baseUrl?: string;
}
let config:Iconfig = {
  // 'viewDir' : path.join(__dirname, '../views'), // 模板文件目录
  staticDir: path.join(__dirname, '../assets') // 静态资源目录
};

// 正式上线环境变量
if (process.env.NODE_ENV == 'production') {
  const prodConfig = {
    baseUrl: 'https://www.easy-mock.com/mock/5c822903e2062b28ed86bda7/mockapi',
    port: 3000
  };
  config = extend(config, prodConfig);
}else{
  // 开发环境
  const localConfig = {
    baseUrl: 'https://www.easy-mock.com/mock/5c822903e2062b28ed86bda7/mockapi',
    port: 8888
  };
  config = extend(config, localConfig); // 合并
}

// 上面也可以使用new Map()实现,通过set get方法设置与获取...
// module.exports = config;
export default config;
