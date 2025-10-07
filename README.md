# Campus Sustainability Dashboard (CSD)

A modern, interactive, and responsive web-based platform designed to increase student engagement in eco-friendly campus activities. The platform integrates gamification, real-time analytics, AI insights, and social interaction features to encourage sustainability practices through interactive, fun, and rewarding experiences.

## 🌟 Features

### 🌱 User Dashboard (Students)
- Real-time stats on energy/water/waste savings
- Visual graphs & progress bars
- Personal sustainability score and badges
- "My Challenges" section with start/join buttons
- AI-generated eco-tips based on user activity

### 🏫 Admin Dashboard (Faculty/Admins)
- Create/manage sustainability challenges
- Monitor participation metrics (graphs, heatmaps)
- Manage reward points and leaderboard updates
- Downloadable analytics reports (CSV/PDF)

### 🎮 Gamification & Rewards
- Daily and weekly challenges (e.g., "Walk to class week")
- XP points, eco-badges, and campus leaderboard
- Reward store (redeem points for coupons, gifts, or certificates)

### 📊 Real-Time Environmental Impact Visualization
- Animated dashboard showing total campus impact
- Live data widgets (e.g., CO₂ saved, trees equivalent, etc.)

### 💬 Community & Social Engagement
- Discussion forum for ideas
- Team challenges for departments or hostels
- Share achievements to social media

### 🤖 AI-Powered Features
- Personalized sustainability recommendations based on habits
- Predictive analytics for upcoming eco events
- Smart chatbot for FAQs and guidance

## 🚀 Tech Stack

### Frontend
- **React 18** with TypeScript for type safety
- **Tailwind CSS** for modern, responsive styling
- **Framer Motion** for smooth animations
- **Recharts** for data visualization
- **Lucide React** for consistent icons

### Backend (Future Implementation)
- **Node.js** with Express.js
- **MongoDB** for data storage
- **Socket.io** for real-time updates
- **JWT** for authentication

### Design Features
- Clean, futuristic design with green, white, and gradient themes
- Gamified interface with progress bars and animated badges
- Dark/light mode support
- Mobile responsiveness
- Accessibility friendly design

## 📁 Project Structure

```
campus-sustainability-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AchievementBadge.tsx
│   │   ├── EcoTipCard.tsx
│   │   ├── MetricCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── ProgressChart.tsx
│   │   └── Sidebar.tsx
│   ├── context/
│   │   ├── ThemeContext.tsx
│   │   └── UserContext.tsx
│   ├── pages/
│   │   ├── AdminDashboard.tsx
│   │   ├── Challenges.tsx
│   │   ├── Community.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Leaderboard.tsx
│   │   ├── Profile.tsx
│   │   └── Rewards.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd campus-sustainability-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎯 Key Components

### Core Components
- **Dashboard** - Main user interface showing sustainability metrics
- **Challenges** - Browse and join sustainability challenges
- **Leaderboard** - View rankings and compete with others
- **Rewards** - Redeem points for rewards and incentives
- **Community** - Social features and team challenges
- **Profile** - User profile management and achievements
- **AdminDashboard** - Administrative controls and analytics

### Context Providers
- **UserContext** - Manages user authentication and profile data
- **ThemeContext** - Handles dark/light theme switching

## 🎨 Design System

### Color Palette
- **Primary Green**: #22c55e (Tailwind green-500)
- **Secondary Blue**: #3b82f6 (Tailwind blue-500)
- **Accent Yellow**: #fbbf24 (Tailwind yellow-500)
- **Neutral Gray**: Various shades for text and backgrounds

### Typography
- **Headings**: Bold, modern sans-serif fonts
- **Body Text**: Clean, readable typography
- **Icons**: Lucide React for consistency

### Animations
- **Page Transitions**: Smooth fade and slide animations
- **Hover Effects**: Subtle scale and color transitions
- **Loading States**: Spinning indicators and skeleton screens

## 🔮 Future Enhancements

### Backend Integration
- RESTful API for data management
- Real-time WebSocket connections
- User authentication and authorization
- Database integration (MongoDB/PostgreSQL)

### Advanced Features
- AI-powered sustainability recommendations
- Integration with IoT sensors for real-time data
- Mobile app development (React Native)
- Advanced analytics and reporting
- Multi-campus support
- Integration with external sustainability APIs

### Gamification Enhancements
- Advanced achievement system
- Seasonal challenges and events
- Peer-to-peer challenges
- Advanced reward tiers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Framer Motion** for the animation library
- **Lucide React** for the beautiful icons
- **Recharts** for the data visualization components

## 📞 Support

For support, email support@campussustainability.edu or create an issue in the repository.

---

**Made with ❤️ for a sustainable future**
