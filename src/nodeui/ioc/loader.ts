// 利用shelljs 或是写脚本一键生成所有文件
// 这里是容器内的所有可用文件
// 所有自己实现了接口的文件加载进来。。。

// 路由页面
import '../controllers/IndexController';

// 公用方法请求接口在次封装页面
import '../models/IndexMd';

// 公用方法
import '../utils/SafeRequest';
