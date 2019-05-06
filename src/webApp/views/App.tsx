import * as React from 'react';
// import {withRouter } from 'react-router';
import localforage from 'localforage'; // 缓存插件
// // 设置数据库存放顺序
// localforage.setDriver([
//   localforage.LOCALSTORAGE,
//   localforage.INDEXEDDB,
//   localforage.WEBSQL
// ]);

interface Props {
  history?:any;
}
export default class App extends React.Component<Props, object>{
  public constructor(props){
    super(props);
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        // 加载sw规则文件
        navigator.serviceWorker.register('/sw.js').then(registration => {
          // 注册成功后....处理
          console.log('SW 注册成功: ', registration);
        }).catch(registrationError => {
          // 注册失败后....
          console.log('SW 注册失败: ', registrationError);
        });
      });
    }
  }

  public render() {
    return (
      // 用来显示每个路由组件
      <div>{this.props.children}</div>
    );
  }

  // 验证token值
  public isToken(){
    let that = this;

    // 获取token值
    localforage.getItem('UserdataToken').then(function(token) {
      // 当离线仓库中的值被载入时，此处代码运行
      if(token !== 8999){
        // that.props.history.push('/'); // 跳转到后台首页
        that.props.history.push('/login'); // 跳转到登陆页面
      }
      }).catch(function(err) {
      // 当出错时，此处代码运行
      console.log(err);
    });
  }
}

// 外层包裹一个路由组件，可以使用跳转路由功能语法
// export default withRouter(App);
