import * as React from 'react';
import * as ReactDOM from 'react-dom';
// tslint:disable-next-line: no-implicit-dependencies
import { AppContainer } from 'react-hot-loader'; // 热更新组件
import { BrowserRouter,Router } from 'react-router-dom'; // 路由最外层包裹层，显示路由页面

import RoutersConfig from './routes'; // 引入路由配置文件

// 状态管理组件配置
import { Provider } from 'react-redux'; // 管理所有状态的
// import App from './views/App'; // 这是显示根组件
import configureStore from './reduxConfig/store/configureStore'; // 封装容器的逻辑
// tslint:disable-next-line
const store = configureStore(); // 封装了容器的业务逻辑,直接()即可

// render页面写成一个函数
const renderApp = (Component) => {
  return ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        {/* 在APP组件内的所有组件都是可以使用store状态的 */}
          <Component/>
      </Provider>
    </AppContainer>,
    // flux实现方式，注入store状态到容器统一管理 provider(ReactRedux) as HTMLElement
    document.getElementById('root')
  );
};
renderApp(RoutersConfig);

/* tslint:disable */
// 热更新组件代码
if (module.hot) {
  // 模块接受处理一个 jsx文件的字符串， 去回调里处理这个jsx，并且更新到挂在元素内，
  module.hot.accept('./routes', () => {
    const NextApp = require('./routes').default; // 和导出到服务端渲染一样加.default
    renderApp(NextApp); // 使用热更新容器加载更新的内容；
  });
}
