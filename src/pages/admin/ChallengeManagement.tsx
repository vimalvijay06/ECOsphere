import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  Calendar,
  Users,
  Award,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertTriangle,
  MoreVertical
} from 'lucide-react';

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: 'Energy' | 'Water' | 'Waste' | 'Transportation' | 'Food';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  maxParticipants: number;
  currentParticipants: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  completionRate: number;
  averageScore: number;
  createdBy: string;
  createdAt: string;
}

const ChallengeManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'Energy' | 'Water' | 'Waste' | 'Transportation' | 'Food'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'active' | 'completed' | 'cancelled'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const mockChallenges: Challenge[] = [
    {
      id: 1,
      title: 'Zero Waste Week',
      description: 'Go the entire week without producing any landfill waste',
      category: 'Waste',
      difficulty: 'Hard',
      points: 300,
      maxParticipants: 100,
      currentParticipants: 67,
      startDate: '2024-02-01',
      endDate: '2024-02-07',
      status: 'active',
      completionRate: 78,
      averageScore: 245,
      createdBy: 'Dr. Emma Wilson',
      createdAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Energy Saver Challenge',
      description: 'Reduce your daily energy consumption by 20%',
      category: 'Energy',
      difficulty: 'Medium',
      points: 150,
      maxParticipants: 200,
      currentParticipants: 156,
      startDate: '2024-01-20',
      endDate: '2024-01-27',
      status: 'completed',
      completionRate: 89,
      averageScore: 134,
      createdBy: 'Prof. Michael Green',
      createdAt: '2024-01-10'
    },
    {
      id: 3,
      title: 'Water Conservation Month',
      description: 'Track and reduce your daily water usage',
      category: 'Water',
      difficulty: 'Easy',
      points: 100,
      maxParticipants: 150,
      currentParticipants: 0,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      status: 'draft',
      completionRate: 0,
      averageScore: 0,
      createdBy: 'Dr. Sarah Chen',
      createdAt: '2024-01-25'
    },
    {
      id: 4,
      title: 'Sustainable Transport Week',
      description: 'Use only public transport, walking, or cycling',
      category: 'Transportation',
      difficulty: 'Medium',
      points: 200,
      maxParticipants: 80,
      currentParticipants: 23,
      startDate: '2024-01-15',
      endDate: '2024-01-22',
      status: 'cancelled',
      completionRate: 0,
      averageScore: 0,
      createdBy: 'Dr. Alex Rodriguez',
      createdAt: '2024-01-05'
    }
  ];

  const filteredChallenges = mockChallenges.filter(challenge => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || challenge.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || challenge.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'draft': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <AlertTriangle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Energy': return 'bg-yellow-100 text-yellow-700';
      case 'Water': return 'bg-blue-100 text-blue-700';
      case 'Waste': return 'bg-green-100 text-green-700';
      case 'Transportation': return 'bg-purple-100 text-purple-700';
      case 'Food': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalChallenges = mockChallenges.length;
  const activeChallenges = mockChallenges.filter(c => c.status === 'active').length;
  const completedChallenges = mockChallenges.filter(c => c.status === 'completed').length;
  const totalParticipants = mockChallenges.reduce((sum, c) => sum + c.currentParticipants, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Challenge Management</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Create, manage, and monitor sustainability challenges
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Challenge</span>
        </button>
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
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Challenges</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalChallenges}</p>
            </div>
            <Target className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Active</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{activeChallenges}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{completedChallenges}</p>
            </div>
            <Award className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Participants</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalParticipants}</p>
            </div>
            <Users className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search challenges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Categories</option>
              <option value="Energy">Energy</option>
              <option value="Water">Water</option>
              <option value="Waste">Waste</option>
              <option value="Transportation">Transportation</option>
              <option value="Food">Food</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Challenges Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {filteredChallenges.map((challenge) => (
          <div key={challenge.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {challenge.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {challenge.description}
                </p>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button className="p-1 text-gray-400 hover:text-blue-600 rounded">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-green-600 rounded">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getCategoryColor(challenge.category)}`}>
                {challenge.category}
              </span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                {challenge.difficulty}
              </span>
              <div className={`flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(challenge.status)}`}>
                {getStatusIcon(challenge.status)}
                <span>{challenge.status}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Points:</span>
                <span className="font-semibold text-gray-800 dark:text-white">{challenge.points}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Participants:</span>
                <span className="font-semibold text-gray-800 dark:text-white">
                  {challenge.currentParticipants}/{challenge.maxParticipants}
                </span>
              </div>

              {challenge.status === 'active' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Progress:</span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {Math.round((challenge.currentParticipants / challenge.maxParticipants) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${(challenge.currentParticipants / challenge.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {challenge.status === 'completed' && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Completion Rate:</span>
                    <span className="font-semibold text-green-600">{challenge.completionRate}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Avg Score:</span>
                    <span className="font-semibold text-blue-600">{challenge.averageScore}</span>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Created by {challenge.createdBy}</span>
                  <span>{new Date(challenge.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ChallengeManagement;
