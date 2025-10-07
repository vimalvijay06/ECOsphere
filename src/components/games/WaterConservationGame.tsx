import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Droplets, AlertTriangle, CheckCircle, RotateCcw, Trophy } from 'lucide-react';

interface WaterSource {
  id: number;
  name: string;
  capacity: number;
  currentLevel: number;
  refillRate: number;
  emoji: string;
}

interface WaterConsumer {
  id: number;
  name: string;
  demand: number;
  priority: 'high' | 'medium' | 'low';
  satisfied: boolean;
  emoji: string;
}

const WaterConservationGame: React.FC = () => {
  const [score, setScore] = useState(0);
  const [waterLevel, setWaterLevel] = useState(1000);
  const [maxWater, setMaxWater] = useState(1000);
  const [day, setDay] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [message, setMessage] = useState('');
  const [conservationActions, setConservationActions] = useState(0);

  const [waterSources, setWaterSources] = useState<WaterSource[]>([
    { id: 1, name: 'Rainwater Tank', capacity: 500, currentLevel: 300, refillRate: 50, emoji: '🌧️' },
    { id: 2, name: 'Well', capacity: 300, currentLevel: 200, refillRate: 20, emoji: '🕳️' },
    { id: 3, name: 'River', capacity: 400, currentLevel: 250, refillRate: 30, emoji: '🏞️' }
  ]);

  const [waterConsumers, setWaterConsumers] = useState<WaterConsumer[]>([
    { id: 1, name: 'Drinking Water', demand: 50, priority: 'high', satisfied: false, emoji: '🚰' },
    { id: 2, name: 'Cooking', demand: 30, priority: 'high', satisfied: false, emoji: '🍳' },
    { id: 3, name: 'Hygiene', demand: 40, priority: 'high', satisfied: false, emoji: '🚿' },
    { id: 4, name: 'Laundry', demand: 60, priority: 'medium', satisfied: false, emoji: '👕' },
    { id: 5, name: 'Garden', demand: 80, priority: 'low', satisfied: false, emoji: '🌱' },
    { id: 6, name: 'Car Wash', demand: 45, priority: 'low', satisfied: false, emoji: '🚗' }
  ]);

  const conservationOptions = [
    { id: 1, name: 'Fix Leaky Faucet', waterSaved: 20, cost: 10, emoji: '🔧' },
    { id: 2, name: 'Install Low-Flow Showerhead', waterSaved: 15, cost: 15, emoji: '🚿' },
    { id: 3, name: 'Use Greywater System', waterSaved: 25, cost: 20, emoji: '♻️' },
    { id: 4, name: 'Collect Rainwater', waterSaved: 30, cost: 25, emoji: '🌧️' },
    { id: 5, name: 'Drought-Resistant Plants', waterSaved: 35, cost: 30, emoji: '🌵' }
  ];

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const timer = setInterval(() => {
        simulateDay();
      }, 3000); // Each day lasts 3 seconds
      return () => clearInterval(timer);
    }
  }, [gameStarted, gameOver, day]);

  const simulateDay = () => {
    // Refill water sources
    setWaterSources(prev => prev.map(source => ({
      ...source,
      currentLevel: Math.min(source.capacity, source.currentLevel + source.refillRate)
    })));

    // Calculate total available water
    const totalAvailable = waterSources.reduce((sum, source) => sum + source.currentLevel, 0);
    
    // Calculate total demand
    const totalDemand = waterConsumers.reduce((sum, consumer) => sum + consumer.demand, 0);

    // Check if we can satisfy all demands
    if (totalAvailable >= totalDemand) {
      // Satisfy all consumers
      setWaterConsumers(prev => prev.map(consumer => ({ ...consumer, satisfied: true })));
      setWaterLevel(totalAvailable - totalDemand);
      setScore(prev => prev + 10);
      setMessage('✅ All water needs satisfied!');
    } else {
      // Prioritize high priority consumers
      let remainingWater = totalAvailable;
      const updatedConsumers = waterConsumers.map(consumer => {
        if (consumer.priority === 'high' && remainingWater >= consumer.demand) {
          remainingWater -= consumer.demand;
          return { ...consumer, satisfied: true };
        } else if (consumer.priority === 'medium' && remainingWater >= consumer.demand) {
          remainingWater -= consumer.demand;
          return { ...consumer, satisfied: true };
        } else if (consumer.priority === 'low' && remainingWater >= consumer.demand) {
          remainingWater -= consumer.demand;
          return { ...consumer, satisfied: true };
        }
        return { ...consumer, satisfied: false };
      });

      setWaterConsumers(updatedConsumers);
      setWaterLevel(remainingWater);

      // Check if critical needs are not met
      const unsatisfiedHigh = updatedConsumers.filter(c => c.priority === 'high' && !c.satisfied);
      if (unsatisfiedHigh.length > 0) {
        setMessage('❌ Critical water shortage!');
        setScore(prev => Math.max(0, prev - 20));
        if (day > 5) {
          setGameOver(true);
          return;
        }
      } else {
        setMessage('⚠️ Water shortage - some needs not met');
        setScore(prev => Math.max(0, prev - 5));
      }
    }

    setDay(prev => prev + 1);

    // Game ends after 15 days
    if (day >= 15) {
      setGameOver(true);
    }
  };

  const handleConservationAction = (action: typeof conservationOptions[0]) => {
    if (score >= action.cost) {
      setScore(prev => prev - action.cost);
      setConservationActions(prev => prev + 1);
      
      // Reduce overall water demand
      setWaterConsumers(prev => prev.map(consumer => ({
        ...consumer,
        demand: Math.max(10, consumer.demand - Math.floor(action.waterSaved / 6))
      })));

      setMessage(`🎉 ${action.name} implemented! Water demand reduced.`);
    } else {
      setMessage('❌ Not enough points for this action!');
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(100); // Starting points
    setWaterLevel(1000);
    setDay(1);
    setGameOver(false);
    setMessage('🌊 Welcome to Water Conservation Challenge!');
    setConservationActions(0);
  };

  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setWaterLevel(1000);
    setDay(1);
    setGameOver(false);
    setMessage('');
    setConservationActions(0);
    
    // Reset water sources and consumers to initial state
    setWaterSources([
      { id: 1, name: 'Rainwater Tank', capacity: 500, currentLevel: 300, refillRate: 50, emoji: '🌧️' },
      { id: 2, name: 'Well', capacity: 300, currentLevel: 200, refillRate: 20, emoji: '🕳️' },
      { id: 3, name: 'River', capacity: 400, currentLevel: 250, refillRate: 30, emoji: '🏞️' }
    ]);

    setWaterConsumers([
      { id: 1, name: 'Drinking Water', demand: 50, priority: 'high', satisfied: false, emoji: '🚰' },
      { id: 2, name: 'Cooking', demand: 30, priority: 'high', satisfied: false, emoji: '🍳' },
      { id: 3, name: 'Hygiene', demand: 40, priority: 'high', satisfied: false, emoji: '🚿' },
      { id: 4, name: 'Laundry', demand: 60, priority: 'medium', satisfied: false, emoji: '👕' },
      { id: 5, name: 'Garden', demand: 80, priority: 'low', satisfied: false, emoji: '🌱' },
      { id: 6, name: 'Car Wash', demand: 45, priority: 'low', satisfied: false, emoji: '🚗' }
    ]);
  };

  const getScoreRating = (finalScore: number) => {
    if (finalScore >= 200) return { rating: "Water Conservation Master! 💧", color: "text-blue-600" };
    if (finalScore >= 150) return { rating: "Sustainability Expert! 🌊", color: "text-cyan-600" };
    if (finalScore >= 100) return { rating: "Water Saver! 💙", color: "text-blue-500" };
    if (finalScore >= 50) return { rating: "Getting Better! 🌿", color: "text-green-600" };
    return { rating: "Keep Practicing! 📚", color: "text-orange-600" };
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-6xl mb-4">💧</div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Water Conservation Challenge
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Manage water resources efficiently and prevent waste in various scenarios. 
            Balance water supply and demand while implementing conservation measures!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 max-w-2xl mx-auto">
            <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <div className="font-semibold text-blue-800 dark:text-blue-200">Goal</div>
              <div className="text-sm text-blue-600 dark:text-blue-300">Survive 15 days</div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-semibold text-green-800 dark:text-green-200">Strategy</div>
              <div className="text-sm text-green-600 dark:text-green-300">Conserve water</div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/20 p-4 rounded-lg">
              <div className="text-2xl mb-2">🏆</div>
              <div className="font-semibold text-purple-800 dark:text-purple-200">Scoring</div>
              <div className="text-sm text-purple-600 dark:text-purple-300">Efficiency points</div>
            </div>
          </div>
          <button
            onClick={startGame}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Start Challenge
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    const scoreRating = getScoreRating(score);
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-6xl mb-4">🏆</div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Challenge Complete!
          </h1>
          <div className="text-2xl font-bold text-blue-600 mb-2">
            Final Score: {score} points
          </div>
          <div className={`text-xl font-semibold mb-6 ${scoreRating.color}`}>
            {scoreRating.rating}
          </div>
          <div className="grid grid-cols-3 gap-4 mb-6 max-w-lg mx-auto">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">{day - 1}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Days Survived</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">{conservationActions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Conservation Actions</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">{score}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Final Score</div>
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
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Game Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{score}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{day}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Day</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{conservationActions}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Actions</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-600">{waterLevel}L</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Water Available</div>
          </div>
        </div>
        
        {message && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-blue-800 dark:text-blue-200 text-center font-medium">{message}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
            <Droplets className="w-6 h-6 text-blue-500 mr-2" />
            Water Sources
          </h2>
          <div className="space-y-4">
            {waterSources.map(source => (
              <div key={source.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{source.emoji}</span>
                    <span className="font-semibold text-gray-800 dark:text-white">{source.name}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {source.currentLevel}L / {source.capacity}L
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(source.currentLevel / source.capacity) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Refill: +{source.refillRate}L/day
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Water Consumers */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Water Consumers
          </h2>
          <div className="space-y-3">
            {waterConsumers.map(consumer => (
              <div key={consumer.id} className={`border rounded-lg p-3 ${
                consumer.satisfied 
                  ? 'border-green-200 bg-green-50 dark:bg-green-900/20' 
                  : 'border-red-200 bg-red-50 dark:bg-red-900/20'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">{consumer.emoji}</span>
                    <div>
                      <span className="font-medium text-gray-800 dark:text-white">{consumer.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          consumer.priority === 'high' ? 'bg-red-100 text-red-700' :
                          consumer.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {consumer.priority}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {consumer.demand}L/day
                        </span>
                      </div>
                    </div>
                  </div>
                  {consumer.satisfied ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conservation Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Conservation Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {conservationOptions.map(action => (
            <motion.button
              key={action.id}
              onClick={() => handleConservationAction(action)}
              disabled={score < action.cost}
              whileHover={score >= action.cost ? { scale: 1.05 } : {}}
              whileTap={score >= action.cost ? { scale: 0.95 } : {}}
              className={`p-4 rounded-lg border-2 transition-all ${
                score >= action.cost
                  ? 'border-green-300 bg-green-50 hover:bg-green-100 text-green-800 cursor-pointer'
                  : 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}
            >
              <div className="text-2xl mb-2">{action.emoji}</div>
              <div className="font-semibold text-sm mb-1">{action.name}</div>
              <div className="text-xs">Cost: {action.cost} pts</div>
              <div className="text-xs">Saves: {action.waterSaved}L</div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterConservationGame;
