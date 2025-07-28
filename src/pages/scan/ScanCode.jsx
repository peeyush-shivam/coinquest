import { useState } from "react";
import { useWallet } from "../../context/WalletContext";
import { REWARD_TYPES, VALID_CODES } from "../../constants/rewards";
import { toast } from "react-toastify";
import { copyToClipboard } from "../../utils/helpers";
import {
  QrcodeOutlined,
  SendOutlined,
  HistoryOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import ActionPageLayout, {
  standardCardStyle,
  standardCardBodyStyle,
  standardButtonStyle,
  standardIconCircleStyle,
  standardStepNumberStyle,
} from "../../layouts/ActionPageLayout";
import {
  Card,
  Typography,
  Button,
  Alert,
  List,
  Avatar,
  Statistic,
  Spin,
  Progress,
  Row,
  Input,
  Col,
} from "antd";

const { Title, Paragraph, Text } = Typography;

const ScanCode = () => {
  const [code, setCode] = useState("");
  const [codeRedeemed, setCodeRedeemed] = useState(false);
  const {
    addReward,
    lastActions,
    rewards,
    canClaimReward,
    getTimeUntilNextClaim,
    validateCode,
    getRecentRewards,
  } = useWallet();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check cooldown using enhanced logic
    if (!canClaimReward("CODE_SCAN")) {
      const timeUntilNext = getTimeUntilNextClaim("CODE_SCAN");
      const hours = Math.floor(timeUntilNext / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeUntilNext % (1000 * 60 * 60)) / (1000 * 60)
      );
      toast.error(
        `Please wait ${hours}h ${minutes}m before scanning another code`
      );
      return;
    }

    // Validate code using enhanced logic
    const validCode = validateCode(code);

    if (!validCode) {
      toast.error("Invalid code. Please try again.");
      return;
    }

    // Award points
    const newReward = addReward({
      type: "CODE_SCAN",
      name: REWARD_TYPES.CODE_SCAN.name,
      icon: REWARD_TYPES.CODE_SCAN.icon,
      points: REWARD_TYPES.CODE_SCAN.points + validCode.bonus,
      code: validCode.code,
      bonus: validCode.bonus,
    });

    toast.success(
      `Successfully redeemed code for ${
        REWARD_TYPES.CODE_SCAN.points + validCode.bonus
      } points!`
    );
    setCode("");
    setCodeRedeemed(true);

    // Reset redeemed state after 3 seconds
    setTimeout(() => {
      setCodeRedeemed(false);
    }, 3000);
  };

  // Get recent scans from actual rewards
  const recentScans = getRecentRewards("CODE_SCAN", 5).map((reward) => ({
    code: reward.code,
    status: "Success",
    date: new Date(reward.timestamp).toISOString().split("T")[0],
    points: reward.points,
  }));

  return (
    <ActionPageLayout
      sidebarContent={[
        // Scan & Earn Card
        // <Card
        //   key="scan-earn"
        //   style={standardCardStyle}
        //   bodyStyle={standardCardBodyStyle}
        // >
        //   <div style={{ textAlign: "center" }}>
        //     <div style={standardIconCircleStyle}>
        //       <QrcodeOutlined style={{ fontSize: "32px", color: "white" }} />
        //     </div>
        //     <Title level={4} style={{ color: "#1f2937", marginBottom: "8px" }}>
        //       Scan & Earn
        //     </Title>
        //     <Paragraph style={{ color: "#6b7280", margin: 0 }}>
        //       Discover new ways to earn tokens every day!
        //     </Paragraph>
        //   </div>
        // </Card>,

        // How It Works Card
        <Card
          key="how-it-works"
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <QuestionCircleOutlined
                style={{ color: "#667eea", paddingTop: "3px" }}
              />
              <span>How it works</span>
            </div>
          }
          style={standardCardStyle}
        >
          <div
            className="flex flex-col gap-4 !p-6"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              className="flex items-baseline-last gap-3"
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              <div style={standardStepNumberStyle}>1</div>
              <div>
                <Text strong style={{ color: "#1f2937", fontSize: "14px" }}>
                  Find a Code
                </Text>
                <Paragraph
                  style={{
                    color: "#6b7280",
                    fontSize: "11px",
                    margin: "4px 0 0 0",
                  }}
                >
                  Look for physical QR codes at events or unique digital codes.
                </Paragraph>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={standardStepNumberStyle}>2</div>
              <div>
                <Text strong style={{ color: "#1f2937", fontSize: "14px" }}>
                  Enter or Scan
                </Text>
                <Paragraph
                  style={{
                    color: "#6b7280",
                    fontSize: "11px",
                    margin: "4px 0 0 0",
                  }}
                >
                  Use your device camera or manually paste the code into the
                  field.
                </Paragraph>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={standardStepNumberStyle}>3</div>
              <div>
                <Text strong style={{ color: "#1f2937", fontSize: "14px" }}>
                  Earn Rewards
                </Text>
                <Paragraph
                  style={{
                    color: "#6b7280",
                    fontSize: "11px",
                    margin: "4px 0 0 0",
                  }}
                >
                  Claim your tokens and build your collection!
                </Paragraph>
              </div>
            </div>
          </div>
        </Card>,
        <Card
          key="recent-scans"
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <HistoryOutlined style={{ color: "#667eea" }} />
              <span>Recent Scans</span>
            </div>
          }
          style={standardCardStyle}
        >
          <div
            className="flex flex-col gap-4 !p-6"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {" "}
            {recentScans.length > 0 ? (
              <List
                dataSource={recentScans}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          icon={<CheckCircleOutlined />}
                          style={{ backgroundColor: "#52c41a" }}
                        />
                      }
                      title={
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text strong className="truncate">
                            {item.code}
                          </Text>
                          <Text type="success" style={{ fontSize: "12px" }}>
                            {item.status} {item.date}
                          </Text>
                        </div>
                      }
                      description={`+${item.points} points earned`}
                    />
                  </List.Item>
                )}
              />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "24px",
                  color: "#9ca3af",
                }}
              >
                <QrcodeOutlined
                  style={{
                    fontSize: "48px",
                    marginBottom: "16px",
                    color: "#d1d5db",
                  }}
                />
                <Paragraph style={{ color: "#9ca3af", margin: 0 }}>
                  No recent scans. Start scanning to see your history!
                </Paragraph>
              </div>
            )}
          </div>
        </Card>,
      ]}
    >
      {[
        // QR Code Scanner Area
        // <Card
        //   key="qr-scanner"
        //   style={{
        //     ...standardCardStyle,
        //     border: "2px dashed #e91e63",
        //     background: "#fafafa",
        //     height: "100%",
        //   }}
        //   bodyStyle={{ padding: "48px", textAlign: "center", height: "100%" }}
        // >
        //   <div
        //     style={{
        //       display: "flex",
        //       flexDirection: "column",
        //       justifyContent: "center",
        //       alignItems: "center",
        //       height: "100%",
        //     }}
        //   >
        //     <QrcodeOutlined
        //       style={{
        //         fontSize: "120px",
        //         color: "#e91e63",
        //         marginBottom: "16px",
        //       }}
        //     />
        //     <Title level={4} style={{ color: "#666", marginBottom: "8px" }}>
        //       QR Code Scanner
        //     </Title>
        //     <Paragraph style={{ color: "#999", margin: 0 }}>
        //       Point your camera at a QR code to scan
        //     </Paragraph>
        //   </div>
        // </Card>,

        // Scan or Enter Code Section
        <Card key="code-input" style={standardCardStyle}>
          <div className="flex flex-col !p-6">
            {/* Header Section with Gradient Background */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "32px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "16px",
                padding: "32px 24px",
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Background Pattern */}
              <div
                style={{
                  position: "absolute",
                  top: "-50%",
                  right: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                  opacity: 0.3,
                }}
              />

              <QrcodeOutlined
                style={{
                  fontSize: "128px",
                  color: "white",
                  marginBottom: "16px",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.2))",
                  position: "relative",
                  zIndex: 1,
                }}
              />
              <Title
                level={3}
                style={{
                  color: "white",
                  marginBottom: "8px",
                  textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Scan or Enter Code
              </Title>
              <Paragraph
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "14px",
                  margin: 0,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Unlock exciting rewards by scanning a QR code or entering a
                unique code below.
              </Paragraph>
            </div>

            {/* Alert Messages - Removed in favor of toast notifications */}

            {/* Code Input Form with Enhanced Styling */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "24px" }}>
                <Text
                  strong
                  style={{
                    color: "#1f2937",
                    fontSize: "16px",
                    marginBottom: "12px",
                    display: "block",
                    fontWeight: "600",
                  }}
                >
                  Enter Your Code
                </Text>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    background: "#f8fafc",
                    // padding: "16px",
                    // borderRadius: "12px",
                    // border: "2px solid #e2e8f0",
                    // transition: "all 0.3s ease",
                  }}
                >
                  <Input
                    size="large"
                    placeholder="Paste your code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    style={{
                      borderRadius: "8px",
                      fontSize: "16px",
                      height: "48px",
                      flex: 1,
                      border: "1px solid #d1d5db",
                      background: "white",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Button
                    type="primary"
                    size="large"
                    icon={<SendOutlined />}
                    htmlType="submit"
                    style={{
                      background:
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      border: "none",
                      borderRadius: "8px",
                      height: "48px",
                      minWidth: "120px",
                      fontSize: "16px",
                      fontWeight: "600",
                      boxShadow: "0 4px 12px rgba(102, 126, 234, 0.4)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = "translateY(-2px)";
                      e.target.style.boxShadow =
                        "0 6px 16px rgba(102, 126, 234, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = "translateY(0)";
                      e.target.style.boxShadow =
                        "0 4px 12px rgba(102, 126, 234, 0.4)";
                    }}
                  >
                    {codeRedeemed
                      ? "Code Redeemed!"
                      : `Claim ${REWARD_TYPES.CODE_SCAN.points} Points`}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </Card>,

        // Recent Scans
        <Card
          key="recent-scans"
          // title={
          //   <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          //     <HistoryOutlined style={{ color: "#667eea" }} />
          //     <span>Recent Scans</span>
          //   </div>
          // }
          style={standardCardStyle}
        >
          {/* Available Codes & Coupons Section */}
          <div className="flex flex-col !p-6 ">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <div>
                <Title level={4} style={{ color: "#1f2937", margin: 0 }}>
                  Available Codes & Coupons
                </Title>
              </div>
            </div>

            <Row gutter={[16, 16]}>
              {/* Code Card 1 */}
              <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                  size="small"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    height: "100%",
                  }}
                  styles={{
                    body: {
                      height: "100px",
                      padding: "12px",
                    },
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px",
                    }}
                  >
                    <div>
                      <Text
                        strong
                        style={{
                          color: "white",
                          fontSize: "14px",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        Welcome Bonus
                      </Text>
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "12px",
                        }}
                      >
                        Earn 100 points
                      </Text>
                    </div>
                    <Button
                      size="small"
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                        borderRadius: "6px",
                      }}
                      onClick={async () => {
                        await copyToClipboard("WELCOME2024");
                        toast.success("Code WELCOME2024 copied to clipboard!");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      marginTop: "8px",
                      fontFamily: "monospace",
                      fontSize: "14px",
                      letterSpacing: "1px",
                    }}
                  >
                    WELCOME2024
                  </div>
                </Card>
              </Col>

              {/* Code Card 2 */}
              <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                  size="small"
                  style={{
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
                    height: "100%",
                  }}
                  styles={{
                    body: {
                      height: "100px",
                      padding: "12px",
                    },
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px",
                    }}
                  >
                    <div>
                      <Text
                        strong
                        style={{
                          color: "white",
                          fontSize: "14px",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        First Check-in
                      </Text>
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "12px",
                        }}
                      >
                        Earn 50 points
                      </Text>
                    </div>
                    <Button
                      size="small"
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                        borderRadius: "6px",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText("FIRSTCHECK");
                        toast.success("Code FIRSTCHECK copied to clipboard!");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      marginTop: "8px",
                      fontFamily: "monospace",
                      fontSize: "14px",
                      letterSpacing: "1px",
                    }}
                  >
                    FIRSTCHECK
                  </div>
                </Card>
              </Col>

              {/* Code Card 3 */}
              <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                  size="small"
                  style={{
                    background:
                      "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                    color: "white",
                    height: "100%",
                  }}
                  styles={{
                    body: {
                      height: "100px",
                      padding: "12px",
                    },
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px",
                    }}
                  >
                    <div>
                      <Text
                        strong
                        style={{
                          color: "white",
                          fontSize: "14px",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        Daily Bonus
                      </Text>
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "12px",
                        }}
                      >
                        Earn 25 points
                      </Text>
                    </div>
                    <Button
                      size="small"
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                        borderRadius: "6px",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText("DAILY25");
                        toast.success("Code DAILY25 copied to clipboard!");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      marginTop: "8px",
                      fontFamily: "monospace",
                      fontSize: "14px",
                      letterSpacing: "1px",
                    }}
                  >
                    DAILY25
                  </div>
                </Card>
              </Col>

              {/* Code Card 4 */}
              <Col xs={24} sm={12} md={8} lg={6}>
                <Card
                  size="small"
                  style={{
                    background:
                      "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                    color: "white",
                    height: "100%",
                  }}
                  styles={{
                    body: {
                      height: "100px",
                      padding: "12px",
                    },
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "5px",
                    }}
                  >
                    <div>
                      <Text
                        strong
                        style={{
                          color: "white",
                          fontSize: "14px",
                          display: "block",
                          marginBottom: "4px",
                        }}
                      >
                        Referral Code
                      </Text>
                      <Text
                        style={{
                          color: "rgba(255,255,255,0.8)",
                          fontSize: "12px",
                        }}
                      >
                        Earn 75 points
                      </Text>
                    </div>
                    <Button
                      size="small"
                      style={{
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        color: "white",
                        borderRadius: "6px",
                      }}
                      onClick={() => {
                        navigator.clipboard.writeText("REFER75");
                        toast.success("Code REFER75 copied to clipboard!");
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      padding: "8px 12px",
                      borderRadius: "6px",
                      marginTop: "8px",
                      fontFamily: "monospace",
                      fontSize: "14px",
                      letterSpacing: "1px",
                    }}
                  >
                    REFER75
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </Card>,
      ]}
    </ActionPageLayout>
  );
};

export default ScanCode;
