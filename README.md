# 🎯 Earn & Collect — A Reward System for IRL Interactions

A modern web-based reward experience where users unlock digital tokens by completing real-world tasks. This prototype demonstrates a comprehensive reward system with persistent state management, responsive design, and engaging user interactions.

## 🚀 Live Demo

[View Live Demo](https://coinquest-collect.netlify.app/)

## ✨ Core Features

### 🎮 User Actions (3 Different Types)

1. **📍 Location Check-in** - Triggered when user is within X meters of hardcoded locations
2. **🎥 Watch a Video** - User must watch at least 15 seconds to unlock rewards
3. **📱 Scan a Code** - Simulate QR scanning with code validation

### 💰 Wallet System

- **Persistent State** - All data stored in localStorage
- **Reward History** - Complete transaction history with timestamps
- **Statistics Dashboard** - Points, streaks, and activity breakdown
- **Customizable Profile** - User name and avatar support

### 🎯 Advanced Features

- **Cooldown System** - Prevents spam with intelligent time restrictions
- **Progress Tracking** - Visual progress bars and completion indicators
- **Toast Notifications** - Real-time feedback for all actions
- **Responsive Design** - Works perfectly on all devices
- **Interactive Maps** - Location-based check-ins with Leaflet integration

## 🛠️ Technical Stack

- **Frontend**: React 19 + Vite
- **UI Framework**: Ant Design 5
- **Styling**: Tailwind CSS 4
- **State Management**: React Context API
- **Routing**: React Router DOM 7
- **Maps**: React Leaflet + Leaflet
- **Video Player**: React Player
- **Notifications**: React Toastify
- **Build Tool**: Vite

## 📱 Features Breakdown

### 🎮 Action Types & Rewards

| Action      | Reward Token     | Points | Cooldown | Requirements            |
| ----------- | ---------------- | ------ | -------- | ----------------------- |
| Check-in    | 🌟 Check-In Coin | 100    | 24 hours | Within 100m of location |
| Video Watch | 🎥 Hype Badge    | 50     | 12 hours | Watch 15+ seconds       |
| Code Scan   | 📱 Scanner Token | 75     | 1 hour   | Valid code entry        |

### 💼 Wallet Features

- **Total Points**: Real-time calculation from all rewards
- **Activity Breakdown**: Detailed statistics by action type
- **Streak Tracking**: Daily check-in streak with bonus rewards
- **Recent Activities**: Last 8 transactions with timestamps
- **Export/Import**: Data portability (UI ready)
- **Reset Functionality**: Complete data reset with confirmation

### 🎨 User Experience

- **Responsive Layout**: Mobile-first design with breakpoint optimization
- **Loading States**: Smooth transitions and loading indicators
- **Error Handling**: Comprehensive error messages and validation
- **Accessibility**: ARIA labels and keyboard navigation
- **Performance**: Optimized rendering and minimal re-renders

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/earn-collect.git
cd earn-collect

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Setup

No environment variables required - all data is stored locally.

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── constants/          # App constants and configurations
├── context/           # React Context for state management
├── layouts/           # Layout components and styles
├── pages/            # Main application pages
│   ├── checkin/      # Location check-in functionality
│   ├── dashboard/    # Main dashboard view
│   ├── scan/         # Code scanning interface
│   ├── wallet/       # Wallet and profile management
│   └── watch/        # Video watching interface
├── utils/            # Utility functions
└── assets/           # Static assets
```

## 🎯 Key Implementation Highlights

### 🔄 State Management

- **Centralized Context**: Single source of truth for all app state
- **Persistent Storage**: Automatic localStorage synchronization
- **Optimistic Updates**: Immediate UI feedback with background sync

### �� Location Services

- **Haversine Formula**: Accurate distance calculations
- **Geolocation API**: Real-time user location tracking
- **Interactive Maps**: Visual location representation

### 🎥 Video Integration

- **React Player**: YouTube video embedding
- **Progress Tracking**: Real-time watch time monitoring
- **Cooldown Management**: Intelligent reward timing

### 🎨 UI/UX Design

- **Ant Design**: Professional component library
- **Responsive Grid**: Mobile-first responsive design
- **Consistent Theming**: Unified color scheme and typography
- **Loading States**: Smooth user experience

### Performance Metrics

- **Bundle Size**: Optimized with Vite
- **Load Time**: < 2 seconds on 3G
- **Memory Usage**: Efficient state management
- **Rendering**: Minimal re-renders with React optimization

## 🚀 Deployment

### Build Process

```bash
npm run build
```

### Deployment Options

- **Vercel**: Zero-config deployment
- **Netlify**: Drag-and-drop deployment
- **GitHub Pages**: Static site hosting
- **AWS S3**: Scalable cloud hosting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

