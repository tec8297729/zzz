import * as React from 'react';
import { Row, Col } from 'antd';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import NavLeft from '../../components/NavLeft/NavLeft';
// tslint:disable-next-line: no-implicit-dependencies
import {withRouter } from 'react-router';
import localforage from 'localforage'; // 缓存插件

import '../../style/common.less'; // 共用样式
import './admin.less';

// 设置数据库存放顺序
localforage.setDriver([
  localforage.LOCALSTORAGE,
  localforage.INDEXEDDB,
  localforage.WEBSQL
]);

interface Props {
  history?:any;
}

// 通用页面架构

class Admin extends React.Component<Props, object> {
  public constructor(props) {
    super(props);
  }

  public componentWillMount() {
    // 每次进入页面的时候验证用户
    this.isToken();
  }
  // 验证token值
  public isToken(){
    let that = this;

    // 获取token值
    localforage.getItem('UserdataToken').then(function(token) {
      // 当离线仓库中的值被载入时，此处代码运行
      if(token !== 8999){
        that.props.history.push('/login'); // 跳转到登陆页面
      }
      }).catch(function(err) {
      // 当出错时，此处代码运行
      console.log(err);
    });
  }

  public render() {
    return (
      <Row className="container">
        <Col span={3} className="nav-left">
          <NavLeft />
        </Col>
        <Col span={21} className="main">
          <Header></Header>
          <Row className="content">
            {/* <Home></Home> */}
            {/* 显示子路由 */}
            {this.props.children}
          </Row>
          <Footer />
        </Col>
      </Row>
    );
  }
}

// 外层包裹一个路由组件，可以使用跳转路由功能语法
export default withRouter(Admin);
