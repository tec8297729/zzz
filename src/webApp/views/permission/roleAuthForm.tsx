import * as React from 'react';
import { Card, Button, Form, Input, Select, Tree, Transfer, Modal } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
interface IProps {
  detailInfo?: any;
  targetKeys?: any;
  patchUserInfo?: any;
  mockData?: any;
}
// interface IState {}

// 用户授权
class RoleAuthForm extends React.Component<IProps> {
  // 搜索过滤功能事件
  public filterOption = (inputValue, option) => {
    // 根据标题内容匹配相同的返回，可根据实际情况更改
    return option.title.indexOf(inputValue) > -1;
  }
  // 穿梭框点击事件处理，当前点击的keys源
  public handleChange = targetKeys => {
    // 把当前的点击的数据源 传递给父组件事件
    this.props.patchUserInfo(targetKeys);
  }

  public render() {
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 }
    };
    const detail_info = this.props.detailInfo;
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称：" {...formItemLayout}>
          <Input disabled maxLength={8} placeholder={detail_info.role_name} />
        </FormItem>
        <FormItem label="选择用户：" {...formItemLayout}>
          {/* 穿梭框组件 */}
          <Transfer
            listStyle={{ width: 200, height: 400 }}
            // 数据源
            dataSource={this.props.mockData}
            // 左右二边窗口标题
            titles={['待选用户', '已选用户']}
            // 搜索功能
            showSearch
            // 搜索功能区，默认显示的文字
            searchPlaceholder="输入用户名"
            // 搜索过滤功能
            filterOption={this.filterOption}
            targetKeys={this.props.targetKeys} // 显示在右侧框数据的key集合
            // 处理点击事件
            onChange={this.handleChange}
            render={item => item.title}
          />
        </FormItem>
      </Form>
    );
  }
}

export default (RoleAuthForm = Form.create({})(RoleAuthForm));
