import koa from 'koa'
import statics from 'koa-static' // 静态目录中间件
// // 以下非koa组件
import {loginit} from './log4js' // 打印错误日志配置
import bodyParser from 'koa-bodyparser' //解析POST数据请求
// import init from './controllers/initController' // 初始化所有路由
import config from './config' // 配置node文件

// import '@babel/polyfill'; // gulp编译需要
// 引入依赖注入插件
import { Lifetime, createContainer, asClass } from 'awilix'; // 作用域，容器二个组件
import { scopePerRequest, loadControllers } from 'awilix-koa'; // 作用域，读取路由组件

const app = new koa() //koa实例

const container = createContainer(); // 创建一个容器管理所有文件路由--灵魂
// 把所有的services注册到容器
// [需要注入的文件]，{}配置选项
container.loadModules(['models/*.js'],{
  cwd: __dirname,
  // 会把驼峰转换  这样`TodosService`转成`todosService`.
  formatName: 'camelCase', // 把文件导出的类名转换方法使用，相当于new了
  resolverOptions: {
    // 生命周期，作用域
    lifetime: Lifetime.SCOPED, // 设置有作用域，相对优雅不容易错乱
    register: asClass
  }
})
// 把上面设置好的容器传给awilix-koa中去，挂载到use上面
app.use(scopePerRequest(container));



app.use(statics(config.staticDir)) // 静态文件目录
app.use(bodyParser()) //解析POST数据请求
loginit(app); // 记录错误日志

// 容器中封装了路由组件，把路由文件挂载上来
app.use(loadControllers(__dirname + '/controllers/*.js', {
  cwd: __dirname // 指定目录路径
}));

// init(app) // 初始化所有路由(引入app),为后续app.use挂载一些初始化东西使用

// 启用服务
let server = app.listen(config.port, () => {
  console.log(`服务启动成功 http://localhost:${config.port}`)
})

module.exports = {
  app,server
}
