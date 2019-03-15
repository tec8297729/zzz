import React from 'react';
import { Card, Form } from 'antd';
import SafeRequest from '../../utils/SafeRequest';
import BaseForm from '../../components/BaseForm/BaseForm';

interface IState {
  bikeInfo: any;
  total_count?: any;
}
export default class Order extends React.Component {
  public state: IState = {
    bikeInfo: {}
  };

  public map = {};

  // 表单封装，通过构建表单对象，在BaseForm中进行统一渲染
  public formList = [
    {
      type: 'SELECT',
      label: '城市',
      field: 'city',
      placeholder: '全部',
      initialValue: '1',
      width: 80,
      list: [
        { id: '0', name: '全部' },
        { id: '1', name: '北京' },
        { id: '2', name: '天津' },
        { id: '3', name: '上海' }
      ]
    },
    {
      type: '时间查询',
      label: '订单时间',
      field: 'time_select'
    },
    {
      type: 'SELECT',
      label: '订单状态',
      field: 'order_status',
      placeholder: '全部',
      initialValue: '0',
      width: 150,
      list: [
        { id: '0', name: '全部' },
        { id: '1', name: '进行中' },
        { id: '3', name: '行程结束' }
      ]
    }
  ];

  public params = {
    page: 1
  };

  // 列表请求
  public requestList = () => {
    SafeRequest.ajax({
      url: '/map/bike_list',
      data: {
        params: this.params
      }
    }).then(res => {
      if (res) {
        this.setState(
          {
            total_count: res.result.total_count
          },
          () => {}
        );
        this.renderMap(res.result);
      }
    });
  }

  // 查询表单
  public handleFilterSubmit = (filterParams) => {
    this.params = filterParams;
    this.requestList();
  }

  public componentDidMount() {
    this.requestList();
  }

  // 渲染地图
  public renderMap = res => {
    let list = res.route_list;
    this.map = new window.BMap.Map('container', { enableMapClick: false });
    let gps1 = list[0].split(',');
    let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
    let gps2 = list[list.length - 1].split(',');
    let endPoint = new window.BMap.Point(gps2[0], gps2[1]);

    this.map.centerAndZoom(endPoint, 11);
    // map.clearOverlays();

    // 添加起始图标
    let startPointIcon = new window.BMap.Icon(
      '/assets/start_point.png',
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        // 这个控制图片的偏移量
        anchor: new window.BMap.Size(18, 42)
      }
    );

    let bikeMarkerStart = new window.BMap.Marker(startPoint, {
      icon: startPointIcon
    });
    this.map.addOverlay(bikeMarkerStart);

    let endPointIcon = new window.BMap.Icon(
      '/assets/end_point.png',
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      }
    );
    let bikeMarkerEnd = new window.BMap.Marker(endPoint, {
      icon: endPointIcon
    });
    this.map.addOverlay(bikeMarkerEnd);

    let routeList = [];
    list.forEach(item => {
      let p = item.split(',');
      let point = new window.BMap.Point(p[0], p[1]);
      routeList.push(point);
    });
    // 行驶路线
    let polyLine = new window.BMap.Polyline(routeList, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    });
    this.map.addOverlay(polyLine);

    // 服务区路线
    let serviceList = res.service_list;
    let servicePointist = [];
    serviceList.forEach(item => {
      let point = new window.BMap.Point(item.lon, item.lat);
      servicePointist.push(point);
    });
    // 画线
    let polyServiceLine = new window.BMap.Polyline(servicePointist, {
      strokeColor: '#ef4136',
      strokeWeight: 3,
      strokeOpacity: 1
    });
    this.map.addOverlay(polyServiceLine);

    // 添加地图中的自行车
    let bikeList = res.bike_list;
    let bikeIcon = new window.BMap.Icon(
      '/assets/bike.jpg',
      new window.BMap.Size(36, 42),
      {
        imageSize: new window.BMap.Size(36, 42),
        anchor: new window.BMap.Size(18, 42)
      }
    );
    bikeList.forEach(item => {
      let p = item.split(',');
      let point = new window.BMap.Point(p[0], p[1]);
      let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon });
      this.map.addOverlay(bikeMarker);
    });

    // 添加地图控件
    this.addMapControl();
  }

  // 添加地图控件
  public addMapControl = () => {
    let map = this.map;
    // 左上角，添加比例尺
    let top_right_control = new window.BMap.ScaleControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT
    });
    let top_right_navigation = new window.BMap.NavigationControl({
      anchor: window.BMAP_ANCHOR_TOP_RIGHT
    });
    // 添加控件和比例尺
    map.addControl(top_right_control);
    map.addControl(top_right_navigation);
    map.enableScrollWheelZoom(true);
    // legend.addLegend(map);
  }

  public render() {
    return (
      <div>
        <Card>
          <BaseForm
            formList={this.formList}
            filterSubmit={this.handleFilterSubmit}
          />
        </Card>
        <Card style={{ marginTop: 10 }}>
          <div>共{this.state.total_count}辆车</div>
          <div id="container" style={{ height: 500 }} />
        </Card>
      </div>
    );
  }
}
