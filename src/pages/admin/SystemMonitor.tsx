import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Monitor,
  Cpu,
  HardDrive,
  Activity,
  Wifi,
  Database,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw
} from 'lucide-react';

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const SystemMonitor: React.FC = () => {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  const systemMetrics: SystemMetric[] = [
    { name: 'CPU Usage', value: 45, unit: '%', status: 'good', trend: 'stable' },
    { name: 'Memory Usage', value: 67, unit: '%', status: 'warning', trend: 'up' },
    { name: 'Disk Usage', value: 23, unit: '%', status: 'good', trend: 'down' },
    { name: 'Network I/O', value: 156, unit: 'MB/s', status: 'good', trend: 'up' },
    { name: 'Database Load', value: 89, unit: '%', status: 'critical', trend: 'up' },
    { name: 'Response Time', value: 245, unit: 'ms', status: 'good', trend: 'stable' }
  ];

  const serverStatus = [
    { name: 'Web Server', status: 'online', uptime: '99.9%', lastCheck: '2 min ago' },
    { name: 'Database Server', status: 'online', uptime: '99.7%', lastCheck: '1 min ago' },
    { name: 'Cache Server', status: 'warning', uptime: '98.2%', lastCheck: '3 min ago' },
    { name: 'File Server', status: 'online', uptime: '99.8%', lastCheck: '1 min ago' },
    { name: 'Email Server', status: 'offline', uptime: '95.1%', lastCheck: '5 min ago' }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'critical',
      message: 'Database connection pool exhausted',
      time: '2 minutes ago',
      resolved: false
    },
    {
      id: 2,
      type: 'warning',
      message: 'High memory usage detected on web server',
      time: '5 minutes ago',
      resolved: false
    },
    {
      id: 3,
      type: 'info',
      message: 'Scheduled backup completed successfully',
      time: '1 hour ago',
      resolved: true
    },
    {
      id: 4,
      type: 'warning',
      message: 'Email server response time increased',
      time: '2 hours ago',
      resolved: true
    }
  ];

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        setLastUpdated(new Date());
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
      case 'good':
        return 'text-green-500 bg-green-100';
      case 'warning':
        return 'text-yellow-500 bg-yellow-100';
      case 'critical':
      case 'offline':
        return 'text-red-500 bg-red-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
      case 'good':
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'critical':
      case 'offline':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-green-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getMetricIcon = (name: string) => {
    switch (name) {
      case 'CPU Usage':
        return <Cpu className="w-6 h-6" />;
      case 'Memory Usage':
        return <Activity className="w-6 h-6" />;
      case 'Disk Usage':
        return <HardDrive className="w-6 h-6" />;
      case 'Network I/O':
        return <Wifi className="w-6 h-6" />;
      case 'Database Load':
        return <Database className="w-6 h-6" />;
      default:
        return <Monitor className="w-6 h-6" />;
    }
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Monitor</h1>
          <p className="text-gray-700 dark:text-gray-300 mt-2 font-medium">
            Real-time system performance and health monitoring
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="autoRefresh"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <label htmlFor="autoRefresh" className="text-sm text-gray-600 dark:text-gray-400">
              Auto-refresh
            </label>
          </div>
          <button
            onClick={() => setLastUpdated(new Date())}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </motion.div>

      {/* Last Updated */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-gray-500 dark:text-gray-400"
      >
        Last updated: {lastUpdated.toLocaleTimeString()}
      </motion.div>

      {/* System Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {systemMetrics.map((metric, index) => (
          <div key={metric.name} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getStatusColor(metric.status)}`}>
                  {getMetricIcon(metric.name)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">{metric.name}</h3>
                  <div className="flex items-center space-x-1">
                    {getTrendIcon(metric.trend)}
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {metric.trend}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">
                  {metric.value}
                  <span className="text-lg text-gray-500 dark:text-gray-400 ml-1">
                    {metric.unit}
                  </span>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                {metric.status}
              </div>
            </div>
            {/* Progress bar for percentage metrics */}
            {metric.unit === '%' && (
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.status === 'good' ? 'bg-green-500' :
                      metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${metric.value}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Server Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Server Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {serverStatus.map((server) => (
            <div key={server.name} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Server className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <span className="font-medium text-gray-800 dark:text-white">{server.name}</span>
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(server.status)}`}>
                  {getStatusIcon(server.status)}
                  <span>{server.status}</span>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <div>Uptime: {server.uptime}</div>
                <div>Last check: {server.lastCheck}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      >
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Recent Alerts</h2>
        <div className="space-y-4">
          {recentAlerts.map((alert) => (
            <div key={alert.id} className={`border-l-4 pl-4 py-2 ${
              alert.type === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/20' :
              alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
              'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {alert.type === 'critical' ? (
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                  ) : alert.type === 'warning' ? (
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                  )}
                  <span className="text-sm font-medium text-gray-800 dark:text-white">
                    {alert.message}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400">{alert.time}</span>
                  {alert.resolved && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Resolved
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SystemMonitor;
