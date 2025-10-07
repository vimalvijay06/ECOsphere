import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Clock,
  Users,
  Award,
  Calendar,
  MapPin,
  Star,
  CheckCircle,
  Play,
  Trophy,
  TrendingUp,
  Filter
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Toast from '../components/Toast';

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: 'Energy' | 'Water' | 'Waste' | 'Transportation' | 'Food';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number; // in days
  points: number;
  participants: number;
  maxParticipants?: number;
  startDate: string;
  endDate: string;
  location?: string;
  isActive: boolean;
  isJoined?: boolean;
  progress?: number;
  status: 'upcoming' | 'active' | 'completed';
}

const Challenges: React.FC = () => {
  const { challenges, joinChallenge } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');


  const categories = ['All', 'Energy', 'Water', 'Waste', 'Transportation', 'Food'];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const filteredChallenges = challenges.filter(challenge => {
    const categoryMatch = selectedCategory === 'All' || challenge.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || challenge.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const getStatusColor = (status: Challenge['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'upcoming': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'completed': return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800';
      default: return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800';
    }
  };

  const handleJoinChallenge = (challengeId: number) => {
    joinChallenge(challengeId);
    setToastMessage('Successfully joined challenge!');
    setShowToast(true);
  };


  return (
    <div className="space-y-8">
      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Sustainability Challenges
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Join challenges, earn points, and make a real environmental impact!
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-500" />
            <span className="font-medium text-gray-700 dark:text-gray-300">Filters:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {/* Category Filter */}
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Difficulty Filter */}
            <div className="flex space-x-2">
              {difficulties.map(difficulty => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    selectedDifficulty === difficulty
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 card-hover"
          >
            {/* Challenge Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(challenge.status)}`}>
                    {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    challenge.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' :
                    challenge.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                    'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                  {challenge.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {challenge.description}
                </p>
              </div>
            </div>

            {/* Challenge Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {challenge.points} pts
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {challenge.participants}/{challenge.maxParticipants || '∞'}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {challenge.duration} days
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {new Date(challenge.startDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Progress Bar for Active Challenges */}
            {challenge.status === 'active' && challenge.progress !== undefined && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    Progress
                  </span>
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {challenge.progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${challenge.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="bg-green-500 h-2 rounded-full"
                  />
                </div>
              </div>
            )}

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleJoinChallenge(challenge.id)}
              disabled={challenge.isJoined || challenge.status === 'completed'}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                challenge.isJoined
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                  : challenge.status === 'completed'
                  ? 'bg-gray-100 dark:bg-gray-900/30 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {challenge.isJoined ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Joined</span>
                </>
              ) : challenge.status === 'completed' ? (
                <>
                  <Trophy className="w-5 h-5" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  <span>Join Challenge</span>
                </>
              )}
            </motion.button>
          </motion.div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Target className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
            No challenges found
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Try adjusting your filters or check back later for new challenges.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Challenges;
