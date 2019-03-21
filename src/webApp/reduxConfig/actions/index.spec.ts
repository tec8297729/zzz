import * as actions from './index'
import {SWITCH_MENU}  from '../constant/ActionTypes'; // 常量菜单

// 单测文件
describe('todo actions', () => {
  it('switchMenu action', () => {
    expect(actions.addTodo('switchMenu')).toEqual({
      type: SWITCH_MENU,
      menuName: '主页'
    })
  })

  // it('setVisibilityFilter should create SET_VISIBILITY_FILTER action', () => {
  //   expect(actions.setVisibilityFilter('active')).toEqual({
  //     type: 'SET_VISIBILITY_FILTER',
  //     filter: 'active'
  //   })
  // })

})
