const log4js = require('log4js'); // 打印错误日志
import errorHandler from './middleawares/errorHandler'; // 处理404错误页面

// 配置log4js文件
log4js.configure({
  // 输出源--type:文件(你也可定义xml),filename:输出的文件名
  appenders: {
    cheese: {
      type: 'file',
      filename: './log/cheese.log',
      // 文件最大存储空间，当超过文件容量超出会自动生成一个文件test.log.1的序列自增长的文件
      'maxLogSize': 2097152,
      'backup': 10, // 当文件内容超过文件存储空间时，备份文件的数量（超过10个会删除前面）
    }
  },
  // appenders每个单独源定义一个名称,level:报错标题-可以定义多个
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'error',
      // level: 'warn' // tslint:disable-line
    }
  }
});


const loginit = app => {
  const logger = log4js.getLogger('cheese');

  exports.uselog = ()=> {
    var logger = log4js.getLogger();
    // 监听错误--容错处理
    app.on('error', (err, ctx) => {
      if (err.status == 500) {
        logger.error('500服务器错误:' + ctx);
      }else{
        logger.error(err.status + '--server error:' + ctx);
      }
    });
  }
  // 只会记录error级别以上的错误
  // 中间件容错处理各种状态码
  errorHandler.error(app, logger);
};


// 以下是报错信息内容,不同类型区分
// logger.trace('跟踪信息');
// logger.debug('调试信息');
// logger.info('输出信息');
// logger.warn('警告信息');
// logger.error('错误信息');
// logger.fatal('致命信息');

export { loginit };
