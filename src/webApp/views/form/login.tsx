import * as React from 'react';
import {
  Form, Icon, Input, Button, Checkbox,Card, message
} from 'antd';

const FormItem = Form.Item; // 子标签转换格式写法

interface IProps {
  form?:any
}
// interface IState {}

class FormLogin extends React.Component<IProps> {
  public constructor(props){
    super(props);
  }
  public render(){
    const { getFieldDecorator } = this.props.form; // 组件提供的一个参数，双向获取表单数据

    return (
      <div>
        <Card title="登陆行内表单">
          <Form className="login-form" layout="inline">
            <FormItem>
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
            </FormItem>
            <FormItem>
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
            </FormItem>
            <FormItem>
              <Button type="primary">登陆</Button>
            </FormItem>
          </Form>
        </Card>

        <Card title="登陆水平表单" style={{marginTop:10}}>
          <Form style={{width:300}}>
            <FormItem>
              {getFieldDecorator('userName', {
                initialValue:'Jack默认值',
                // 定义规则,可多个，下面例如参数required为true时，出现提示框
                rules: [
                  { required: true, message: '用户名不能为空!' },
                  {
                    min:5,max:10,
                    message:'长度不能指定范围内，请在5-10字符之间'
                  },
                  {
                    pattern:new RegExp('^\\w+$','g'), // 使用正则写规则
                    message:'用户名必须为字母或者数字'
                  }
                ],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('userPwd', {
                // 定义规则
                rules: [{ required: true, message: '密码不能为空!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="请输入密码" />
              )}
            </FormItem>
            <FormItem>
                {
                  getFieldDecorator('remember', {
                    valuePropName:'checked',
                    initialValue: true
                  })(
                    <Checkbox>记住密码</Checkbox>
                  )
                }
                <a href="#" style={{float:'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick={this.handleSubmit}>登陆</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    );
  }
  // 检验提交数据
  public handleSubmit=()=>{
    let userInfo = this.props.form.getFieldsValue(); // 可以获取到form下面所有的值，可单独获取一个
    // 检验所有表单，里面是一个循环
    this.props.form.validateFields((err,values)=>{
      // 当验证的表单有一个规则没通过，会触发getFieldDecorator上面规则显示内容
      if(!err){
        // 弹出提示框显示
        message.success(`${userInfo.userName} 恭喜你，通过表单验证，当前密码为${userInfo.userPwd}`);
      }
    });
  }
}
// 要通过form表单组件暴露的属性传入当前组件名称，里面才可以使用双向绑定数据封装的功能
export default Form.create({ name: 'normal_login' })(FormLogin);
