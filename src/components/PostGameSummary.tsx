import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

interface PostGameSummaryProps {
  score: number;
  onPlayAgain: () => void;
}

const PostGameSummary: React.FC<PostGameSummaryProps> = ({ score, onPlayAgain }) => {
  const { gameState } = useApp();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center"
    >
      <h2 className="text-3xl font-bold text-text-primary mb-4">Game Over!</h2>
      <p className="text-xl text-text-secondary mb-2">Today's Score: {score}</p>
      <p className="text-xl text-text-secondary mb-2">🔥 Streak: Day {gameState.streak}</p>
      <p className="text-xl text-text-secondary mb-8">Total Eco Points: {gameState.ecoPoints}</p>

      {gameState.rewards.length > 0 && (
        <div className="bg-green-100 p-4 rounded-lg mb-8">
          <h3 className="text-xl font-bold text-green-700">🎉 Congrats! You unlocked a reward!</h3>
          <p className="text-green-600">{gameState.rewards[gameState.rewards.length - 1].description}</p>
        </div>
      )}

      <div className="flex justify-center space-x-4">
        <button onClick={onPlayAgain} className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-button-hover transition-colors">Play Again</button>
        <Link to="/dashboard" className="bg-card text-text-primary px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-200 transition-colors">Back to Dashboard</Link>
        <Link to="/rewards" className="bg-card text-text-primary px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-200 transition-colors">View Rewards</Link>
      </div>
    </motion.div>
  );
};

export default PostGameSummary;
