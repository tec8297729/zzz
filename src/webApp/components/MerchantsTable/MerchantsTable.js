import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Row, Col, Pagination, Button, notification, Modal } from 'antd';
import styles from './MerchantsTable.less';
import Api from '@/services/api';

// tabel表格组件--dva版本存储数据的
/**
 * @param {Array} columns 表头字段
 * @param {String} modelsName 表格数据存在(dva)models层的dataList中（传入models的名称即可）
 * @param {Object} optsTable 传入所有Table原属性字段，可覆盖默认配置
 * @param {Number} total 数据总数量
 * @param {Boolean} rowSelection 是否开启勾选功能，默认关闭，需要父组件绑定onSelectChange函数接收勾选的数据
 * @param {String} rowSelectionType 勾选功能类型 radio单选 checkbox多选功能（默认单选）
 * @example 组件使用案例:
  <MerchantsTable
    modelsName="merchantsStoresSearch" // 获取models层中的dataList中数据
    // 页面类型参数 storesMaintain门店维护、channelMaintain渠道维护、agencyManagement中介页面显示
    pageType="channelMaintain" // 页面类型(指定类型才可以显示批量按钮)
    // 批量请求接口类型 merchant-商户门店 channel-商户渠道 mediumChannel-中介渠道
    condition="channel"
    columns={this.columns} // 表头
    rowSelection // 开启单/多选功能
    rowSelectionType={"checkbox"} // 多选功能
    onSelectChange={this.onSelectChange} // 勾选事件
    // 直接使用Tabel原参数API方式
    optsTable={{
      pagination: { // 分页功能中的某一个API
        showTotal: () => {
          return `共222条`
        },
      }
    }}
  />
 */
/* 以下在dva中必带的参数。刷新state
  reducers: {
    refresh(state) {
      return {...state};
    }
  },
*/
let newModelsName = ''; // 动态控制获取哪个models名称的数据（外部传入）
const confirm = Modal.confirm;

// store状态管理内读取值
@connect(state => ({
  loading: state.loading.models[newModelsName],
  dataSource: (state[newModelsName] && state[newModelsName].dataList) || [],
  pageSize: state[newModelsName] && state[newModelsName].pageSize,
  searchData: state[newModelsName] && state[newModelsName].searchData, // 搜索关键字参数
}))
class MerchantsTable extends Component {
  rowSelectionData = null; // 单/多选参数配置

  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [], // 单选多选
      hasSelected: false, // 控制禁用按钮
      selectedRowDatas: [], // 当前勾选的所有row数据
    };
  }

  componentWillMount() {
    const { modelsName, dispatch } = this.props;
    newModelsName = modelsName; // 外部传入的models名称
    // 刷新获取表格数据源
    dispatch({
      type: `${newModelsName}/refresh`,
    });
  }

  // 批量启用
  handleTableEnable = () => {
    confirm({
      title: '您的操作将会启用所选门店/门店，请确认',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk: () => {
        // console.log('启用OK');
        this.merchantBatchState(1); // 提交服务端接口
      },
    });
  };

  // 批量禁用
  handleTableDisable = () => {
    confirm({
      title: '您的操作将会禁用所选渠道/门店，请确认',
      centered: true,
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        // console.log('禁用OK');
        this.merchantBatchState(0); // 提交服务端接口
      },
      // onCancel () {},
    });
  };

  // 批量修改接口（传入 0为批量禁用  1批量启用）
  merchantBatchState = async stateFlag => {
    const { selectedRowDatas } = this.state; // 当前勾选数据
    const { dispatch, searchData, modelsName, condition } = this.props;

    const subData = {
      // 请求类型 merchant-商户门店 channel-商户渠道 mediumChannel-中介渠道
      condition: condition || 'merchant',
      ids: [], // 禁用列表
      state: stateFlag || 0, // 启用状态 0-否 1-是
    };
    subData.ids = selectedRowDatas.map(item => item.id); // 过滤-选择的当前id

    const res = await Api.merchantBatchState(subData); // 批量启用/禁用接口
    const titleMsg = {
      0: '禁用成功',
      1: '启用成功',
    };
    if (res && res.succeed) {
      this.openNotification(titleMsg[stateFlag], null, 'success');
    } else if (res) {
      this.openNotification(`错误${res.errorCode}`, res.errorMessage);
    }
    console.log('res', res);
    // console.log('dva搜索', searchData.auditState);

    // 显示所有内容（刷新数据）
    dispatch({
      type: `${modelsName}/fetchSearch`,
      payload: {
        ...searchData,
        auditState: searchData.auditState, // 显示审核通过
      },
    });

    this.setState({
      selectedRowKeys: [], // 重置清空勾选
    });

    console.log('勾选数据', this.state.selectedRowKeys);
  };

  // 点击表格单选事件
  onSelectChange = (selectedRowKeys, selectedRowData) => {
    // 交给父组件处理
    // this.props.onSelectChange(selectedRowKeys, selectedRowData);
    // 更新勾选视图
    this.setState({ selectedRowKeys });
    const hasSelected = selectedRowKeys.length > 0;
    this.setState({
      selectedRowDatas: selectedRowData, // 当前选择的所有数据
      hasSelected, // 启用 禁用按钮 可用状态
    });
    // console.log('勾选', selectedRowData);
  };

  // 页码改变的回调
  onPageChange = (page, pageSize) => {
    this.pageFetch(page, pageSize);
  };

  // 下拉显示多少条一页-回调
  onShowSizeChange = (current, size) => {
    this.pageFetch(current, size);
  };

  // 分页请求方法(页码, 请求数)
  pageFetch = (page, pageSize) => {
    const { modelsName, dispatch } = this.props;
    newModelsName = modelsName; // 外部传入的models名称
    // 刷新获取表格数据源
    dispatch({
      type: `${newModelsName}/fetchPage`,
      payload: {
        currPageNo: page, // 页码
        pageSize, // 请求数量
      },
    });
  };

  // 全局提示信息窗口，默认显示提示类型error、success
  openNotification = (title, des, iconType = 'error') => {
    notification[iconType]({
      message: title || null,
      description: des,
    });
  };

  render() {
    const {
      loading,
      dataSource,
      columns,
      rowSelection,
      rowSelectionType,
      optsTable,
      pageSize,
      scroll,
      pageType, // 页面类型
    } = this.props; // 表格数据源、表头

    // 开启勾选功能按钮
    if (rowSelection) {
      // 表单选择功能配置
      this.rowSelectionData = {
        selectedRowKeys: this.state.selectedRowKeys, // 选中的key数组，配合onChange
        onChange: this.onSelectChange, // 点击选择事件
        type: rowSelectionType || 'radio', // radio单选 checkbox多选功能
      };
    }

    return (
      <Fragment>
        {/* 门店维护、渠道维护、中介页面显示 */}
        {pageType === 'storesMaintain' ||
        pageType === 'channelMaintain' ||
        pageType === 'agencyManagement' ? (
          <Fragment>
            <div className={styles.table_topBtn_wrap}>
              <Button
                onClick={this.handleTableEnable}
                type="primary"
                size="small"
                disabled={!this.state.hasSelected}
              >
                启用
              </Button>
              <Button
                onClick={this.handleTableDisable}
                size="small"
                disabled={!this.state.hasSelected}
              >
                禁用
              </Button>

              {/* 追加显示子组件 */}
              {this.props.children}
            </div>
          </Fragment>
        ) : null}

        <Row>
          <Col span={24}>
            <Table
              bordered // 带边框
              dataSource={dataSource} // 渲染的数据源
              columns={columns} // 表格列(头部)的配置描述
              rowKey={(record, index) => record.key || index} // key值
              loading={loading} // 组件加载中控制
              rowSelection={this.rowSelectionData} // 单多选功能，外部不可覆盖
              pagination={false}
              className={dataSource.length > 0 ? 'scroll-table' : ''} // 配合指定class才可以有横向滚动条
              scroll={scroll ? { ...scroll } : {}} // 横向滚动
              // pagination={{
              //   position: 'bottom',
              //   size: 'large',
              //   defaultPageSize: 10, // 默认的每页条数
              //   showQuickJumper: true, // 跳转至多少页功能
              //   showSizeChanger: true, // 显示每页条数功能
              //   // showTotal: () => {
              //   //   return `共${total}条`
              //   // },
              // }}
              // {...this.props.optsTable}
            />

            <div className={styles.table_page}>
              {optsTable.pagination ? (
                <Pagination
                  showQuickJumper={false} // 跳转至多少页功能
                  showSizeChanger={false} // 显示每页条数功能
                  // defaultPageSize={2} // 默认的每页条数-调试
                  {...optsTable.pagination}
                  onChange={this.onPageChange} // 页码改变的回调(page,pageSize)
                  onShowSizeChange={this.onShowSizeChange} // pageSize变化的回调
                />
              ) : null}
            </div>
          </Col>
        </Row>
      </Fragment>
    );
  }
}

export default MerchantsTable;
