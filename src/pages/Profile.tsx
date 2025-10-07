import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Edit,
  Award,
  Target,
  Star,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Camera,
  Save,
  X,
  TrendingUp,
  Trophy,
  Badge,
  Settings,
  Bell,
  Shield,
  Download
} from 'lucide-react';
import { useUser } from '../context/UserContext';

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = () => {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: 'Computer Science',
    bio: 'Passionate about sustainability and environmental conservation. Always looking for ways to reduce my carbon footprint!',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA'
  });

  const handleSave = () => {
    updateUser({ name: editForm.name, email: editForm.email });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || '',
      department: 'Computer Science',
      bio: 'Passionate about sustainability and environmental conservation. Always looking for ways to reduce my carbon footprint!',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA'
    });
    setIsEditing(false);
  };

  const achievements = [
    { id: 1, title: 'Energy Champion', description: 'Saved 500+ kWh of energy', icon: '⚡', earnedAt: '2024-01-15' },
    { id: 2, title: 'Water Saver', description: 'Reduced water usage by 30%', icon: '💧', earnedAt: '2024-01-12' },
    { id: 3, title: 'Eco Warrior', description: 'Completed 10 sustainability challenges', icon: '🌱', earnedAt: '2024-01-10' },
    { id: 4, title: 'Waste Reducer', description: 'Diverted 100kg from landfill', icon: '♻️', earnedAt: '2024-01-08' }
  ];

  const badges = [
    'Early Adopter', 'Challenge Master', 'Community Leader', 'Innovation Pioneer',
    'Sustainability Expert', 'Carbon Neutral', 'Team Player', 'Knowledge Sharer'
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white relative overflow-hidden"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-3xl font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all">
                  <Camera className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h1 className="text-3xl font-bold mb-2">{user?.name || 'User'}</h1>
                <p className="text-green-100 mb-4">Level {user?.level || 1} Eco-Warrior</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5" />
                    <span className="font-semibold">{user?.points || 0} Points</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Target className="w-5 h-5" />
                    <span className="font-semibold">Level {user?.level || 1}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-semibold">Joined {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Recently'}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 border-4 border-white border-t-transparent rounded-full mb-4"
              />
              <div className="text-green-100 text-sm">Sustainability Score</div>
              <div className="text-2xl font-bold">{user?.sustainabilityScore || 0}/100</div>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white bg-opacity-5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white bg-opacity-5 rounded-full translate-y-24 -translate-x-24" />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Basic Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Profile Information</h2>
              {!isEditing ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Edit Profile</span>
                </motion.button>
              ) : (
                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCancel}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </motion.button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{editForm.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{editForm.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Department
                </label>
                {isEditing ? (
                  <select
                    value={editForm.department}
                    onChange={(e) => setEditForm(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Environmental Science">Environmental Science</option>
                    <option value="Business">Business</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Arts">Arts</option>
                  </select>
                ) : (
                  <p className="text-gray-800 dark:text-white">{editForm.department}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{editForm.phone}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editForm.location}
                    onChange={(e) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{editForm.location}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                {isEditing ? (
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm(prev => ({ ...prev, bio: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
                  />
                ) : (
                  <p className="text-gray-800 dark:text-white">{editForm.bio}</p>
                )}
              </div>
            </div>
          </div>

          {/* Sustainability Journey */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
              Sustainability Journey
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                  {user?.points || 0}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Total Points</div>
              </div>

              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {user?.level || 1}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Level</div>
              </div>

              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">
                  {achievements.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Achievements</div>
              </div>

              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">
                  {user?.sustainabilityScore || 0}%
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Recent Achievements
            </h3>

            <div className="space-y-3">
              {achievements.slice(0, 3).map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-lg">
                    {achievement.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-gray-800 dark:text-white">
                      {achievement.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Badge className="w-5 h-5 mr-2 text-purple-500" />
              Eco Badges
            </h3>

            <div className="flex flex-wrap gap-2">
              {badges.map((badge, index) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="px-2 py-1 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/30 dark:to-blue-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full"
                >
                  {badge}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2 text-gray-500" />
              Account Settings
            </h3>

            <div className="space-y-3">
              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Notification Settings</span>
              </button>

              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <Shield className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Privacy Settings</span>
              </button>

              <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Export Data</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
