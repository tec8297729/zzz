import React from 'react';
import { Card, Button, notification } from 'antd';
import '../ui.less';

export default class Buttons extends React.Component {
  public openNotification = (type, direction?) => {
    if (direction) {
      // 配置弹出窗口参数
      notification.config({
        placement: direction
      });
    }
    // 提醒窗口的内容和标题
    notification[type]({
      message: '发工资了',
      description: '上个月考勤30天，迟到12天，实发工资88，请笑纳'
    });
  }

  public render() {
    return (
      <div>
        <Card title="通知提醒框" className="card-wrap">
          <Button
            type="primary"
            onClick={() => this.openNotification('success')}
          >
            Success
          </Button>
          <Button type="primary" onClick={() => this.openNotification('info')}>
            Info
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotification('warning')}
          >
            Warning
          </Button>
          <Button type="primary" onClick={() => this.openNotification('error')}>
            Error
          </Button>
        </Card>
        <Card title="通知提醒框" className="card-wrap">
          <Button
            type="primary"
            onClick={() => this.openNotification('success', 'topLeft')}
          >
            Success
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotification('info', 'topRight')}
          >
            Info
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotification('warning', 'bottomLeft')}
          >
            Warning
          </Button>
          <Button
            type="primary"
            onClick={() => this.openNotification('error', 'bottomRight')}
          >
            Error
          </Button>
        </Card>
      </div>
    );
  }
}
