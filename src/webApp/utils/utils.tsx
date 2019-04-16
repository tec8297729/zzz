// 公用方法
import React from 'react';
import { Select } from 'antd';
const Option = Select.Option;

class Utils {
  // 处理日期时间
  public formatDate(time, fmt?:string) {
    let dateTime = new Date(time);
    if (!dateTime) return ''; // 传入参数不存在时退出
    let o = {
      'M+': dateTime.getMonth() + 1, // 月份
      'd+': dateTime.getDate(), // 日
      'h+': dateTime.getHours(), // 小时
      'm+': dateTime.getMinutes(), // 分
      's+': dateTime.getSeconds(), // 秒
      'q+': Math.floor((dateTime.getMonth() + 3) / 3), // 季度
      'S' : dateTime.getMilliseconds() // 毫秒
    };
    // yyyy-MM-dd hh:mm:ss.S
    let newDataStr = fmt || 'yyyy-MM-dd hh:mm:ss';
    if (/(y+)/.test(newDataStr)) {
      newDataStr = newDataStr.replace(
        RegExp.$1,
        (dateTime.getFullYear() + '').substr(4 - RegExp.$1.length)
      );
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(newDataStr)) {
        newDataStr = newDataStr.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        );
      }
    }
    return newDataStr;
  }
  public formateDate2(time){
    if(!time)return '';
    let date = new Date(time);

    return date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
  }

  // antd切换页码数据，供多页表格中pagination参数使用的，只是封装了
  public pagination(data, callback) {
    return {
      onChange: current => {
        callback(current);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      showTotal: () => {
        return `共${data.result.total_count}条`;
      },
      showQuickJumper: true
    };
  }

  // 格式化金额,单位:分(eg:430分=4.30元)
  public formatFee(fee, suffix = '') {
    if (!fee) {
      return 0;
    }
    return Number(fee).toFixed(2) + suffix;
  }

  // 格式化公里（eg:3000 = 3公里）
  public formatMileage(mileage, text) {
    if (!mileage) {
      return 0;
    }
    if (mileage >= 1000) {
      text = text || ' km';
      return Math.floor(mileage / 100) / 10 + text;
    } else {
      text = text || ' m';
      return mileage + text;
    }
  }

  // 隐藏手机号中间4位
  public formatPhone(phone) {
    phone += '';
    return phone.replace(/(\d{3})\d*(\d{4})/g, '$1***$2');
  }

  // 隐藏身份证号中11位
  public formatIdentity(number) {
    number += '';
    return number.replace(/(\d{3})\d*(\d{4})/g, '$1***********$2');
  }

  public getOptionList(data) {
    if (!data) {
      return [];
    }
    let options = []; // [<Option value="0" key="all_key">全部</Option>];
    data.map(item => {
      options.push(
        <Option value={item.id} key={item.id}>
          {item.name}
        </Option>
      );
    });
    return options;
  }

  /**
   * ETable 行点击通用函数
   */
  public updateSelectedItem(selectedRowKeys, selectedRows, selectedIds) {
    if (selectedIds) {
      // tslint:disable-next-line
      this.setState({
        selectedRowKeys,
        selectedIds,
        selectedItem: selectedRows
      });
    } else {
      // tslint:disable-next-line
      this.setState({
        selectedRowKeys,
        selectedItem: selectedRows
      });
    }
  }

  // 封装react懒加载组件语法
  public lazyWithPreload(factory) {
    const Component = React.lazy(factory);
    Component.preload = factory;
    return Component;
  }
}
export default new Utils();
