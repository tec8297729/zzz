import * as React from 'react';
import { Row, Col } from 'antd';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import Home from '../home/home';

// import './admin.less';
// interface Props {}

// 另一种页面骨架结构
export default class Admin extends React.Component<object> {
  public constructor(props) {
    super(props);
  }
  public render() {
    return (
      <div>
        <Row className="simple-page">
          <Header menuType="second" />
        </Row>
        <Row className="content">
          {/* 显示子路由 */}
          {this.props.children}
        </Row>
        <Row className="footer">
          <Footer />
        </Row>
      </div>
    );
  }
}
