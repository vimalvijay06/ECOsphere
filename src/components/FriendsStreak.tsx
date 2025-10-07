import React from 'react';
import { motion } from 'framer-motion';
import { Users, Flame, CheckCircle, Clock, Trophy } from 'lucide-react';
import { useStreak, Friend } from '../context/StreakContext';

interface FriendsStreakProps {
  maxDisplay?: number;
}

const FriendsStreak: React.FC<FriendsStreakProps> = ({ maxDisplay = 5 }) => {
  const { streakData, getStreakBadge, getStreakColor, isStreakActive } = useStreak();

  const displayFriends = streakData.friends.slice(0, maxDisplay);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
          <Users className="w-5 h-5 mr-2 text-blue-500" />
          Friend Streaks
        </h3>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {streakData.friends.length} friends
        </span>
      </div>

      <div className="space-y-4">
        {displayFriends.map((friend, index) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {friend.name.charAt(0)}
                </div>
                {isStreakActive(friend.id) && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"
                  />
                )}
              </div>

              <div>
                <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
                  {friend.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {friend.department}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="text-center">
                <div className={`text-lg font-bold ${getStreakColor(friend.currentStreak)}`}>
                  {friend.currentStreak}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  days
                </div>
              </div>

              <div className="text-center">
                <div className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Best
                </div>
                <div className="text-sm font-bold text-gray-800 dark:text-white">
                  {friend.longestStreak}
                </div>
              </div>

              <div className="flex flex-col items-center">
                {isStreakActive(friend.id) ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-green-500"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-400"
                  >
                    <Clock className="w-5 h-5" />
                  </motion.div>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {isStreakActive(friend.id) ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Streak Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-sm font-medium text-gray-800 dark:text-white">
              Group Streak Challenge
            </span>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-green-600 dark:text-green-400">
              {streakData.friends.filter(f => isStreakActive(f.id)).length}/{streakData.friends.length}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              friends active today
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FriendsStreak;
