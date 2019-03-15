import * as React from 'react';

// import './footer.less';
// interface Props {}

export default class Footer extends React.Component<object> {
  public constructor(props){
    super(props);
  }
  public render(){
    return (
      <div className="footer">
      底部声明：推荐使用谷歌浏览器浏览，可以获得更佳的体验操作页面
      </div>
    );
  }
  // 组件显示之后，组件第一次渲染完成触发
  public componentDidMount ():void {}
}
