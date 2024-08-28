import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";

const Register = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const { username, password } = values;
    if (values.password !== values.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }
    axios({
      url: "/api/register",
      data: {
        username,
        password,
      },
      method: "post",
    }).then((res) => {
      console.log(res);
      if (res.data.status === "success") {
        message.success(res.data.message);
      } else if (res.data.status === "error") {
        message.error(res.data.message);
      }
    });
    form.resetFields();
  };

  return (
    <Form name="register" onFinish={onFinish}>
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
        rules={[
          { required: true, message: "Please input your password!" },
          {
            min: 6,
            message: "Password must be at least 6 characters long!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        label="Confirm Password"
        name="confirmPassword"
        dependencies={["password"]}
        rules={[
          { required: true, message: "Please confirm your password!" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
