import * as React from 'react';
import { Form, Input, Button, Alert } from 'antd';
import localforage from 'localforage'; // 缓存插件

import Footer from '../../components/Footer/Footer';
// import 'antd/dist/antd.css'
import './login.less'; // 引入样式文件
const FormItem = Form.Item;

// 定义组件props
interface Props {
  name?: String;
  errorMsg?: any;
}

export default class Login extends React.Component {
  public state = {};

  public componentDidMount() {
    // 每次进入登录页清除之前的登录信息
  }

  // 验证成功后，成功函数
  public loginReq = params => {
    // 设置数据库存放顺序
    localforage.setDriver([
      localforage.LOCALSTORAGE,
      localforage.INDEXEDDB,
      localforage.WEBSQL
    ]);
    // 设置数据保存到离线仓库，你可以存储非字符串类型
    localforage.setItem('UserdataToken', params.token).then(function(token) {
      // 存完token跳到指定页面去
      window.location.href = '/#/'; // 跳转到后台首页
    });
  };

  public render() {
    return (
      <div className="login-page">
        <div className="login-header">
          <div className="logo">
            React全家桶 管理系统
          </div>
        </div>
        <div className="login-content-wrap">
          <div className="login-content">
            <div className="word">
              生态闭环 <br />
              技术前沿践行者
            </div>
            <div className="login-box">
              <div className="error-msg-wrap">
                <div className={this.state.errorMsg ? 'show' : ''}>
                  {this.state.errorMsg}
                </div>
              </div>
              <div className="title">zzq欢迎你</div>
              <LoginForm ref="login" loginSubmit={this.loginReq} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

// 定义组件props
interface LoginFormProps {
  form: {
    validateFieldsAndScroll: Function;
    getFieldsValue: Function;
    loginSubmit: Function;
  };
}
class LoginForm extends React.Component<LoginFormProps> {
  public state = {
    errorMsg: false // 错误提示窗口
  };

  // 登陆按钮
  public loginSubmit = e => {
    // tslint:disable-next-line
    e && e.preventDefault(); // 去掉默认事件
    const _this = this;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 获取表单上数据
        let formValue = _this.props.form.getFieldsValue();
        // 验证密码阶段
        if (formValue.username == 'admin' && formValue.password == 'admin') {
          // 使用传入的函数，跳转页面
          _this.props.loginSubmit({
            username: formValue.username,
            password: formValue.password,
            token: 8999
          });
        } else {
          // 弹出提示错误
          this.setState({
            errorMsg: true
          });
        }
      }
    });
  };

  public checkUsername = (rule, value, callback) => {
    let reg = /^\w+$/;
    if (!value) {
      callback('请输入用户名!');
    } else if (!reg.test(value)) {
      callback('用户名只允许输入英文字母');
    } else {
      callback();
    }
  };

  public checkPassword = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码!');
    } else {
      callback();
    }
  };

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            initialValue: 'admin',
            rules: [{ validator: this.checkUsername }]
          })(<Input placeholder="用户名" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            initialValue: 'admin',
            rules: [{ validator: this.checkPassword }]
          })(
            <Input
              type="password"
              placeholder="密码"
              // wrappedcomponentref={inst => (this.pwd = inst)}
            />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            onClick={this.loginSubmit}
            className="login-form-button"
          >
            登录
          </Button>
        </FormItem>

        {/* 错误提示 */}
        <div className={this.state.errorMsg ? 'show' : 'error-msg'}>
          <Alert message="帐号或密码错误" type="error" showIcon />
        </div>
      </Form>
    );
  }
}
LoginForm = Form.create({})(LoginForm);
