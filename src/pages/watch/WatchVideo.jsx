import React, { useState, useRef, useEffect } from "react";
import { useWallet } from "../../context/WalletContext";
import { REWARD_TYPES } from "../../constants/rewards";
import { toast } from "react-toastify";
import {
  Card,
  Typography,
  Button,
  Alert,
  Progress,
  List,
  Avatar,
  Statistic,
  Space,
} from "antd";
import {
  PlayCircleOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import ReactPlayer from "react-player";
import ActionPageLayout, {
  standardCardStyle,
  standardCardBodyStyle,
  standardButtonStyle,
  standardIconCircleStyle,
  standardStepNumberStyle,
} from "../../layouts/ActionPageLayout";

const { Title, Paragraph, Text } = Typography;

const SAMPLE_VIDEOS = [
  {
    id: 1,
    title: "Introduction to Web3",
    url: "https://www.youtube.com/watch?v=bBC-nXj3Ng4",
    duration: 60,
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    description: "Learn the basics of Web3 and blockchain technology",
  },
  {
    id: 2,
    title: "Blockchain Basics",
    url: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
    duration: 45,
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    description: "Understanding the fundamentals of blockchain",
  },
];

const WatchVideo = () => {
  const [selectedVideo, setSelectedVideo] = useState({
    id: 2,
    title: "Blockchain Basics",
    url: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
    duration: 45,
    thumbnail:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
    description: "Understanding the fundamentals of blockchain",
  });
  const [watchTime, setWatchTime] = useState(0);
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const timerRef = useRef(null);

  const {
    addReward,
    lastActions,
    rewards,
    canClaimReward,
    getTimeUntilNextClaim,
    getRecentRewards,
  } = useWallet();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    setWatchTime(0);
    setRewardClaimed(false);
    setError(null);
    setIsPlaying(false);

    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    // Start timer when video starts playing
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setWatchTime((prev) => {
          const newTime = prev + 1;
          // Cap at the minimum watch time requirement
          return Math.min(newTime, REWARD_TYPES.VIDEO_WATCH.minWatchTime);
        });
      }, 1000);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
    // Pause timer when video is paused
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleProgress = (state) => {
    // Update watch time based on actual video progress
    if (state.playedSeconds) {
      const newTime = Math.floor(state.playedSeconds);
      setWatchTime(Math.min(newTime, REWARD_TYPES.VIDEO_WATCH.minWatchTime));
    }
  };

  const handleRewardClaim = () => {
    if (!canClaimReward("VIDEO_WATCH")) {
      const timeUntilNext = getTimeUntilNextClaim("VIDEO_WATCH");
      const hours = Math.floor(timeUntilNext / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeUntilNext % (1000 * 60 * 60)) / (1000 * 60)
      );
      toast.error(
        `You need to wait ${hours}h ${minutes}m before claiming another video reward!`
      );
      return;
    }

    if (watchTime >= REWARD_TYPES.VIDEO_WATCH.minWatchTime) {
      addReward({
        type: "VIDEO_WATCH",
        name: `${REWARD_TYPES.VIDEO_WATCH.name} - ${selectedVideo.title}`,
        icon: REWARD_TYPES.VIDEO_WATCH.icon,
        points: REWARD_TYPES.VIDEO_WATCH.points,
        videoId: selectedVideo.id,
        videoTitle: selectedVideo.title,
      });
      setRewardClaimed(true);
      toast.success(
        `Successfully earned ${REWARD_TYPES.VIDEO_WATCH.points} points for watching "${selectedVideo.title}"!`
      );
    } else {
      toast.error(
        `Watch at least ${REWARD_TYPES.VIDEO_WATCH.minWatchTime} seconds to claim reward`
      );
    }
  };

  // Get recent video watches from actual rewards
  const recentWatches = getRecentRewards("VIDEO_WATCH", 5).map((reward) => ({
    title: reward.videoTitle || "Video Watch",
    points: reward.points,
    date: new Date(reward.timestamp).toISOString().split("T")[0],
  }));

  const watchProgress = selectedVideo
    ? (watchTime / REWARD_TYPES.VIDEO_WATCH.minWatchTime) * 100
    : 0;

  return (
    <ActionPageLayout
      sidebarContent={[
        // How It Works Card
        <Card
          key="how-it-works"
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <QuestionCircleOutlined style={{ color: "#667eea" }} />
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
                  Play Video
                </Text>
                <Paragraph
                  style={{
                    color: "#6b7280",
                    fontSize: "11px",
                    margin: "4px 0 0 0",
                  }}
                >
                  Click on the play button to start watching the video.
                </Paragraph>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={standardStepNumberStyle}>2</div>
              <div>
                <Text strong style={{ color: "#1f2937", fontSize: "14px" }}>
                  Watch & Learn
                </Text>
                <Paragraph
                  style={{
                    color: "#6b7280",
                    fontSize: "11px",
                    margin: "4px 0 0 0",
                  }}
                >
                  Watch for at least 15 seconds to qualify.
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

        // Recent Watches Card
        <Card
          key="recent-watches"
          title={
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <EyeOutlined style={{ color: "#667eea" }} />
              <span>Recent Watches</span>
            </div>
          }
          style={standardCardStyle}
        >
          <div
            className="flex flex-col gap-4 !p-6"
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {recentWatches.length > 0 ? (
              <List
                dataSource={recentWatches}
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
                            {item.title.length > 30
                              ? item.title.substring(0, 30) + "..."
                              : item.title}
                          </Text>
                          <Text type="success" style={{ fontSize: "12px" }}>
                            +{item.points}
                          </Text>
                        </div>
                      }
                      description={
                        <Text style={{ color: "#9ca3af", fontSize: "11px" }}>
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
                <PlayCircleOutlined
                  style={{
                    fontSize: "48px",
                    marginBottom: "16px",
                    color: "#d1d5db",
                  }}
                />
                <Paragraph
                  style={{ color: "#9ca3af", margin: 0, fontSize: "12px" }}
                >
                  No recent watches. Start watching to see your history!
                </Paragraph>
              </div>
            )}
          </div>
        </Card>,
      ]}
    >
      {[
        // Video Player Card
        <Card
          key="video-player"
          style={{
            ...standardCardStyle,
            overflow: "hidden",
            height: "100%",
          }}
          bodyStyle={{ padding: 0, height: "100%" }}
        >
          <div style={{ position: "relative", height: "100%", width: "100%" }}>
            <ReactPlayer
              ref={playerRef}
              src={selectedVideo.url}
              width="100%"
              height="100%"
              controls={true}
              onPlay={handlePlay}
              onPause={handlePause}
              onProgress={handleProgress}
              config={{
                youtube: {
                  playerVars: {
                    modestbranding: 1,
                    controls: 1,
                    rel: 0,
                    showinfo: 0,
                  },
                },
              }}
            />
          </div>
        </Card>,

        // Video Info and Controls Card
        <Card key="video-controls" style={standardCardStyle}>
          <div className="flex flex-col !p-6">
            {/* Error messages now handled by toast notifications */}

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
                  {selectedVideo.title}
                </Title>
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <Text style={{ color: "#6b7280" }}>Progress to reward</Text>
                <Text style={{ color: "#6b7280" }}>
                  {watchTime}/{REWARD_TYPES.VIDEO_WATCH.minWatchTime}s
                </Text>
              </div>
              <Progress
                percent={Math.min(watchProgress, 100)}
                strokeColor={{
                  "0%": "#667eea",
                  "100%": "#764ba2",
                }}
                showInfo={false}
              />
            </div>

            <Button
              type="primary"
              size="large"
              icon={
                rewardClaimed ? <CheckCircleOutlined /> : <TrophyOutlined />
              }
              onClick={handleRewardClaim}
              disabled={
                rewardClaimed ||
                watchTime < REWARD_TYPES.VIDEO_WATCH.minWatchTime
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
                ? "Video Reward Claimed!"
                : `Claim ${REWARD_TYPES.VIDEO_WATCH.points} Points`}
            </Button>
          </div>
        </Card>,
      ]}
    </ActionPageLayout>
  );
};

export default WatchVideo;
