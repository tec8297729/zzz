// 这是reducers根文件，虽然你可以全写在这一个文件中，但不好维护
import { combineReducers } from 'redux'; // 引入合并多个reducers组件
// import todos from './todos'; // 这是定义每个todo处理运作
// import visibilityFilter from './visibilityFilter'; // 这是定义过滤todo显示
import menu from './menu';
// 你可以定义多个reducers，然后最终是需要合并成一个整体使用的

// 合并多个reducers,然后返回唯一的reducer,因为一个redcer对应一个action的
// 这个相当于读取的state上有这些属性，如state.todos
export default combineReducers({
  menu
});
