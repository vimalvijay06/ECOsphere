import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Challenges from './pages/Challenges';
import Leaderboard from './pages/Leaderboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import Rewards from './pages/Rewards';
import Community from './pages/Community';
import LoginPage from './pages/Login';
import StudentLoginPage from './pages/StudentLoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import RegisterPage from './pages/RegisterPage';
import MiniGames from './pages/MiniGames';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import UserManagement from './pages/admin/UserManagement';
import SystemMonitor from './pages/admin/SystemMonitor';
import NotificationCenter from './pages/admin/NotificationCenter';
import ChallengeManagement from './pages/admin/ChallengeManagement';
import DataAnalytics from './pages/admin/DataAnalytics';
import RewardsManagement from './pages/admin/RewardsManagement';
import RewardsClaiming from './pages/RewardsClaiming';
import { UserProvider, useUser } from './context/UserContext';
import { AppProvider } from './context/AppContext';
import { RewardsProvider } from './context/RewardsContext';
import './App.css';

// New main application layout
const AppLayout = () => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-background p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

// Wrapper for animated route transitions
const AnimatedRoute = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

// Main App component to handle routing
function AppRoutes() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/student" element={<StudentLoginPage />} />
      <Route path="/login/admin" element={<AdminLoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/" element={user ? <AppLayout /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<AnimatedRoute><Dashboard /></AnimatedRoute>} />
        <Route path="challenges" element={<AnimatedRoute><Challenges /></AnimatedRoute>} />
        <Route path="leaderboard" element={<AnimatedRoute><Leaderboard /></AnimatedRoute>} />
        <Route path="rewards" element={<AnimatedRoute><Rewards /></AnimatedRoute>} />
        <Route path="rewards-claiming" element={<AnimatedRoute><RewardsClaiming /></AnimatedRoute>} />
        <Route path="community" element={<AnimatedRoute><Community /></AnimatedRoute>} />
        <Route path="profile" element={<AnimatedRoute><Profile /></AnimatedRoute>} />
        <Route path="mini-games" element={<AnimatedRoute><MiniGames /></AnimatedRoute>} />
        <Route path="analytics" element={<AnimatedRoute><Analytics /></AnimatedRoute>} />
        <Route path="settings" element={<AnimatedRoute><Settings /></AnimatedRoute>} />
        <Route path="admin" element={
          user?.role === 'admin' ? (
            <AnimatedRoute><AdminDashboard /></AnimatedRoute>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        } />
        <Route path="admin/users" element={
          user?.role === 'admin' ? (
            <AnimatedRoute><UserManagement /></AnimatedRoute>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        } />
        <Route path="system-monitor" element={
          user?.role === 'admin' ? (
            <AnimatedRoute><SystemMonitor /></AnimatedRoute>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        } />
        <Route path="admin/notifications" element={
          user?.role === 'admin' ? (
            <AnimatedRoute><NotificationCenter /></AnimatedRoute>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        } />
        <Route path="admin/challenges" element={
          user?.role === 'admin' ? (
            <AnimatedRoute><ChallengeManagement /></AnimatedRoute>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        } />
        <Route path="admin/data-analytics" element={
          user?.role === 'admin' ? (
            <AnimatedRoute><DataAnalytics /></AnimatedRoute>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        } />
        <Route path="admin/rewards" element={
          user?.role === 'admin' ? (
            <AnimatedRoute><RewardsManagement /></AnimatedRoute>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        } />
      </Route>

      <Route path="*" element={<Navigate to={user ? "/dashboard" : "/login"} replace />} />
    </Routes>
  );
}

function App() {
  return (
    <UserProvider>
      <AppProvider>
        <RewardsProvider>
          <Router>
            <AppRoutes />
          </Router>
        </RewardsProvider>
      </AppProvider>
    </UserProvider>
  );
}

export default App;
