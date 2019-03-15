import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import menuList from '../../config/menuConfig'; // 权限控制数据
import './NavLeft.less';
// redux引用的功能
import { connect } from 'react-redux';
import { switchMenu } from '../../reduxConfig/actions'; // 引入需要使用的actions动作

const SubMenu = Menu.SubMenu;

interface IProps {
  switchMenu?:any;
  dispatch?:any;
}
interface IState {
  menuTreeNode?: any;
  currentKey?:any;
}

// 给组件定义props和state的每个数据类型
class App extends React.Component<IProps>{
  public constructor(props) {
    super(props);
  }
  // 可以直接在组件内声明state的每个类型
  public state:IState = {
    menuTreeNode:'',
    currentKey: ['/home']
  };
  public render() {
    return (
      <div>
        <div className="logo">
          <h1 className="logo-title">后台系统</h1>
        </div>
        <Menu theme="dark"
          // 当前选中的菜单项
          selectedKeys={this.state.currentKey}
          onClick={this.handleMenuName}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }

  // 组件显示之后，组件第一次渲染完成触发
  public componentWillMount(): void {
    // 处理页面路由地址，只获取最前面部份参数，用于redux，右侧显示文字也变类目
    // let currentKey = window.location.hash.replace(/#|\?.*$/g,''); // 获取页面地址相当于默认值选中右侧菜单项
    const menuTreeNode = this.renderMenu(menuList); // 所有菜单的数据
    // 存放数据
    this.setState({
      menuTreeNode,
      // currentKey
    });
  }

  // 菜单渲染
  public renderMenu(data){
    return data.map((item)=>{
      // 子节点还有的时候，在递归循环一次
      if(item.children){
        return (
          <SubMenu title={item.title} key={item.key}>
            {this.renderMenu(item.children)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  }

  // 当前切换菜单点击事件
  public handleMenuName = (item)=>{
    const { dispatch } = this.props;
    // 派发任务，传入action动作类型,动作内传入了数据（当前标签标题）
    dispatch( switchMenu(item.item.props.title) );
    // 存放当前选中的key，用来左侧显示选中状态
    this.setState({
      currentKey: [item.key]
    });
  }
}


export default connect( )(App);
