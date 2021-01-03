import React, { Component } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default class AdminLoginForm extends Component {
  static defaultProps = {
    name: "",
    onSubmit: null,
  };

  onFinish = (values) => {
    const { onSubmit } = this.props;
    if (typeof onSubmit === "function") {
      onSubmit(values);
    }
  };

  render() {
    const { name } = this.props;
    return (
      <Form name={name} className="login-form" onFinish={this.onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: "请输入用户名！" }]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "请输入密码！" }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
