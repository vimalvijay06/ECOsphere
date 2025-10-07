import React from 'react';
import { motion } from 'framer-motion';

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
}

interface AchievementBadgeProps {
  achievement: Achievement;
}

const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600"
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5 }}
        className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-xl shadow-lg"
      >
        {achievement.icon}
      </motion.div>

      <div className="flex-1">
        <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
          {achievement.title}
        </h4>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
          {achievement.description}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
          Earned {new Date(achievement.earnedAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-xs text-green-600 dark:text-green-400 mt-1 font-medium">
          New
        </span>
      </div>
    </motion.div>
  );
};

export default AchievementBadge;
