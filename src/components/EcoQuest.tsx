import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import PostGameSummary from './PostGameSummary';
import { Recycle, Leaf, Trash2 } from 'lucide-react';

const items = [
  { id: '1', content: 'Plastic Bottle', type: 'recycling', icon: '🍾' },
  { id: '2', content: 'Apple Core', type: 'compost', icon: '🍎' },
  { id: '3', content: 'Newspaper', type: 'recycling', icon: '📰' },
  { id: '4', content: 'Food Wrappers', type: 'trash', icon: '🍫' },
  { id: '5', content: 'Glass Jar', type: 'recycling', icon: '🍯' },
  { id: '6', content: 'Banana Peel', type: 'compost', icon: '🍌' },
];

const EcoQuest: React.FC = () => {
  const { playGame } = useApp();
  const [score, setScore] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isGameActive, setIsGameActive] = useState(true);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    if (feedback) return; // Prevent multiple clicks

    const isCorrect = items[currentItemIndex].type === answer;
    setSelectedAnswer(answer);

    if (isCorrect) {
      setScore(prev => prev + 10);
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedAnswer(null);
      if (currentItemIndex < items.length - 1) {
        setCurrentItemIndex(prev => prev + 1);
      } else {
        setIsGameActive(false);
        playGame(score + (isCorrect ? 10 : 0));
      }
    }, 1000);
  };

  const handlePlayAgain = () => {
    setScore(0);
    setCurrentItemIndex(0);
    setIsGameActive(true);
  };

  if (!isGameActive) {
    return <PostGameSummary score={score} onPlayAgain={handlePlayAgain} />;
  }

  const progress = ((currentItemIndex + 1) / items.length) * 100;

  return (
    <div className="bg-card p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-text-primary">Recycling Sorter</h2>
        <div>
          <span className="font-semibold">Score: {score}</span>
          <button onClick={handlePlayAgain} className="ml-4 text-sm text-text-secondary hover:underline">Reset</button>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <motion.div
          className="bg-primary h-2.5 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
        />
      </div>
      <div className="text-right text-sm text-text-secondary mb-8">{currentItemIndex + 1}/{items.length}</div>

      <div className="text-center">
        <div className="text-6xl mb-4">{items[currentItemIndex].icon}</div>
        <h3 className="text-2xl font-bold text-text-primary">{items[currentItemIndex].content}</h3>
        <p className="text-text-secondary mb-8">Where does this belong?</p>
        <div className="grid grid-cols-3 gap-4">
          <button onClick={() => handleAnswer('recycling')} className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
            selectedAnswer === 'recycling' && feedback === 'correct' ? 'bg-green-100 border-green-500' :
            selectedAnswer === 'recycling' && feedback === 'incorrect' ? 'bg-red-100 border-red-500' :
            'hover:bg-gray-100'
          }`}>
            <Recycle className="w-8 h-8 text-blue-500 mb-2" />
            <span>Recycle</span>
          </button>
          <button onClick={() => handleAnswer('compost')} className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
            selectedAnswer === 'compost' && feedback === 'correct' ? 'bg-green-100 border-green-500' :
            selectedAnswer === 'compost' && feedback === 'incorrect' ? 'bg-red-100 border-red-500' :
            'hover:bg-gray-100'
          }`}>
            <Leaf className="w-8 h-8 text-green-500 mb-2" />
            <span>Compost</span>
          </button>
          <button onClick={() => handleAnswer('trash')} className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
            selectedAnswer === 'trash' && feedback === 'correct' ? 'bg-green-100 border-green-500' :
            selectedAnswer === 'trash' && feedback === 'incorrect' ? 'bg-red-100 border-red-500' :
            'hover:bg-gray-100'
          }`}>
            <Trash2 className="w-8 h-8 text-gray-500 mb-2" />
            <span>Trash</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EcoQuest;
