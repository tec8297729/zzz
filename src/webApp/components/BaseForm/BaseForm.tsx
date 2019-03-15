import React from 'react';
import { Input, Select, Form, Button, Checkbox, Radio, DatePicker } from 'antd';
import Utils from '../../utils/utils';
import { FormComponentProps } from 'antd/lib/form'; // 必须引入的类型

const FormItem = Form.Item;
const Option = Select.Option;

interface IProps {
  age?: number;
  name?: string;
  filterSubmit?: any;
  id?:any;
  form: {
    getFieldsValue: any;
    resetFields: any;
    getFieldDecorator: any;
  };
  formList?: Array<any>;
}

// 封装共用查询组件
class FilterForm extends React.Component<IProps, any> {
  public handleFilterSubmit = () => {
    let fieldsValue = this.props.form.getFieldsValue();
    this.props.filterSubmit(fieldsValue);
  }

  public reset = () => {
    this.props.form.resetFields();
  }

  public initFormList = () => {
    const { getFieldDecorator } = this.props.form;
    const formList = this.props.formList;
    const formItemList:Array<any> = [];
    if (formList && formList.length > 0) {
      formList.forEach((item) => {
        let label = item.label || ''; // 数据列表名称
        let field = item.field;
        let initialValue = item.initialValue || '';
        let placeholder = item.placeholder || '';
        let width = item.width;
        if (item.type == '时间查询') {
          const begin_time = (
            <FormItem label="订单时间" key={field}>
              {getFieldDecorator('begin_time')(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm"
                />
              )}
            </FormItem>
          );
          formItemList.push(begin_time);
          const end_time = (
            // colon设置关闭中间：号
            <FormItem label="~" colon={false} key={field+1}>
              {getFieldDecorator('end_time')(
                <DatePicker
                  showTime={true}
                  placeholder={placeholder}
                  format="YYYY-MM-DD HH:mm"
                />
              )}
            </FormItem>
          );
          formItemList.push(end_time);
        } else if (item.type == 'INPUT') {
          const INPUT = (
            <FormItem label={label} key={field}>
              {getFieldDecorator([field], {
                initialValue
              })(<Input type="text" placeholder={placeholder} />)}
            </FormItem>
          );
          formItemList.push(INPUT);
        } else if (item.type == 'SELECT') {
          formItemList.push(
            (
              <FormItem label={label} key={field}>
                <Select style={{ width:80 }} placeholder={placeholder} defaultValue={initialValue}>
                  {Utils.getOptionList(item.list)}
                </Select>
              </FormItem>
            )
          );
        } else if (item.type == 'CHECKBOX') {
          const CHECKBOX = (
            <FormItem label={label} key={field}>
              {getFieldDecorator([field], {
                valuePropName: 'checked',
                initialValue // true | false
              })(<Checkbox>{label}</Checkbox>)}
            </FormItem>
          );
          formItemList.push(CHECKBOX);
        }else if (item.type == '城市') {
          const CHECKBOX = (
            <FormItem label={'城市'} key={field}>
              {getFieldDecorator('city', {
                // valuePropName: 'checked',
                // 定义初始值
                initialValue:'ALL_0'
              })(
                <Select placeholder={placeholder}>
                  {Utils.getOptionList([
                    {
                      id:'ALL_0',name:'全部'
                    },
                    {
                      id:'ALL_1',name:'北京'
                    },
                    {
                      id:'ALL_2',name:'上海'
                    },
                  ])}
                </Select>
              )}
            </FormItem>
          );
          formItemList.push(CHECKBOX);
        }
      });
    }
    return formItemList;
  }

  public render() {
    return (
      <Form layout="inline" key={'inline'}>
        {this.initFormList()}
        <FormItem>
          <Button
            type="primary"
            style={{ margin: '0 20px' }}
            onClick={this.handleFilterSubmit}
          >
            查询
          </Button>
          <Button onClick={this.reset}>重置</Button>
        </FormItem>
      </Form>
    );
  }
}
export default FilterForm = Form.create({})(FilterForm);
