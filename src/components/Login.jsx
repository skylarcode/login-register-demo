import React, { useState } from "react";
import { Form, Input, Button, Checkbox, message } from "antd";
import axios from "axios";
import Register from "./Register";

const Login = () => {
  const [isRegisterVisible, setIsRegisterVisible] = useState(false);

  const onLoginFinish = async (values) => {
    console.log("Login values:", values);
    const { username, password } = values;
    axios({
      url: "/api/login",
      data: {
        username,
        password,
      },
      method: "post",
    }).then((res) => {
      console.log(res);
      if (res.data.status === "ok") {
        message.success("Login successful!");
      } else if (res.data.status === "error") {
        message.error("用户名密码错误");
      }
    });
  };

  const toggleRegisterForm = () => {
    setIsRegisterVisible(!isRegisterVisible);
  };

  return (
    <div>
      {/* 注册按钮，用于切换显示登录或注册表单 */}
      <Button
        type="primary"
        onClick={toggleRegisterForm}
        style={{ marginBottom: 16 }}
      >
        {isRegisterVisible ? "Back to Login" : "Register"}
      </Button>

      {/* 登录表单 */}
      {!isRegisterVisible && (
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onLoginFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 12 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      )}

      {/* 注册表单 */}
      {isRegisterVisible && <Register />}
    </div>
  );
};

export default Login;
