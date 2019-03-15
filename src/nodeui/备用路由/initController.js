// initController.js初始化路由，并且加载所有路由
// const IndexController = require('./indexController'); //引入首页相关路由控制器
// const Router = require('koa-router'); // 路由中间件

import IndexController from './indexController'; //引入首页相关路由控制器
import Router from 'koa-router'; // 路由中间件

const indexController = new IndexController(); //如果导出没new,就要实例化一次
const router = new Router();

// 挂载所有路由
const init = (app)=>{
  // 挂载路由启用
  app.use(router.routes());
  app.use(router.allowedMethods());

  // router.get('/',indexController.actionIndex());
  router.get('/table/list', indexController.actionTableList());

  // 多数据表格API
  router.get('/table/high/list', indexController.actionTableHighList());

  // 城市开通列表
  router.get('/open_city', indexController.actionOpen_city());
  // 城市开通
  router.get('/city/open', indexController.actionCityOpen());

  // 订单列表
  router.get('/order/list', indexController.actionOrderList());

  // 订单详细
  router.get('/order/detail', indexController.actionOrderDetail());

  // 用户列表
  router.get('/user/list', indexController.actionUserList());

  // 结束订单
  router.get('/order/finish_order', indexController.actionOrderFinish());

  // 结束订单-车辆信息
  router.get('/order/ebike_info', indexController.actionOrderEbike_info());

  // 员工添加
  router.get('/user/add', indexController.actionUserAdd());

  // 用户编辑
  router.get('/user/edit', indexController.actionUserEdit());

  // 用户删除
  router.get('/user/delete', indexController.actionUserDelete());

  // 地图-车辆地图分布
  router.get('/map/bike_list', indexController.actionMapBikeList());

  // 用户有的权限列表
  router.get('/role/list', indexController.actionRoleList());

  // 创建角色
  router.get('/role/create', indexController.actionRoleCreate());

  // 用户权限修改
  router.get('/permission/edit', indexController.actionPermissionEdit());

  // 角色用户列表
  router.get('/role/user_list', indexController.actionRoleUserList());

}


// module.exports = init;
export default init
