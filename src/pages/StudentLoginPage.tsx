import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { User, Leaf, Award, Target, ArrowLeft } from 'lucide-react';

const StudentLoginPage = () => {
  const [email, setEmail] = useState('student@test.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-blue-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20">
          <Leaf className="w-32 h-32 text-blue-500 transform rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20">
          <Target className="w-24 h-24 text-blue-600 transform -rotate-12" />
        </div>
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Role Selection
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-blue-100 dark:border-blue-800"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="w-10 h-10 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Student Portal</h2>
              <p className="text-gray-600 dark:text-gray-300">Join the sustainability movement</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium" htmlFor="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
                </motion.div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 shadow-lg"
              >
                Login to Dashboard
              </motion.button>
            </form>

            {/* Features Preview */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-4">
                What you'll get access to:
              </p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-2">
                  <Award className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Earn Rewards</p>
                </div>
                <div className="p-2">
                  <Target className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Join Challenges</p>
                </div>
                <div className="p-2">
                  <Leaf className="w-6 h-6 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Track Impact</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentLoginPage;
