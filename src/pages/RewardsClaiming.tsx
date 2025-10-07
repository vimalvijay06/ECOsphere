import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Gift,
  Award,
  Star,
  Crown,
  Zap,
  Coffee,
  ShoppingBag,
  Ticket,
  CheckCircle,
  Clock,
  Lock,
  TrendingUp,
  Users,
  Calendar,
  Download,
  ExternalLink,
  Copy,
  Eye,
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useApp } from '../context/AppContext';
import { useRewards, Reward, ClaimedReward } from '../context/RewardsContext';

const RewardsClaiming: React.FC = () => {
  const { user } = useUser();
  const { gameState } = useApp();
  const { 
    availableRewards, 
    claimedRewards, 
    redeemReward, 
    useReward, 
    getRewardHistory 
  } = useRewards();
  
  const [activeTab, setActiveTab] = useState<'available' | 'claimed' | 'history'>('available');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'food' | 'shopping' | 'entertainment' | 'education' | 'eco-products'>('all');
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [redeemMessage, setRedeemMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showRewardDetails, setShowRewardDetails] = useState<ClaimedReward | null>(null);

  // Filter rewards based on selected category
  const filteredRewards = availableRewards.filter(reward => {
    if (selectedCategory === 'all') return true;
    return reward.category === selectedCategory;
  });

  // Copy reward code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setRedeemMessage({ type: 'success', text: 'Code copied to clipboard!' });
    setTimeout(() => setRedeemMessage(null), 3000);
  };

  // Handle reward redemption
  const handleClaimReward = async (reward: Reward) => {
    if (gameState.ecoPoints < reward.pointsCost) {
      setRedeemMessage({ type: 'error', text: 'Not enough eco points!' });
      setTimeout(() => setRedeemMessage(null), 3000);
      return;
    }

    if (reward.availability <= 0) {
      setRedeemMessage({ type: 'error', text: 'This reward is out of stock!' });
      setTimeout(() => setRedeemMessage(null), 3000);
      return;
    }

    setSelectedReward(reward);
    setShowClaimModal(true);
  };

  // Confirm reward claim
  const confirmClaim = async () => {
    if (!selectedReward) return;

    setIsRedeeming(true);
    try {
      const result = await redeemReward(selectedReward.id);
      
      if (result.success) {
        setRedeemMessage({ type: 'success', text: result.message });
        setShowClaimModal(false);
        setSelectedReward(null);
        
        // Show code if available
        if (result.code) {
          setTimeout(() => {
            setRedeemMessage({ 
              type: 'success', 
              text: `Redemption code: ${result.code}. Click to copy!` 
            });
          }, 1000);
        }
      } else {
        setRedeemMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setRedeemMessage({ type: 'error', text: 'Failed to redeem reward. Please try again.' });
    } finally {
      setIsRedeeming(false);
      setTimeout(() => setRedeemMessage(null), 5000);
    }
  };

  // Handle using a claimed reward
  const handleUseReward = async (claimedReward: ClaimedReward) => {
    try {
      const result = await useReward(claimedReward.id);
      
      if (result.success) {
        setRedeemMessage({ type: 'success', text: result.message });
      } else {
        setRedeemMessage({ type: 'error', text: result.message });
      }
    } catch (error) {
      setRedeemMessage({ type: 'error', text: 'Failed to use reward. Please try again.' });
    } finally {
      setTimeout(() => setRedeemMessage(null), 3000);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-600 bg-green-100';
      case 'claimed': return 'text-blue-600 bg-blue-100';
      case 'expired': return 'text-red-600 bg-red-100';
      case 'locked': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'food': return <Coffee className="w-5 h-5" />;
      case 'shopping': return <ShoppingBag className="w-5 h-5" />;
      case 'entertainment': return <Ticket className="w-5 h-5" />;
      case 'education': return <Award className="w-5 h-5" />;
      case 'eco-products': return <Zap className="w-5 h-5" />;
      default: return <Gift className="w-5 h-5" />;
    }
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
            <h1 className="text-3xl font-bold mb-2">Rewards Store 🎁</h1>
            <p className="text-purple-100">Claim amazing rewards with your eco points!</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{gameState.ecoPoints}</div>
            <div className="text-purple-200 text-sm">Available Points</div>
          </div>
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
            { key: 'available', label: 'Available Rewards', icon: Gift },
            { key: 'claimed', label: 'My Rewards', icon: CheckCircle },
            { key: 'history', label: 'History', icon: Clock }
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

        {/* Category Filter (only for available rewards) */}
        {activeTab === 'available' && (
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              { key: 'all', label: 'All Categories' },
              { key: 'food', label: 'Food & Dining' },
              { key: 'shopping', label: 'Shopping' },
              { key: 'entertainment', label: 'Entertainment' },
              { key: 'education', label: 'Education' },
              { key: 'eco-products', label: 'Eco Products' }
            ].map(category => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.key
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Available Rewards */}
      {activeTab === 'available' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredRewards.map((reward) => (
            <div key={reward.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  {getCategoryIcon(reward.category)}
                </div>
                {reward.isNew && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    NEW
                  </div>
                )}
                {reward.isLimited && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    LIMITED
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800 dark:text-white">{reward.name}</h3>
                  {reward.discount && (
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-bold">
                      {reward.discount} OFF
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{reward.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Provider:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{reward.provider}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Available:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {reward.availability}/{reward.totalAvailable}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Expires:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {new Date(reward.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-lg text-gray-800 dark:text-white">
                      {reward.pointsCost}
                    </span>
                    <span className="text-gray-500 text-sm">points</span>
                  </div>
                  
                  <button
                    onClick={() => handleClaimReward(reward)}
                    disabled={gameState.ecoPoints < reward.pointsCost || reward.availability === 0}
                    className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                      gameState.ecoPoints >= reward.pointsCost && reward.availability > 0
                        ? 'bg-purple-500 hover:bg-purple-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {gameState.ecoPoints < reward.pointsCost ? 'Not Enough Points' : 
                     reward.availability === 0 ? 'Out of Stock' : 'Claim'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* Claimed Rewards */}
      {activeTab === 'claimed' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {claimedRewards.map((claimedReward) => (
            <div key={claimedReward.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(claimedReward.reward.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{claimedReward.reward.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{claimedReward.reward.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Claimed: {new Date(claimedReward.claimedAt).toLocaleDateString()}</span>
                      <span>Expires: {new Date(claimedReward.expiresAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(claimedReward.status)}`}>
                    {claimedReward.status}
                  </div>
                  
                  {claimedReward.code && (
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500">Redemption Code:</div>
                      <div className="flex items-center space-x-2">
                        <div className="font-mono text-sm font-bold text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {claimedReward.code}
                        </div>
                        <button
                          onClick={() => copyToClipboard(claimedReward.code!)}
                          className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
                          title="Copy code"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex space-x-2">
                    {claimedReward.status === 'active' && (
                      <button
                        onClick={() => handleUseReward(claimedReward)}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-xs rounded-lg transition-colors"
                      >
                        Use Reward
                      </button>
                    )}
                    <button
                      onClick={() => setShowRewardDetails(claimedReward)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {getRewardHistory().map((claimedReward) => (
            <div key={claimedReward.id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg flex items-center justify-center">
                    {getCategoryIcon(claimedReward.reward.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">{claimedReward.reward.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{claimedReward.reward.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>Claimed: {new Date(claimedReward.claimedAt).toLocaleDateString()}</span>
                      {claimedReward.usedAt && (
                        <span>Used: {new Date(claimedReward.usedAt).toLocaleDateString()}</span>
                      )}
                      <span>Points: {claimedReward.reward.pointsCost}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(claimedReward.status)}`}>
                    {claimedReward.status}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {getRewardHistory().length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📜</div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No Reward History</h3>
              <p className="text-gray-600 dark:text-gray-400">Start claiming rewards to see your history here!</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Reward Details Modal */}
      {showRewardDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Reward Details</h3>
              <button
                onClick={() => setShowRewardDetails(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
                  {getCategoryIcon(showRewardDetails.reward.category)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">{showRewardDetails.reward.name}</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{showRewardDetails.reward.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Provider:</span>
                  <div className="font-medium text-gray-800 dark:text-white">{showRewardDetails.reward.provider}</div>
                </div>
                <div>
                  <span className="text-gray-500">Category:</span>
                  <div className="font-medium text-gray-800 dark:text-white capitalize">{showRewardDetails.reward.category}</div>
                </div>
                <div>
                  <span className="text-gray-500">Points Cost:</span>
                  <div className="font-medium text-gray-800 dark:text-white">{showRewardDetails.reward.pointsCost}</div>
                </div>
                <div>
                  <span className="text-gray-500">Status:</span>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(showRewardDetails.status)}`}>
                    {showRewardDetails.status}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Claimed:</span>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {new Date(showRewardDetails.claimedAt).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <span className="text-gray-500">Expires:</span>
                  <div className="font-medium text-gray-800 dark:text-white">
                    {new Date(showRewardDetails.expiresAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              {showRewardDetails.code && (
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Redemption Code:</div>
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-lg font-bold text-gray-800 dark:text-white">
                      {showRewardDetails.code}
                    </div>
                    <button
                      onClick={() => copyToClipboard(showRewardDetails.code!)}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg transition-colors flex items-center space-x-1"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              )}
              
              <div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">Terms & Conditions:</div>
                <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
                  {showRewardDetails.reward.terms.map((term, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-gray-400 mt-1">•</span>
                      <span>{term}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {showRewardDetails.status === 'active' && (
                <div className="flex space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      handleUseReward(showRewardDetails);
                      setShowRewardDetails(null);
                    }}
                    className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Use Reward
                  </button>
                  <button
                    onClick={() => setShowRewardDetails(null)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* Success/Error Message */}
      {redeemMessage && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
            redeemMessage.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white max-w-md`}
        >
          <div className="flex items-center space-x-2">
            {redeemMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span 
              className={redeemMessage.text.includes('code:') ? 'cursor-pointer' : ''}
              onClick={() => {
                if (redeemMessage.text.includes('code:')) {
                  const code = redeemMessage.text.split('code: ')[1].split('.')[0];
                  copyToClipboard(code);
                }
              }}
            >
              {redeemMessage.text}
            </span>
          </div>
        </motion.div>
      )}

      {/* Claim Confirmation Modal */}
      {showClaimModal && selectedReward && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl max-w-md w-full mx-4"
          >
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Confirm Reward Claim</h3>
            <div className="mb-4">
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Are you sure you want to claim "{selectedReward.name}" for {selectedReward.pointsCost} points?
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400">Current Points: {gameState.ecoPoints}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">After Claim: {gameState.ecoPoints - selectedReward.pointsCost}</div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={confirmClaim}
                disabled={isRedeeming}
                className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center"
              >
                {isRedeeming ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Claiming...
                  </>
                ) : (
                  'Confirm Claim'
                )}
              </button>
              <button
                onClick={() => setShowClaimModal(false)}
                disabled={isRedeeming}
                className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium"
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

export default RewardsClaiming;
