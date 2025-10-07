import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Crown,
  Star,
  Target,
  Calendar,
  Filter,
  Users
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface LeaderboardEntry {
  id: number;
  name: string;
  avatar?: string;
  points: number;
  level: number;
  badges: number;
  challengesCompleted: number;
  sustainabilityScore: number;
  rank: number;
  trend: 'up' | 'down' | 'same';
  trendChange: number;
  department?: string;
}

interface LeaderboardProps {}

const Leaderboard: React.FC<LeaderboardProps> = () => {
  const { user } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState<'weekly' | 'monthly' | 'allTime'>('monthly');
  const [selectedCategory, setSelectedCategory] = useState<'overall' | 'challenges' | 'points'>('overall');
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [userRank, setUserRank] = useState<LeaderboardEntry | null>(null);

  // Mock data - replace with API calls
  useEffect(() => {
    const mockData: LeaderboardEntry[] = [
      {
        id: 1,
        name: 'Sarah Chen',
        points: 2840,
        level: 15,
        badges: 12,
        challengesCompleted: 23,
        sustainabilityScore: 95,
        rank: 1,
        trend: 'same',
        trendChange: 0,
        department: 'Computer Science'
      },
      {
        id: 2,
        name: 'Alex Rodriguez',
        points: 2650,
        level: 14,
        badges: 10,
        challengesCompleted: 20,
        sustainabilityScore: 92,
        rank: 2,
        trend: 'up',
        trendChange: 1,
        department: 'Environmental Science'
      },
      {
        id: 3,
        name: 'Emma Thompson',
        points: 2480,
        level: 13,
        badges: 9,
        challengesCompleted: 18,
        sustainabilityScore: 89,
        rank: 3,
        trend: 'down',
        trendChange: -1,
        department: 'Business'
      },
      {
        id: 4,
        name: 'Michael Park',
        points: 2350,
        level: 12,
        badges: 8,
        challengesCompleted: 16,
        sustainabilityScore: 87,
        rank: 4,
        trend: 'up',
        trendChange: 2,
        department: 'Engineering'
      },
      {
        id: 5,
        name: 'Lisa Wang',
        points: 2180,
        level: 11,
        badges: 7,
        challengesCompleted: 14,
        sustainabilityScore: 84,
        rank: 5,
        trend: 'same',
        trendChange: 0,
        department: 'Arts'
      }
    ];

    // Find current user's rank (mock - replace with actual user ID)
    const currentUserRank = mockData.find(entry => entry.name === user?.name) || mockData[3];

    setTimeout(() => {
      setLeaderboardData(mockData);
      setUserRank(currentUserRank);
      setLoading(false);
    }, 1000);
  }, [user]);

  const periods = [
    { key: 'weekly', label: 'This Week' },
    { key: 'monthly', label: 'This Month' },
    { key: 'allTime', label: 'All Time' }
  ];

  const categories = [
    { key: 'overall', label: 'Overall' },
    { key: 'challenges', label: 'Challenges' },
    { key: 'points', label: 'Points' }
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2: return <Medal className="w-6 h-6 text-gray-400" />;
      case 3: return <Award className="w-6 h-6 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'same', change: number) => {
    if (trend === 'up') {
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    } else if (trend === 'down') {
      return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Sustainability Leaderboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          See how you rank among fellow eco-warriors!
        </p>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Leaderboard:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Period Filter */}
            <div className="flex space-x-2">
              {periods.map(period => (
                <button
                  key={period.key}
                  onClick={() => setSelectedPeriod(period.key as any)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === period.key
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {period.label}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category.key}
                  onClick={() => setSelectedCategory(category.key as any)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.key
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Top 3 Podium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800"
      >
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center justify-center">
            <Crown className="w-6 h-6 text-yellow-500 mr-2" />
            Top Performers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {leaderboardData.slice(0, 3).map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`relative p-4 rounded-lg text-center transform hover:scale-105 transition-all duration-300 ${
                index === 0 ? 'bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/40 dark:to-orange-900/40 border-2 border-yellow-300 dark:border-yellow-600 shadow-lg shadow-yellow-200/50' :
                index === 1 ? 'bg-gradient-to-br from-gray-100 to-slate-200 dark:from-gray-800/40 dark:to-slate-800/40 border-2 border-gray-300 dark:border-gray-600 shadow-lg shadow-gray-200/50' :
                'bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/40 border-2 border-amber-300 dark:border-amber-600 shadow-lg shadow-amber-200/50'
              }`}
            >
              <div className="mb-3">
                {getRankIcon(entry.rank)}
              </div>

              <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold ${
                index === 0 ? 'bg-gradient-to-br from-yellow-400 to-orange-500' :
                index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                'bg-gradient-to-br from-amber-400 to-orange-600'
              }`}>
                {entry.name.charAt(0)}
              </div>

              <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                {entry.name}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {entry.department}
              </p>

              <div className="flex items-center justify-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">{entry.points}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{entry.challengesCompleted}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Full Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Full Rankings
          </h2>
        </div>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {leaderboardData.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                entry.id.toString() === user?.id ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-10">
                    {getRankIcon(entry.rank)}
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {entry.name.charAt(0)}
                    </div>

                    <div>
                      <h3 className={`font-semibold ${
                        entry.id.toString() === user?.id ? 'text-green-700 dark:text-green-300' : 'text-gray-800 dark:text-white'
                      }`}>
                        {entry.name}
                        {entry.id.toString() === user?.id && (
                          <span className="ml-2 text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                            You
                          </span>
                        )}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {entry.department}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="flex items-center space-x-1 justify-center">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-bold text-gray-800 dark:text-white">
                        {entry.points.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Points</p>
                  </div>

                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">
                      {entry.level}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Level</p>
                  </div>

                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">
                      {entry.badges}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Badges</p>
                  </div>

                  <div className="text-center">
                    <span className="font-bold text-gray-800 dark:text-white">
                      {entry.challengesCompleted}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Completed</p>
                  </div>

                  <div className="flex items-center space-x-1">
                    {getTrendIcon(entry.trend, entry.trendChange)}
                    <span className={`text-sm font-medium ${
                      entry.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                      entry.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                      'text-gray-500 dark:text-gray-400'
                    }`}>
                      {entry.trendChange !== 0 && Math.abs(entry.trendChange)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* User's Current Rank Card */}
      {userRank && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">Your Current Rank</h3>
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">#{userRank.rank}</div>
                  <div className="text-green-100">Rank</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{userRank.points.toLocaleString()}</div>
                  <div className="text-green-100">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">{userRank.challengesCompleted}</div>
                  <div className="text-green-100">Challenges</div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-2"
              >
                <Trophy className="w-8 h-8" />
              </motion.div>
              <div className="text-green-100 text-sm">Keep it up!</div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Leaderboard;
