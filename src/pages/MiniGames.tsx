import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Play,
  Trophy,
  Star,
  Clock,
  Zap,
  Droplets,
  Recycle,
  TreePine,
  Leaf,
  Target,
  Award,
  Users,
  TrendingUp,
  ChevronRight,
  Gamepad2
} from 'lucide-react';
import EcoQuest from '../components/EcoQuest';
import WasteSortingGame from '../components/games/WasteSortingGame';
import CarbonFootprintQuiz from '../components/games/CarbonFootprintQuiz';
import WaterConservationGame from '../components/games/WaterConservationGame';
import { useUser } from '../context/UserContext';
import { useApp } from '../context/AppContext';

interface Game {
  id: number;
  title: string;
  description: string;
  category: 'sorting' | 'quiz' | 'action' | 'strategy';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  maxPoints: number;
  icon: React.ComponentType<any>;
  color: string;
  bgGradient: string;
  isNew?: boolean;
  isPopular?: boolean;
  players: number;
  yourBestScore?: number;
}

const MiniGames: React.FC = () => {
  const { user } = useUser();
  const { gameState } = useApp();
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'sorting' | 'quiz' | 'action' | 'strategy'>('all');

  const games: Game[] = [
    {
      id: 1,
      title: 'EcoQuest Adventure',
      description: 'Navigate through environmental challenges and make sustainable choices to save the planet!',
      category: 'action',
      difficulty: 'Medium',
      estimatedTime: '10-15 min',
      maxPoints: 500,
      icon: Leaf,
      color: 'text-green-500',
      bgGradient: 'from-green-400 to-blue-500',
      isPopular: true,
      players: 1247,
      yourBestScore: 420
    },
    {
      id: 2,
      title: 'Waste Sorting Master',
      description: 'Sort different types of waste into correct bins as fast as possible. Test your recycling knowledge!',
      category: 'sorting',
      difficulty: 'Easy',
      estimatedTime: '5-8 min',
      maxPoints: 300,
      icon: Recycle,
      color: 'text-blue-500',
      bgGradient: 'from-blue-400 to-purple-500',
      isNew: true,
      players: 892,
      yourBestScore: 245
    },
    {
      id: 3,
      title: 'Carbon Footprint Quiz',
      description: 'Answer questions about carbon emissions and learn how to reduce your environmental impact.',
      category: 'quiz',
      difficulty: 'Medium',
      estimatedTime: '8-12 min',
      maxPoints: 400,
      icon: Zap,
      color: 'text-yellow-500',
      bgGradient: 'from-yellow-400 to-orange-500',
      players: 756,
      yourBestScore: 380
    },
    {
      id: 4,
      title: 'Water Conservation Challenge',
      description: 'Manage water resources efficiently and prevent waste in various scenarios.',
      category: 'strategy',
      difficulty: 'Hard',
      estimatedTime: '15-20 min',
      maxPoints: 600,
      icon: Droplets,
      color: 'text-blue-400',
      bgGradient: 'from-cyan-400 to-blue-600',
      isNew: true,
      players: 543,
      yourBestScore: 480
    },
    {
      id: 5,
      title: 'Renewable Energy Builder',
      description: 'Build sustainable energy infrastructure and power cities with clean energy sources.',
      category: 'strategy',
      difficulty: 'Hard',
      estimatedTime: '20-25 min',
      maxPoints: 700,
      icon: TreePine,
      color: 'text-green-600',
      bgGradient: 'from-green-500 to-teal-500',
      isPopular: true,
      players: 1089,
      yourBestScore: 650
    },
    {
      id: 6,
      title: 'Eco Lifestyle Simulator',
      description: 'Make daily choices that impact the environment and see your sustainability score grow!',
      category: 'action',
      difficulty: 'Easy',
      estimatedTime: '10-15 min',
      maxPoints: 450,
      icon: Target,
      color: 'text-purple-500',
      bgGradient: 'from-purple-400 to-pink-500',
      isNew: true,
      players: 634,
      yourBestScore: 320
    }
  ];

  const filteredGames = games.filter(game => 
    activeCategory === 'all' || game.category === activeCategory
  );

  const categories = [
    { key: 'all', label: 'All Games', count: games.length },
    { key: 'sorting', label: 'Sorting', count: games.filter(g => g.category === 'sorting').length },
    { key: 'quiz', label: 'Quiz', count: games.filter(g => g.category === 'quiz').length },
    { key: 'action', label: 'Action', count: games.filter(g => g.category === 'action').length },
    { key: 'strategy', label: 'Strategy', count: games.filter(g => g.category === 'strategy').length }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
  };

  if (selectedGame) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSelectedGame(null)}
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600"
          >
            <ChevronRight className="w-4 h-4 transform rotate-180" />
            <span>Back to Games</span>
          </button>
          <div className="text-right">
            <div className="text-sm text-gray-500">Your Best Score</div>
            <div className="text-xl font-bold text-green-600">{selectedGame.yourBestScore || 0}</div>
          </div>
        </div>
        
        {/* Render the appropriate game component */}
        {selectedGame.id === 1 && <EcoQuest />}
        {selectedGame.id === 2 && <WasteSortingGame />}
        {selectedGame.id === 3 && <CarbonFootprintQuiz />}
        {selectedGame.id === 4 && <WaterConservationGame />}
        {selectedGame.id === 5 && (
          <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-6xl mb-4">🏗️</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Renewable Energy Builder
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This game is coming soon! Build sustainable energy infrastructure and power cities with clean energy sources.
            </p>
            <button
              onClick={() => setSelectedGame(null)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Games
            </button>
          </div>
        )}
        {selectedGame.id === 6 && (
          <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="text-6xl mb-4">🌱</div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Eco Lifestyle Simulator
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This game is coming soon! Make daily choices that impact the environment and see your sustainability score grow!
            </p>
            <button
              onClick={() => setSelectedGame(null)}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Games
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-blue-500 p-6 rounded-xl text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🎮 Eco Mini-Games</h1>
            <p className="text-purple-100">Learn sustainability through fun and interactive games!</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{gameState.ecoPoints}</div>
            <div className="text-purple-200 text-sm">Total Points</div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Games Played</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">23</p>
            </div>
            <Gamepad2 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Best Score</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">650</p>
            </div>
            <Trophy className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Rank</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">#12</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Achievements</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">8</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setActiveCategory(category.key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeCategory === category.key
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </motion.div>

      {/* Games Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredGames.map((game) => {
          const IconComponent = game.icon;
          return (
            <div key={game.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`h-32 bg-gradient-to-br ${game.bgGradient} flex items-center justify-center relative`}>
                <IconComponent className="w-16 h-16 text-white" />
                <div className="absolute top-2 left-2 flex space-x-1">
                  {game.isNew && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      NEW
                    </span>
                  )}
                  {game.isPopular && (
                    <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800 dark:text-white">{game.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                    {game.difficulty}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{game.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {game.estimatedTime}
                    </span>
                    <span className="text-gray-500 flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {game.players}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500 flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      Max: {game.maxPoints} pts
                    </span>
                    {game.yourBestScore && (
                      <span className="text-green-600 font-medium">
                        Best: {game.yourBestScore}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handlePlayGame(game)}
                  className={`w-full bg-gradient-to-r ${game.bgGradient} text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center space-x-2`}
                >
                  <Play className="w-4 h-4" />
                  <span>Play Now</span>
                </button>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MiniGames;
