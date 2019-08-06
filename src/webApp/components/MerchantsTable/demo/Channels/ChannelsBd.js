import React, { Component } from 'react';
import Channels from './Channels';

class ChannelsBd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Channels
          modelsName="merchantsChannelsBd" // 读取dva层namespace 名称
          operationUrl="/merchant-management/channels-add" // 右侧处理按钮 跳转链接
          roleUser="bd" // bd（BD角色）,operat(运营)，risk1（风控初审），risk2（风控复审）
        />
      </div>
    );
  }
}

export default ChannelsBd;
