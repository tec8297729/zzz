import {applyMiddleware, createStore, compose} from 'redux'; // 引入核心容器组件
import thunkMiddleware from 'redux-thunk'; // 处理异步的请求
import { composeWithDevTools } from 'redux-devtools-extension'; // 集成扩展插件,替代原来的compose组件功能,也是调试插件
import loggerMiddleware from '../middleware/logger'; // 记录调度操作和生成的新状态的中间件。
// import monitorReducerEnhancer from '../enhancers/monitorReducer';// 一个增强器，记录减速器处理每个动作所用的时间。
import rootReducer from '../reducers/index'; // 这是每个reducer,可以配置多个

export default function configureStore(preloadedState?:any) {

  // 利用applyMiddleware功能创建一个容器的增强器, 它将应用二者之间的调度功能
  // 就如笔记图中所示增加了一个 Middleware层,logger是自定义中间件(如异步请求)
  // const middlewares = [loggerMiddleware, thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(thunkMiddleware); // 你也可以手动传入a1,a2,a3...

  // 接着把上面的增强器和另一个自定义的增强器 组合成一个函数(注入容器只能一个增强器,所以要合并)
  // 增强器可以不需要的，看需求
  // const enhancers = [middlewareEnhancer, monitorReducerEnhancer];
  const composedEnhancers = composeWithDevTools(middlewareEnhancer); // 之前compose合并

  // 我们将这个新composedEnhancers函数createStore作为第三个参数传递给它。
  // 注意：我们将忽略的第二个参数允许您将状态预加载到容器中。
  const store = createStore(rootReducer, preloadedState, composedEnhancers);// 创建容器,把reducer返回一个store的对象

  // 仅在开发环境使用,并且有热加载模块时
  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   // 重新加载哪个模块(观察模块),当更改数据时传递rootReducer给store的方法
  //   module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
  // }

  return store;
}
