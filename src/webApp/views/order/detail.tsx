import React from 'react';
import { Card } from 'antd';

import SafeRequest from '../../utils/SafeRequest';
import Utils from '../../utils/utils';

import { connect } from 'react-redux';

import './detail.less';

interface IPorps {
  match?: any;
  menuType?: any;
}
interface IState {
  orderInfo?: any;
  sysTime?: any;
  dayPictureUrl?: any;
  weather?: any;
}
export default class Order extends React.Component<IPorps> {
  [x: string]: any;
  public state:IState = {};

  public componentDidMount() {
    // 存放传入过来的参数
    let orderId = this.props.match.params.orderId;
    if (orderId) {
      // 触发函数，请求数据
      this.getDetailInfo(orderId);
    }
  }
  // 请求数据，传入请求的ID
  public getDetailInfo = orderId => {
    SafeRequest
      .ajax({
        url: '/order/detail',
        data: {
          params: {
            orderId
          }
        }
      })
      .then(res => {
        if (res.code == 0) {
          this.setState({
            orderInfo: res.result
          });
          console.log(res.result);
          this.renderMap(res.result);
        }
      });
  }

  // 创建地图
  public renderMap = (result) => {
    // 创建地图实例，显示的地方
    this.map = new window.BMap.Map('orderDetailMap');
    // this.map.centerAndZoom('北京',11);
    // 添加地图控件
    this.addMapControl();
    // 调用路线图绘制方法
    this.drawBikeRoute(result.position_list);
    // 调用服务区绘制方法
    this.drwaServiceArea(result.area);
  }

  // 添加地图控件
  public addMapControl = () => {
    let map = this.map;
    // 添加缩放控件-传入参数，放右上角
    map.addControl(
      new window.BMap.ScaleControl({ anchor: window.BMAP_ANCHOR_TOP_RIGHT })
    );
    // 添加导航控件-显示在右上角
    map.addControl(
      new window.BMap.NavigationControl({
        anchor: window.BMAP_ANCHOR_TOP_RIGHT
      })
    );
  }

  // 绘制用户的行驶路线，传入了行驶每个点
  public drawBikeRoute = positionList => {
    let map = this.map;
    let startPoint = '';
    let endPoint = '';
    if (positionList.length > 0) {
      let first = positionList[0]; // 起始坐标点
      let last = positionList[positionList.length - 1];
      startPoint = new window.BMap.Point(first.lon, first.lat);
      // 定义起始坐标的图片以及图片大小
      let startIcon = new window.BMap.Icon(
        '/assets/start_point.png',
        new window.BMap.Size(36, 42), // 这是定义icon容器大小
        { // 下面是设置图片的大小
          imageSize: new window.BMap.Size(36, 42),
          anchor: new window.BMap.Size(18, 42) // 停靠的位置
        }
      );
      // icon不能直接使用在地图中，要依赖于marker对象，第一个是坐标点
      let startMarker = new window.BMap.Marker(startPoint, { icon: startIcon });
      this.map.addOverlay(startMarker); // 把起始坐标点添加到地图中去

      // 结束坐标点开始定义--和上面起始坐标流程一样
      endPoint = new window.BMap.Point(last.lon, last.lat);
      let endIcon = new window.BMap.Icon(
        '/assets/end_point.png',
        new window.BMap.Size(36, 42),
        {
          imageSize: new window.BMap.Size(36, 42),
          anchor: new window.BMap.Size(18, 42)
        }
      );
      let endMarker = new window.BMap.Marker(endPoint, { icon: endIcon });
      this.map.addOverlay(endMarker);

      // 连接路线图
      let trackPoint = [];
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < positionList.length; i++) {
        let point = positionList[i];
        // point是画线的API，把坐标点传入
        trackPoint.push(new window.BMap.Point(point.lon, point.lat));
      }

      // 画一个折线，它会自动帮我个连接
      let polyline = new window.BMap.Polyline(trackPoint, {
        strokeColor: '#1869AD', // 折线颜色
        strokeWeight: 3, // 宽度
        strokeOpacity: 1 // 透明度
      });

      // 添加到地图中去
      this.map.addOverlay(polyline);
      // 设置地图的中心点，把用户的终点当中心点
      this.map.centerAndZoom(endPoint, 11);
    }
  }

  // 绘制服务区
  public drwaServiceArea = positionList => {
    // 连接路线图
    let trackPoint = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < positionList.length; i++) {
      let point = positionList[i];
      trackPoint.push(new window.BMap.Point(point.lon, point.lat));
    }
    // 绘制服务区，多边形API，会自动闭合起来
    let polygon = new window.BMap.Polygon(trackPoint, {
      strokeColor: '#CE0000',
      strokeWeight: 4,
      strokeOpacity: 1,
      fillColor: '#ff8605', // 线内的区域颜色
      fillOpacity: 0.3
    });
    this.map.addOverlay(polygon);
  }

  public render() {
    const info = this.state.orderInfo || {};
    return (
      <div>
        <Card>
          {/* 地图渲染标签 */}
          <div id="orderDetailMap" className="order-map" />
          <div className="detail-items">
            <div className="item-title">基础信息</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">用车模式</div>
                <div className="detail-form-content">
                  {info.mode == 1 ? '服务区' : '停车点'}
                </div>
              </li>
              <li>
                <div className="detail-form-left">订单编号</div>
                <div className="detail-form-content">{info.order_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">车辆编号</div>
                <div className="detail-form-content">{info.bike_sn}</div>
              </li>
              <li>
                <div className="detail-form-left">用户姓名</div>
                <div className="detail-form-content">{info.user_name}</div>
              </li>
              <li>
                <div className="detail-form-left">手机号码</div>
                <div className="detail-form-content">{info.mobile}</div>
              </li>
            </ul>
          </div>
          <div className="detail-items">
            <div className="item-title">行驶轨迹</div>
            <ul className="detail-form">
              <li>
                <div className="detail-form-left">行程起点</div>
                <div className="detail-form-content">{info.start_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行程终点</div>
                <div className="detail-form-content">{info.end_location}</div>
              </li>
              <li>
                <div className="detail-form-left">行驶里程</div>
                <div className="detail-form-content">
                  {info.distance / 1000}公里
                </div>
              </li>
            </ul>
          </div>
        </Card>
      </div>
    );
  }
}
