/**
 * Application-wide constants
 */

// App Configuration
export const APP_CONFIG = {
  NAME: "Earn & Collect",
  VERSION: "1.0.0",
  DESCRIPTION: "A modern web-based reward experience",
  AUTHOR: "Peeyush",
  MAX_USERNAME_LENGTH: 20,
  MIN_USERNAME_LENGTH: 2,
};

// API Configuration
export const API_CONFIG = {
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
  BASE_URL: process.env.REACT_APP_API_URL || "http://localhost:3000",
};

// Geolocation Configuration
export const GEO_CONFIG = {
  TIMEOUT: 10000,
  MAX_AGE: 60000,
  HIGH_ACCURACY: true,
  DEFAULT_RADIUS: 100, // meters
};

// UI Configuration
export const UI_CONFIG = {
  TOAST_DURATION: 4000,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  LOADING_DELAY: 500,
};

// Theme Colors
export const COLORS = {
  PRIMARY: "#667eea",
  SECONDARY: "#764ba2",
  SUCCESS: "#52c41a",
  WARNING: "#faad14",
  ERROR: "#ff4d4f",
  INFO: "#1890ff",
  TEXT_PRIMARY: "#1f2937",
  TEXT_SECONDARY: "#6b7280",
  BACKGROUND: "#f5f5f5",
  WHITE: "#ffffff",
};

// Breakpoints
export const BREAKPOINTS = {
  XS: 480,
  SM: 576,
  MD: 768,
  LG: 992,
  XL: 1200,
  XXL: 1600,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  REWARDS: "rewards",
  LAST_ACTIONS: "lastActions",
  USER_NAME: "userName",
  TOTAL_POINTS: "totalPoints",
  USER_STATS: "userStats",
  THEME: "theme",
  LANGUAGE: "language",
};

// Reward Types
export const REWARD_ACTIONS = {
  CHECK_IN: "CHECK_IN",
  VIDEO_WATCH: "VIDEO_WATCH",
  CODE_SCAN: "CODE_SCAN",
};

// Validation Rules
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 2,
    MAX_LENGTH: 20,
    PATTERN: /^[a-zA-Z0-9\s]+$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  CODE: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 20,
    PATTERN: /^[A-Z0-9]+$/,
  },
};

// Error Messages
export const ERROR_MESSAGES = {
  GEOLOCATION_NOT_SUPPORTED: "Geolocation is not supported by your browser.",
  LOCATION_UNAVAILABLE:
    "Unable to get your location. Please enable location services.",
  INVALID_CODE: "Invalid code. Please try again.",
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNKNOWN_ERROR: "An unexpected error occurred. Please try again.",
  REQUIRED_FIELD: "This field is required.",
  INVALID_EMAIL: "Please enter a valid email address.",
  USERNAME_TOO_SHORT: "Username must be at least 2 characters.",
  USERNAME_TOO_LONG: "Username must be less than 20 characters.",
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOCATION_ENABLED:
    "Location enabled successfully! Finding nearby check-in spots...",
  REWARD_CLAIMED: "Reward claimed successfully!",
  PROFILE_UPDATED: "Profile updated successfully!",
  DATA_RESET: "All data reset successfully!",
  CODE_COPIED: "Code copied to clipboard!",
};

// Animation Durations
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  VERY_SLOW: 800,
};

// Performance Thresholds
export const PERFORMANCE = {
  MAX_BUNDLE_SIZE: 500, // KB
  MAX_LOAD_TIME: 3000, // ms
  MAX_RENDER_TIME: 16, // ms (60fps)
};
