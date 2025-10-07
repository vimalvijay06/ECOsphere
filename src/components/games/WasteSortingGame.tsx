import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Recycle, CheckCircle, X, RotateCcw, Trophy } from 'lucide-react';

interface WasteItem {
  id: number;
  name: string;
  type: 'recyclable' | 'organic' | 'hazardous' | 'general';
  emoji: string;
}

interface Bin {
  type: 'recyclable' | 'organic' | 'hazardous' | 'general';
  name: string;
  color: string;
  emoji: string;
}

const WasteSortingGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentItem, setCurrentItem] = useState<WasteItem | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [streak, setStreak] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const wasteItems: WasteItem[] = [
    { id: 1, name: 'Plastic Bottle', type: 'recyclable', emoji: '🍼' },
    { id: 2, name: 'Apple Core', type: 'organic', emoji: '🍎' },
    { id: 3, name: 'Battery', type: 'hazardous', emoji: '🔋' },
    { id: 4, name: 'Tissue Paper', type: 'general', emoji: '🧻' },
    { id: 5, name: 'Glass Jar', type: 'recyclable', emoji: '🫙' },
    { id: 6, name: 'Banana Peel', type: 'organic', emoji: '🍌' },
    { id: 7, name: 'Paint Can', type: 'hazardous', emoji: '🎨' },
    { id: 8, name: 'Candy Wrapper', type: 'general', emoji: '🍬' },
    { id: 9, name: 'Aluminum Can', type: 'recyclable', emoji: '🥤' },
    { id: 10, name: 'Coffee Grounds', type: 'organic', emoji: '☕' },
    { id: 11, name: 'Light Bulb', type: 'hazardous', emoji: '💡' },
    { id: 12, name: 'Pizza Box', type: 'general', emoji: '📦' },
    { id: 13, name: 'Newspaper', type: 'recyclable', emoji: '📰' },
    { id: 14, name: 'Orange Peel', type: 'organic', emoji: '🍊' },
    { id: 15, name: 'Cleaning Spray', type: 'hazardous', emoji: '🧴' }
  ];

  const bins: Bin[] = [
    { type: 'recyclable', name: 'Recyclable', color: 'bg-blue-500', emoji: '♻️' },
    { type: 'organic', name: 'Organic', color: 'bg-green-500', emoji: '🌱' },
    { type: 'hazardous', name: 'Hazardous', color: 'bg-red-500', emoji: '☢️' },
    { type: 'general', name: 'General', color: 'bg-gray-500', emoji: '🗑️' }
  ];

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver, gameStarted]);

  useEffect(() => {
    if (gameStarted && !gameOver) {
      generateNewItem();
    }
  }, [gameStarted]);

  const generateNewItem = () => {
    const randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)];
    setCurrentItem(randomItem);
  };

  const handleBinClick = (binType: string) => {
    if (!currentItem || gameOver) return;

    if (currentItem.type === binType) {
      // Correct sorting
      const points = 10 + (streak * 2);
      setScore(score + points);
      setStreak(streak + 1);
      generateNewItem();
    } else {
      // Wrong sorting
      setLives(lives - 1);
      setStreak(0);
      if (lives <= 1) {
        setGameOver(true);
      } else {
        generateNewItem();
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setLives(3);
    setTimeLeft(60);
    setStreak(0);
    setGameOver(false);
    generateNewItem();
  };

  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setLives(3);
    setTimeLeft(60);
    setStreak(0);
    setGameOver(false);
    setCurrentItem(null);
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-6xl mb-4">♻️</div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Waste Sorting Master
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Sort different types of waste into the correct bins as fast as possible! 
            You have 60 seconds and 3 lives. Get bonus points for consecutive correct sorts!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {bins.map(bin => (
              <div key={bin.type} className={`${bin.color} text-white p-4 rounded-lg`}>
                <div className="text-2xl mb-2">{bin.emoji}</div>
                <div className="font-semibold">{bin.name}</div>
              </div>
            ))}
          </div>
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Game Over!
          </h1>
          <div className="text-2xl font-bold text-blue-600 mb-4">
            Final Score: {score} points
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">{score}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Points Earned</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">{Math.floor(score / 10)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Items Sorted</div>
            </div>
          </div>
          <div className="space-x-4">
            <button
              onClick={startGame}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Play Again
            </button>
            <button
              onClick={resetGame}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Game Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{lives}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Lives</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{streak}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Streak</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{timeLeft}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
          </div>
        </div>
      </div>

      {/* Current Item */}
      {currentItem && (
        <motion.div
          key={currentItem.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6 text-center"
        >
          <div className="text-8xl mb-4">{currentItem.emoji}</div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
            {currentItem.name}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Where should this item go?
          </p>
        </motion.div>
      )}

      {/* Bins */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {bins.map(bin => (
          <motion.button
            key={bin.type}
            onClick={() => handleBinClick(bin.type)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`${bin.color} text-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all`}
          >
            <div className="text-4xl mb-2">{bin.emoji}</div>
            <div className="font-semibold text-lg">{bin.name}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default WasteSortingGame;
