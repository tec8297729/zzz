// 这里是indexController.js文件
import indexMd from '../models/indexMd'; // 统一接口fetch封装
import {
  GET,
  route,
  POST
} from 'awilix-koa'; // 把所有路由注入的容器方法加载

@route("/") // 顶层根路由页面，这是修饰器
// 首页相关路由
class indexController {
  constructor() {}

  @GET()
  // 主页
  async actionIndex(ctx, next) {
    const html = await ctx.render('index.html');
    // console.log(html);
    ctx.body = html;
  }

  @route("table/list")
  @GET()
  // 表格列表请求
  async actionTableList(ctx, next) {
    const result = await indexMd.getData('/table/list');
    ctx.body = result;
  }

  @route("table/high/list")
  @GET()
  async actionTableHighList(ctx, next) {
    const result = await indexMd.getData('/table/high/list');
    ctx.body = result;
  }

  @route("user/list")
  @GET()
  async actionUserList(ctx, next) {
    const result = await indexMd.getData('/user/list');
    ctx.body = result;
  }

  @route("user/add")
  @GET()
  async actionUserAdd(ctx, next) {
    const result = await indexMd.getData('/user/add');
    ctx.body = result;
  }

  @route("user/edit")
  @GET()
  async actionUserEdit(ctx, next) {
    const result = await indexMd.getData('/user/edit');
    ctx.body = result;
  }

  @route("user/delete")
  @GET()
  async actionUserDelete(ctx, next) {
    const result = await indexMd.getData('/user/delete');
    ctx.body = result;
  }

  @route("open_city")
  @GET()
  async actionOpen_city(ctx, next) {
    const result = await indexMd.getData('/open_city');
    ctx.body = result;
  }

  @route("city/open")
  @GET()
  async actionCityOpen(ctx, next) {
    const result = await indexMd.getData('/city/open');
    ctx.body = result;
  }

  @route("order/list")
  @GET()
  async actionOrderList(ctx, next) {
    const result = await indexMd.getData('/order/list');
    ctx.body = result;
  }

  @route("order/detail")
  @GET()
  async actionOrderDetail(ctx, next) {
    const result = await indexMd.getData('/order/detail');
    ctx.body = result;
  }


  @route("order/finish_order")
  @GET()
  async actionOrderFinish(ctx, next) {
    const result = await indexMd.getData('/order/finish_order');
    ctx.body = result;
  }

  @route("order/ebike_info")
  @GET()
  async actionOrderEbike_info(ctx, next) {
    const result = await indexMd.getData('/order/ebike_info');
    ctx.body = result;
  }

  @route("role/list")
  @GET()
  async actionRoleList(ctx, next) {
    const result = await indexMd.getData('/role/list');
    ctx.body = result;
  }

  @route("role/create")
  @GET()
  async actionRoleCreate(ctx, next) {
    const result = await indexMd.getData('/role/create');
    ctx.body = result;
  }

  @route("role/user_list")
  @GET()
  async actionRoleUserList(ctx, next) {
    const result = await indexMd.getData('/role/user_list');
    ctx.body = result;
  }

  @route("permission/edit")
  @GET()
  async actionPermissionEdit(ctx, next) {
    const result = await indexMd.getData('/permission/edit');
    ctx.body = result;
  }

  @route("map/bike_list")
  @GET()
  async actionMapBikeList(ctx, next) {
    const result = await indexMd.getData('/map/bike_list');
    ctx.body = result;
  }
}

// module.exports = indexController;
export default indexController
