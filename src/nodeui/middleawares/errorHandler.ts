// 事件错误处理句柄
const errorHandler = {
  error(app, logger) {
    app.use(async (ctx, next) => {
      // 最先走的,尝试的先往下走
      try {
        await next();
      } catch (err) {
        logger.error(err);
        // console.log(err); // 测试查看用
        console.log('容错层500')
        // 下看看公司需求显示页面
        ctx.status = err.status || 500; // 先读取报错状态,如果没就500
        // ctx.body = await ctx.render('books/pages/error'); // 显示页面
        ctx.body = '容错页面(需求自定义SEO页面)'; // 显示页面
      }
    })
    app.use(async (ctx, next) => {
      await next(); // 正常往下走,如果找不到页面才往回路走下面代码
      try{
        if (404 != ctx.status) {
          return; // 不是404状态退出这块区域,进入上一层
        }
        // 根据实际业务设置状态码,SEO优化权重
        // ctx.status = 404; // 可以设置200
        ctx.status = 200;
        ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="/" homePageName="返回主页"></script>';
      } catch(err) {
        logger.error(err);
      }
    })
  }
}

export default errorHandler
