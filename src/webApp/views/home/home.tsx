import * as React from 'react';
import './home.less';

interface Props {
  history?: any
}

export default class App extends React.Component<Props> {
  public constructor(props){
    super(props);
  }
  public render(){
    return (
      <div className="home-wrap">
        <div>欢迎进入后台管理系统</div>
        {/* <button onClick={this.tapNav}>跳转页面</button> */}
      </div>
    );
  }
  // public tapNav = (e) => {
  //   console.log('点击', this.props)
  //   this.props.history.push('/login');
  // }
}
