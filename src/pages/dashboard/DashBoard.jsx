import React from "react";
import { Link } from "react-router-dom";
import { useWallet } from "../../context/WalletContext";
import { Button, Card, Typography, Space, Row, Col } from "antd";
import {
  RocketOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  QrcodeOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const Dashboard = () => {
  const { rewards, userName } = useWallet();

  const featuredActions = [
    {
      title: "Watch & Earn",
      tokens: 50,
      description:
        "Watch a short, engaging 15-second video advertisement to instantly earn tokens.",
      link: "/watch",
      action: "Start Video",
      icon: <PlayCircleOutlined />,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    },
    {
      title: "Check-in",
      tokens: 100,
      description:
        "Simply check-in to one of our partner hotels and restaurents. Enjoy exploring!",
      link: "/checkin",
      action: "Check In Now",
      icon: <CheckCircleOutlined />,
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    },
    {
      title: "Scan QR Code",
      tokens: 75,
      description:
        "Find and scan a special QR code at partner locations for a significant bonus.",
      link: "/scan",
      action: "Scan Code",
      icon: <QrcodeOutlined />,
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div
      className="m-auto !p-4"
      style={{ minHeight: "calc(100vh - 64px)", boxSizing: "border-box" }}
    >
      {/* Hero Section */}
      <div className="bg-[linear-gradient(135deg,_#667eea_0%,_#764ba2_100%)] rounded-2xl !p-8 !mb-8 text-white relative overflow-hidden">
        <div className="relative z-[2]">
          <Title level={1} style={{ color: "white", marginBottom: "8px" }}>
            Welcome, {userName}!
          </Title>
          <Paragraph
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "18px",
              marginBottom: "24px",
            }}
          >
            Start earning digital tokens by completing fun, real-world tasks.
            Your rewards await!
          </Paragraph>
        </div>
        {/* Decorative background elements */}
        <div className="absolute -top-[50px] -right-[50px] w-[200px] h-[200px] bg-white/10 rounded-full z-[1]" />
        <div className="absolute -bottom-[30px] right-[100px] w-[150px] h-[150px] bg-white/5 rounded-full z-[1]" />
      </div>

      {/* Featured Actions */}
      <Title level={2} style={{ marginBottom: "24px", color: "#1f2937" }}>
        Featured Actions
      </Title>

      <Row gutter={[24, 24]}>
        {featuredActions.map((action) => (
          <Col xs={24} md={8} key={action.title}>
            <Card
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                border: "none",
              }}
              styles={{ body: { padding: 0 } }}
              cover={
                <img
                  alt="watch-video"
                  src={action.image}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              }
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <Title level={4} style={{ margin: 0, color: "#1f2937" }}>
                    {action.title}
                  </Title>
                  <Text strong style={{ color: "#06b6d4", fontSize: "16px" }}>
                    +{action.tokens} Tokens
                  </Text>
                </div>
                <Paragraph
                  style={{
                    color: "#6b7280",
                    marginBottom: "16px",
                    fontSize: "14px",
                  }}
                >
                  {action.description}
                </Paragraph>
                <Link to={action.link}>
                  <Button
                    type="default"
                    size="large"
                    style={{
                      width: "100%",
                      borderRadius: "8px",
                      borderColor: "#d1d5db",
                      color: "white",
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      height: "44px",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    {action.action} →
                  </Button>
                </Link>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Dashboard;
