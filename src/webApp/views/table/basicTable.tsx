import React from 'react';
import { Card, Table, Modal, Button, message } from 'antd';
import SafeRequest from '../../utils/SafeRequest'; // 引入封装请求的
import utils from './../../utils/utils';

interface IState {
  name?: String;
  dataSource2: any;
  dataSource?: any;
  selectedRowKeys?: any;
  selectedItem?: any;
  selectedRows?: any;
  pagination?: any;
}
export default class BasicTable extends React.Component<Object> {
  public state: IState = {
    dataSource2: [],
    selectedRowKeys: ''
  };

  public params = {
    page: 1
  };

  // 页面渲染完成后生命周期
  public componentDidMount() {
    // 需要渲染的数据源-mock
    const data: Array<any> = [
      {
        id: '0',
        userName: 'Jack',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '1',
        userName: 'Tom',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      },
      {
        id: '2',
        userName: 'Lily',
        sex: '1',
        state: '1',
        interest: '1',
        birthday: '2000-01-01',
        address: '北京市海淀区奥林匹克公园',
        time: '09:00'
      }
    ];

    // 动态添加key值
    data.map((item, index) => {
      item.key = index;
    });

    // 这是第一个基础表格用的数据
    this.setState({
      dataSource: data
    });

    this.request(); // 获取动态数据
  }

  // 动态获取mock数据
  public request = () => {
    let _that = this;
    SafeRequest.ajax({
      url: '/table/list',
      data: {
        params: {
          page: this.params.page // 更改当前页码
        }
      }
    }).then(res => {
      if (res.code == 0) {
        console.log('请求后数据：', res.result);
        res.result.list.map((item, index) => {
          item.key = index;
        });
        this.setState({
          dataSource2: res.result.list,
          selectedRowKeys: [],
          selectedRows: null,
          // 多页处理，后面函数封装公用组件内去了
          pagination: utils.pagination(res, current => {
            _that.params.page = current;
            this.request();
          })
        });
      }
    });
  }

  // 用户点击单选的事件处理函数
  public onRowClick = (record, index) => {
    let selectKey = [index]; // 用数组是因为多选统一格式
    Modal.info({
      title: '信息',
      content: `用户名：${record.userName},用户爱好：${record.interest}`
    });
    // 存放数据
    this.setState({
      selectedRowKeys: selectKey, // 存放当前行的索引
      selectedItem: record // 获取当前行每一项值
    });
  }

  // 多选执行删除动作
  public handleDelete = () => {
    let rows = this.state.selectedRows; // 获取当前选中的数据
    let ids = [];
    // 遍历里面每个选中的id
    rows.map(item => {
      ids.push(item.id);
    });

    // 给个提示框，确认一次删除数据
    Modal.confirm({
      title: '删除提示',
      content: `您确定要删除这些数据吗？${ids.join(',')}`,
      onOk: () => {
        message.success('删除成功');
        this.request();
      }
    });
  }

  public render() {
    // 定义表头列需要显示的内容数据
    // 和源数据渲染一一对应，目前是八列，单数据每个对象都要有八个指定字段
    const columns = [
      {
        title: 'id',
        key: 'id',
        dataIndex: 'id'
      },
      {
        title: '用户名', // 界面显示的字段
        key: 'userName',
        dataIndex: 'userName' // 数据源的字段
      },
      {
        title: '性别',
        key: 'sex',
        dataIndex: 'sex',
        // 处理当前字段，antd带的功能
        render(sex) {
          return sex == 1 ? '男' : '女';
        }
      },
      {
        title: '状态',
        key: 'state',
        dataIndex: 'state',
        render(state) {
          let config = {
            '1': '咸鱼一条',
            '2': '风华浪子',
            '3': '北大才子',
            '4': '百度FE',
            '5': '创业者'
          };
          return config[state];
        }
      },
      {
        title: '爱好',
        key: 'interest',
        dataIndex: 'interest',
        render(abc) {
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
          return config[abc];
        }
      },
      {
        title: '生日',
        key: 'birthday',
        dataIndex: 'birthday'
      },
      {
        title: '地址',
        key: 'address',
        dataIndex: 'address'
      },
      {
        title: '早起时间',
        key: 'time',
        dataIndex: 'time'
      }
    ];
    const selectedRowKeys = this.state.selectedRowKeys; // 获取当前行数据

    // 指定单选多选，用于单选列表用
    const rowSelection = {
      type: 'radio',
      selectedRowKeys
    };
    // 多选框列表使用
    const rowCheckSelection = {
      type: 'checkbox', // 复选框类型
      selectedRowKeys, // 告诉哪些被选中
      // 点击选择中框事件
      onChange: (selectedRowKeys, selectedRows) => {
        // 第一个参数选中的行，第二参数此行内的参数（数组）
        // 如果要删除指定id数据，就要先处理第二个参数，保存相应的id
        this.setState({
          selectedRowKeys,
          selectedRows
        });
      }
    };
    return (
      <div>
        <Card title="基础表格">
          <Table
            bordered
            columns={columns} // 定义表头数据
            dataSource={this.state.dataSource} // 渲染表格的数据
            pagination={false} // 关闭不需要分页
          />
        </Card>

        <Card title="动态数据渲染表格-Mock" style={{ margin: '10px 0' }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>

        <Card title="Mock-单选" style={{ margin: '10px 0' }}>
          <Table
            bordered
            rowSelection={rowSelection}
            // 单选点击事件
            onRow={(record, index) => {
              return {
                // 添加了一个点击事件
                onClick: () => {
                  // 自定义事件处理，把当前行所有数据传入，以及当前索引
                  this.onRowClick(record, index);
                }
              };
            }}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>

        <Card title="Mock-多选" style={{ margin: '10px 0' }}>
          <div style={{ marginBottom: 10 }}>
            <Button onClick={this.handleDelete}>删除</Button>
          </div>
          <Table
            bordered
            rowSelection={rowCheckSelection}
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={false}
          />
        </Card>

        <Card title="Mock-表格分页" style={{ margin: '10px 0' }}>
          <Table
            bordered
            columns={columns}
            dataSource={this.state.dataSource2}
            pagination={this.state.pagination}
          />
        </Card>
      </div>
    );
  }
}
