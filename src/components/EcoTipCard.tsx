import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, CheckCircle } from 'lucide-react';

interface EcoTip {
  id: number;
  title: string;
  description: string;
  category: string;
  impact: 'High' | 'Medium' | 'Low';
}

interface EcoTipCardProps {
  tip: EcoTip;
  onComplete?: (tipId: number) => void;
  completed?: boolean;
}

const EcoTipCard: React.FC<EcoTipCardProps> = ({ tip, onComplete, completed = false }) => {
  const impactColors = {
    High: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800',
    Medium: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    Low: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 rounded-lg border transition-all duration-200 ${
        completed
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className={`p-2 rounded-lg ${
            completed
              ? 'bg-green-100 dark:bg-green-900/50'
              : 'bg-blue-100 dark:bg-blue-900/50'
          }`}>
            <Lightbulb className={`w-5 h-5 ${
              completed
                ? 'text-green-600 dark:text-green-400'
                : 'text-blue-600 dark:text-blue-400'
            }`} />
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className={`font-semibold text-sm ${
                completed
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-gray-800 dark:text-white'
              }`}>
                {tip.title}
              </h4>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${impactColors[tip.impact]}`}>
                {tip.impact} Impact
              </span>
            </div>

            <p className={`text-sm mb-3 ${
              completed
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {tip.description}
            </p>

            <div className="flex items-center justify-between">
              <span className={`text-xs px-2 py-1 rounded ${
                tip.category === 'Energy' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                tip.category === 'Water' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                tip.category === 'Waste' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
              }`}>
                {tip.category}
              </span>

              {onComplete && !completed && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onComplete(tip.id)}
                  className="flex items-center space-x-1 px-3 py-1 bg-green-500 text-white rounded-lg text-xs font-medium hover:bg-green-600 transition-colors"
                >
                  <CheckCircle className="w-3 h-3" />
                  <span>Complete</span>
                </motion.button>
              )}

              {completed && (
                <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-xs font-medium">Completed</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animated progress indicator for completed tips */}
      {completed && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-lg pointer-events-none"
          style={{ transformOrigin: 'left' }}
        />
      )}
    </motion.div>
  );
};

export default EcoTipCard;
