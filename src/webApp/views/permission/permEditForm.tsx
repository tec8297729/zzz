import * as React from 'react';
import { Card, Button, Form, Input, Select, Tree, Transfer, Modal } from 'antd';
import menuConfig from '../../config/menuConfig';

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

interface IProps {
  patchMenuInfo?: any;
  detailInfo?: any;
  form?: any;
  menuInfo?: any;
}
// interface IState {}

// 设置权限
class PermEditForm extends React.Component<IProps> {
  public state = {};

  public render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 }
    };
    const detail_info = this.props.detailInfo; // 接收外部传入的角色数据
    const menuInfo = this.props.menuInfo;
    return (
      // 水平方向布局
      <Form layout="horizontal">
        <FormItem label="角色名称：" {...formItemLayout}>
          {/* 动态获取角色名称 */}
          <Input disabled maxLength={8} placeholder={detail_info.role_name} />
        </FormItem>

        <FormItem label="状态：" {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: '1'
          })(
            <Select style={{ width: 80 }} placeholder="启用">
              <Option value="1">启用</Option>
              <Option value="0">停用</Option>
            </Select>
          )}
        </FormItem>

        {/* 树形组件 */}
        <Tree
          checkable
          defaultExpandAll
          // 当点击选中的时候触发函数，传递给父组件（把当前选中的都传递过去）
          onCheck={checkedKeys => this.onCheck(checkedKeys)}
          // 默认用户有哪些权限，列出来使用
          checkedKeys={menuInfo || []}
        >
          <TreeNode title="平台权限" key="platform_all">
            {this.renderTreeNodes(menuConfig)}
          </TreeNode>
        </Tree>
      </Form>
    );
  }
  // 设置选中的节点，通过父组件方法再传递回来
  public onCheck = checkedKeys => {
    this.props.patchMenuInfo(checkedKeys);
  }

  // 定义菜单权限列表组件
  public renderTreeNodes = (data, key = '') => {
    // 把传递进来的权限树数据进行组成最终的组件
    return data.map(item => {
      let parentKey = key + item.key;
      if (item.children) {
        return (
          <TreeNode
            title={item.title}
            key={parentKey}
            dataRef={item}
            className="op-role-tree"
          >
            {/* 递归遍历 */}
            {this.renderTreeNodes(item.children, parentKey)}
          </TreeNode>
        );
      } else if (item.btnList) {
        return (
          <TreeNode
            title={item.title}
            key={parentKey}
            dataRef={item}
            className="op-role-tree"
          >
            {this.renderBtnTreedNode(item, parentKey)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }

  public renderBtnTreedNode = (menu, parentKey = '') => {
    const btnTreeNode = [];
    menu.btnList.forEach(item => {
      console.log(parentKey + '-btn-' + item.key);
      btnTreeNode.push(
        <TreeNode
          title={item.title}
          key={parentKey + '-btn-' + item.key}
          className="op-role-tree"
        />
      );
    });
    return btnTreeNode;
  }
}
export default (PermEditForm = Form.create({})(PermEditForm));
