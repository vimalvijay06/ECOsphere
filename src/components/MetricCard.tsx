import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend: string;
  trendUp: boolean;
  color: 'green' | 'blue' | 'yellow' | 'purple' | 'gray' | 'red';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  trendUp,
  color
}) => {
  const colorClasses = {
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
    gray: 'bg-gray-500',
    red: 'bg-red-500'
  };

  const textColorClasses = {
    green: 'text-green-600 dark:text-green-400',
    blue: 'text-blue-600 dark:text-blue-400',
    yellow: 'text-yellow-600 dark:text-yellow-400',
    purple: 'text-purple-600 dark:text-purple-400',
    gray: 'text-gray-600 dark:text-gray-400',
    red: 'text-red-600 dark:text-red-400'
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 card-hover"
    >
      <div className="flex items-center justify-between">
        <div className={`p-3 rounded-lg ${colorClasses[color]} bg-opacity-10`}>
          <div className={textColorClasses[color]}>
            {icon}
          </div>
        </div>

        <div className={`flex items-center space-x-1 text-sm ${
          trendUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {trendUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="font-medium">{trend}</span>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
          {value}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {title}
        </p>
      </div>

      {/* Animated progress bar background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none" />
    </motion.div>
  );
};

export default MetricCard;
