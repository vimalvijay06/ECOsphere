import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gift,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  Users,
  Calendar,
  Package,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Search,
  Filter
} from 'lucide-react';
import { useRewards, Reward } from '../../context/RewardsContext';

const RewardsManagement: React.FC = () => {
  const { 
    availableRewards, 
    claimedRewards, 
    updateRewardAvailability, 
    addNewReward, 
    removeReward 
  } = useRewards();

  const [activeTab, setActiveTab] = useState<'overview' | 'manage' | 'analytics'>('overview');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'food' | 'shopping' | 'entertainment' | 'education' | 'eco-products'>('all');

  const [newReward, setNewReward] = useState({
    name: '',
    description: '',
    type: 'coupon' as const,
    pointsCost: 0,
    category: 'food' as const,
    availability: 0,
    totalAvailable: 0,
    expiryDate: '',
    image: '',
    provider: '',
    terms: [''],
    isLimited: false,
    isNew: true,
    discount: '',
    status: 'available' as const
  });

  // Analytics calculations
  const totalRewardsClaimed = claimedRewards.length;
  const totalPointsSpent = claimedRewards.reduce((sum, reward) => sum + reward.reward.pointsCost, 0);
  const mostPopularReward = availableRewards.reduce((prev, current) => 
    (prev.totalAvailable - prev.availability) > (current.totalAvailable - current.availability) ? prev : current
  );
  const activeRewards = availableRewards.filter(r => r.status === 'available' && r.availability > 0).length;

  const filteredRewards = availableRewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || reward.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddReward = () => {
    if (newReward.name && newReward.description && newReward.pointsCost > 0) {
      addNewReward({
        ...newReward,
        terms: newReward.terms.filter(term => term.trim() !== '')
      });
      setNewReward({
        name: '',
        description: '',
        type: 'coupon',
        pointsCost: 0,
        category: 'food',
        availability: 0,
        totalAvailable: 0,
        expiryDate: '',
        image: '',
        provider: '',
        terms: [''],
        isLimited: false,
        isNew: true,
        discount: '',
        status: 'available'
      });
      setShowAddModal(false);
    }
  };

  const handleUpdateAvailability = (rewardId: number, newAvailability: number) => {
    updateRewardAvailability(rewardId, newAvailability);
  };

  const addTermField = () => {
    setNewReward(prev => ({
      ...prev,
      terms: [...prev.terms, '']
    }));
  };

  const updateTerm = (index: number, value: string) => {
    setNewReward(prev => ({
      ...prev,
      terms: prev.terms.map((term, i) => i === index ? value : term)
    }));
  };

  const removeTerm = (index: number) => {
    setNewReward(prev => ({
      ...prev,
      terms: prev.terms.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-xl text-white"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">🎁 Rewards Management</h1>
            <p className="text-purple-100">Manage rewards, track redemptions, and analyze performance</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Reward</span>
          </button>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex space-x-1 mb-6">
          {[
            { key: 'overview', label: 'Overview', icon: TrendingUp },
            { key: 'manage', label: 'Manage Rewards', icon: Gift },
            { key: 'analytics', label: 'Analytics', icon: Users }
          ].map(tab => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <IconComponent className="w-4 h-4" />
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
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Rewards</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{availableRewards.length}</p>
              </div>
              <Gift className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Active Rewards</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{activeRewards}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Total Claims</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalRewardsClaimed}</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Points Spent</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">{totalPointsSpent}</p>
              </div>
              <Star className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Manage Rewards Tab */}
      {activeTab === 'manage' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Search and Filter */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search rewards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value as any)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Categories</option>
                <option value="food">Food & Dining</option>
                <option value="shopping">Shopping</option>
                <option value="entertainment">Entertainment</option>
                <option value="education">Education</option>
                <option value="eco-products">Eco Products</option>
              </select>
            </div>
          </div>

          {/* Rewards List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Reward
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Availability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredRewards.map((reward) => (
                    <tr key={reward.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
                              <Gift className="w-5 h-5 text-purple-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {reward.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {reward.provider}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                          {reward.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {reward.pointsCost}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={reward.availability}
                            onChange={(e) => handleUpdateAvailability(reward.id, parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500"
                          />
                          <span className="text-sm text-gray-500">/ {reward.totalAvailable}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          reward.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {reward.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-yellow-600 hover:text-yellow-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => removeReward(reward.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Reward Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Add New Reward</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Reward Name
                  </label>
                  <input
                    type="text"
                    value={newReward.name}
                    onChange={(e) => setNewReward(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter reward name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Provider
                  </label>
                  <input
                    type="text"
                    value={newReward.provider}
                    onChange={(e) => setNewReward(prev => ({ ...prev, provider: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter provider name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  value={newReward.description}
                  onChange={(e) => setNewReward(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter reward description"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Type
                  </label>
                  <select
                    value={newReward.type}
                    onChange={(e) => setNewReward(prev => ({ ...prev, type: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="coupon">Coupon</option>
                    <option value="badge">Badge</option>
                    <option value="merchandise">Merchandise</option>
                    <option value="experience">Experience</option>
                    <option value="digital">Digital</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newReward.category}
                    onChange={(e) => setNewReward(prev => ({ ...prev, category: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="food">Food & Dining</option>
                    <option value="shopping">Shopping</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="education">Education</option>
                    <option value="eco-products">Eco Products</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Points Cost
                  </label>
                  <input
                    type="number"
                    value={newReward.pointsCost}
                    onChange={(e) => setNewReward(prev => ({ ...prev, pointsCost: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Total Available
                  </label>
                  <input
                    type="number"
                    value={newReward.totalAvailable}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 0;
                      setNewReward(prev => ({ 
                        ...prev, 
                        totalAvailable: value,
                        availability: value 
                      }));
                    }}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={newReward.expiryDate}
                    onChange={(e) => setNewReward(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Terms & Conditions
                </label>
                {newReward.terms.map((term, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={term}
                      onChange={(e) => updateTerm(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter term"
                    />
                    {newReward.terms.length > 1 && (
                      <button
                        onClick={() => removeTerm(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addTermField}
                  className="text-purple-500 hover:text-purple-700 text-sm flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Term</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newReward.isLimited}
                    onChange={(e) => setNewReward(prev => ({ ...prev, isLimited: e.target.checked }))}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Limited Edition</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newReward.isNew}
                    onChange={(e) => setNewReward(prev => ({ ...prev, isNew: e.target.checked }))}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Mark as New</span>
                </label>
              </div>
            </div>

            <div className="flex space-x-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleAddReward}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Add Reward
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default RewardsManagement;
