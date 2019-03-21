// import SafeRequest from '../utils/SafeRequest'; // 统一接口请求
import config from '../config/index';
import { IApi } from '../interface/IApi'; // 引入抽象接口文件
import {inject, provide, TAGS} from '../ioc'; // 容器配置文件
import TYPES from '../constant/types'; // 管理常理名称

// 把类名注入到容器
@provide(TAGS.ApiService)
// 具体去实现接口的方法
class IndexMd implements IApi{
  private safeRequest;
  public constructor( // 从容器中取方法
    @inject(TYPES.SafaRequest)SafaRequest
  ){ // 从容器取到了 SafaRequest类，然后赋值给当前变量
    this.safeRequest = SafaRequest;
  }

  public getData(url, options) {
    // 给请求链接加前缀
    // const safeRequest = new SafeRequest();
    return this.safeRequest.fetch(config.baseUrl + url); // 返回请求的数据出来
  }

  public postData(url, options) {
    // const safeRequest = new SafeRequest();
    return this.safeRequest.fetch(url, options); // 返回请求的数据出来
  }
}

// module.exports = IndexMd;
export default IndexMd;
