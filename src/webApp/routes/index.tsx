import * as React from 'react';
// 引入路由相关一些组件
import { BrowserRouter, Switch, Route, HashRouter, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable'; // 懒加载组件
// 骨架组件
import App from '@views/App'; // 根组件
// import NoMatch from '@views/noMatch/noMatch'; // 容错404页面
// import Admin from '@views/admin/admin';
// import Home from '@views/home/home';
// import Common from '@views/common/common';
// import Login from '@views/login/login';

const NoMatch = Loadable({
  loader: () => import('@views/noMatch/noMatch'), // 按钮组件
  loading: Loading, // 加载中显示的组件
});
const Admin = Loadable({
  loader: () => import('@views/admin/admin'), // 按钮组件
  loading: Loading, // 加载中显示的组件
});
const Home = Loadable({
  loader: () => import('@views/home/home'), // 按钮组件
  loading: Loading, // 加载中显示的组件
});
const Common = Loadable({
  loader: () => import('@views/common/common'), // 按钮组件
  loading: Loading, // 加载中显示的组件
});
const Login = Loadable({
  loader: () => import('@views/login/login'), // 按钮组件
  loading: Loading, // 加载中显示的组件
});

// 统一空白页面加载显示的样式
function Loading() {
  return <div>Loading...</div>;
}

// ui组件库演示
// import Buttons from '@views/ui/buttons/buttons'; // 按钮组件
// import Modals from '@views/ui/modals/modals';
// import Loadings from '@views/ui/loadings/loadings'; // 加载组件
// import Notice from '@views/ui/notice/notice'; // 消息通知
// import Messages from '@views/ui/messages/messages'; // 弹窗提示
// import Tabs from '@views/ui/tabs/tabs'; // 切换tabs组件
// import Gallery from '@views/ui/gallery/gallery'; // 图片画廊,类似瀑布流
// import Carousel from '@views/ui/carousel/carousel';
// import FormLogin from '@views/form/login';
// import Register from '@views/form/register'; // 注册表单
// import BasicTable from '@views/table/basicTable'; // 普通表单
// import HighTable from '@views/table/highTable'; // 高级表单
// import City from '@views/city/city'; // 城市表单业务组件
// import Order from '@views/order/order'; // 城市表单业务组件
// import OrderDetail from '@views/order/detail'; // 用户订单页面
// import User from '@views/user/user'; // 员工表单页面
// import BikeMap from '@views/map/bikeMap'; // 地图-车辆地图分布

// 延迟加载组件，按需要的页面才会加载
const Buttons = Loadable({
  loader: () => import('@views/ui/buttons/buttons'), // 按钮组件
  loading: Loading, // 加载中显示的组件
});
const Modals = Loadable({
  loader: () => import('@views/ui/modals/modals'), // 弹框组件
  loading: Loading, // 加载中显示的组件
});
const Loadings = Loadable({
  loader: () => import('@views/ui/loadings/loadings'), // 加载组件
  loading: Loading, // 加载中显示的组件
});
const Notice = Loadable({
  loader: () => import('@views/ui/notice/notice'), // 消息通知
  loading: Loading, // 加载中显示的组件
});
const Messages = Loadable({
  loader: () => import('@views/ui/messages/messages'), // 弹窗提示
  loading: Loading, // 加载中显示的组件
});
const Tabs = Loadable({
  loader: () => import('@views/ui/tabs/tabs'), // 切换tabs组件
  loading: Loading, // 加载中显示的组件
});
const Gallery = Loadable({
  loader: () => import('@views/ui/gallery/gallery'), // 图片画廊,类似瀑布流
  loading: Loading, // 加载中显示的组件
});
const Carousel = Loadable({
  loader: () => import('@views/ui/carousel/carousel'), // 轮播图
  loading: Loading, // 加载中显示的组件
});
const FormLogin = Loadable({
  loader: () => import('@views/form/login'), // 登陆页面
  loading: Loading, // 加载中显示的组件
});
const Register = Loadable({
  loader: () => import('@views/form/register'), // 注册表单
  loading: Loading, // 加载中显示的组件
});
const BasicTable = Loadable({
  loader: () => import('@views/table/basicTable'), // 普通表单
  loading: Loading, // 加载中显示的组件
});
const HighTable = Loadable({
  loader: () => import('@views/table/highTable'), // 高级表单
  loading: Loading, // 加载中显示的组件
});
const City = Loadable({
  loader: () => import('@views/city/city'), // 城市表单业务组件
  loading: Loading, // 加载中显示的组件
});
const Order = Loadable({
  loader: () => import('@views/order/order'), // 订单管理
  loading: Loading, // 加载中显示的组件
});
const OrderDetail = Loadable({
  loader: () => import('@views/order/detail'), // 用户订单页面
  loading: Loading, // 加载中显示的组件
});
const User = Loadable({
  loader: () => import('@views/user/user'), // 员工表单页面
  loading: Loading, // 加载中显示的组件
});
const BikeMap = Loadable({
  loader: () => import('@views/map/bikeMap'), // 地图-车辆地图分布
  loading: Loading, // 加载中显示的组件
});


// 图表组件
// import Bar from '@views/echarts/bar/bar'; // 图表柱
// import Pie from '@views/echarts/pie/pie'; // 图表饼
// import Line from '@views/echarts/line/line'; // 图表饼
const Bar = Loadable({
  loader: () => import('@views/echarts/bar/bar'),
  loading: Loading, // 加载中显示的组件
});
const Pie = Loadable({
  loader: () => import('@views/echarts/pie/pie'),
  loading: Loading,
});
const Line = Loadable({
  loader: () => import('@views/echarts/line/line'),
  loading: Loading,
});


// 富文本编辑器
// import Rich from '@views/rich/rich';
// import Permission from '@views/permission'; // 权限控制
const Rich = Loadable({
  loader: () => import('@views/rich/rich'), // 富文本编辑器
  loading: Loading,
});
const Permission = Loadable({
  loader: () => import('@views/permission'), // 权限控制
  loading: Loading,
});

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
                  <Route path="/ui/buttons" render={props => (
                    <Buttons/>
                  )}/>
                  <Route path="/ui/modals" render={props => (
                    <Modals/>
                  )}/>
                  <Route path="/ui/loadings" render={props => (
                    <Loadings/>
                  )}/>
                  <Route path="/ui/notification" render={props => (
                    <Notice/>
                  )}/>
                  <Route path="/ui/messages" render={props => (
                    <Messages/>
                  )}/>
                  <Route path="/ui/tabs" render={props => (
                    <Tabs/>
                  )}/>
                  <Route path="/ui/gallery" render={props => (
                    <Gallery/>
                  )}/>
                  <Route path="/ui/carousel" render={props => (
                    <Carousel/>
                  )}/>

                  <Route path="/form/login" render={props => (
                    <FormLogin/>
                  )}/>
                  <Route path="/form/reg" render={props => (
                    <Register/>
                  )}/>

                  <Route path="/table/basic" render={props => (
                    <BasicTable/>
                  )}/>
                  <Route path="/table/high" render={props => (
                    <HighTable/>
                  )}/>
                  <Route path="/city" render={props => (
                    <City/>
                  )}/>
                  <Route path="/order" render={props => (
                    <Order/>
                  )}/>
                  <Route path="/user" render={props => (
                    <User/>
                  )}/>
                  <Route path="/bikeMap" render={props => (
                    <BikeMap/>
                  )}/>

                  {/* 图表系列专题 */}
                  <Route path="/charts/bar" render={props => (
                    <Bar/>
                  )}/>
                  <Route path="/charts/pie" render={props => (
                    <Pie/>
                  )}/>
                  <Route path="/charts/line" render={props => (
                    <Line/>
                  )}/>
                  {/* 富文本 */}
                  <Route path="/rich" render={props => (
                    <Rich/>
                  )}/>

                  {/*   */}
                  <Route path="/permission" render={props => (
                    <Permission/>
                  )}/>

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


