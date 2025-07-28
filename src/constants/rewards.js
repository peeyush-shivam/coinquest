export const REWARD_TYPES = {
  CHECK_IN: {
    name: "Check-In Coin",
    icon: "🌟",
    cooldown: 24 * 60 * 60 * 1000, // 24 hours
    points: 100,
  },
  VIDEO_WATCH: {
    name: "Hype Badge",
    icon: "🎥",
    cooldown: 12 * 60 * 60 * 1000, // 12 hours
    points: 50,
    minWatchTime: 15, // seconds
  },
  CODE_SCAN: {
    name: "Scanner Token",
    icon: "📱",
    cooldown: 1 * 60 * 60 * 1000, // 1 hour
    points: 75,
  },
};

// Sample valid codes
export const VALID_CODES = [
  { code: "WELCOME2024", bonus: 100 },
  { code: "FIRSTCHECK", bonus: 50 },
  { code: "DAILY25", bonus: 25 },
  { code: "REFER75", bonus: 75 },
];

export const LOCATIONS = [
  {
    id: 1,
    name: "Central Plaza",
    coordinates: { lat: 28.5966, lng: 77.221 },
    radius: 100, // meters
  },
  {
    id: 2,
    name: "Tech Hub",
    coordinates: { lat: 28.597, lng: 77.2215 },
    radius: 50, // meters
  },
  {
    id: 3,
    name: "Shopping Mall",
    coordinates: { lat: 28.596, lng: 77.2205 },
    radius: 75, // meters
  },
  {
    id: 4,
    name: "Coffee Shop",
    coordinates: { lat: 28.5975, lng: 77.222 },
    radius: 30, // meters
  },
];
