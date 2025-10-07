import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  LogOut, 
  Settings, 
  User, 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Users,
  BarChart3,
  Zap
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const Navbar: React.FC = () => {
  const { user, logout } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock admin notifications
  const adminNotifications = [
    {
      id: 1,
      type: 'alert',
      title: 'System Performance',
      message: 'High server load detected',
      time: '2 min ago',
      icon: AlertTriangle,
      color: 'text-yellow-500'
    },
    {
      id: 2,
      type: 'success',
      title: 'New User Registration',
      message: '15 new students joined today',
      time: '5 min ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 3,
      type: 'info',
      title: 'Challenge Completion',
      message: 'Energy Saving Challenge completed by 45 users',
      time: '10 min ago',
      icon: Activity,
      color: 'text-blue-500'
    },
    {
      id: 4,
      type: 'pending',
      title: 'Pending Approvals',
      message: '3 new challenges awaiting review',
      time: '15 min ago',
      icon: Clock,
      color: 'text-orange-500'
    }
  ];

  const adminQuickStats = {
    activeUsers: 1247,
    todaySignups: 23,
    systemLoad: 67,
    activeChallenges: 12
  };

  return (
    <header className="h-20 bg-background border-b border-gray-200 flex items-center px-8">
      {/* Left side - Admin Quick Stats (only for admin) */}
      {user?.role === 'admin' && (
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-blue-500" />
              <span className="text-gray-600">Active:</span>
              <span className="font-semibold text-blue-600">{adminQuickStats.activeUsers}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">Load:</span>
              <span className="font-semibold text-green-600">{adminQuickStats.systemLoad}%</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4 text-purple-500" />
              <span className="text-gray-600">Challenges:</span>
              <span className="font-semibold text-purple-600">{adminQuickStats.activeChallenges}</span>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to push right content to the far right */}
      <div className="flex-1"></div>

      {/* Right side - Search, Notifications, Profile */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-4 h-4 text-text-secondary absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder={user?.role === 'admin' ? "Search users, challenges..." : "Search..."}
            className="bg-card pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-64 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Enhanced Notifications for Admin */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Bell className="w-5 h-5 text-text-secondary" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            {user?.role === 'admin' && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-bold">
                {adminNotifications.length}
              </span>
            )}
          </button>

          {/* Admin Notifications Dropdown */}
          {showNotifications && user?.role === 'admin' && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Admin Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {adminNotifications.map((notification) => {
                  const IconComponent = notification.icon;
                  return (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-3">
                        <IconComponent className={`w-5 h-5 ${notification.color} mt-0.5`} />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-sm">{notification.title}</h4>
                          <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                          <p className="text-gray-400 text-xs mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-3 border-t border-gray-200">
                <button className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced User Profile Dropdown */}
        <div className="relative group">
          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              user?.role === 'admin' ? 'bg-green-500' : 'bg-green-500'
            }`}>
              {user?.role === 'admin' ? (
                <Shield className="w-4 h-4 text-white" />
              ) : (
                <span className="text-white font-bold text-sm">{user?.name?.charAt(0) || 'S'}</span>
              )}
            </div>
            <div className="text-left">
              <div className="font-medium text-text-primary text-sm">{user?.name || 'Student'}</div>
              <div className="text-xs text-gray-500 font-medium">
                {user?.role === 'admin' ? 'Administrator' : 'Student'}
              </div>
            </div>
          </button>
          
          <div className="absolute right-0 mt-2 w-56 bg-card rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <div className="py-2">
              {user?.role === 'admin' && (
                <>
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="text-sm font-medium text-gray-800">Admin Panel</div>
                    <div className="text-xs text-gray-500">System Administrator</div>
                  </div>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Settings
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <Activity className="w-4 h-4 mr-2" />
                    System Monitor
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Analytics Dashboard
                  </button>
                  <div className="border-t border-gray-200 my-1"></div>
                </>
              )}
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </button>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
