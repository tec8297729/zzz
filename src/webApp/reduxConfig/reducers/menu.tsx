import {SWITCH_MENU} from '../constant/ActionTypes'; // 常量

// state获取的就是状态值,action
const initialState = (state={menuName:'首页'}, action) => {
  // 下面是根据action动作来干不同的活,
  switch (action.type) {
    case SWITCH_MENU: // 当是菜单类型的时候
      // console.log(action)
      return {
        ...state, // 合并之前存的state数据状态，后面新增的相当于Push进来
        menuName: action.menuName// 改变menuName值，用户传入的
      };
    // 默认返回一个state是必须的
    default:
      return state;
  }
};

export default initialState;
