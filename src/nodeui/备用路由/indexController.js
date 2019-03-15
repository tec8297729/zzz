// 这里是indexController.js文件
// import indexMd from '../models/indexMd.js'; // 统一接口fetch封装

// 首页相关路由
class indexController {
  constructor({indexMd}){
    this.indexMd = indexMd;
  }
  // 主页
  actionIndex () {
    return async (ctx, next) => {
      const html = await ctx.render('index.html');
      // console.log(html);
      ctx.body = html;
    };
  }

  // 表格列表请求
  actionTableList () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/table/list' );
      ctx.body = result;
    };
  }
  actionTableHighList () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/table/high/list' );
      ctx.body = result;
    };
  }
  actionOpen_city () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/open_city' );
      ctx.body = result;
    };
  }
  actionCityOpen () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/city/open' );
      ctx.body = result;
    };
  }
  actionOrderList () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/order/list' );
      ctx.body = result;
    };
  }
  actionOrderDetail () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/order/detail' );
      ctx.body = result;
    };
  }
  actionUserList () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/user/list' );
      ctx.body = result;
    };
  }
  actionOrderFinish () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/order/finish_order' );
      ctx.body = result;
    };
  }
  actionOrderEbike_info () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/order/ebike_info' );
      ctx.body = result;
    };
  }
  actionUserAdd () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/user/add' );
      ctx.body = result;
    };
  }
  actionUserEdit () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/user/edit' );
      ctx.body = result;
    };
  }
  actionUserDelete () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/user/delete' );
      ctx.body = result;
    };
  }
  actionMapBikeList () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/map/bike_list' );
      ctx.body = result;
    };
  }
  actionRoleList () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/role/list' );
      ctx.body = result;
    };
  }
  actionRoleCreate () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/role/create' );
      ctx.body = result;
    };
  }
  actionPermissionEdit () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/permission/edit' );
      ctx.body = result;
    };
  }
  actionRoleUserList () {
    return async (ctx, next) => {
      const result = await this.indexMd.getData( '/role/user_list' );
      ctx.body = result;
    };
  }

}

// module.exports = indexController;
export default indexController
