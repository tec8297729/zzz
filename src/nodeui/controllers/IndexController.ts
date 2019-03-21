// 这里是indexController.js文件
// import this.indexMd from '../models/this.indexMd'; // 统一接口fetch封装
import {
  Router,
  TAGS,
  interfaces,
  TYPE,
  httpGet,
  httpPost,
  controller,
  provideThrowable,
  inject
} from '../ioc';

@provideThrowable(TYPE.Controller, 'IndexController')
// 定义一个路由页面 /api
@controller('/')
// 去实现IOC容器上面的interfaces.Controller具体方法（路由接口）
class IndexController implements interfaces.Controller {
  private indexMd; // 定义一个变量接收容器
  // AOP切面
  public constructor(@inject(TAGS.ApiService) ApiService) {
    // DI
    this.indexMd = ApiService; // 接收容器中的
  }

  @httpGet('')
  // 主页
  public async actionIndex(ctx, next) {
    const html = await ctx.render('index.html');
    // console.log(html);
    ctx.body = html;
  }

  @httpGet('table/list')
  // 表格列表请求
  public async actionTableList(ctx, next) {
    const result = await this.indexMd.getData('/table/list');
    ctx.body = result;
  }

  @httpGet('table/high/list')
  public async actionTableHighList(ctx, next) {
    const result = await this.indexMd.getData('/table/high/list');
    ctx.body = result;
  }

  @httpGet('user/list')
  public async actionUserList(ctx, next) {
    const result = await this.indexMd.getData('/user/list');
    ctx.body = result;
  }

  @httpGet('user/add')
  public async actionUserAdd(ctx, next) {
    const result = await this.indexMd.getData('/user/add');
    ctx.body = result;
  }

  @httpGet('user/edit')
  public async actionUserEdit(ctx, next) {
    const result = await this.indexMd.getData('/user/edit');
    ctx.body = result;
  }

  @httpGet('user/delete')
  public async actionUserDelete(ctx, next) {
    const result = await this.indexMd.getData('/user/delete');
    ctx.body = result;
  }

  @httpGet('open_city')
  public async actionOpen_city(ctx, next) {
    // console.log('city接口请求：');
    const result = await this.indexMd.getData('/open_city');
    ctx.body = result;
  }

  @httpGet('city/open')
  public async actionCityOpen(ctx, next) {
    const result = await this.indexMd.getData('/city/open');
    ctx.body = result;
  }

  @httpGet('order/list')
  public async actionOrderList(ctx, next) {
    const result = await this.indexMd.getData('/order/list');
    ctx.body = result;
  }

  @httpGet('order/detail')
  public async actionOrderDetail(ctx, next) {
    const result = await this.indexMd.getData('/order/detail');
    ctx.body = result;
  }

  @httpGet('order/finish_order')
  public async actionOrderFinish(ctx, next) {
    const result = await this.indexMd.getData('/order/finish_order');
    ctx.body = result;
  }

  @httpGet('order/ebike_info')
  public async actionOrderEbike_info(ctx, next) {
    const result = await this.indexMd.getData('/order/ebike_info');
    ctx.body = result;
  }

  @httpGet('role/list')
  public async actionRoleList(ctx, next) {
    const result = await this.indexMd.getData('/role/list');
    ctx.body = result;
  }

  @httpGet('role/create')
  public async actionRoleCreate(ctx, next) {
    const result = await this.indexMd.getData('/role/create');
    ctx.body = result;
  }

  @httpGet('role/user_list')
  public async actionRoleUserList(ctx, next) {
    const result = await this.indexMd.getData('/role/user_list');
    ctx.body = result;
  }

  @httpGet('permission/edit')
  public async actionPermissionEdit(ctx, next) {
    const result = await this.indexMd.getData('/permission/edit');
    ctx.body = result;
  }

  @httpGet('map/bike_list')
  public async actionMapBikeList(ctx, next) {
    const result = await this.indexMd.getData('/map/bike_list');
    ctx.body = result;
  }
}

// module.exports = indexController;
export default IndexController;
