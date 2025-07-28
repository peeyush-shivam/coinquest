import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Layout, Menu, Avatar, Typography, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { Text } = Typography;

const Header = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      key: "/",
      label: <NavLink to="/">Home</NavLink>,
    },
    {
      key: "/checkin",
      label: <NavLink to="/checkin">Check-In</NavLink>,
    },
    {
      key: "/watch",
      label: <NavLink to="/watch">Watch Video</NavLink>,
    },
    {
      key: "/scan",
      label: <NavLink to="/scan">Scan Code</NavLink>,
    },
    {
      key: "/wallet",
      label: <NavLink to="/wallet">Wallet</NavLink>,
    },
  ];

  return (
    <AntHeader
      style={{
        background: "white",
        padding: "0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        height: "64px",
        lineHeight: "64px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo/Brand Section */}
        <Space size={16}>
          <Avatar
            size={40}
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            CQ
          </Avatar>
        </Space>

        {/* Navigation */}
        <Menu
          mode="horizontal"
          items={menuItems}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            border: "none",
            background: "transparent",
          }}
          selectedKeys={[window.location.pathname]}
        />

        {/* Avatar Section */}
        <Avatar
          size={40}
          icon={<UserOutlined />}
          style={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            cursor: "pointer",
          }}
          onClick={() => navigate("/wallet")}
        />
      </div>
    </AntHeader>
  );
};

export default React.memo(Header);
