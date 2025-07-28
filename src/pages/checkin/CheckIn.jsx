import { useState, useEffect } from "react";
import { useWallet } from "../../context/WalletContext";
import { LOCATIONS, REWARD_TYPES } from "../../constants/rewards";
import { toast } from "react-toastify";
import { calculateDistance, getCurrentLocation } from "../../utils/helpers";
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
} from "antd";
import {
  EnvironmentOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  TrophyOutlined,
  GlobalOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ActionPageLayout, {
  standardCardStyle,
  standardCardBodyStyle,
  standardButtonStyle,
  standardIconCircleStyle,
  standardStepNumberStyle,
} from "../../layouts/ActionPageLayout";

const { Title, Paragraph, Text } = Typography;

export default function CheckIn() {
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [distanceToNearest, setDistanceToNearest] = useState(0);
  const {
    addReward,
    lastActions,
    rewards,
    canClaimReward,
    getTimeUntilNextClaim,
    getRecentRewards,
  } = useWallet();

  // Remove automatic geolocation request - user will enable manually

  useEffect(() => {
    if (userLocation) {
      const nearby = LOCATIONS.filter((location) => {
        const distance = calculateDistance(userLocation, location.coordinates);
        return distance <= location.radius;
      });

      setNearbyLocations(nearby);

      // Calculate distance to nearest location
      if (LOCATIONS.length > 0) {
        const distances = LOCATIONS.map((location) =>
          calculateDistance(userLocation, location.coordinates)
        );
        const minDistance = Math.min(...distances);
        setDistanceToNearest(Math.round(minDistance));
      }
    }
  }, [userLocation]);

  const handleCheckIn = (location) => {
    if (!canClaimReward("CHECK_IN")) {
      const timeUntilNext = getTimeUntilNextClaim("CHECK_IN");
      const hours = Math.floor(timeUntilNext / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeUntilNext % (1000 * 60 * 60)) / (1000 * 60)
      );
      toast.error(
        `You can only check in once every 24 hours! Wait ${hours}h ${minutes}m`
      );
      return;
    }

    addReward({
      type: "CHECK_IN",
      name: `${REWARD_TYPES.CHECK_IN.name} - ${location.name}`,
      icon: REWARD_TYPES.CHECK_IN.icon,
      points: REWARD_TYPES.CHECK_IN.points,
      location: location.name,
      coordinates: location.coordinates,
    });

    setRewardClaimed(true);
    toast.success(
      `Successfully checked in at ${location.name}! +${REWARD_TYPES.CHECK_IN.points} points earned!`
    );
  };

  const handleRewardClaim = () => {
    if (nearbyLocations.length > 0) {
      // Check in to the nearest location
      const nearestLocation = nearbyLocations[0];
      handleCheckIn(nearestLocation);
    } else {
      toast.error("No nearby locations available for check-in");
    }
  };

  // Calculate progress percentage based on distance to nearest location
  const maxDistance = 1000; // 1km max distance for progress calculation
  const progressPercentage = Math.max(
    0,
    Math.min(100, ((maxDistance - distanceToNearest) / maxDistance) * 100)
  );

  // Get recent check-ins from actual rewards
  const recentCheckIns = getRecentRewards("CHECK_IN", 5).map((reward) => ({
    location: reward.location,
    points: reward.points,
    date: new Date(reward.timestamp).toISOString().split("T")[0],
  }));

  return (
    <ActionPageLayout
      sidebarContent={[
        // Check-in Info Card
        // <Card
        //   key="checkin-info"
        //   style={standardCardStyle}
        //   bodyStyle={standardCardBodyStyle}
        // >
        //   <div style={{ textAlign: "center" }}>
        //     <div style={standardIconCircleStyle}>
        //       <EnvironmentOutlined
        //         style={{ fontSize: "32px", color: "white" }}
        //       />
        //     </div>
        //     <Title level={4} style={{ color: "#1f2937", marginBottom: "8px" }}>
        //       Daily Check-in
        //     </Title>
        //     <Paragraph style={{ color: "#6b7280", margin: 0 }}>
        //       Visit partner locations to earn daily rewards!
        //     </Paragraph>
        //   </div>
        // </Card>,

        // How It Works
        <Card
          key="how-it-works"
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <QuestionCircleOutlined
                style={{ color: "#667eea", paddingTop: "3px" }}
              />{" "}
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
                  Find Location
                </Text>
                <Paragraph
                  style={{
                    color: "#6b7280",
                    fontSize: "11px",
                    margin: "4px 0 0 0",
                  }}
                >
                  Visit partner locations near your area.
                </Paragraph>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={standardStepNumberStyle}>2</div>
              <div>
                <Text strong style={{ color: "#1f2937", fontSize: "14px" }}>
                  Check In
                </Text>
                <Paragraph
                  style={{
                    color: "#6b7280",
                    fontSize: "11px",
                    margin: "4px 0 0 0",
                  }}
                >
                  Tap the check-in button when you arrive.
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
          key="recent-checkins"
          title={
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <CheckCircleOutlined style={{ color: "#667eea" }} />
              <span>Recent Check-ins</span>
            </div>
          }
          style={standardCardStyle}
        >
          {" "}
          <div
            className="flex flex-col gap-4 !p-6"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {recentCheckIns.length > 0 ? (
              <List
                dataSource={recentCheckIns}
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
                            {item.location}
                          </Text>
                          <Text type="success" style={{ fontSize: "12px" }}>
                            +{item.points} points
                          </Text>
                        </div>
                      }
                      description={
                        <Text style={{ color: "#9ca3af", fontSize: "12px" }}>
                          {item.date}
                        </Text>
                      }
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
                <CheckCircleOutlined
                  style={{
                    fontSize: "48px",
                    marginBottom: "16px",
                    color: "#d1d5db",
                  }}
                />
                <Paragraph style={{ color: "#9ca3af", margin: 0 }}>
                  No recent check-ins. Start checking in to see your history!
                </Paragraph>
              </div>
            )}
          </div>
        </Card>,
      ]}
    >
      {[
        // Location Status and Nearby Locations
        <Card
          key="location-content"
          style={standardCardStyle}
          styles={{ body: { height: "100%" } }}
        >
          {/* {error && (
    <Alert
      message={error}
      type="error"
      showIcon
      style={{ marginBottom: "16px" }}
    />
  )} */}
          <div
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {loading ? (
              <div style={{ textAlign: "center", padding: "48px" }}>
                <Spin
                  indicator={
                    <LoadingOutlined
                      style={{ fontSize: "48px", color: "#e91e63" }}
                      spin
                    />
                  }
                  size="large"
                />
                <Title
                  level={4}
                  style={{
                    color: "#6b7280",
                    marginTop: "16px",
                    marginBottom: "8px",
                  }}
                >
                  Getting Your Location
                </Title>
                <Paragraph style={{ color: "#9ca3af", margin: 0 }}>
                  Please allow location access to find nearby check-in spots
                </Paragraph>
              </div>
            ) : (
              <div
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                {/* Map fills the full space */}
                <MapContainer
                  center={
                    userLocation
                      ? [userLocation.lat, userLocation.lng]
                      : [28.5966, 77.221]
                  } // Default to Delhi area
                  zoom={userLocation ? 15 : 10}
                  style={{ flex: 1, width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />

                  {/* User location marker */}
                  {userLocation && (
                    <Marker position={[userLocation.lat, userLocation.lng]}>
                      <Popup>
                        <div>
                          <strong>Your Location</strong>
                          <br />
                          {userLocation.lat.toFixed(4)},{" "}
                          {userLocation.lng.toFixed(4)}
                        </div>
                      </Popup>
                    </Marker>
                  )}

                  {/* Check-in locations */}
                  {LOCATIONS.map((location) => (
                    <Marker
                      key={location.name}
                      position={[
                        location.coordinates.lat,
                        location.coordinates.lng,
                      ]}
                    >
                      <Popup>
                        <div>
                          <strong>{location.name}</strong>
                          <br />
                          <Text style={{ fontSize: "12px", color: "#666" }}>
                            Within {location.radius}m radius
                          </Text>
                          <br />
                          <Button
                            type="primary"
                            size="small"
                            icon={<CheckCircleOutlined />}
                            onClick={() => handleCheckIn(location)}
                            style={standardButtonStyle}
                          >
                            Check In
                          </Button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>

                {/* If you want to add a footer or list below the map, you can insert it here */}
                {/* Nearby Locations List */}
              </div>
            )}
          </div>
        </Card>,
        // Location Info and Controls Card
        <Card key="recent-checkins" style={standardCardStyle}>
          <div className="flex flex-col !p-6">
            {/* {error && (
              <Alert
                message={error}
                type="error"
                showIcon
                style={{ marginBottom: "16px" }}
              />
            )} */}

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
                  {userLocation ? userLocation.name : "Location Not Enabled"}
                </Title>
              </div>
            </div>

            <div style={{ marginBottom: "16px", height: "50px" }}>
              <>
                {userLocation ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "8px",
                      }}
                    >
                      <Text style={{ color: "#6b7280" }}>
                        Distance to nearest location
                      </Text>
                      <Text style={{ color: "#6b7280" }}>
                        {distanceToNearest}m away
                      </Text>
                    </div>
                    <Progress
                      percent={progressPercentage}
                      strokeColor={{
                        "0%": "#667eea",
                        "100%": "#764ba2",
                      }}
                      showInfo={false}
                    />
                  </>
                ) : (
                  // Show location enable alert when using dummy location
                  <Alert
                    message="Allow location access to find nearby check-in spots and track your progress."
                    type="info"
                    showIcon
                    icon={<EnvironmentOutlined />}
                    action={
                      <Button
                        size="small"
                        type="primary"
                        onClick={async () => {
                          setLoading(true);
                          try {
                            const location = await getCurrentLocation();
                            setUserLocation({
                              ...location,
                              name: "Your Location",
                              description: "Current position",
                            });
                            toast.success(
                              "Location enabled successfully! Finding nearby check-in spots..."
                            );
                          } catch (error) {
                            toast.error(error.message);
                          } finally {
                            setLoading(false);
                          }
                        }}
                      >
                        Enable Location
                      </Button>
                    }
                  />
                )}
              </>
            </div>

            <Button
              type="primary"
              size="large"
              icon={
                rewardClaimed ? <CheckCircleOutlined /> : <TrophyOutlined />
              }
              onClick={handleRewardClaim}
              disabled={
                rewardClaimed || nearbyLocations.length === 0 || !userLocation
              }
              style={{
                background: rewardClaimed
                  ? "#52c41a"
                  : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                border: "none",
                borderRadius: "8px",
                height: "48px",
                fontSize: "16px",
                fontWeight: "600",
                width: "100%",
              }}
            >
              {rewardClaimed
                ? "Check-in Complete!"
                : !userLocation
                ? "Enable Location Access"
                : nearbyLocations.length > 0
                ? `Claim ${REWARD_TYPES.CHECK_IN.points} Points`
                : "No Nearby Locations"}
            </Button>
          </div>
        </Card>,
      ]}
    </ActionPageLayout>
  );
}
