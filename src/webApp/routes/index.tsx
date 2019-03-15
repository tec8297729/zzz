import * as React from 'react';
// 引入路由相关一些组件
import { BrowserRouter, Switch, Route, HashRouter, Redirect } from 'react-router-dom';

// 骨架组件
import NoMatch from '../views/noMatch/noMatch'; // 容错404页面
import App from '../views/App'; // 根组件
import Admin from '../views/admin/admin';
import Home from '../views/home/home';
import Common from '../views/common/common';

import Login from '../views/login/login';


// ui组件库演示
import Buttons from '../views/ui/buttons/buttons'; // 按钮组件
import Modals from '../views/ui/modals/modals';
import Loadings from '../views/ui/loadings/loadings'; // 加载组件
import Notice from '../views/ui/notice/notice'; // 消息通知
import Messages from '../views/ui/messages/messages'; // 弹窗提示
import Tabs from '../views/ui/tabs/tabs'; // 切换tabs组件
import Gallery from '../views/ui/gallery/gallery'; // 图片画廊,类似瀑布流
import Carousel from '../views/ui/carousel/carousel';
import FormLogin from '../views/form/login';
import Register from '../views/form/register'; // 注册表单
import BasicTable from '../views/table/basicTable'; // 普通表单
import HighTable from '../views/table/highTable'; // 高级表单
import City from '../views/city/city'; // 城市表单业务组件
import Order from '../views/order/order'; // 城市表单业务组件
import OrderDetail from '../views/order/detail'; // 用户订单页面
import User from '../views/user/user'; // 员工表单页面
import BikeMap from '../views/map/bikeMap'; // 地图-车辆地图分布

// 图表组件
import Bar from '../views/echarts/bar/bar'; // 图表柱
import Pie from '../views/echarts/pie/pie'; // 图表饼
import Line from '../views/echarts/line/line'; // 图表饼
// 富文本编辑器
import Rich from '../views/rich/rich';
import Permission from '../views/permission'; // 权限控制

// 配置路由页面
export default class RoutersConfig extends React.Component {
  public render() {
    return (
      <HashRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/common" render={props => (
              <Common>
                <Route path="/common/order/detail/:orderId" component={OrderDetail}/>
              </Common>
            )}/>

            {/* 登陆页面 */}
            <Route path="/" render={props => (
              <Admin>
                <Switch>

                  <Route path="/home" component={Home}/>
                  <Route path="/ui/buttons" component={Buttons}/>
                  <Route path="/ui/modals" component={Modals}/>
                  <Route path="/ui/loadings" component={Loadings}/>
                  <Route path="/ui/notification" component={Notice}/>
                  <Route path="/ui/messages" component={Messages}/>
                  <Route path="/ui/tabs" component={Tabs}/>
                  <Route path="/ui/gallery" component={Gallery}/>
                  <Route path="/ui/carousel" component={Carousel}/>

                  <Route path="/form/login" component={FormLogin}/>
                  <Route path="/form/register" component={Register}/>

                  <Route path="/table/basic" component={BasicTable}/>
                  <Route path="/table/high" component={HighTable}/>
                  <Route path="/city" component={City}/>
                  <Route path="/order" component={Order}/>
                  <Route path="/user" component={User}/>
                  <Route path="/bikeMap" component={BikeMap}/>

                  {/* 图表系列专题 */}
                  <Route path="/charts/bar" component={Bar}/>
                  <Route path="/charts/pie" component={Pie}/>
                  <Route path="/charts/line" component={Line}/>
                  {/* 富文本 */}
                  <Route path="/rich" component={Rich}/>

                  {/*   */}
                  <Route path="/permission" component={Permission}/>

                  {/* 以上页面都找不到时，默认重定向到home页面 */}
                  <Redirect to="/home"/>
                  {/* 没匹配到的路径显示的页面 */}
                  <Route component={NoMatch} ></Route>
                </Switch>
              </Admin>
            )}/>

            {/* <Route path="/hello" render={props => (
              <Hello name="TypeScript" enthusiasmLevel={10} />
            )}/> */}

            {/* 没匹配到的路径显示的页面 */}
            {/* <Route component={NoMatch} ></Route> */}
          </Switch>
        </App>
      </HashRouter>
    );
  }
}

