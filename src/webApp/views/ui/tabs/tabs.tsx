import React from 'react';
import { Card, Button, Tabs, message, Icon } from 'antd';
import '../ui.less';
const TabPane = Tabs.TabPane;

interface IState {
  panes:Array<any>,
  activeKey:any,
}
export default class Buttons extends React.Component<Object,IState> {
  public handleCallback = key => {
    // 每当切换了tabs发送一个提示信息
    message.info('Hi,您选择了页签：' + key);
  }

  public render() {
    return (
      <div>
        <Card title="Tab页签" className="card-wrap">
          {/* tabs添加事件 */}
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab="Tab 1" key="1">
              欢迎学习React
            </TabPane>
            <TabPane tab="Tab 2" key="2" disabled>
              欢迎学习React
            </TabPane>
            <TabPane tab="Tab 3" key="3">
              React是一个非常受欢迎的MV*框架
            </TabPane>
          </Tabs>
        </Card>

        <Card title="Tab带图的页签" className="card-wrap">
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane
              tab={<span><Icon type="plus" />Tab 1</span>}
              key="1"
            >
              欢迎学习React
            </TabPane>
            <TabPane
              tab={<span><Icon type="edit" />Tab 2</span>}
              key="2"
            >
              欢迎学习React
            </TabPane>
            <TabPane
              tab={<span><Icon type="delete" />Tab 3</span>}
              key="3"
            >
              React是一个非常受欢迎的MV*框架
            </TabPane>
          </Tabs>
        </Card>

        {/* 可删除tabs或添加的，要利用动态添加 */}
        <Card title="Tab带图的页签" className="card-wrap">
          <Tabs
            onChange={this.onChange}
            // 显示当前激活key的是哪个
            activeKey={this.state.activeKey}
            type="editable-card" // 可编程的卡片
            onEdit={this.onEdit} // 新增或删除的时候回调
          >
            {/* 循环显示每个tab标签 */}
            {this.state.panes.map(panel => {
              return <TabPane tab={panel.title} key={panel.key}>内容{panel.key}</TabPane>;
            })}
          </Tabs>
        </Card>
      </div>
    );
  }
  public newTabIndex = 0; // 创建索引，用来动态创建标签用而已
  public componentWillMount() {
    // tabs标签的数据，动态添加用的
    const panes = [
      {
        title: 'Tab 1',
        content: 'Tab 1',
        key: '1'
      },
      {
        title: 'Tab 2',
        content: 'Tab 2',
        key: '2'
      },
      {
        title: 'Tab 3',
        content: 'Tab 3',
        key: '3'
      }
    ];
    this.setState({
      activeKey: panes[0].key, // 默认显示第一个tabs
      panes
    });
  }
  // 当点击卡片切换页的时候事件，当前激活的key
  public onChange = activeKey => {
    // 把当前点击的key保存起来
    this.setState({
      activeKey
    });
  }

  public onEdit = (targetKey, action) => {
    this[action](targetKey);
  }
  // 动态添加一个tabs标签
  public add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex++}`;
    // 在原有的tabs数据上在添加一组数据
    panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
    // 在重新设置一下state上面的属性，tabs就自动渲染完
    this.setState({ panes, activeKey });
  }
  // 删除一个标签
  public remove = targetKey => {
    let activeKey = this.state.activeKey; // 获取到当前tabs选中的key
    let lastIndex,index; // 记录key索引上一个位置
    // 获取到tabs数据中，当前要删除标签的索引上一个位置
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
        index = i;
      }
    });
    // 过滤掉要删除的标签数据
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    // 方式二，直接改变原数组，删除指定数据
    // this.state.panes.splice(index,1);
    // 当选中的标签和你要删除的标签是同位置时
    if (lastIndex >= 0 && activeKey === targetKey) {
      // 把默认显示的activeKey切换成上一个标签tabs
      activeKey = panes[lastIndex].key;
      // activeKey = this.state.panes[lastIndex].key; // 方式二
    }
    this.setState({ panes, activeKey });
    // 方式二
    // this.setState({ activeKey });
  }
}
