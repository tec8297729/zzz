import koa from 'koa';
import statics from 'koa-static'; // 静态目录中间件
// // 以下非koa组件
import { loginit } from './log4js'; // 打印错误日志配置
import bodyParser from 'koa-bodyparser'; // 解析POST数据请求
import config from './config'; // 配置node文件

import 'reflect-metadata'; // inversify需要使用的插件
import { Container, buildProviderModule, InversifyKoaServer } from './ioc'; // 容器配置文件
import './ioc/loader'; // 容器配置文件，把所有路由放进去
// IOC控制反转
const container = new Container(); // 创建了一个容器
// 把所有的类给build进来容器中
container.load( buildProviderModule() )
// 创建一个koa服务，并且把容器放入来
let server = new InversifyKoaServer(container);

server.setConfig(app=>{
  // 设置koa中间件的，如404,500
  app.use(statics(config.staticDir)); // 静态文件目录
  app.use(bodyParser()); // 解析POST数据请求
  loginit(app); // 记录错误日志
})
.setErrorConfig(app=>{
  // 当出错的时候
  console.log(app);
})

let app = server.build(); // 服务koa服务


// 启用服务
let oldServer = app.listen(3000, () => {
  console.log(`服务启动成功 http://localhost:${config.port}`);
});

export {
  app,
  oldServer
};
