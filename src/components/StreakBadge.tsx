import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Award, Star, Zap } from 'lucide-react';
import { useStreak } from '../context/StreakContext';

interface StreakBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animate?: boolean;
}

const StreakBadge: React.FC<StreakBadgeProps> = ({
  size = 'md',
  showLabel = true,
  animate = true
}) => {
  const { streakData, getStreakBadge, getStreakColor } = useStreak();

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg'
  };

  const getStreakIcon = (streak: number) => {
    if (streak >= 50) return <Flame className="w-full h-full" />;
    if (streak >= 30) return <Award className="w-full h-full" />;
    if (streak >= 14) return <Star className="w-full h-full" />;
    if (streak >= 7) return <Zap className="w-full h-full" />;
    return <Flame className="w-full h-full" />;
  };

  const getStreakGradient = (streak: number) => {
    if (streak >= 50) return 'from-purple-500 to-pink-500';
    if (streak >= 30) return 'from-yellow-500 to-orange-500';
    if (streak >= 14) return 'from-orange-500 to-red-500';
    if (streak >= 7) return 'from-green-500 to-emerald-500';
    if (streak >= 3) return 'from-blue-500 to-cyan-500';
    return 'from-gray-500 to-gray-600';
  };

  return (
    <motion.div
      initial={animate ? { scale: 0 } : { scale: 1 }}
      animate={animate ? { scale: 1 } : { scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="flex flex-col items-center space-y-1"
    >
      <div className={`relative ${sizeClasses[size]} rounded-full bg-gradient-to-br ${getStreakGradient(streakData.currentStreak)} p-1 shadow-lg`}>
        <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
          <div className={`${getStreakColor(streakData.currentStreak)}`}>
            {getStreakIcon(streakData.currentStreak)}
          </div>
        </div>

        {/* Pulse animation for active streaks */}
        {streakData.todayCompleted && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute inset-0 rounded-full bg-gradient-to-br ${getStreakGradient(streakData.currentStreak)} opacity-30`}
          />
        )}
      </div>

      {showLabel && (
        <div className="text-center">
          <div className={`font-bold ${getStreakColor(streakData.currentStreak)}`}>
            {streakData.currentStreak}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Day Streak
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StreakBadge;
