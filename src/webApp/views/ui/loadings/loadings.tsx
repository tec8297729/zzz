import React from 'react';
import { Card, Button, Spin, Icon, Alert } from 'antd';
import '../ui.less';
export default class Loadings extends React.Component {
  public render() {
    // 定义ico图标
    const icon = <Icon type="loading" style={{ fontSize: 24 }} />;
    const iconLoading = <Icon type="loading" style={{ fontSize: 24 }} />;
    return (
      <div>
        <Card title="Spin用法" className="card-wrap">
          {/* 每一个spin就是加载图标 */}
          <Spin size="small" />
          <Spin style={{ margin: '0 10px' }} />
          <Spin size="large" />
          {/* 可以更换加载的图标 spinning={true}可以指定是否加载完成*/}
          <Spin indicator={icon} style={{ marginLeft: 10 }} spinning={true} />
        </Card>

        <Card title="内容遮罩" className="card-wrap">
          <Alert
            message="React"
            description="内容区域"
            type="info"
            style={{ marginBottom: 10 }}
          />
          <Spin>
            <Alert
              message="React"
              description="内容区域"
              type="warning"
              style={{ marginBottom: 10 }}
            />
          </Spin>
          <Spin tip="加载中...">
            <Alert
              message="React"
              description="内容区域"
              type="warning"
              style={{ marginBottom: 10 }}
            />
          </Spin>
          <Spin indicator={iconLoading}>
            <Alert
              message="React"
              description="内容区域"
              type="warning"
            />
          </Spin>
        </Card>
      </div>
    );
  }
}
