import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Users,
  Target,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Search,
  Award,
  Activity,
  Gamepad2,
  Settings,
  Save,
  X,
  Upload,
  Eye,
  CheckCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NewChallengeForm {
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  maxParticipants: number;
  deadline: string;
  image: string;
}

interface NewGameForm {
  name: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  estimatedTime: number;
  image: string;
}

const AdminDashboard: React.FC = () => {
  const { challenges, analytics, updateAnalytics, miniGames } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'challenges' | 'games' | 'users' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showChallengeModal, setShowChallengeModal] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<number | null>(null);
  const [editingGame, setEditingGame] = useState<number | null>(null);

  const [newChallenge, setNewChallenge] = useState<NewChallengeForm>({
    title: '',
    description: '',
    category: 'Recycling',
    difficulty: 'Easy',
    points: 100,
    maxParticipants: 50,
    deadline: '',
    image: ''
  });

  const [newGame, setNewGame] = useState<NewGameForm>({
    name: '',
    description: '',
    category: 'Educational',
    difficulty: 'Easy',
    points: 50,
    estimatedTime: 5,
    image: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      updateAnalytics();
    }, 3000);
    return () => clearInterval(interval);
  }, [updateAnalytics]);

  const tabs = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'challenges', label: 'Challenges', icon: Target },
    { key: 'games', label: 'Mini-Games', icon: Gamepad2 },
    { key: 'users', label: 'Users', icon: Users },
    { key: 'analytics', label: 'Analytics', icon: TrendingUp }
  ];

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || challenge.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredGames = miniGames.filter(game =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    game.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: 'upcoming' | 'active' | 'completed' | 'inactive') => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'upcoming': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'inactive': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handleCreateChallenge = () => {
    // In a real app, this would make an API call
    console.log('Creating new challenge:', newChallenge);
    setShowChallengeModal(false);
    setNewChallenge({
      title: '',
      description: '',
      category: 'Recycling',
      difficulty: 'Easy',
      points: 100,
      maxParticipants: 50,
      deadline: '',
      image: ''
    });
  };

  const handleCreateGame = () => {
    console.log('Creating new game:', newGame);
    setShowGameModal(false);
    setNewGame({
      name: '',
      description: '',
      category: 'Educational',
      difficulty: 'Easy',
      points: 50,
      estimatedTime: 5,
      image: ''
    });
  };

  const handleEditChallenge = (challengeId: number) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (challenge) {
      setNewChallenge({
        title: challenge.title,
        description: challenge.description,
        category: challenge.category,
        difficulty: challenge.difficulty,
        points: challenge.points,
        maxParticipants: challenge.maxParticipants || 50,
        deadline: challenge.deadline || '',
        image: challenge.image || ''
      });
      setEditingChallenge(challengeId);
      setShowChallengeModal(true);
    }
  };

  const handleEditGame = (gameId: number) => {
    const game = miniGames.find(g => g.id === gameId);
    if (game) {
      setNewGame({
        name: game.name,
        description: game.description,
        category: game.category,
        difficulty: game.difficulty,
        points: game.points,
        estimatedTime: game.estimatedTime,
        image: game.image || ''
      });
      setEditingGame(gameId);
      setShowGameModal(true);
    }
  };

  const handleDeleteChallenge = (challengeId: number) => {
    console.log('Deleting challenge:', challengeId);
  };

  const handleDeleteGame = (gameId: number) => {
    console.log('Deleting game:', gameId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Admin Dashboard
            </h1>
            <p className="text-green-100">
              Manage challenges, mini-games, monitor participation, and track sustainability impact.
            </p>
          </div>
          <div className="hidden md:block">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-white border-t-transparent rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-white text-green-700 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {analytics.totalUsers.toLocaleString()}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+12.5%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Challenges</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {analytics.activeChallenges}
                  </p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <Activity className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+2</span>
                  <span className="text-gray-500 ml-1">new this week</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Points Distributed</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {analytics.totalPointsDistributed.toLocaleString()}
                  </p>
                </div>
                <Award className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+18.2%</span>
                  <span className="text-gray-500 ml-1">from last month</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Sustainability Score</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {analytics.avgSustainabilityScore}%
                  </p>
                </div>
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
              <div className="mt-4">
                <div className="flex items-center text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600">+5.3%</span>
                  <span className="text-gray-500 ml-1">improvement</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setShowChallengeModal(true)}
                  className="w-full flex items-center justify-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Challenge
                </button>
                <button
                  onClick={() => setShowGameModal(true)}
                  className="w-full flex items-center justify-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Gamepad2 className="w-5 h-5 mr-2" />
                  Add New Mini-Game
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span className="text-gray-600">Challenge "Reduce Food Waste" completed</span>
                </div>
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="text-gray-600">5 new users joined this week</span>
                </div>
                <div className="flex items-center text-sm">
                  <Award className="w-4 h-4 text-yellow-500 mr-2" />
                  <span className="text-gray-600">1,250 points awarded this month</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Healthy</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Services</span>
                  <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">Online</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Notifications</span>
                  <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">Warning</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Challenges Tab */}
      {activeTab === 'challenges' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search challenges..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-800"
                >
                  <option value="all">All Status</option>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowChallengeModal(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Challenge</span>
              </motion.button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Challenge
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Participants
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredChallenges.map((challenge) => (
                    <tr key={challenge.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <div className="text-sm font-medium text-gray-800">
                            {challenge.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {challenge.category} • {challenge.difficulty}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(challenge.status)}`}>
                          {challenge.status.charAt(0).toUpperCase() + challenge.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {challenge.participants}{challenge.maxParticipants ? `/${challenge.maxParticipants}` : ''}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {challenge.points}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleEditChallenge(challenge.id)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteChallenge(challenge.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Games Tab */}
      {activeTab === 'games' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search games..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800"
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowGameModal(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Game</span>
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map((game) => (
              <div key={game.id} className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">{game.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(game.status)}`}>
                    {game.status.charAt(0).toUpperCase() + game.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{game.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{game.category} • {game.difficulty}</span>
                  <span>{game.points} points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEditGame(game.id)}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-lg font-medium text-sm"
                  >
                    Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteGame(game.id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg font-medium text-sm"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              User Management
            </h3>
            <p className="text-gray-500">
              User management features will be implemented here.
            </p>
          </div>
        </motion.div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Top Categories
              </h3>
              <div className="space-y-3">
                {analytics.topCategories.map((category, index) => (
                  <div key={category.category} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {category.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(category.participants / analytics.topCategories[0].participants) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800">
                        {category.participants}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Monthly Growth
              </h3>
              <div className="space-y-3">
                {analytics.monthlyGrowth.map((month) => (
                  <div key={month.month} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {month.month}
                    </span>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-800">
                          {month.users} users
                        </div>
                        <div className="text-xs text-gray-500">
                          {month.challenges} challenges
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Challenge Creation Modal */}
      {showChallengeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {editingChallenge ? 'Edit Challenge' : 'Create New Challenge'}
              </h3>
              <button
                onClick={() => setShowChallengeModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={newChallenge.title}
                  onChange={(e) => setNewChallenge({...newChallenge, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Challenge title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  placeholder="Challenge description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newChallenge.category}
                    onChange={(e) => setNewChallenge({...newChallenge, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  >
                    <option value="Recycling">Recycling</option>
                    <option value="Energy">Energy</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Waste">Waste</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={newChallenge.difficulty}
                    onChange={(e) => setNewChallenge({...newChallenge, difficulty: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                  <input
                    type="number"
                    value={newChallenge.points}
                    onChange={(e) => setNewChallenge({...newChallenge, points: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                  <input
                    type="number"
                    value={newChallenge.maxParticipants}
                    onChange={(e) => setNewChallenge({...newChallenge, maxParticipants: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleCreateChallenge}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingChallenge ? 'Update' : 'Create'}</span>
                </button>
                <button
                  onClick={() => setShowChallengeModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Creation Modal */}
      {showGameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {editingGame ? 'Edit Game' : 'Add New Mini-Game'}
              </h3>
              <button
                onClick={() => setShowGameModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Game Name</label>
                <input
                  type="text"
                  value={newGame.name}
                  onChange={(e) => setNewGame({...newGame, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Game name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newGame.description}
                  onChange={(e) => setNewGame({...newGame, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Game description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newGame.category}
                    onChange={(e) => setNewGame({...newGame, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="Educational">Educational</option>
                    <option value="Action">Action</option>
                    <option value="Puzzle">Puzzle</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={newGame.difficulty}
                    onChange={(e) => setNewGame({...newGame, difficulty: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                  <input
                    type="number"
                    value={newGame.points}
                    onChange={(e) => setNewGame({...newGame, points: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Est. Time (min)</label>
                  <input
                    type="number"
                    value={newGame.estimatedTime}
                    onChange={(e) => setNewGame({...newGame, estimatedTime: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleCreateGame}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingGame ? 'Update' : 'Add'}</span>
                </button>
                <button
                  onClick={() => setShowGameModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
