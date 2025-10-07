import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Users,
  Target,
  Award,
  Activity,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Eye,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';

const DataAnalytics: React.FC = () => {
  const [dateRange, setDateRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('users');

  // Mock data for charts
  const userGrowthData = [
    { month: 'Jan', users: 856, challenges: 12, points: 45680 },
    { month: 'Feb', users: 934, challenges: 15, points: 52340 },
    { month: 'Mar', users: 1056, challenges: 18, points: 61250 },
    { month: 'Apr', users: 1189, challenges: 22, points: 73890 },
    { month: 'May', users: 1247, challenges: 25, points: 82450 }
  ];

  const categoryData = [
    { name: 'Energy', value: 234, color: '#10B981' },
    { name: 'Waste', value: 189, color: '#3B82F6' },
    { name: 'Water', value: 156, color: '#8B5CF6' },
    { name: 'Transportation', value: 98, color: '#F59E0B' },
    { name: 'Food', value: 67, color: '#EF4444' }
  ];

  const engagementData = [
    { day: 'Mon', logins: 456, challenges: 89, points: 12340 },
    { day: 'Tue', logins: 523, challenges: 102, points: 15670 },
    { day: 'Wed', logins: 489, challenges: 95, points: 14230 },
    { day: 'Thu', logins: 612, challenges: 118, points: 18450 },
    { day: 'Fri', logins: 578, challenges: 134, points: 19890 },
    { day: 'Sat', logins: 234, challenges: 67, points: 8970 },
    { day: 'Sun', logins: 189, challenges: 45, points: 6780 }
  ];

  const performanceMetrics = [
    {
      title: 'Total Users',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      title: 'Active Challenges',
      value: '25',
      change: '+8.3%',
      trend: 'up',
      icon: Target,
      color: 'text-green-500'
    },
    {
      title: 'Points Distributed',
      value: '82,450',
      change: '+15.2%',
      trend: 'up',
      icon: Award,
      color: 'text-purple-500'
    },
    {
      title: 'Avg. Engagement',
      value: '78.5%',
      change: '-2.1%',
      trend: 'down',
      icon: Activity,
      color: 'text-orange-500'
    }
  ];

  const topPerformers = [
    { name: 'Sarah Chen', points: 2840, challenges: 23, department: 'Computer Science' },
    { name: 'Alex Rodriguez', points: 2650, challenges: 20, department: 'Environmental Science' },
    { name: 'Emma Thompson', points: 2480, challenges: 18, department: 'Business' },
    { name: 'Michael Park', points: 2350, challenges: 16, department: 'Engineering' },
    { name: 'Lisa Wang', points: 2180, challenges: 14, department: 'Arts' }
  ];

  const recentActivities = [
    { action: 'New user registration', count: 23, time: 'Today' },
    { action: 'Challenges completed', count: 156, time: 'This week' },
    { action: 'Points awarded', count: 8940, time: 'This week' },
    { action: 'Feedback submissions', count: 45, time: 'This month' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Data Analytics</h1>
          <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">
            Comprehensive platform analytics and insights
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {performanceMetrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <div key={metric.title} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-700 ${metric.color}`}>
                  <IconComponent className="w-6 h-6" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  <span>{metric.change}</span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
                  {metric.value}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">User Growth</h2>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              <span className="text-green-600 font-medium">+12.5%</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={userGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="users" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Challenge Categories</h2>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Weekly Engagement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Weekly Engagement</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="logins" fill="#3B82F6" name="Daily Logins" />
            <Bar dataKey="challenges" fill="#10B981" name="Challenges Started" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Top Performers</h2>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={performer.name} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-white">{performer.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{performer.department}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-800 dark:text-white">{performer.points}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{performer.challenges} challenges</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
        >
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800 dark:text-white">{activity.action}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{activity.time}</div>
                </div>
                <div className="text-2xl font-bold text-green-600">{activity.count}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DataAnalytics;
