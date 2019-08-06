import React, { Component } from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import moment from 'moment';
import router from 'umi/router';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import MerchantsTable from '@/components/MerchantsTable/MerchantsTable'; // 表格组件
import ManagementChannelsSearch from '@/components/ManagementChannelsSearch/ManagementChannelsSearch'; // 搜索组件dva版
import styles from './Channels.less';

let newModelsName = ''; // 读取models中的名称

// store状态管理内读取值
@connect(state => ({
  loading: state.loading.models[newModelsName],
  dataSource: (state[newModelsName] && state[newModelsName].dataList) || [], // 表格数据
  pageInfo: state[newModelsName] && state[newModelsName].pageInfo, // 当前分页信息
  currPageNo: state[newModelsName] && state[newModelsName].currPageNo, // 当前页码
  // roleUser: 'admin', // 当前角色--权限控制页面（调试用）
}))
class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // 表头
    this.columns = [
      {
        title: '序号',
        dataIndex: 'id',
        // width: 50,
        align: 'center',
        render: (text, record, index) => `${index + 1}`,
      },
      {
        title: '渠道编号',
        // width: 60,
        dataIndex: 'channelNo', // 列数据在数据项中对应的 key
        align: 'center', // 居中对齐
      },
      {
        title: '渠道名称',
        // width: 110,
        dataIndex: 'channelName',
        align: 'center',
      },
      {
        title: '渠道类型',
        // width: 110,
        dataIndex: 'channelType',
        align: 'center',
        render: text => {
          const auditState = {
            1: '机构',
            2: '个人',
          };
          return auditState[text] || '';
        },
      },
      {
        title: '提交时间',
        // width: 100,
        dataIndex: 'commitTime',
        align: 'center',
        render: text => {
          return /[0-9]$/.test(text) ? <div>{moment(text).format('YYYY年MM月DD日')}</div> : text;
        },
      },
      {
        title: '管理员',
        // width: 100,
        dataIndex: 'bdName',
        align: 'center',
      },
      {
        title: '上一操作',
        // width: 90,
        dataIndex: 'auditStatus',
        align: 'center',
        render: text => {
          const auditState = {
            0: '提交',
            1: '通过',
            2: '回退',
            3: '拒绝',
          };
          return auditState[text] || '';
        },
      },
      {
        title: '启用状态',
        // width: 80,
        dataIndex: 'enabled',
        align: 'center',
        render: text => {
          const data = {
            0: '禁用',
            1: '启用',
          };
          return data[text] || '未知';
        },
      },
      {
        title: '操作',
        width: 100,
        dataIndex: 'operation',
        align: 'center',
        fixed: 'right',
        // 用于生成自定义内容区域，最右侧 删除按钮等（当前行值，当前数据，行索引）
        render: (text, record) => {
          return (
            <div className={styles.btn_wrap}>
              {// TODO: 可能根据不用状态显示此按钮
              record.operation !== -1 ? (
                <div
                  className={styles.table_btn}
                  onClick={() => this.handleTableItem(text, record)}
                >
                  处理
                </div>
              ) : null}
            </div>
          );
        },
      },
    ];
  }

  componentWillMount() {
    const { dispatch, modelsName } = this.props;
    newModelsName = modelsName; // 外部传入的models名称
    // 显示所有内容
    dispatch({
      type: `${newModelsName}/fetchSearch`,
      payload: {},
    });
  }

  // 新建渠道事件
  handleAddTable = () => {
    // 跳转新建门店页面
    router.push('/merchant-management/channels-add');
  };

  // 处理事件按钮
  handleTableItem = (text, record) => {
    const { roleUser, operationUrl } = this.props;

    // 跳转渠道审核
    router.push({
      pathname: `${operationUrl}` || `/merchant-management/channels/channels-audit`, // 跳转到指定页面
      query: {
        id: record.id || '',
        channelNo: record.channelNo || '', // 请求详情页面需要字段
        // 审核节点 (管理界面:1.BD 2.运营审核 3.风控初审 4.风控复审。维护页面:5)
        auditNode: record.auditNode || '',
        roleUser, // 进入审核页面角色
      },
    });
  };

  // 渲染
  render() {
    const {
      dataList,
      pageInfo,
      currPageNo, // 当前页数dva层
      roleUser, // 使用角色
      modelsName, // dva派发名称
    } = this.props;

    return (
      <PageHeaderWrapper>
        {/* 搜索表单 */}
        <ManagementChannelsSearch
          modelsName={modelsName} // 指定models层名称，共享搜索数据给table表单
        />

        <div className={styles.zzq_table_connect_wrap}>
          {/* 只有BD角色才显示新建按钮 */}
          {roleUser === 'bd' ? (
            <div className={styles.table_topBtn_wrap}>
              <div className={styles.card_btn}>
                <Button type="primary" size="small" icon="plus" onClick={this.handleAddTable}>
                  新建
                </Button>
              </div>
            </div>
          ) : null}

          <MerchantsTable
            modelsName={modelsName} // 获取models层中的dataList中数据
            columns={this.columns} // 表头
            scroll={{ x: '120%' }} // 横向滚动
            optsTable={{
              pagination: {
                position: 'bottom',
                size: 'large',
                showQuickJumper: true, // 跳转至多少页功能
                showSizeChanger: true, // 显示每页条数功能
                // defaultPageSize: 10, // 默认的每页条数
                current: currPageNo, // 当前页数dva层
                total: (pageInfo && pageInfo.recordCount) || 0, // 总数
                showTotal: () => {
                  return `共${pageInfo && pageInfo.recordCount ? pageInfo.recordCount : '0'}条`;
                },
              },
            }}
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default Channels;
