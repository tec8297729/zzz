D:\myphp_www\PHPTutorial\WWW\项目测试\共享单车后台管理系统
├─src
|  ├─webApp
|  |   ├─client.tsx # 前端（客户端）入口启动文件
|  |   ├─index.template.html # 页面的模板
|  |   ├─views #这个文件夹就是前端显示页面，拼接每个业务组件
|  |   ├─utils # 前端共用工具库
|  |   |   ├─SafeRequest.js
|  |   |   └utils.tsx
|  |   ├─style # 共用的css文件夹（因为组件antd是使用less，用css会冲突）
|  |   |   ├─common.less
|  |   |   ├─default.less
|  |   |   ├─loading.less
|  |   |   └reset.css
|  |   ├─routes # 前端路由配置文件夹
|  |   ├─reduxConfig # redux生态文件夹，
|  |   ├─public # 静态资源目录，项目打包时候会移动到服务器静态目录中去
|  |   ├─constant # 常量文件夹
|  |   ├─config # 左菜单的配置文件夹，本地项目，默认是从服务器后台读取（忽略）
|  |   ├─components # 业务封装组件文件夹
|  ├─nodeui
|  |   ├─app.js # 服务端入口文件
|  |   ├─log4js.js # 捕获服务器bug打印日志配置文件
|  |   ├─mochaRunner.js # 所有单测文件运行的入口
|  |   ├─utils # 请求接口底层封装，共用工具库
|  |   |   └SafeRequest.js
|  |   ├─test # 单测文件夹
|  |   ├─models # 请求接口封装
|  |   |   └IndexMd.js
|  |   ├─middleawares # 路由容错层层
|  |   |      └errorHandler.js
|  |   ├─controllers # node路由
|  |   ├─config # 服务端node的共用参数
|  |   ├─assets # 服务端静态目录
├─logs # 服务端捕获bug日志存放的文件夹
├─docs #用来存放 单测 生成的HTML文件，给老板看
├─config # 这是webpack配置文件夹
|   ├─webpack.development.js
|   └webpack.production.js
├─.travis # 自动测试化CI平台
|    └ssh_config
├─.babelrc
├─.eslintrc.js
├─.gitignore
├─.prettierrc
├─.travis.yml
├─gulpfile.js
├─package-lock.json
├─package.json
├─pm2.json
├─postcss.config.js
├─tsconfig.json
├─tslint.json
├─webpack.config.js
