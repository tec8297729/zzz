// 根据传入的不同值，操作不同的效果

// state获取的就是状态值,action
const todos = (state = [], action) => {
  // 下面是根据action动作来干不同的活,
  switch (action.type) {
    case 'ADD_TODO': // 添加信息动作时
      return [
        ...state, // 合并之前存的state数据状态，后面新增的相当于Push进来
        {
          id: action.id, // 添加id，传入的
          text: action.text, // 记录用户输入的内容
          completed: false
        }
      ];
    case 'TOGGLE_TODO': // 当点击当前list元素时
      // 循环每个todo信息，是当前点击那个取相反值，返回是一个对象
      return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
      );
    // 默认返回一个state是必须的
    default:
      return state;
  }
};

export default todos;
