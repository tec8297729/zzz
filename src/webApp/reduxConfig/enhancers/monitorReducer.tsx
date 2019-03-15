
// 一个增强器，记录减速器处理每个动作所用的时间。
// 每次在middlewares层操作，都会触发增强器操作，看需求定制，非必须
const round = number => Math.round(number * 100) / 100;

const monitorReducerEnhancer = createStore => (
  reducer, initialState, enhancer
) => {
  const monitoredReducer = (state, action) => {
    const start = performance.now(); // 获取当前时间
    const newState = reducer(state, action);
    const end = performance.now(); // 获取当前时间
    const diff = round(end - start); // 二者相减获取 每次动作时间

    console.log('reducer process time:', diff); // 显示每个动作的处理时间

    return newState;
  };

  return createStore(monitoredReducer, initialState, enhancer);
};

export default monitorReducerEnhancer;
