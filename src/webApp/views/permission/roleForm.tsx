import * as React from 'react';
import { Card, Button, Form, Input, Select, Tree, Transfer, Modal } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

interface RoleFormProps {
  form?: any;
  wrappedComponentRef?: any;
}
// interface IState {}

// 角色创建
class RoleForm extends React.Component<RoleFormProps> {
  public render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 }
    };
    return (
      <Form layout="horizontal">
        <FormItem label="角色名称" {...formItemLayout}>
          {getFieldDecorator('role_name', {
            initialValue: ''
          })(<Input type="text" placeholder="请输入角色名称" />)}
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator('state', {
            initialValue: 1
          })(
            <Select>
              <Option value={1}>开启</Option>
              <Option value={0}>关闭</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default RoleForm = Form.create({})(RoleForm);
