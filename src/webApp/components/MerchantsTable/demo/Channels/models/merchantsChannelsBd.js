import Api from '@/services/api';

const { getMerchantChannelList } = Api;

const dvaName = 'merchantsChannelsBd';
// 审核节点(管理界面:1.BD 2.运营审核 3.风控初审 4.风控复审。维护页面:auditNode=5)
const auditNode = 1; // 搜索时候显示指定列表

export default {
  namespace: 'merchantsChannelsBd',
  state: {
    dataList: [],
    currPageNo: 1, // 页码
    pageSize: 10, // 默认显示条数（请求数量）
    pageInfo: {}, // 请求后是否有分页等参数
    searchData: {}, // 搜索关键字
  },

  effects: {
    *fetchSearch({ payload }, { call, put, select }) {
      const dvaState = yield select(state => state[dvaName]);
      const newPayload = {
        ...payload,
        currPageNo: 1,
        pageSize: dvaState.pageSize,
        auditNode,
        needUserId: 1, // 用户id固定参数, node层处理
      };
      const response = yield call(getMerchantChannelList, newPayload); // 查询接口返回数据
      // console.log('请求层', response);

      // 搜索关键字数据
      const searchData = {
        ...payload, // 只存有值的变量，传空字段后端未处理，无显示
        // channelNo: payload.channelNo || '', // 渠道编号
        // channelName: payload.channelName || '', // 渠道名称
        // bdName: payload.bdName || '', // BD姓名
        // bdMobile: payload.bdMobile || '', // BD电话
        // channelType: payload.channelType || '', // 渠道类型
        // commitStartTime: payload.startDate || '',
        // commitEndTime: payload.endDate || '',
      };

      if (response.succeed) {
        yield put({
          type: 'saveSearch',
          payload: response.data,
          searchData,
        });
      }
    },

    *fetchPage({ payload }, { call, put, select }) {
      const dvaState = yield select(state => state[dvaName]);
      const newPayload = {
        ...payload,
        ...dvaState.searchData, // 追加搜索关键字
        auditNode,
        needUserId: 1, // 用户id固定参数, node层处理
      };

      const response = yield call(getMerchantChannelList, newPayload); // 查询接口返回数据
      if (response.succeed) {
        yield put({
          type: 'savePageData',
          payload: response.data,
          currPageNo: payload.currPageNo, // 记录当前页码
        });
      }
    },
  },

  reducers: {
    saveSearch(state, action) {
      return {
        ...state,
        dataList: action.payload.items, // 表格数据
        currPageNo: 1, // 重置页码
        // pageSize: action.payload.pageSize,
        pageInfo: action.payload.pageInfo,
        searchData: action.searchData,
      };
    },

    // 分页请求
    savePageData(state, action) {
      const newState = state;
      newState.dataList = action.payload.items; // 表格数据
      newState.currPageNo = action.currPageNo; // 重置最新点击页码
      newState.pageSize = action.payload.pageInfo.pageSize; // 更新显示条数
      return newState;
    },

    refresh(state) {
      return { ...state };
    },
  },
};
