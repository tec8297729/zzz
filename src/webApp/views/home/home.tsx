import * as React from 'react';
import './home.less';

// interface Props {}

export default class App extends React.Component<object> {
  public constructor(props){
    super(props);
  }
  public render(){
    return (
      <div className="home-wrap">
        <div>欢迎进入后台管理系统</div>
      </div>
    );
  }
  // 组件显示之后，组件第一次渲染完成触发
  public componentDidMount ():void {}
}
