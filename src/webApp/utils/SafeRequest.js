import JsonP from 'jsonp';
import axios from 'axios';
import {Modal} from 'antd';
import Utils from './utils';


export default class SafeRequest{

  // 封装请求接口，请求列表数据请求处理
  static requestList(_this, url, params, isMock){
    let data = {
      params,
      isMock // 根据此值判断是否使用mock数据
    }
    this.ajax({
      url,
      data,
    }).then((data)=>{
      if(data && data.result){
        // 获取数据中的item_list字段循环
        let list = data.result.item_list.map((item,index)=>{
          item.key = index;
          return item;
        });
        // this作用域是传入进来的
        _this.setState({
          list,
          pagination: Utils.pagination(data, current => {
            _this.params.page = current;
            _this.requestList();
          })
        })
      }
    });
  }

  // 跨域请求接口
  static jsonp(opts) {
    return new Promise((resolve, reject) => {
      JsonP(opts.url, {
        param: 'callback',
      }, (err, response) => {
        // 请求错误时
        if (response.status == 'success') {
          resolve(response);
        } else {
          reject(response.messsage);
        }
      });
    });
  }

  // 封装axios请求的mock数据
  static ajax(options) {
    let loading;
    let baseApi;
    // 当设置了isShowLoading参数false就不显示加载数据图标层
    if(options.data && options.data.isShowLoading !== false){
      loading = document.getElementById('ajaxLoading'); // 请求时loading处理
      loading.style.display = 'block'; // 显示
    }
    // 模拟数据直接读取
    if(options.isMock){
      // baseApi = 'https://www.easy-mock.com/mock/5c822903e2062b28ed86bda7/mockapi';
    }else{
      // 不使用mock数据的正式环境，请求前缀
      // baseApi = 'https://www.easy-mock.com/mock/5a7278e28d0c633b9c4adbd7/api';
    }
    baseApi = '/'; // 直接使用node端接口，要node开启服务

    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: 'get',
        baseURL: baseApi,
        // timeout:5000,
        params: (options.data && options.data.params) || '', // 有数据才存，否则空
      }).then((res) => {
        // 开关显示加载中的一层
        if(options.data && options.data.isShowLoading !== false){
          loading = document.getElementById('ajaxLoading'); // 请求时loading处理
          loading.style.display = 'none'; // 关闭加载图标
        }

        if (res.status == 200) {
          // 请求成功后
          let resData = res.data;
          if (resData.code == 0) {
            resolve(resData); // 成功处理返回数据
          } else {
            // 发送antd插件提示消息,这是请求成功，但是其它失败原因
            Modal.info({
              title: '提示',
              content: res.msg
            })
          }
        } else {
          loading.style.display = 'none'; // 关闭加载图标
          reject(res.data); // 请求失败
        }
      })

    })
  }
}
