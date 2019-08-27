import React from 'react';
import { Card, Button, Table, Form, Select, Modal, message } from 'antd';
import SafeRequest from './../../utils/SafeRequest';
import Utils from './../../utils/utils';
const FormItem = Form.Item;
const Option = Select.Option;

interface IState {
  list: Array<any>;
  isShowOpenCity: boolean;
  pagination?: any;
}

export default class City extends React.Component {
  public state: IState = {
    list: [],
    isShowOpenCity: false
  };
  public params = {
    page: 1
  };

  // 组件渲染完触发
  public componentDidMount() {
    this.requestList();
  }

  // 默认请求我们的接口数据
  public requestList = () => {
    // let _this = this;
    SafeRequest.requestList(this, '/open_city', this.params);
    // SafeRequest
    //   .ajax({
    //     url: '/open_city',
    //     data: {
    //       params: {
    //         page: this.params.page // 加载第一页
    //       }
    //     }
    //   })
    //   .then(res => {
    //     // 遍历加key值，以免警告
    //     let list = res.result.item_list.map((item, index) => {
    //       item.key = index;
    //       return item;
    //     });
    //     this.setState({
    //       list,
    //       // 分页操作函数，
    //       pagination: Utils.pagination(res, current => {
    //         console.log(current)
    //         _this.params.page = current; // current是
    //         _this.requestList(); // 重新在请求一次列表数据
    //       })
    //     });
    //   });
  }

  // 开通城市
  public handleOpenCity = () => {
    this.setState({
      isShowOpenCity: true
    });
  }

  // 城市开通提交
  public handleSubmit = () => {
    let cityInfo = this.cityForm.props.form.getFieldsValue();
    SafeRequest.ajax({
      url: '/city/open',
      data: {
        params: cityInfo
      }
    }).then(res => {
      if (res.code == '0') {
        message.success('开通成功');
        this.setState({
          isShowOpenCity: false
        });
        this.requestList();
      }
    });
  }

  public render() {
    const columns = [
      {
        title: '城市ID',
        dataIndex: 'id'
      },
      {
        title: '城市名称',
        dataIndex: 'name'
      },
      {
        title: '用车模式',
        dataIndex: 'mode',
        render(mode) {
          return mode == 1 ? '停车点' : '禁停区';
        }
      },
      {
        title: '营运模式',
        dataIndex: 'op_mode',
        render(op_mode) {
          return op_mode == 1 ? '自营' : '加盟';
        }
      },
      {
        title: '授权加盟商',
        dataIndex: 'franchisee_name'
      },
      // {
      //   title: '城市管理员',
      //   dataIndex: 'city_admins',
      //   render(arr) {
      //     return arr
      //       .map(item => {
      //         return item.user_name;
      //       })
      //       .join(',');
      //   }
      // },
      {
        title: '城市开通时间',
        dataIndex: 'open_time'
      },
      {
        title: '操作时间',
        dataIndex: 'update_time',
        // render: Utils.formateDate2 //直接使用方式
        render(update_time) {
          return Utils.formatDate(update_time);
        }
      },
      {
        title: '操作人',
        dataIndex: 'sys_user_name'
      }
    ];
    return (
      <div>
        <Card>
          {/* 首部组件也是单独封装，显示查询功能 */}
          <FilterForm />
        </Card>

        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleOpenCity}>
            开通城市
          </Button>
        </Card>
        {/* <div className="content-wrap"> */}
        <Table
          bordered
          columns={columns}
          dataSource={this.state.list}
          pagination={this.state.pagination}
        />
        {/* </div> */}

        {/* 对话框组件，当vssible为true就弹出显示 */}
        <Modal
          title="开通城市"
          visible={this.state.isShowOpenCity}
          onCancel={() => {
            this.setState({
              isShowOpenCity: false
            });
          }}
          onOk={this.handleSubmit}
        >
          {/* 使用下面封装好的组件（也是在对话框内使用的） */}
          <OpenCityForm
            wrappedComponentRef={inst => {
              this.cityForm = inst;
            }}
          />
        </Modal>
      </div>
    );
  }
}

// 顶部的查询选项功能组件封装
class FilterForm extends React.Component {
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="inline">
        <FormItem label="城市">
          {getFieldDecorator('city_id')(
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
              <Option value="3">深圳市</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="用车模式">
          {getFieldDecorator('mode')(
            <Select style={{ width: 120 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">指定停车点模式</Option>
              <Option value="2">禁停区模式</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="营运模式">
          {getFieldDecorator('op_mode')(
            <Select style={{ width: 80 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="加盟商授权状态">
          {getFieldDecorator('auth_status')(
            <Select style={{ width: 100 }} placeholder="全部">
              <Option value="">全部</Option>
              <Option value="1">已授权</Option>
              <Option value="2">未授权</Option>
            </Select>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" style={{ margin: '0 20px' }}>
            查询
          </Button>
          <Button>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
FilterForm = Form.create({})(FilterForm);

// 开通城市弹出窗口内容的封装
class OpenCityForm extends React.Component {
  public render() {
    const formItemLayout = {
      labelCol: {
        span: 5
      },
      wrapperCol: {
        span: 19
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form layout="horizontal">
        <FormItem label="选择城市" {...formItemLayout}>
          {getFieldDecorator('city_id', {
            initialValue: '1'
          })(
            <Select style={{ width: 100 }}>
              <Option value="">全部</Option>
              <Option value="1">北京市</Option>
              <Option value="2">天津市</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="营运模式" {...formItemLayout}>
          {getFieldDecorator('op_mode', {
            initialValue: '1'
          })(
            <Select style={{ width: 100 }}>
              <Option value="1">自营</Option>
              <Option value="2">加盟</Option>
            </Select>
          )}
        </FormItem>
        <FormItem label="用车模式" {...formItemLayout}>
          {getFieldDecorator('use_mode', {
            initialValue: '1'
          })(
            <Select style={{ width: 100 }}>
              <Option value="1">指定停车点</Option>
              <Option value="2">禁停区</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}
OpenCityForm = Form.create({})(OpenCityForm);
