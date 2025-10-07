import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useApp } from '../context/AppContext';
import { 
  Award, 
  Star, 
  Zap, 
  Droplets, 
  Recycle, 
  Users, 
  Activity,
  TrendingUp,
  Calendar,
  Target,
  Trophy,
  Leaf,
  TreePine,
  Globe,
  Clock,
  ChevronRight,
  Play,
  BookOpen,
  MessageCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const { challenges, gameState } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced mock data
  const weeklyImpact = { 
    co2: 2.4, 
    water: 125, 
    waste: 1.8,
    energy: 15.6,
    trees: 0.3
  };

  const dailyGoals = [
    { id: 1, title: 'Use reusable water bottle', completed: true, points: 10 },
    { id: 2, title: 'Take public transport', completed: true, points: 15 },
    { id: 3, title: 'Recycle 3 items', completed: false, points: 20 },
    { id: 4, title: 'Turn off lights when leaving', completed: false, points: 5 }
  ];

  const recentActivities = [
    { id: 1, text: 'Completed "Zero Waste Week" challenge', time: '2h ago', type: 'challenge', icon: Target, color: 'text-green-500' },
    { id: 2, text: 'Earned "Eco Warrior" badge', time: '5h ago', type: 'achievement', icon: Award, color: 'text-yellow-500' },
    { id: 3, text: 'Played Waste Sorting game - 85 points', time: '1d ago', type: 'game', icon: Play, color: 'text-blue-500' },
    { id: 4, text: 'Joined "Campus Gardeners" community', time: '2d ago', type: 'community', icon: Users, color: 'text-purple-500' },
  ];

  const upcomingEvents = [
    { id: 1, title: 'Earth Day Campus Clean-up', date: '2024-04-22', time: '10:00 AM' },
    { id: 2, title: 'Sustainability Workshop', date: '2024-04-25', time: '2:00 PM' },
    { id: 3, title: 'Green Energy Seminar', date: '2024-04-28', time: '11:00 AM' }
  ];

  const quickActions = [
    { id: 1, title: 'Log Eco Action', icon: Leaf, color: 'bg-green-500', link: '/actions' },
    { id: 2, title: 'Play Mini Game', icon: Play, color: 'bg-blue-500', link: '/mini-games' },
    { id: 3, title: 'Join Challenge', icon: Target, color: 'bg-purple-500', link: '/challenges' },
    { id: 4, title: 'View Leaderboard', icon: Trophy, color: 'bg-yellow-500', link: '/leaderboard' }
  ];

  const completedGoals = dailyGoals.filter(goal => goal.completed).length;
  const goalProgress = (completedGoals / dailyGoals.length) * 100;

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-xl text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}! 🌱</h1>
            <p className="text-green-100">Ready to make a positive impact today?</p>
            <p className="text-sm text-green-200 mt-1">
              {currentTime.toLocaleDateString()} • {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{gameState.ecoPoints}</div>
            <div className="text-green-200 text-sm">Eco Points</div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {quickActions.map((action) => {
          const IconComponent = action.icon;
          return (
            <Link
              key={action.id}
              to={action.link}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-800 dark:text-white text-sm">{action.title}</h3>
            </Link>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Daily Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Today's Goals</h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {completedGoals}/{dailyGoals.length} completed
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${goalProgress}%` }}
              ></div>
            </div>
            <div className="space-y-3">
              {dailyGoals.map((goal) => (
                <div key={goal.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full border-2 ${
                      goal.completed ? 'bg-green-500 border-green-500' : 'border-gray-300'
                    } flex items-center justify-center`}>
                      {goal.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className={`${goal.completed ? 'line-through text-gray-500' : 'text-gray-800 dark:text-white'}`}>
                      {goal.title}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-green-600">+{goal.points} pts</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Active Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Active Challenges</h2>
              <Link to="/challenges" className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="space-y-4">
              {challenges.slice(0, 2).map((challenge) => (
                <div key={challenge.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white">{challenge.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{challenge.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-sm">
                        <span className="text-green-600 font-medium">{challenge.points} Points</span>
                        <span className="text-gray-500">{challenge.participants} participants</span>
                        {challenge.progress && (
                          <span className="text-blue-500">{challenge.progress}% complete</span>
                        )}
                      </div>
                    </div>
                    <Link
                      to="/challenges"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors"
                    >
                      Join
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Recent Activities</h2>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-full">
                      <IconComponent className={`w-5 h-5 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 dark:text-white">{activity.text}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Weekly Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Weekly Impact</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap className="w-5 h-5 text-yellow-500 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">CO₂ Reduced</span>
                </div>
                <span className="font-bold text-yellow-600">{weeklyImpact.co2} kg</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Droplets className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">Water Saved</span>
                </div>
                <span className="font-bold text-blue-600">{weeklyImpact.water} L</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Recycle className="w-5 h-5 text-green-500 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">Waste Reduced</span>
                </div>
                <span className="font-bold text-green-600">{weeklyImpact.waste} kg</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <TreePine className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-gray-700 dark:text-gray-300">Trees Planted</span>
                </div>
                <span className="font-bold text-green-700">{weeklyImpact.trees}</span>
              </div>
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Upcoming Events</h2>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <h3 className="font-medium text-gray-800 dark:text-white text-sm">{event.title}</h3>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <Calendar className="w-3 h-3 mr-1" />
                    {event.date} • {event.time}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Current Streak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-orange-400 to-red-500 p-6 rounded-xl text-white"
          >
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{gameState.streak}</div>
              <div className="text-orange-100 text-sm">Day Streak</div>
              <div className="mt-3 text-xs text-orange-200">
                Keep it up! You're on fire! 🔥
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
