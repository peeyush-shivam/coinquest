import { createContext, useContext, useState, useEffect } from "react";
import { REWARD_TYPES, VALID_CODES } from "../constants/rewards";

const WalletContext = createContext();

export function WalletProvider({ children }) {
  const [rewards, setRewards] = useState(() => {
    const savedRewards = localStorage.getItem("rewards");
    return savedRewards ? JSON.parse(savedRewards) : [];
  });

  const [lastActions, setLastActions] = useState(() => {
    const savedActions = localStorage.getItem("lastActions");
    return savedActions
      ? JSON.parse(savedActions)
      : {
          checkIn: null,
          videoWatch: null,
          codeScan: null,
        };
  });

  const [userName, setUserName] = useState(() => {
    const savedName = localStorage.getItem("userName");
    return savedName || "Alex";
  });

  const [totalPoints, setTotalPoints] = useState(() => {
    const savedPoints = localStorage.getItem("totalPoints");
    return savedPoints ? parseInt(savedPoints) : 0;
  });

  const [userStats, setUserStats] = useState(() => {
    const savedStats = localStorage.getItem("userStats");
    return savedStats
      ? JSON.parse(savedStats)
      : {
          totalRewards: 0,
          checkInCount: 0,
          videoWatchCount: 0,
          codeScanCount: 0,
          streakDays: 0,
          lastCheckInDate: null,
        };
  });

  useEffect(() => {
    localStorage.setItem("rewards", JSON.stringify(rewards));
  }, [rewards]);

  useEffect(() => {
    localStorage.setItem("lastActions", JSON.stringify(lastActions));
  }, [lastActions]);

  useEffect(() => {
    localStorage.setItem("totalPoints", totalPoints.toString());
  }, [totalPoints]);

  useEffect(() => {
    localStorage.setItem("userStats", JSON.stringify(userStats));
  }, [userStats]);

  useEffect(() => {
    localStorage.setItem("userName", userName);
  }, [userName]);

  // Calculate total points from rewards
  useEffect(() => {
    const calculatedPoints = rewards.reduce(
      (total, reward) => total + reward.points,
      0
    );
    setTotalPoints(calculatedPoints);
  }, [rewards]);

  // Update user stats when rewards change
  useEffect(() => {
    const stats = {
      totalRewards: rewards.length,
      checkInCount: rewards.filter((r) => r.type === "CHECK_IN").length,
      videoWatchCount: rewards.filter((r) => r.type === "VIDEO_WATCH").length,
      codeScanCount: rewards.filter((r) => r.type === "CODE_SCAN").length,
      streakDays: calculateStreakDays(),
      lastCheckInDate: userStats.lastCheckInDate,
    };
    setUserStats(stats);
  }, [rewards]);

  const calculateStreakDays = () => {
    const checkInRewards = rewards
      .filter((r) => r.type === "CHECK_IN")
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    if (checkInRewards.length === 0) return 0;

    let streak = 1;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < checkInRewards.length - 1; i++) {
      const currentDate = new Date(checkInRewards[i].timestamp);
      currentDate.setHours(0, 0, 0, 0);

      const nextDate = new Date(checkInRewards[i + 1].timestamp);
      nextDate.setHours(0, 0, 0, 0);

      const diffDays = (currentDate - nextDate) / (1000 * 60 * 60 * 24);

      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const addReward = (reward) => {
    const newReward = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...reward,
    };

    setRewards((prev) => [...prev, newReward]);

    // Update last action for the reward type
    updateLastAction(reward.type.toLowerCase());

    // Update last check-in date if it's a check-in reward
    if (reward.type === "CHECK_IN") {
      setUserStats((prev) => ({
        ...prev,
        lastCheckInDate: new Date().toISOString(),
      }));
    }

    return newReward;
  };

  const updateLastAction = (actionType) => {
    setLastActions((prev) => ({
      ...prev,
      [actionType]: new Date().toISOString(),
    }));
  };

  const canClaimReward = (rewardType) => {
    const lastAction = lastActions[rewardType.toLowerCase()];
    const cooldown = REWARD_TYPES[rewardType].cooldown;

    if (!lastAction) return true;

    const timeSinceLastAction = Date.now() - new Date(lastAction).getTime();
    return timeSinceLastAction >= cooldown;
  };

  const getTimeUntilNextClaim = (rewardType) => {
    const lastAction = lastActions[rewardType.toLowerCase()];
    const cooldown = REWARD_TYPES[rewardType].cooldown;

    if (!lastAction) return 0;

    const timeSinceLastAction = Date.now() - new Date(lastAction).getTime();
    const remainingTime = cooldown - timeSinceLastAction;

    return Math.max(0, remainingTime);
  };

  const validateCode = (code) => {
    return VALID_CODES.find(
      (vc) => vc.code.toLowerCase() === code.toLowerCase()
    );
  };

  const getRecentRewards = (type = null, limit = 5) => {
    let filteredRewards = rewards;

    if (type) {
      filteredRewards = rewards.filter((r) => r.type === type);
    }

    return filteredRewards
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  };

  const getRewardStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRewards = rewards.filter((r) => {
      const rewardDate = new Date(r.timestamp);
      rewardDate.setHours(0, 0, 0, 0);
      return rewardDate.getTime() === today.getTime();
    });

    return {
      totalPoints,
      totalRewards: rewards.length,
      todayRewards: todayRewards.length,
      todayPoints: todayRewards.reduce((sum, r) => sum + r.points, 0),
      checkInCount: userStats.checkInCount,
      videoWatchCount: userStats.videoWatchCount,
      codeScanCount: userStats.codeScanCount,
      streakDays: userStats.streakDays,
    };
  };

  const resetWallet = () => {
    setRewards([]);
    setLastActions({
      checkIn: null,
      videoWatch: null,
      codeScan: null,
    });
    setTotalPoints(0);
    setUserName("Alex");
    setUserStats({
      totalRewards: 0,
      checkInCount: 0,
      videoWatchCount: 0,
      codeScanCount: 0,
      streakDays: 0,
      lastCheckInDate: null,
    });
  };

  return (
    <WalletContext.Provider
      value={{
        rewards,
        lastActions,
        totalPoints,
        userStats,
        userName,
        setUserName,
        addReward,
        updateLastAction,
        canClaimReward,
        getTimeUntilNextClaim,
        validateCode,
        getRecentRewards,
        getRewardStats,
        resetWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
