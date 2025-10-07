import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Shield, 
  Leaf, 
  TreePine, 
  Recycle, 
  Award,
  Users,
  Settings,
  Target,
  Globe
} from 'lucide-react';


const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full">
                <Leaf className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              EcoSphere
            </h1>
            <p className="text-xl text-gray-800 dark:text-gray-200 mb-2 font-medium">
              Transforming Campus Sustainability Through Innovation
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Join our community of eco-warriors and make a lasting impact
            </p>
          </motion.div>

          {/* Role Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
            {/* Student Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Link 
                to="/login/student" 
                className="block p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700"
              >
                <div className="text-center">
                  {/* Student Icon with Background */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <User className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <Award className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Student</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Participate in sustainability challenges, track your eco-impact, and earn rewards
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <Award className="w-4 h-4 text-blue-500" />
                      <span>Earn points & badges</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Target className="w-4 h-4 text-blue-500" />
                      <span>Join challenges</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span>Connect with community</span>
                    </div>
                  </div>

                  <div className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
                    Start Your Journey
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Admin Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Link 
                to="/login/admin" 
                className="block p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-green-200 dark:hover:border-green-700"
              >
                <div className="text-center">
                  {/* Admin Icon with Background */}
                  <div className="relative mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900 dark:to-green-800 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-12 h-12 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="absolute -top-2 -right-2">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <Settings className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">Admin</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Manage sustainability initiatives, create challenges, and monitor campus impact
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <Settings className="w-4 h-4 text-green-500" />
                      <span>Manage platform</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Target className="w-4 h-4 text-green-500" />
                      <span>Create challenges</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Users className="w-4 h-4 text-green-500" />
                      <span>Monitor analytics</span>
                    </div>
                  </div>

                  <div className="mt-6 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold group-hover:from-green-600 group-hover:to-green-700 transition-all duration-300">
                    Access Dashboard
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center"
          >
            <div className="p-4">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">1,247</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Students</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">45</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Challenges</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-bold text-teal-600 dark:text-teal-400">78%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Sustainability Score</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
