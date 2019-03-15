import * as React from 'react';
import { Button, Card, Radio } from 'antd';
// interface IProps {}
interface IState {
  loading:boolean,
  size:any
}
import '../ui.less'; // 公用排版样式
export default class Buttons extends React.Component<object, IState> {
  public constructor(props) {
    super(props);
  }
  public state = {
    loading: true,
    size: 'default'
  };

  public render() {
    return (
      <div>
        <Card title="基础按钮" className="card-wrap">
          <Button type="primary">带主题色按钮</Button>
          <Button>Default</Button>
          <Button type="dashed">虚线边框按钮</Button>
          <Button type="danger">Danger</Button>
          <Button disabled>禁用</Button>
        </Card>

        <Card title="图标按钮" className="card-wrap">
          <Button icon="plus">创建</Button>
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          {/* https://ant.design/components/icon-cn/ */}
          <Button icon="delete">更多icon图标</Button>
          <Button shape="circle" icon="search" />
          <Button type="primary" icon="search">搜索</Button>
          <Button type="primary" icon="download">下载</Button>
        </Card>

        <Card title="Loading按钮" className="card-wrap">
          <Button type="primary" loading={this.state.loading}>确定</Button>
          {/* 指定了形状circle圆形，loading值为true就是加载 */}
          <Button type="primary" shape="circle" loading={this.state.loading}></Button>
          <Button loading={this.state.loading} >点击加载</Button>
          <Button shape="circle" loading={this.state.loading}></Button>
          <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
        </Card>

        <Card title="按钮组" style={{marginBottom:10}}>
          <Button.Group>
            <Button type="primary" icon="left">返回</Button>
            <Button type="primary" icon="right">前进</Button>
          </Button.Group>
        </Card>

        <Card title="按钮尺寸" className="card-wrap">
          <Radio.Group value={this.state.size} onChange={this.handleChange}>
            <Radio value="small">小</Radio>
            <Radio value="default">中</Radio>
            <Radio value="large">大</Radio>
          </Radio.Group>
          <Button type="primary" size={this.state.size}>Imooc</Button>
          <Button size={this.state.size}>Imooc</Button>
          <Button type="dashed" size={this.state.size}>Imooc</Button>
          <Button type="danger" size={this.state.size}>Imooc</Button>
        </Card>
      </div>
    );
  }
  // 组件显示之后，组件第一次渲染完成触发
  public componentDidMount(): void {}
  // 关闭加载按钮状态
  public handleCloseLoading = ()=>{
    this.setState({
      loading: false
    });
  }
  // 改变字体大小事件
  public handleChange = (e)=>{
    this.setState({
      size: e.target.value
    });
  }
}
