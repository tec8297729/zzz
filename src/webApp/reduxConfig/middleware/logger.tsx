// Middleware层扩展, 比如有API需要异步请求数据,最终会在configureStore整合一个层面
// 记录调度操作和生成的新状态的中间件。
const logger = store => next => action => {
  // 你可以在此异步请求数据，
  console.group(action.type); // 线条打印...显示操作类型(action层定义的)
  console.log('即时state', store.getState()); // 获取state属性值,这时还是空的

  console.info('dispatching', action); // 返回一个对象,具体看你action怎么定义数据
  let result = next(action); // 获取下一层动作(一般合并过二个action就会有)
  console.log('next state', store.getState()); // 异步操作完后可以,获取到的state属性值
  console.groupEnd(); // 结束线条打印
  return result; // 返回这个方法,暴露外部即可调用获取属性值
};
// 导出Middleware层扩展类
export default logger;
