import * as React from 'react';
import { Row, Col } from 'antd';
import Utils from '../../utils/utils'; // 公用方法
import { NavLink } from 'react-router-dom';
import './Header.less';
import SafeRequest from '../../utils/SafeRequest';
import { connect } from 'react-redux';

interface Props {
  menuType?: any;
  menuName?: any;
}

interface State {
  userName: string;
  sysTime: any;
  dayPictureUrl?: any;
  weather: any;
}

class Header extends React.Component<Props, State> {
  public constructor(props) {
    super(props);
  }
  // public state = {
  //   userName:'xxxx'
  // };
  public render() {
    // 获取导航参数
    const menuType = this.props.menuType;
    return (
      <div className="header">
        <Row className="header-top">
          {/* 兼容一级导航和二级导航不同样式判断 */}
          {menuType ? (
            <Col span={6} className="logo">
              <img src="./assets/logo-ant.svg" />
              <span>后台系统</span>
            </Col>
          ) : (
            ''
          )}
          <Col span={menuType ? 18 : 24}>
            <span>欢迎 {this.state.userName}</span>
            {/* <a href="http://"></a> */}
            <NavLink to="/login">退出</NavLink>
          </Col>
        </Row>
        {// 如果有传入导航参数过来，头部显示为空
        menuType ? (
          ''
        ) : (
          <Row className="breadcrumb">
            <Col span={4} className="breadcrumb-title">
              <span className="breadcrumb-icon">{this.props.menuName}</span>
            </Col>
            <Col span={20} className="weather">
              <span className="weather-data">{this.state.sysTime}</span>
              <span className="weather-detail">
                <img src={this.state.dayPictureUrl} className="weather-icon" />
                {this.state.weather}
              </span>
            </Col>
          </Row>
        )}
      </div>
    );
  }
  // 组件将要挂载之前触发
  public componentWillMount(): void {
    this.setState({
      userName: '河中一天'
    });
    // 每次更新时间
    setInterval(() => {
      let sysTime = Utils.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'); // 格式化当前时间
      this.setState({
        sysTime
      });
    }, 1000);
  }
  // 组件加载渲染完成后触发
  public componentDidMount() {
    this.getWeatherAPI();
  }
  // jsonp请求
  public getWeatherAPI() {
    let city = '北京';
    SafeRequest.jsonp({
      url: `http://api.map.baidu.com/telematics/v3/weather?location=${encodeURIComponent(
        city
      )}&output=json&ak=iKveoNoN8IsMVDWMSxBZ2baDwCfrgNGv`
    }).then(res => {
      if (res.status == 'success') {
        let data = res.results[0].weather_data[0];
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          weather: data.weather
        });
      } else {
      }
    });
  }
}

// 把属性保存起来，组件内this.props.menuName使用
const mapStateToProps = state => {
  return {
    menuName: state.menu.menuName
  };
};
export default connect(mapStateToProps)(Header);
