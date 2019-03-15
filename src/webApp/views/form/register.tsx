import React from 'react';
import {
  Card,
  Form,
  Button,
  Input,
  Checkbox,
  Radio,
  Select,
  Switch,
  DatePicker,
  TimePicker,
  Upload,
  Icon,
  message,
  InputNumber // 输入框数字组件，可按上下加减
} from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

interface IProps {
  form?:any
}
interface IState {
  // state?:any,
  userImg:any,
  loading:any
}

class FormRegister extends React.Component<IProps, IState> {
  public state = {};

  public render() {
    const { getFieldDecorator } = this.props.form; // antd框架双向数据绑定导入函数
    // 给每个FormItem设置响应式参数，就是用col组件的参数，
    const formItemLayout = {
      // 这是设置表单前面文字栅格参数
      labelCol: { // 每个参数官方都有对应的屏幕尺寸大小范围
        xs: 24, // xs超小号，小于576px像素的，使用此设置，直接占整行格子
        sm: 4 // sm小号,md中号,lg大号,xl超大号,xxl最大号
      },
      // 这里设置输入控件的栅格参数，同上
      wrapperCol: {
        xs: 24,
        sm: 12
      }
    };
    // 设置底部注册那一块栅格
    const offsetLayout = {
      wrapperCol: {
        xs: 24,
        sm: {
          span: 12,
          offset: 4 // 间隔数量
        }
      }
    };
    // 设置联系地址输入信息范围，最小4行
    const rowObject = {
      minRows: 4,
      maxRows: 6
    };
    return (
      <div>
        <Card title="注册表单">
          <Form layout="horizontal">
            {/* label是输入框外左边显示的文字内容，后面设置当前表单栅格 */}
            <FormItem label="用户名" {...formItemLayout}>
              {getFieldDecorator('userName', {
                initialValue: '',
                rules: [ // 规则
                  {
                    required: true,
                    message: '用户名不能为空'
                  }
                ]
              })(<Input placeholder="请输入用户名" />)}
            </FormItem>

            <FormItem label="密码" {...formItemLayout}>
              {getFieldDecorator('userPwd', {
                initialValue: ''
              })(<Input type="password" placeholder="请输入密码" />)}
            </FormItem>

            <FormItem label="性别" {...formItemLayout}>
              {getFieldDecorator('sex', {
                initialValue: '1'
              })(
                <RadioGroup>
                  <Radio value="1">男</Radio>
                  <Radio value="2">女</Radio>
                </RadioGroup>
              )}
            </FormItem>

            <FormItem label="年龄" {...formItemLayout}>
              {getFieldDecorator('age', {
                initialValue: 18
              })(<InputNumber />)}
            </FormItem>

            <FormItem label="当前状态" {...formItemLayout}>
              {getFieldDecorator('state', {
                initialValue: '2'
              })(
                // 选择器组件，下拉菜单有很多可选择（下拉框必须要有value值）
                <Select>
                  <Option value="1">咸鱼一条</Option>
                  <Option value="2">风华浪子</Option>
                  <Option value="3">北大才子一枚</Option>
                  <Option value="4">百度FE</Option>
                  <Option value="5">创业者</Option>
                </Select>
              )}
            </FormItem>

            <FormItem label="爱好" {...formItemLayout}>
              {getFieldDecorator('interest', {
                initialValue: ['2', '5']
              })(
                // 多选模式,后面加上getPopupContainer处理定义滚动错位问题
                <Select mode="multiple" getPopupContainer={(triggerNode:any) => triggerNode.parentNode}>
                  <Option value="1">游泳</Option>
                  <Option value="2">打篮球</Option>
                  <Option value="3">踢足球</Option>
                  <Option value="4">跑步</Option>
                  <Option value="5">爬山</Option>
                  <Option value="6">骑行</Option>
                  <Option value="7">桌球</Option>
                  <Option value="8">麦霸</Option>
                </Select>
              )}
            </FormItem>

            <FormItem label="是否已婚" {...formItemLayout}>
              {getFieldDecorator('isMarried', {
                valuePropName: 'checked',
                initialValue: true
              })(<Switch />)}
            </FormItem>

            <FormItem label="生日" {...formItemLayout}>
              {getFieldDecorator('birthday', {
                // 使用moment插件 直接格式化日期,返回的是一个对象
                initialValue: moment('2018-08-08')
              })(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
              {/* 日期组件。显示日期格式定义 */}
            </FormItem>

            <FormItem label="联系地址" {...formItemLayout}>
              {getFieldDecorator('address', {
                initialValue: '北京市海淀区奥林匹克公园'
              })(<TextArea autosize={rowObject} />)}
            </FormItem>

            <FormItem label="早起时间" {...formItemLayout}>
              {/* 用到了另一种方式的时间组件 */}
              {getFieldDecorator('time')(<TimePicker />)}
            </FormItem>

            <FormItem label="头像" {...formItemLayout}>
              {getFieldDecorator('userImg')(
                // 上传功能组件
                <Upload
                  listType="picture-card"
                  showUploadList={false} // 是否显示上传列表
                  action="//jsonplaceholder.typicode.com/posts/" // 上传图片地址接口
                  beforeUpload={this.beforeUpload} // 上传文件之前的钩子，限制用户大小
                  onChange={this.handleChange}
                >
                  {/* 判断当有图片路径，显示图片文件，否则显示icon图标 */}
                  {this.state.userImg ? (
                    <img src={this.state.userImg} />
                  ) : (
                    <Icon type="plus" />
                  )}
                </Upload>
              )}
            </FormItem>

            <FormItem {...offsetLayout}>
              {getFieldDecorator('userImg')(
                <Checkbox defaultChecked={true}>
                  我已阅读过<a href="#">商用协议</a>
                </Checkbox>
              )}
            </FormItem>
            <FormItem {...offsetLayout}>
              <Button type="primary" onClick={this.handleSubmit}>
                注册
              </Button>
              <Button type="primary" onClick={this.handleReset}>
                重置
              </Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
  // 注册提交
  public handleSubmit = () => {
    // 获取到所有表单的值
    let userInfo = this.props.form.getFieldsValue();
    console.log(userInfo);
    message.success(
      `${userInfo.userName} 恭喜你，您通过本次表单组件学习，当前密码为：${
        userInfo.userPwd
      }`
    );
  }
  // 重置表单
  public handleReset = () => {
    this.props.form.resetFields();
    message.success('重置表单');
  }

  // 上传组件事件
  public handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    // 上传完成后
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      // 当上传完后，这块是和服务端对接，官方接口是返回的是一个base64对象
      this.getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState({
          userImg: imageUrl, // 存放图片链接，给其它位置显示用
          loading: false
        })
      );
    }
  }

  // 封装一个读取base64图片的函数
  public getBase64 = (img, callback) => {
    const reader = new FileReader(); // 用于读取文件到内容
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  // 限制用户上传大小
  public beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
}
export default Form.create()(FormRegister);
