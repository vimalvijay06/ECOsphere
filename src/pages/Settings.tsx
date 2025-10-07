import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import {
  Settings as SettingsIcon,
  Shield,
  Bell,
  Lock,
  Globe,
  Database,
  Mail,
  Users,
  Activity,
  Palette,
  Monitor,
  Save,
  RefreshCw,
  Download,
  Upload,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Leaf
} from 'lucide-react';

const Settings: React.FC = () => {
  const { user, updateUser } = useUser();
  const [name, setName] = useState(user?.name || '');
  const [department, setDepartment] = useState(user?.department || 'Computer Science');
  
  // Admin-specific settings state
  const [platformSettings, setPlatformSettings] = useState({
    siteName: 'EcoSphere',
    siteDescription: 'Campus Sustainability Platform',
    maintenanceMode: false,
    registrationEnabled: true,
    maxUsersPerChallenge: 100,
    pointsMultiplier: 1.0,
    autoApproveUsers: false,
    enableGamification: true
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    systemAlerts: true,
    userRegistration: true,
    challengeCompletion: true,
    systemMaintenance: true,
    securityAlerts: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: 30,
    passwordExpiry: 90,
    maxLoginAttempts: 5,
    ipWhitelist: '',
    auditLogging: true,
    encryptionEnabled: true
  });

  const [systemSettings, setSystemSettings] = useState({
    backupFrequency: 'daily',
    logRetention: 30,
    cacheEnabled: true,
    compressionEnabled: true,
    cdnEnabled: false,
    analyticsEnabled: true,
    performanceMonitoring: true
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    primaryColor: '#10B981',
    secondaryColor: '#3B82F6',
    logoUrl: '',
    faviconUrl: '',
    customCSS: ''
  });

  const handleProfileSave = () => {
    updateUser({ name, department });
    // Show a success message
  };

  const handlePlatformSave = () => {
    console.log('Platform settings saved:', platformSettings);
    // Save platform settings
  };

  const handleNotificationSave = () => {
    console.log('Notification settings saved:', notificationSettings);
    // Save notification settings
  };

  const handleSecuritySave = () => {
    console.log('Security settings saved:', securitySettings);
    // Save security settings
  };

  const handleSystemSave = () => {
    console.log('System settings saved:', systemSettings);
    // Save system settings
  };

  const handleAppearanceSave = () => {
    console.log('Appearance settings saved:', appearanceSettings);
    // Save appearance settings
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {user?.role === 'admin' ? 'Admin Settings' : 'Settings'}
          </h1>
          <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">
            {user?.role === 'admin' 
              ? 'Manage platform configuration and system settings'
              : 'Manage your account and preferences'
            }
          </p>
        </div>
        {user?.role === 'admin' && (
          <div className="flex items-center space-x-2 text-green-600">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Administrator</span>
          </div>
        )}
      </motion.div>

      {/* Profile Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Users className="w-6 h-6 text-blue-500" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Profile Settings</h2>
        </div>
        <div className="flex items-center space-x-6 mb-6">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-4xl font-bold ${
            user?.role === 'admin' ? 'bg-green-500' : 'bg-blue-500'
          }`}>
            {user?.role === 'admin' ? <Shield className="w-12 h-12" /> : (user?.name?.charAt(0) || 'U')}
          </div>
          <div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
              Upload Picture
            </button>
            <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 dark:text-gray-400 mb-2 font-medium">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-400 mb-2 font-medium">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button 
          onClick={handleProfileSave} 
          className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </motion.div>

      {/* Admin-Only Settings */}
      {user?.role === 'admin' && (
        <>
          {/* Platform Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Globe className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Platform Settings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 dark:text-gray-400 mb-2 font-medium">Site Name</label>
                <input
                  type="text"
                  value={platformSettings.siteName}
                  onChange={(e) => setPlatformSettings({...platformSettings, siteName: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-400 mb-2 font-medium">Max Users Per Challenge</label>
                <input
                  type="number"
                  value={platformSettings.maxUsersPerChallenge}
                  onChange={(e) => setPlatformSettings({...platformSettings, maxUsersPerChallenge: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Maintenance Mode</span>
                <button
                  onClick={() => setPlatformSettings({...platformSettings, maintenanceMode: !platformSettings.maintenanceMode})}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    platformSettings.maintenanceMode ? 'bg-red-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    platformSettings.maintenanceMode ? 'translate-x-6' : 'translate-x-0'
                  }`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Registration Enabled</span>
                <button
                  onClick={() => setPlatformSettings({...platformSettings, registrationEnabled: !platformSettings.registrationEnabled})}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    platformSettings.registrationEnabled ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    platformSettings.registrationEnabled ? 'translate-x-6' : 'translate-x-0'
                  }`}></span>
                </button>
              </div>
            </div>
            <button 
              onClick={handlePlatformSave}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Platform Settings</span>
            </button>
          </motion.div>

          {/* Security Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Security Settings</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-600 dark:text-gray-400 mb-2 font-medium">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div>
                <label className="block text-gray-600 dark:text-gray-400 mb-2 font-medium">Max Login Attempts</label>
                <input
                  type="number"
                  value={securitySettings.maxLoginAttempts}
                  onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Two-Factor Authentication</span>
                <button
                  onClick={() => setSecuritySettings({...securitySettings, twoFactorAuth: !securitySettings.twoFactorAuth})}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    securitySettings.twoFactorAuth ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    securitySettings.twoFactorAuth ? 'translate-x-6' : 'translate-x-0'
                  }`}></span>
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-gray-300">Audit Logging</span>
                <button
                  onClick={() => setSecuritySettings({...securitySettings, auditLogging: !securitySettings.auditLogging})}
                  className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                    securitySettings.auditLogging ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full transition-transform ${
                    securitySettings.auditLogging ? 'translate-x-6' : 'translate-x-0'
                  }`}></span>
                </button>
              </div>
            </div>
            <button 
              onClick={handleSecuritySave}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Save Security Settings</span>
            </button>
          </motion.div>
        </>
      )}

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Bell className="w-6 h-6 text-yellow-500" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Notification Settings</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Email Notifications</span>
            <button
              onClick={() => setNotificationSettings({...notificationSettings, emailNotifications: !notificationSettings.emailNotifications})}
              className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                notificationSettings.emailNotifications ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span className={`w-4 h-4 bg-white rounded-full transition-transform ${
                notificationSettings.emailNotifications ? 'translate-x-6' : 'translate-x-0'
              }`}></span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700 dark:text-gray-300">Push Notifications</span>
            <button
              onClick={() => setNotificationSettings({...notificationSettings, pushNotifications: !notificationSettings.pushNotifications})}
              className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                notificationSettings.pushNotifications ? 'bg-green-500' : 'bg-gray-300'
              }`}
            >
              <span className={`w-4 h-4 bg-white rounded-full transition-transform ${
                notificationSettings.pushNotifications ? 'translate-x-6' : 'translate-x-0'
              }`}></span>
            </button>
          </div>
          {user?.role === 'admin' && (
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">System Alerts</span>
              <button
                onClick={() => setNotificationSettings({...notificationSettings, systemAlerts: !notificationSettings.systemAlerts})}
                className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                  notificationSettings.systemAlerts ? 'bg-green-500' : 'bg-gray-300'
                }`}
              >
                <span className={`w-4 h-4 bg-white rounded-full transition-transform ${
                  notificationSettings.systemAlerts ? 'translate-x-6' : 'translate-x-0'
                }`}></span>
              </button>
            </div>
          )}
        </div>
        <button 
          onClick={handleNotificationSave}
          className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <Bell className="w-4 h-4" />
          <span>Save Notification Settings</span>
        </button>
      </motion.div>

      {/* Privacy & Data Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Eye className="w-6 h-6 text-indigo-500" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Privacy & Data</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Show Profile on Leaderboard</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">Allow others to see your ranking and achievements</p>
            </div>
            <button className="w-12 h-6 bg-green-500 rounded-full flex items-center px-1 transition-colors">
              <span className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Activity Visibility</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">Share your eco-actions with the community</p>
            </div>
            <button className="w-12 h-6 bg-green-500 rounded-full flex items-center px-1 transition-colors">
              <span className="w-4 h-4 bg-white rounded-full translate-x-6 transition-transform"></span>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">Data Analytics</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">Help improve the platform with usage data</p>
            </div>
            <button className="w-12 h-6 bg-gray-300 rounded-full flex items-center px-1 transition-colors">
              <span className="w-4 h-4 bg-white rounded-full transition-transform"></span>
            </button>
          </div>
        </div>
        <button 
          className="mt-6 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Privacy Settings</span>
        </button>
      </motion.div>

      {/* Sustainability Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Leaf className="w-6 h-6 text-green-500" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Sustainability Preferences</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 dark:text-gray-400 mb-2 font-medium">Primary Interest</label>
            <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Energy Conservation</option>
              <option>Waste Reduction</option>
              <option>Water Conservation</option>
              <option>Sustainable Transportation</option>
              <option>Sustainable Food</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-400 mb-2 font-medium">Challenge Difficulty</label>
            <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-400 mb-2 font-medium">Daily Goal</label>
            <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>1-2 eco actions</option>
              <option>3-5 eco actions</option>
              <option>6-10 eco actions</option>
              <option>10+ eco actions</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-400 mb-2 font-medium">Reminder Frequency</label>
            <select className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
              <option>Never</option>
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
        <button 
          className="mt-6 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>Save Preferences</span>
        </button>
      </motion.div>

      {/* Account Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        <div className="flex items-center space-x-3 mb-6">
          <SettingsIcon className="w-6 h-6 text-purple-500" />
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">Account Settings</h2>
        </div>
        <div className="space-y-4">
          <button className="text-blue-500 hover:text-blue-600 font-medium flex items-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Change Password</span>
          </button>
          <button className="text-green-500 hover:text-green-600 font-medium flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Data</span>
          </button>
          {user?.role !== 'admin' && (
            <button className="text-red-500 hover:text-red-600 font-medium flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Delete Account</span>
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
