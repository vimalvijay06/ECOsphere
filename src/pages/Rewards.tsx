import React from 'react';
import { motion } from 'framer-motion';
import { Award, Gift } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useApp } from '../context/AppContext';

const Rewards: React.FC = () => {
  const { user } = useUser();
  const { gameState } = useApp();
  const { rewards } = gameState;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-text-primary mb-2">Your Rewards</h1>
        <p className="text-text-secondary">
          Here are the rewards you've earned from your sustainability efforts!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-card rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="p-3 bg-primary-accent rounded-lg">
                {reward.type === 'coupon' ? <Gift className="w-6 h-6 text-white" /> : <Award className="w-6 h-6 text-white" />}
              </div>
              <div>
                <h3 className="font-bold text-text-primary">{reward.name}</h3>
                <p className="text-sm text-text-secondary">{reward.description}</p>
              </div>
            </div>
            <button className="w-full bg-primary text-white py-2 px-4 rounded-lg font-semibold hover:bg-button-hover transition-colors">
              View Details
            </button>
          </motion.div>
        ))}
      </div>

      {rewards.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-secondary mb-2">
            No rewards yet!
          </h3>
          <p className="text-text-secondary">
            Play the EcoQuest mini-game to earn rewards.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Rewards;
