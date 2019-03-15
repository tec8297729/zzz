import React from 'react';
import {
  Card,
  Button,
  Table,
  Form,
  Input,
  Checkbox,
  Select,
  Radio,
  Icon,
  message,
  Modal,
  DatePicker
} from 'antd';
import SafeRequest from '../../utils/SafeRequest';
import Utils from '../../utils/utils';
import BaseForm from '../../components/BaseForm/BaseForm';
import ETable from '../../components/ETable/ETable';
import Moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

interface IState {
  list: [];
  selectedItem?: any;
  selectedRowKeys?: any;
  pagination?: any;
  type?: any;
  userInfo?:any,
  title?:any,
  isVisible?:any,
}
export default class User extends React.Component {
  public state: IState = {
    list: []
  };
  public userForm: any;
  public params = {
    page: 1
  };


  // 请求接口
  public requestList = () => {
    SafeRequest.requestList(this, '/user/list', this.params);
    // SafeRequest.ajax({
    //   url: '/user/list',
    //   data: {
    //     params: {
    //       page: this.params.page
    //     }
    //   }
    // }).then(res => {
    //   let _this = this;
    //   this.setState({
    //     list: res.result.list.map((item, index) => {
    //       item.key = index;
    //       return item;
    //     }),
    //     pagination: Utils.pagination(res, current => {
    //       _this.params.page = current;
    //       _this.requestList();
    //     })
    //   });
    // });
  }

  // 页面渲染完触发
  public componentDidMount() {
    this.requestList();
  }

  // 操作员工（创建或删除功能等封装）
  public handleOperator = type => {
    let item = this.state.selectedItem;
    if (type == 'create') {
      this.setState({
        title: '创建员工',
        isVisible: true,
        type
      });
    } else if (type == 'edit' || type == 'detail') {
      if (!item) {
        Modal.info({
          title: '信息',
          content: '请选择一个用户'
        });
        return;
      }
      this.setState({
        title: type == 'edit' ? '编辑用户' : '查看详情',
        isVisible: true,
        userInfo: item,
        type
      });
    } else if (type == 'delete') {
      if (!item) {
        Modal.info({
          title: '信息',
          content: '请选择一个用户'
        });
        return;
      }
      Modal.confirm({
        title: '确定要删除此用户吗？',
        content: '是否要删除当前选中的员工',
        // 使用箭头函数，this指向自己的组件功能
        onOk: () => {
          SafeRequest.ajax({
            url: '/user/delete',
            data: {
              params: {
                id: item.id
              }
            }
          }).then(res => {
            if (res.code == 0) {
              // 设置关闭弹框
              this.setState({
                isVisible: false
              });
              // 重新获取数据
              this.requestList();
            }
          });
        }
      });
    }
  }

  // 创建员工提交
  public handleSubmit = () => {
    let type = this.state.type;
    // this.userForm取的是当前组件，props是取里面组件的数据
    let data = this.userForm.props.form.getFieldsValue();
    SafeRequest.ajax({
      url: type == 'create' ? '/user/add' : '/user/edit',
      data: {
        params: {
          ...data
        }
      }
    }).then(res => {
      if (res.code == 0) {
        this.setState({
          isVisible: false
        });
        this.requestList();
      }
    });
  }

  public render() {
    const columns = [
      {
        title: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名',
        dataIndex: 'userName'
      },
      {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
          return sex == 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子一枚',
            '4': '百度FE',
            '5': '创业者'
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
          let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸'
          };
          return config[interest];
        }
      },
      {
        title: '爱好',
        dataIndex: 'isMarried',
        render(isMarried) {
          return isMarried ? '已婚' : '未婚';
        }
      },
      {
        title: '生日',
        dataIndex: 'birthday'
      },
      {
        title: '联系地址',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        dataIndex: 'time'
      }
    ];

    // 定义查看员工窗口不显示底部按钮功能
    let footer = {};
    if(this.state.type == 'detail'){
      footer = {
        footer:null
      };
    }

    return (
      <div>
        <Card>
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
              <Input type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登 录</Button>
            </FormItem>
          </Form>
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Button
            type="primary"
            icon="plus"
            onClick={() => this.handleOperator('create')}
          >
            创建员工
          </Button>
          <Button icon="edit" onClick={() => this.handleOperator('edit')}>
            编辑员工
          </Button>
          <Button onClick={() => this.handleOperator('detail')}>
            员工详情
          </Button>
          <Button
            type="danger"
            icon="delete"
            onClick={() => this.handleOperator('delete')}
          >
            删除员工
          </Button>
        </Card>
        <div className="content-wrap">
          {/* 列表组件表格 */}
          <ETable
            columns={columns}
            updateSelectedItem={Utils.updateSelectedItem.bind(this)}
            selectedRowKeys={this.state.selectedRowKeys}
            dataSource={this.state.list}
            pagination={this.state.pagination}
          />
        </div>

        {/* 弹出提示框组件 */}
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          onOk={this.handleSubmit}
          width={800}
          // footer只要有值底部就不显示，所以要单独提取出来判断设置
          {...footer} // 底部按钮菜单是否显示
          onCancel={() => {
            this.userForm.props.form.resetFields();
            this.setState({
              isVisible: false,
              userInfo: ''
            });
          }}
        >
          {/* 创建员工弹出框 */}
          <UserForm
            userInfo={this.state.userInfo}
            type={this.state.type}
            // 把当前的组件作用域挂载到 this.userForm上面去，其它组件方便使用
            wrappedComponentRef={inst => (this.userForm = inst)}
          />
        </Modal>
      </div>
    );
  }
}

interface IUserFormProps{
  form?:any,
  userInfo?:any,
  type?:any,
  wrappedComponentRef?:any,
}
class UserForm extends React.Component<IUserFormProps> {
  public getState = state => {
    return {
      '1': '咸鱼一条',
      '2': '风华浪子',
      '3': '北大才子一枚',
      '4': '百度FE',
      '5': '创业者'
    }[state];
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    const userInfo = this.props.userInfo || {};
    const type = this.props.type;

    return (
      <Form layout="horizontal">
        <FormItem label="姓名" {...formItemLayout}>
          {/* 做一下判断。如果是指定类型（编辑类），那么就把指定参数传入进来显示 */}
          {userInfo && type == 'detail'
            ? userInfo.username
            : getFieldDecorator('user_name', {
                initialValue: userInfo.username
              })(<Input type="text" placeholder="请输入姓名" />)}
        </FormItem>
        <FormItem label="性别" {...formItemLayout}>
          {userInfo && type == 'detail'
            ? userInfo.sex == 1
              ? '男'
              : '女'
            : getFieldDecorator('sex', {
                initialValue: userInfo.sex
              })(
                <RadioGroup>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </RadioGroup>
              )}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {userInfo && type == 'detail'
            ? this.getState(userInfo.state)
            : getFieldDecorator('state', {
                initialValue: userInfo.state
              })(
                <Select>
                  <Option value={1}>咸鱼一条</Option>
                  <Option value={2}>风华浪子</Option>
                  <Option value={3}>北大才子一枚</Option>
                  <Option value={4}>百度FE</Option>
                  <Option value={5}>创业者</Option>
                </Select>
              )}
        </FormItem>
        <FormItem label="生日" {...formItemLayout}>
          {userInfo && type == 'detail'
            ? userInfo.birthday
            : getFieldDecorator('birthday', {
                initialValue: Moment(userInfo.birthday)
              })(<DatePicker />)}
        </FormItem>
        <FormItem label="联系地址" {...formItemLayout}>
          {userInfo && type == 'detail'
            ? userInfo.address
            : getFieldDecorator('address', {
                initialValue: userInfo.address
              })(<Input.TextArea rows={3} placeholder="请输入联系地址" />)}
        </FormItem>
      </Form>
    );
  }
}
UserForm = Form.create({})(UserForm);
