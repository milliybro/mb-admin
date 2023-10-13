import { Button, Checkbox, Flex, Form, Input, message } from "antd";
import PropTypes from "prop-types";
import {useNavigate } from "react-router-dom";
import { IS_LOGIN } from "../const";

import "./Login.scss";

const LoginPage = ({setIsLogin}) => {
  const navigate = useNavigate();
  const onFinish = (values) => {
   const {username, password} = values;
   if (username === 'milliybro' && password === '12345'){
      setIsLogin(true);
      localStorage.setItem(IS_LOGIN, true)
      navigate("/dashboard");
   } else{
      message.error('No username or password')
   }
  };
  return (
    <Flex
      className="login-page"
      style={{ height: "100vh" }}
      align="center"
      justify="center"
    >
      <div className="main"></div>
      <Form
        name="basic"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        style={{
          maxWidth: 600,
          border: `1px solid #ccc`,
          padding: `20px`,
          borderRadius: "10px",
          backgroundColor: "#444",
          boxShadow: "0px 0px 30px rgba(255, 255, 255, 0.5)",
          color: "#FFFFFF",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          className="username"
          label="Username"
          name="username"
          style={{
            color: "white",
          }}
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          style={{
            color: "white",
          }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            span: 24,
          }}
        >
          <Checkbox
            style={{
              color: "white",
            }}
          >
            Remember me
          </Checkbox>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
};

LoginPage.propTypes = {
  setIsLogin: PropTypes.func,
};

export default LoginPage;
