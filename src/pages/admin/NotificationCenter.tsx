import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  Send,
  Users,
  Target,
  Calendar,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Filter,
  Search,
  CheckCircle,
  AlertTriangle,
  Info,
  Mail,
  MessageSquare,
  Smartphone
} from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  recipients: 'all' | 'students' | 'admins' | 'custom';
  recipientCount: number;
  channel: 'email' | 'push' | 'sms' | 'in-app';
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  createdAt: string;
  scheduledFor?: string;
  sentAt?: string;
  openRate?: number;
  clickRate?: number;
}

const NotificationCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sent' | 'drafts' | 'scheduled' | 'templates'>('sent');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'info' | 'warning' | 'success' | 'error'>('all');

  const mockNotifications: Notification[] = [
    {
      id: 1,
      title: 'New Sustainability Challenge Available',
      message: 'Join our latest "Zero Waste Week" challenge and earn 300 points!',
      type: 'info',
      recipients: 'students',
      recipientCount: 1247,
      channel: 'push',
      status: 'sent',
      createdAt: '2024-01-15T10:30:00Z',
      sentAt: '2024-01-15T10:35:00Z',
      openRate: 78,
      clickRate: 45
    },
    {
      id: 2,
      title: 'System Maintenance Notice',
      message: 'The platform will be under maintenance on Sunday from 2-4 AM.',
      type: 'warning',
      recipients: 'all',
      recipientCount: 1255,
      channel: 'email',
      status: 'sent',
      createdAt: '2024-01-14T15:00:00Z',
      sentAt: '2024-01-14T15:05:00Z',
      openRate: 92,
      clickRate: 12
    },
    {
      id: 3,
      title: 'Weekly Leaderboard Update',
      message: 'Check out this week\'s top performers and see where you rank!',
      type: 'success',
      recipients: 'students',
      recipientCount: 1247,
      channel: 'in-app',
      status: 'scheduled',
      createdAt: '2024-01-16T09:00:00Z',
      scheduledFor: '2024-01-17T18:00:00Z'
    },
    {
      id: 4,
      title: 'Emergency Alert Test',
      message: 'This is a test of the emergency notification system.',
      type: 'error',
      recipients: 'all',
      recipientCount: 1255,
      channel: 'sms',
      status: 'draft',
      createdAt: '2024-01-16T11:00:00Z'
    }
  ];

  const filteredNotifications = mockNotifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesTab = 
      (activeTab === 'sent' && notification.status === 'sent') ||
      (activeTab === 'drafts' && notification.status === 'draft') ||
      (activeTab === 'scheduled' && notification.status === 'scheduled') ||
      (activeTab === 'templates');
    
    return matchesSearch && matchesType && matchesTab;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info': return <Info className="w-4 h-4 text-blue-500" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'push': return <Bell className="w-4 h-4" />;
      case 'sms': return <Smartphone className="w-4 h-4" />;
      case 'in-app': return <MessageSquare className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-green-100 text-green-700 border-green-200';
      case 'scheduled': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'draft': return 'bg-gray-100 text-gray-700 border-gray-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const tabs = [
    { key: 'sent', label: 'Sent', count: mockNotifications.filter(n => n.status === 'sent').length },
    { key: 'drafts', label: 'Drafts', count: mockNotifications.filter(n => n.status === 'draft').length },
    { key: 'scheduled', label: 'Scheduled', count: mockNotifications.filter(n => n.status === 'scheduled').length },
    { key: 'templates', label: 'Templates', count: 5 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notification Center</h1>
          <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">
            Manage and send notifications to platform users
          </p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Notification</span>
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
              <p className="text-gray-600 dark:text-gray-400 text-sm">Total Sent</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">2,847</p>
            </div>
            <Send className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Open Rate</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">85%</p>
            </div>
            <Eye className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Click Rate</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">32%</p>
            </div>
            <Target className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Scheduled</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">12</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </motion.div>

      {/* Tabs and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
      >
        {/* Tabs */}
        <div className="flex space-x-1 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Notifications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
      >
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredNotifications.map((notification) => (
            <div key={notification.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    {getTypeIcon(notification.type)}
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {notification.title}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(notification.status)}`}>
                      {notification.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      {getChannelIcon(notification.channel)}
                      <span>{notification.channel}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{notification.recipientCount} recipients</span>
                    </div>
                    <div>
                      Created: {new Date(notification.createdAt).toLocaleDateString()}
                    </div>
                    {notification.sentAt && (
                      <div>
                        Sent: {new Date(notification.sentAt).toLocaleDateString()}
                      </div>
                    )}
                    {notification.scheduledFor && (
                      <div>
                        Scheduled: {new Date(notification.scheduledFor).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  
                  {notification.status === 'sent' && notification.openRate && (
                    <div className="flex items-center space-x-4 mt-3 text-sm">
                      <div className="text-green-600">
                        Open Rate: {notification.openRate}%
                      </div>
                      <div className="text-blue-600">
                        Click Rate: {notification.clickRate}%
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button className="p-2 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationCenter;
