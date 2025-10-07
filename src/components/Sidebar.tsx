import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Trophy, 
  BarChart2, 
  Gamepad2, 
  BarChart3, 
  Settings, 
  Users, 
  Target, 
  Award, 
  Shield, 
  Database, 
  Bell, 
  FileText, 
  Calendar, 
  TrendingUp, 
  UserCheck, 
  MessageSquare, 
  Zap, 
  Globe, 
  Leaf,
  PieChart,
  Activity,
  Monitor,
  Lock,
  Mail,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const Sidebar: React.FC = () => {
  const { user } = useUser();

  const studentLinks = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Challenges', icon: Trophy, path: '/challenges' },
    { name: 'Mini-Games', icon: Gamepad2, path: '/mini-games' },
    { name: 'Community', icon: Users, path: '/community' },
    { name: 'Leaderboard', icon: BarChart2, path: '/leaderboard' },
    { name: 'Rewards Store', icon: Award, path: '/rewards-claiming' },
    { name: 'Analytics', icon: BarChart3, path: '/analytics' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  const adminLinks = [
    // Core Admin Functions - WORKING PAGES
    { name: 'Admin Dashboard', icon: LayoutDashboard, path: '/admin', section: 'Core' },
    { name: 'System Monitor', icon: Monitor, path: '/system-monitor', section: 'Core' },
    { name: 'Data Analytics', icon: PieChart, path: '/admin/data-analytics', section: 'Core' },
    
    // Content Management - WORKING PAGES
    { name: 'Manage Challenges', icon: Target, path: '/admin/challenges', section: 'Content' },
    { name: 'Rewards Management', icon: Award, path: '/admin/rewards', section: 'Content' },
    
    // User Management - WORKING PAGES
    { name: 'User Management', icon: Users, path: '/admin/users', section: 'Users' },
    
    // Platform Management - WORKING PAGES
    { name: 'Notifications', icon: Bell, path: '/admin/notifications', section: 'Platform' },
    
    // Student Pages (accessible to admin)
    { name: 'Analytics & Reports', icon: BarChart3, path: '/analytics', section: 'Student Pages' },
    { name: 'Settings', icon: Settings, path: '/settings', section: 'Student Pages' },
  ];

  const links = user?.role === 'admin' ? adminLinks : studentLinks;

  // Group admin links by section
  const groupedAdminLinks = adminLinks.reduce((acc, link) => {
    const section = link.section || 'Other';
    if (!acc[section]) {
      acc[section] = [];
    }
    acc[section].push(link);
    return acc;
  }, {} as Record<string, typeof adminLinks>);

  return (
    <aside className="w-64 bg-card p-4 flex flex-col justify-between overflow-y-auto max-h-screen">
      <div>
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ES</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-white">EcoSphere</span>
        </div>
        
        <nav>
          {user?.role === 'admin' ? (
            // Admin Navigation with Sections
            <div className="space-y-6">
              {Object.entries(groupedAdminLinks).map(([section, sectionLinks]) => (
                <div key={section}>
                  <h3 className="text-xs font-semibold text-text-secondary uppercase mb-3 px-2">
                    {section}
                  </h3>
                  <ul className="space-y-1">
                    {sectionLinks.map(link => (
                      <li key={link.name}>
                        <NavLink
                          to={link.path}
                          className={({ isActive }) =>
                            `flex items-center space-x-3 p-2 rounded-lg text-sm font-medium transition-colors ${
                              isActive
                                ? 'bg-primary text-white shadow-sm'
                                : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                            }`
                          }
                        >
                          <link.icon className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{link.name}</span>
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            // Student Navigation
            <div>
              <h3 className="text-sm font-semibold text-text-secondary uppercase mb-4">Navigation</h3>
              <ul>
                {links.map(link => (
                  <li key={link.name} className="mb-2">
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 p-3 rounded-lg font-medium transition-colors ${
                          isActive
                            ? 'bg-primary text-white'
                            : 'text-text-secondary hover:bg-gray-200'
                        }`
                      }
                    >
                      <link.icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
      
      {/* Admin Quick Stats */}
      {user?.role === 'admin' && (
        <div className="mt-6 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
          <div className="text-center">
            <div className="text-xs text-gray-600 mb-1">System Status</div>
            <div className="flex items-center justify-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-green-700">All Systems Operational</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
