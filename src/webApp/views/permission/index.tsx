import * as React from 'react';
import { Card, Button, Form, Input, Select, Tree, Transfer, Modal } from 'antd';
import ETable from '../../components/ETable/ETable';
import SafeRequest from '../../utils/SafeRequest';
import menuConfig from '../../config/menuConfig';
import Utils from '../../utils/utils';
// 分离的几个功能组件
import PermEditForm from './PermEditForm'; // 显示所有用户列表
import RoleForm from './roleForm'; // 用户权限
import RoleAuthForm from './roleAuthForm'; // 用户授权
// import Item from 'antd/lib/list/Item';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

// interface IProps {}
interface IState {
  list?: any;
  selectedRowKeys?: any;
  isRoleVisible?: any;
  selectedItem?: any;
  isPermVisible?: any;
  menuInfo?: any;
  detailInfo?: any;
  isUserVisible?: any;
  isAuthClosed?: any;
  targetKeys?: any;
  mockData?: any;
}

// 主页面入口。权限控制
export default class Order extends React.Component<object, IState> {
  public roleForm: any;
  public userAuthForm: any;
  public constructor(props) {
    super(props);
  }
  public state: IState = {};

  public render() {
    const columns = [
      {
        title: '角色ID',
        dataIndex: 'id'
      },
      {
        title: '角色名称',
        dataIndex: 'role_name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render: create_time => Utils.formatDate(create_time)
      },
      {
        title: '使用状态',
        dataIndex: 'status',
        render(status) {
          if (status == 1) {
            return '启用';
          } else {
            return '停用';
          }
        }
      },
      {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render: create_time => Utils.formatDate(create_time)
      },
      {
        title: '授权人',
        dataIndex: 'authorize_user_name'
      }
    ];

    return (
      <div>
        <Card>
          <Button type="primary" onClick={this.handleRole}>
            创建角色
          </Button>
          <Button type="primary" onClick={this.handlePermission}>
            设置权限
          </Button>
          <Button type="primary" onClick={this.handleUserAuth}>
            用户授权
          </Button>
        </Card>
        <div className="content-wrap">
          <ETable
            // 表格单选功能封装，直接使用
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            dataSource={this.state.list} // 数据源
            columns={columns} // 数据列头
          />
        </div>
        {/* 创建角色弹框 */}
        <Modal
          title="创建角色"
          visible={this.state.isRoleVisible} // 是否显示窗口
          onOk={this.handleRoleSubmit}
          onCancel={() => {
            // 重置表单
            this.roleForm.props.form.resetFields();
            this.setState({
              isRoleVisible: false
            });
          }}
        >
          <RoleForm wrappedComponentRef={inst => (this.roleForm = inst)} />
        </Modal>

        {/* 权限设置弹框 */}
        <Modal
          title="权限设置"
          visible={this.state.isPermVisible}
          width={600}
          // 当提交的时候，定义的方法
          onOk={this.handlePermEditSubmit}
          // 取消的事件，隐藏窗口
          onCancel={() => {
            this.setState({
              isPermVisible: false
            });
          }}
        >
          <PermEditForm
            wrappedComponentRef={inst => (this.roleForm = inst)}
            // 整体所有权限列表数据
            detailInfo={this.state.detailInfo}
            // 传入当前用户数据，里面数据告诉能有几个权限
            menuInfo={this.state.menuInfo || []}
            // 接收子组件传入过来的数据，（当前用户勾选了哪些列表）
            patchMenuInfo={checkedKeys => {
              // console.log('222222222:',checkedKeys);
              this.setState({
                menuInfo: checkedKeys
              });
            }}
          />
        </Modal>

        <Modal
          title="用户授权"
          visible={this.state.isUserVisible}
          width={800}
          onOk={this.handleUserSubmit}
          onCancel={() => {
            this.setState({
              isUserVisible: false
            });
          }}
        >
          <RoleAuthForm
            wrappedComponentRef={inst => (this.userAuthForm = inst)}
            isClosed={this.state.isAuthClosed}
            detailInfo={this.state.detailInfo}
            targetKeys={this.state.targetKeys}
            mockData={this.state.mockData}
            patchUserInfo={this.patchUserInfo}
          />
        </Modal>
      </div>
    );
  }
  // 组件显示之后，组件第一次渲染完成触发
  public componentWillMount(): void {
    this.requestList();
  }

  // 请求封装，多次会被使用到
  public requestList = () => {
    SafeRequest.requestList(this, '/role/list', {});
  }

  // 角色创建按钮
  public handleRole = () => {
    // 显示弹出窗口控制
    this.setState({
      isRoleVisible: true
    });
  }

  // 角色提交
  public handleRoleSubmit = () => {
    let data = this.roleForm.props.form.getFieldsValue();
    SafeRequest.ajax({
      url: 'role/create',
      data: {
        params: {
          ...data
        }
      }
    }).then(res => {
      // 创建成功后，清空里面的内容
      if (res) {
        // 关闭弹窗
        this.setState({
          isRoleVisible: false
        });
        this.roleForm.props.form.resetFields(); // 重置输入框内状态-清空
        this.requestList();
      }
    });
  }

  // 权限设置按钮事件
  public handlePermission = () => {
    if (!this.state.selectedItem) {
      Modal.info({
        title: '信息',
        content: '请选择一个角色'
      });
      return;
    }
    // 当前选择的对应信息
    this.setState({
      isPermVisible: true,
      detailInfo: this.state.selectedItem
    });
    let menuList = this.state.selectedItem.menus;
    this.setState({
      menuInfo: menuList
    });
  }

  // 权限提交表单
  public handlePermEditSubmit = () => {
    // 获取表单里面的所有值
    let data = this.roleForm.props.form.getFieldsValue();
    data.role_id = this.state.selectedItem.id; // 角色ID
    data.menus = this.state.menuInfo; // 获取当前用户勾选的权限
    // 把数据发送给后台
    SafeRequest.ajax({
      url: '/permission/edit',
      data: {
        params: {
          ...data
        }
      }
    }).then(res => {
      if (res) {
        this.setState({
          isPermVisible: false
        });
        this.requestList();
      }
    });
  }

  // 用户授权
  public handleUserAuth = () => {
    if (!this.state.selectedItem) {
      Modal.info({
        title: '信息',
        content: '未选中任何项目'
      });
      return;
    }
    // 获取用户列表，把选中的角色名称
    this.getRoleUserList(this.state.selectedItem.id);
    this.setState({
      isUserVisible: true,
      isAuthClosed: false,
      detailInfo: this.state.selectedItem
    });
  }
  // 获取当前角色下用户列表
  public getRoleUserList = id => {
    SafeRequest.ajax({
      url: '/role/user_list',
      data: {
        params: {
          id
        }
      }
    }).then(res => {
      if (res) {
        // this.setState({
        //   isUserVisible: true,
        //   detailInfo: Item // 用户名称
        // });
        // 把指定角色下面的所有用户信息进行处理筛选
        this.getAuthUserList(res.result);
      }
    });
  }
  // 筛选目标用户
  public getAuthUserList = dataSource => {
    const mockData = []; // 全量的用户数据
    const targetKeys = []; // 存目标用户
    if (dataSource && dataSource.length > 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < dataSource.length; i++) {
        const data = {
          key: dataSource[i].user_id,
          title: dataSource[i].user_name,
          status: dataSource[i].status
        };
        // 标记1为目标用户，这是为了方便，角色和目标用户可以是二个接口的
        if (data.status == 1) {
          // 组件会根据这个数据一一映射到另一个窗口内
          targetKeys.push(data.key);
        }
        mockData.push(data);
      }
    }
    // 保存起数据 目标用户和所有用户
    this.setState({ mockData, targetKeys });
  }

  // 接收子组件传递过来的数据（穿梭框点击到的key）
  public patchUserInfo = targetKeys => {
    this.setState({
      targetKeys
    });
  }

  // 用户授权提交
  public handleUserSubmit = () => {
    let data = {};
    // 存放 勾选的用户ID
    data.user_ids = this.state.targetKeys || [];
    // 存放  角色ID，只有角色了和勾选 的用户ID二个一起发送给后台
    data.role_id = this.state.selectedItem.id;
    SafeRequest.ajax({
      url: '/role/user_role_edit',
      data: {
        params: {
          ...data
        }
      }
    }).then(res => {
      if (res) {
        this.setState({
          isUserVisible: false
        });
        this.requestList();
      }
    });
  }
}
