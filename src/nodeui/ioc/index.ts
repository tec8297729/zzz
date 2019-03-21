// 控制反转，容器配置
import { inject, Container } from 'inversify';

// 整合了封装了上面的方法（自己搞就很麻烦了）,还提供了get post等方法
import {
  interfaces,
  InversifyKoaServer,
  TYPE,
  controller,
  httpGet,httpPost
} from 'inversify-koa-utils';
// 整合原插件的bind功能更便捷使用

import {
  provide,
  buildProviderModule,
  fluentProvide
} from 'inversify-binding-decorators';

import TAGS from '../constant/tags'; // 封装常用工具的类名
import Router from 'koa-router';

let provideThrowable = function(identider, name) {
  // fluentProvide流式处理方法，找到指定要的类结束（自己传入的name类名）
  return fluentProvide(identider)
    .whenTargetNamed(name)
    .done();
};

// 导出容器
export {
  Container, // 创建容器
  inject, // 从容器取你想要的类 在constructor中取 @inject(类名称) 变量
  // koa-utils封装整合方法
  InversifyKoaServer, // 封装了启用koa服务的，在app.ts中用
  interfaces, // 抽象接口函数，里面有需要自己去实现Controller路由方法的，这样才可以把路由管控在一个体系下，才能用相关定义路由页面函数
  TYPE, // 类型
  controller, // 用来定义根路由页面路径
  httpGet, // 用来定义路由这个页面是get方法进来的
  httpPost, // post请求方法页面
  // binding插件
  provide, // 用来给每个类定义一个名称，注入到容器内 @provide(类名称)
  buildProviderModule, // 把所有定义好的类名，打包成可以放到inversify容器内，app.ts中用
  // 自己封装的常用工具类 常量名称
  TAGS,
  Router,
  provideThrowable // 用于流式处理找到指定容器需要的类
};
