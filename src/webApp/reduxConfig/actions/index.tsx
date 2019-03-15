import {SWITCH_MENU}  from '../constant/ActionTypes'; // 常量菜单

export const switchMenu = (menuName) => ({
  type: SWITCH_MENU, // 类型
  menuName // 接收用户传入的菜单名称
});

