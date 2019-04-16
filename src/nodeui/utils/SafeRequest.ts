// 接口统一调用此方法为入口,封装fetch,为了更好的容错处理
// const fetch = require('node-fetch'); // 请求接口组件
import fetch from 'node-fetch'; // 请求接口组件
import { provide } from '../ioc'; // 容器配置文件
import TYPES from '../constant/types'; // 统一常量文件
import { ISafeRequest } from '../interface/ISafeRequest'; // 引入接口文件

// 给这个类 取了一个名称，注入到容器内
@provide(TYPES.SafaRequest)
class SafeRequest implements ISafeRequest {
  // public constructor(url, options) {
  //   this.url = url;
  //   this.options = options;
  // }
  // 统一使用此接口,进行容错处理
  public async fetch(url: string,arg?: Object,callback?: Function): Promise<Object> {
    // 返回一个异步对象
    // eslint-disable-next-line no-undef
    return new Promise((resolve, reject) => {
      // 返回请求状态码信息
      let result = {
        code: 0,
        message: '',
        data: []
      };
      fetch(url, arg)
        .then(res => {
          // console.log('node端')
          try {
            // console.log(this.url); // 测试链接
            return res.json(); // 正常接收返回给下一层.then使用
          } catch (error) {
            result.code = 1;
            result.message = '解析JSON失败';
            reject(error);
          }
        })
        // let ydfetch = fetch(this.url);
        // // 如果有参数传入,进行拼装
        // if (options.body) {
        //   ydfetch = fetch(this.url, {
        //     method: options.method,
        //     headers: options.headers,
        //     body: options.body
        //   });
        // }
        // ydfetch
        // .then(res => res.json())
        .then(json => {
          // if(body.code == 200){ // 还可以在判断后端数据状态
          console.log('到了返回层')
          resolve(json); // 返回请求后的数据体
          // }
        })
        .catch(error => {
          console.log('到了错误层')
          result.code = 2;
          result.message = 'node-fetch请求失败,后端报警-请求挂了';
          result.data = error;
          // 中间可以处理 自动发送email,或打电话短信等
          reject(result); // 返回一个错误,以免用户感知
        });
    });
  }
}

// module.exports = SafeRequest;
export default SafeRequest;
