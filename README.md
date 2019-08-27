# zzq技术方案整合研究中心
子分支代码最新测试区域，主分支稳定版本

nodeui 是node层，主做接口分离，另外附带非TS版本的，但主更新node TS版本区域的
webApp业务层

技术整合更新、优化等等会相对不定期加入新的，就不一一举例


启用项目流程：
1、npm run dev:build 构造打包node层监听实时编译（gulp编译），更改node代码实时更新服务
2、npm run dev:server 启用node服务
3、npm run dev:client 启动react项目（webpack4编译）

接入的是本地node，所以先要启动node服务，在去启用webpack。