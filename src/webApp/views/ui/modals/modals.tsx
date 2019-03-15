import * as React from 'react';
import { Button, Card, Modal } from 'antd';
import '../ui.less'; // 公用排版样式

// interface IProps {}
// interface IState {}
export default class Buttons extends React.Component<object> {
  public constructor(props) {
    super(props);
  }
  public state = {
    showModal1: false,
    showModal2: false,
    showModal3: false,
    showModal4: false
  };

  public render() {
    return (
      <div>
        <Card title="基础模态框" className="card-wrap">
          <Button type="primary" onClick={() => this.handleOpen('showModal1')}>
            Open
          </Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal2')}>
            自定义页脚
          </Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal3')}>
            顶部20px弹框
          </Button>
          <Button type="primary" onClick={() => this.handleOpen('showModal4')}>
            水平垂直居中
          </Button>
        </Card>
        <Card title="信息确认框" className="card-wrap">
          <Button type="primary" onClick={() => this.handleConfirm('confirm')}>
            Confirm
          </Button>
          <Button type="primary" onClick={() => this.handleConfirm('info')}>
            Info
          </Button>
          <Button type="primary" onClick={() => this.handleConfirm('success')}>
            Success
          </Button>
          <Button type="primary" onClick={() => this.handleConfirm('warning')}>
            Warning
          </Button>
        </Card>
        {/* modal就是弹出窗口显示的内容 */}
        <Modal
          title="React"
          visible={this.state.showModal1}
          onCancel={() => {
            this.setState({
              showModal1: false
            });
          }}
        >
          <p>文本显示内容</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.showModal2}
          okText="好的"
          cancelText="算了"
          // 点击取消回调
          onCancel={(e) => {
            this.setState({
              showModal2: false
            });
          }}
          // 点击确定回调
          onOk = {(e) => {
            this.setState({
              showModal2: false
            });
          }}
        >
          <p>文本显示内容</p>
        </Modal>
        <Modal
          title="React"
          // 调整弹出窗口位置
          style={{ top: 20 }}
          visible={this.state.showModal3}
          onCancel={() => {
            this.setState({
              showModal3: false
            });
          }}
        >
          <p>顶部20px弹框位置</p>
        </Modal>
        <Modal
          title="React"
          // 样式class自定义
          wrapClassName="vertical-center-modal"
          visible={this.state.showModal4}
          onCancel={() => {
            this.setState({
              showModal4: false
            });
          }}
        >
          <p>文本显示内容</p>
        </Modal>
      </div>
    );
  }
  // 组件显示之后，组件第一次渲染完成触发
  public componentDidMount(): void {}
  // 弹窗口按钮事件
  public handleOpen = (type) => {
    this.setState({
      [type]: true
    });
  }
  // 信息确认框事件，直接进行写内容，而不用在创建一个标签
  public handleConfirm = (type)=>{
    // Modal.info({}) 这样的形式，可以不用类型
    Modal[type]({
      title:'确认？',
      content:'你确定你学会了React了吗？',
      onOk(){
        console.log('Ok');
      },
      onCancel(){
        console.log('Cancel');
      }
    });
  }
}
