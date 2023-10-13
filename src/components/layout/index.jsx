import { useState } from "react";
import PropTypes from "prop-types";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Modal } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Layout.scss";
import { IS_LOGIN } from "../../const";
const LayoutAdmin = ({ setIsLogin }) => {
   const location = useLocation()
  const navigate = useNavigate();
  const { Header, Sider, Content } = Layout;
  const logout = () => {
    Modal.confirm({
      title: "Do you want to exit?",
      onOk: () => {
        navigate("/login");
        setIsLogin(false);
        localStorage.removeItem(IS_LOGIN);
      },
    });
  };
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        className="admin-aside"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="admin-logo">{!collapsed ? "MB admin" : "MB"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <UserOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/teachers",
              icon: <UserOutlined />,
              label: <Link to="/teachers">Teacher</Link>,
            },
            {
              key: "/students",
              icon: <UserOutlined />,
              label: <Link to="/students">Students</Link>,
            },
            {
              key: "4",
              label: (
                <Button danger type="primary" onClick={logout}>
                  Logout
                </Button>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          
        </Header>
        <Content
          className="admin-main"
          style={{
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

LayoutAdmin.propTypes = {
   setIsLogin: PropTypes.func,
 };
export default LayoutAdmin;
