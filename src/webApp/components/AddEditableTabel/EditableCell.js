import React, { Component } from 'react';
import { Input, Form } from 'antd';

const EditableContext = React.createContext();

class EditableCell extends Component {
  state = {
    editing: false, // 可编辑状态
  };

  toggleEdit = () => {
    const stateEditing = this.state.editing;
    const editing = !stateEditing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave, form } = this.props;
    form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  };

  renderCell = () => {
    const { children, dataIndex, record, form } = this.props; // title,
    const { editing } = this.state;
    return editing ? (
      <Form.Item style={{ margin: 0 }}>
        {form.getFieldDecorator(dataIndex, {
          // rules: [
          //   {
          //     required: true,
          //     message: `${title} is required.`,
          //   },
          // ],
          initialValue: record[dataIndex],
        })(
          <Input
            ref={node => {
              this.input = node;
            }}
            onPressEnter={this.save}
            onBlur={this.save}
          />
        )}
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={this.toggleEdit}
      >
        {children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      form,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

export default Form.create({})(EditableCell);
