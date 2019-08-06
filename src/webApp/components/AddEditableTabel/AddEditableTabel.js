// 表单封装，可写入name值保存
import React from 'react';
import { Table, Form, Row, Col } from 'antd';
import styles from './AddEditableTabel.less';
import EditableCell from './EditableCell';

const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    {/* 每行中间的内容 */}
    <tr {...props} />
  </EditableContext.Provider>
);
const EditableFormRow = Form.create()(EditableRow);

/*
handleSaveTable=编辑保存父组件定义处理函数，会反回当前row数据，自定义处理后更新视图setSate，
添加行直接父组件自定义插入原数据即可，不用传递函数
<AddEditableTabel
  dataSource={this.state.dataSource} // 表数据
  columns={this.columns} // 表头
  handleSaveTable={this.handleSaveTable} // 处理编辑状态的数据(row)，自定义处理
  // 指定变量内。可以传入所有tabel参数
  optsTable={{...参数}}
/>
*/
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };

    this.columns = []; // 缓存表头
  }

  // 更新DOM节点完后
  componentDidMount() {
    const { dataSource, columns } = this.props; // 外部传入的表数据源
    this.columns = columns;
    // 表数据更新
    this.setState({
      dataSource,
    });
  }

  render() {
    const { handleSaveTable } = this.props; // dataSource
    // 覆盖表格内样式配置
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        // 传递事件供Cell组件调用
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: handleSaveTable, // 编辑保存事件函数
        }),
      };
    });

    return (
      <div className={styles.connect_wrap}>
        <Row>
          <Col span={24}>
            <Table
              // 覆盖默认的table元素，用于当点击后变成输入框
              components={components}
              bordered // 带边框
              dataSource={this.state.dataSource} // 渲染的数据源
              columns={columns} // 表格列(头部)的配置描述
              rowKey={record => record.key} // key值
              {...this.props.optsTable}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

// 要通过form表单组件暴露的属性传入当前组件名称，里面才可以使用双向绑定数据封装的功能
export default Form.create({})(EditableTable);
