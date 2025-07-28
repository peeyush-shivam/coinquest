import React, { useState } from "react";
import { useWallet } from "../../context/WalletContext";
import { REWARD_TYPES } from "../../constants/rewards";
import { toast } from "react-toastify";
import { formatDate, formatNumber } from "../../utils/helpers";
import {
  Card,
  Typography,
  Button,
  List,
  Avatar,
  Statistic,
  Row,
  Col,
  Tabs,
  Tag,
  Progress,
  Divider,
  Space,
  Badge,
  Tooltip,
  Modal,
  Input,
  Form,
} from "antd";
import {
  WalletOutlined,
  TrophyOutlined,
  HistoryOutlined,
  StarOutlined,
  FireOutlined,
  GiftOutlined,
  ExportOutlined,
  ImportOutlined,
  DeleteOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  PlayCircleOutlined,
  QrcodeOutlined,
  EnvironmentOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import ActionPageLayout, {
  standardCardStyle,
  standardCardBodyStyle,
  standardButtonStyle,
  standardIconCircleStyle,
} from "../../layouts/ActionPageLayout";

const { Title, Paragraph, Text } = Typography;
const { TabPane } = Tabs;

const Wallet = () => {
  const {
    rewards,
    totalPoints,
    userStats,
    userName,
    setUserName,
    getRewardStats,
    getRecentRewards,
    resetWallet,
  } = useWallet();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isResetModalVisible, setIsResetModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const stats = getRewardStats();

  // Calculate reward breakdown
  const rewardBreakdown = {
    checkIn: rewards.filter((r) => r.type === "CHECK_IN").length,
    videoWatch: rewards.filter((r) => r.type === "VIDEO_WATCH").length,
    codeScan: rewards.filter((r) => r.type === "CODE_SCAN").length,
  };

  const pointsBreakdown = {
    checkIn: rewards
      .filter((r) => r.type === "CHECK_IN")
      .reduce((sum, r) => sum + r.points, 0),
    videoWatch: rewards
      .filter((r) => r.type === "VIDEO_WATCH")
      .reduce((sum, r) => sum + r.points, 0),
    codeScan: rewards
      .filter((r) => r.type === "CODE_SCAN")
      .reduce((sum, r) => sum + r.points, 0),
  };

  // Get recent rewards for each type
  const recentCheckIns = getRecentRewards("CHECK_IN", 10);
  const recentVideoWatches = getRecentRewards("VIDEO_WATCH", 10);
  const recentCodeScans = getRecentRewards("CODE_SCAN", 10);

  const getRewardIcon = (type) => {
    switch (type) {
      case "CHECK_IN":
        return <EnvironmentOutlined style={{ color: "#52c41a" }} />;
      case "VIDEO_WATCH":
        return <PlayCircleOutlined style={{ color: "#1890ff" }} />;
      case "CODE_SCAN":
        return <QrcodeOutlined style={{ color: "#722ed1" }} />;
      default:
        return <TrophyOutlined style={{ color: "#faad14" }} />;
    }
  };

  const getRewardColor = (type) => {
    switch (type) {
      case "CHECK_IN":
        return "#52c41a";
      case "VIDEO_WATCH":
        return "#1890ff";
      case "CODE_SCAN":
        return "#722ed1";
      default:
        return "#faad14";
    }
  };

  const handleResetWallet = () => {
    setIsResetModalVisible(true);
  };

  const handleResetConfirm = () => {
    resetWallet();
    setIsResetModalVisible(false);
    toast.success("All data reset successfully!");
  };

  const handleResetCancel = () => {
    setIsResetModalVisible(false);
  };

  const showEditModal = () => {
    editForm.setFieldsValue({ userName: userName });
    setIsEditModalVisible(true);
  };

  const handleEditSubmit = () => {
    editForm.validateFields().then((values) => {
      setUserName(values.userName);
      setIsEditModalVisible(false);
      editForm.resetFields();
      toast.success("Profile updated successfully!");
    });
  };

  const handleEditCancel = () => {
    setIsEditModalVisible(false);
    editForm.resetFields();
  };

  return (
    <>
      <ActionPageLayout
        sidebarContent={[
          // Wallet Overview Card
          <Card
            key="wallet-overview"
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <WalletOutlined style={{ color: "#667eea" }} />
                <span>Wallet Overview</span>
              </div>
            }
            style={standardCardStyle}
          >
            <div className="flex flex-col !p-6">
              {/* Total Points */}
              <div style={{ textAlign: "center", marginBottom: "24px" }}>
                <Title
                  level={2}
                  style={{ color: "#1f2937", margin: "0 0 8px 0" }}
                >
                  {formatNumber(totalPoints)}
                </Title>
                <Text style={{ color: "#6b7280", fontSize: "16px" }}>
                  Total Points Earned
                </Text>
              </div>

              {/* Quick Stats */}
              <Row gutter={[12, 12]}>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <Statistic
                      title="Today"
                      value={stats.todayPoints}
                      valueStyle={{ color: "#52c41a", fontSize: "18px" }}
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <Statistic
                      title="Streak"
                      value={userStats.streakDays}
                      valueStyle={{ color: "#faad14", fontSize: "18px" }}
                      suffix={<FireOutlined />}
                    />
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <Statistic
                      title="Total"
                      value={stats.totalRewards}
                      valueStyle={{ color: "#1890ff", fontSize: "18px" }}
                    />
                  </div>
                </Col>
              </Row>

              {/* Progress to next milestone */}
              <div style={{ marginTop: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <Text style={{ color: "#6b7280" }}>
                    Progress to 1000 points
                  </Text>
                  <Text style={{ color: "#6b7280" }}>{totalPoints}/1000</Text>
                </div>
                <Progress
                  percent={Math.min((totalPoints / 1000) * 100, 100)}
                  strokeColor={{
                    "0%": "#667eea",
                    "100%": "#764ba2",
                  }}
                  showInfo={false}
                />
              </div>
            </div>
          </Card>,

          // Wallet Actions Card
          <Card
            key="wallet-actions"
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <GiftOutlined style={{ color: "#667eea" }} />
                <span>Wallet Actions</span>
              </div>
            }
            style={standardCardStyle}
          >
            <div className="flex flex-col !p-6">
              <Space direction="vertical" style={{ width: "100%" }}>
                <Button
                  icon={<ExportOutlined />}
                  style={{ ...standardButtonStyle, width: "100%" }}
                  onClick={showEditModal}
                >
                  Edit Profile
                </Button>
                <Button
                  icon={<ExportOutlined />}
                  style={{ ...standardButtonStyle, width: "100%" }}
                  disabled
                >
                  Export Data
                </Button>
                <Button
                  icon={<ImportOutlined />}
                  style={{ ...standardButtonStyle, width: "100%" }}
                  disabled
                >
                  Import Data
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  style={{ ...standardButtonStyle, width: "100%" }}
                  onClick={handleResetWallet}
                  danger
                >
                  Reset All Data
                </Button>
              </Space>
            </div>
            {/** Add info how to earn streaks */}
          </Card>,
        ]}
      >
        {[
          // Activity Breakdown Card
          <Card
            key="activity-breakdown"
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <HistoryOutlined style={{ color: "#667eea" }} />
                <span>Activity Breakdown</span>
              </div>
            }
            style={standardCardStyle}
          >
            <div className="flex flex-col gap-2 !p-6">
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <div style={standardIconCircleStyle}>
                      <EnvironmentOutlined
                        style={{ fontSize: "20px", color: "white" }}
                      />
                    </div>
                    <Title
                      level={4}
                      style={{ margin: "8px 0 4px 0", color: "#1f2937" }}
                    >
                      {rewardBreakdown.checkIn}
                    </Title>
                    <Text style={{ color: "#6b7280", fontSize: "12px" }}>
                      Check-ins
                    </Text>
                    <div style={{ marginTop: "4px" }}>
                      <Text
                        strong
                        style={{ color: "#52c41a", fontSize: "14px" }}
                      >
                        {pointsBreakdown.checkIn} pts
                      </Text>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <div style={standardIconCircleStyle}>
                      <PlayCircleOutlined
                        style={{ fontSize: "20px", color: "white" }}
                      />
                    </div>
                    <Title
                      level={4}
                      style={{ margin: "8px 0 4px 0", color: "#1f2937" }}
                    >
                      {rewardBreakdown.videoWatch}
                    </Title>
                    <Text style={{ color: "#6b7280", fontSize: "12px" }}>
                      Videos
                    </Text>
                    <div style={{ marginTop: "4px" }}>
                      <Text
                        strong
                        style={{ color: "#1890ff", fontSize: "14px" }}
                      >
                        {pointsBreakdown.videoWatch} pts
                      </Text>
                    </div>
                  </div>
                </Col>
                <Col span={8}>
                  <div style={{ textAlign: "center" }}>
                    <div style={standardIconCircleStyle}>
                      <QrcodeOutlined
                        style={{ fontSize: "20px", color: "white" }}
                      />
                    </div>
                    <Title
                      level={4}
                      style={{ margin: "8px 0 4px 0", color: "#1f2937" }}
                    >
                      {rewardBreakdown.codeScan}
                    </Title>
                    <Text style={{ color: "#6b7280", fontSize: "12px" }}>
                      Codes
                    </Text>
                    <div style={{ marginTop: "4px" }}>
                      <Text
                        strong
                        style={{ color: "#722ed1", fontSize: "14px" }}
                      >
                        {pointsBreakdown.codeScan} pts
                      </Text>
                    </div>
                  </div>
                </Col>
              </Row>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #fff7e6 0%, #fff2d9 100%)",
                  border: "1px solid #ffd591",
                  borderRadius: "8px",
                  padding: "12px",
                  marginTop: "8px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <FireOutlined
                    style={{ color: "#fa8c16", fontSize: "16px" }}
                  />
                  <Text strong style={{ color: "#d46b08", fontSize: "13px" }}>
                    Pro Tip
                  </Text>
                </div>
                <Text
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  Check in once every 24 hours to maintain your streak. Missing
                  a day will reset your streak to 0.
                </Text>
                <Text
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  Your streak resets at midnight local time. Make sure to check
                  in before the day ends!
                </Text>
                <Text
                  style={{
                    color: "#6b7280",
                    fontSize: "13px",
                    lineHeight: "1.5",
                  }}
                >
                  Longer streaks unlock bonus rewards and special achievements.
                  Keep the momentum going!
                </Text>
              </div>
            </div>
          </Card>,
          <Card
            key="recent-activities"
            title={
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <HistoryOutlined style={{ color: "#667eea" }} />
                <span>Recent Activities</span>
              </div>
            }
            style={standardCardStyle}
          >
            <div className="flex flex-col !p-6">
              <List
                itemLayout="horizontal"
                dataSource={rewards.slice(0, 2)}
                renderItem={(reward) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={reward.icon}
                          style={{
                            backgroundColor: "#667eea",
                            color: "white",
                          }}
                        />
                      }
                      title={reward.name}
                      description={new Date(
                        reward.timestamp
                      ).toLocaleDateString()}
                    />
                    <Text strong style={{ color: "#667eea" }}>
                      +{reward.points} pts
                    </Text>
                  </List.Item>
                )}
              />
            </div>
          </Card>,
        ]}
      </ActionPageLayout>

      {/* Edit Wallet Modal */}
      <Modal
        centered
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <WalletOutlined style={{ color: "#667eea" }} />
            <span>Edit Profile</span>
          </div>
        }
        open={isEditModalVisible}
        onOk={handleEditSubmit}
        onCancel={handleEditCancel}
        okText="Update Profile"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            border: "none",
            borderRadius: "8px",
          },
        }}
      >
        <Form form={editForm} layout="vertical" style={{ marginTop: "16px" }}>
          <Form.Item
            label="User Name"
            name="userName"
            rules={[
              { required: true, message: "Please enter your name!" },
              { min: 2, message: "Name must be at least 2 characters!" },
              { max: 20, message: "Name must be less than 20 characters!" },
            ]}
          >
            <Input
              placeholder="Enter your name"
              size="large"
              style={{
                borderRadius: "8px",
                border: "1px solid #d9d9d9",
              }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Reset Wallet Confirmation Modal */}
      <Modal
        centered
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <ExclamationCircleOutlined style={{ color: "#ff4d4f" }} />
            <span>Reset All Data</span>
          </div>
        }
        open={isResetModalVisible}
        onOk={handleResetConfirm}
        onCancel={handleResetCancel}
        okText="Yes, Reset All Data"
        cancelText="Cancel"
        okButtonProps={{
          danger: true,
          style: {
            background: "#ff4d4f",
            borderColor: "#ff4d4f",
          },
        }}
      >
        <div style={{ marginTop: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              marginBottom: "16px",
            }}
          >
            <ExclamationCircleOutlined
              style={{
                color: "#ff4d4f",
                fontSize: "20px",
                marginTop: "2px",
              }}
            />
            <div>
              <Title
                level={5}
                style={{ color: "#1f2937", margin: "0 0 8px 0" }}
              >
                Are you sure you want to reset all data?
              </Title>
              <Text style={{ color: "#6b7280", fontSize: "14px" }}>
                This action will permanently delete all your:
              </Text>
              <ul
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  margin: "8px 0 0 0",
                  paddingLeft: "20px",
                }}
              >
                <li>Points and rewards history</li>
                <li>Check-in streak progress</li>
                <li>User statistics and achievements</li>
                <li>Profile information</li>
              </ul>
              <Text
                style={{
                  color: "#ff4d4f",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginTop: "8px",
                  display: "block",
                }}
              >
                This action cannot be undone!
              </Text>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Wallet;
