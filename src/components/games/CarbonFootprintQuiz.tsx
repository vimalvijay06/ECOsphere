import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, CheckCircle, X, RotateCcw, Trophy, Clock } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: 'transport' | 'energy' | 'food' | 'waste' | 'general';
}

const CarbonFootprintQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameStarted, setGameStarted] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Which transportation method has the lowest carbon footprint per kilometer?",
      options: ["Car", "Bus", "Train", "Bicycle"],
      correctAnswer: 3,
      explanation: "Bicycles produce zero direct emissions and have the lowest carbon footprint per kilometer traveled.",
      category: 'transport'
    },
    {
      id: 2,
      question: "What percentage of global greenhouse gas emissions come from food production?",
      options: ["10%", "14%", "26%", "35%"],
      correctAnswer: 2,
      explanation: "Food production accounts for approximately 26% of global greenhouse gas emissions, including agriculture, land use, and food processing.",
      category: 'food'
    },
    {
      id: 3,
      question: "Which energy source produces the least CO2 emissions?",
      options: ["Natural Gas", "Solar Power", "Coal", "Nuclear Power"],
      correctAnswer: 1,
      explanation: "Solar power produces virtually no CO2 emissions during operation, making it one of the cleanest energy sources.",
      category: 'energy'
    },
    {
      id: 4,
      question: "How much CO2 can recycling one aluminum can save compared to making a new one?",
      options: ["25%", "50%", "75%", "95%"],
      correctAnswer: 3,
      explanation: "Recycling aluminum cans saves about 95% of the energy and CO2 emissions compared to producing new cans from raw materials.",
      category: 'waste'
    },
    {
      id: 5,
      question: "What is the average carbon footprint of a person in developed countries per year?",
      options: ["2 tons CO2", "5 tons CO2", "10 tons CO2", "16 tons CO2"],
      correctAnswer: 3,
      explanation: "The average person in developed countries produces about 10-16 tons of CO2 per year, well above the sustainable target of 2.3 tons.",
      category: 'general'
    },
    {
      id: 6,
      question: "Which diet has the lowest carbon footprint?",
      options: ["Omnivore", "Pescatarian", "Vegetarian", "Vegan"],
      correctAnswer: 3,
      explanation: "A vegan diet typically has the lowest carbon footprint, producing about 50% fewer emissions than an omnivorous diet.",
      category: 'food'
    },
    {
      id: 7,
      question: "How much can LED bulbs reduce energy consumption compared to incandescent bulbs?",
      options: ["25%", "50%", "75%", "90%"],
      correctAnswer: 3,
      explanation: "LED bulbs use about 75-80% less energy than traditional incandescent bulbs and last much longer.",
      category: 'energy'
    },
    {
      id: 8,
      question: "What is the most effective way to reduce your transportation carbon footprint?",
      options: ["Drive slower", "Use public transport", "Work from home", "Buy an electric car"],
      correctAnswer: 2,
      explanation: "Working from home eliminates commuting entirely, making it the most effective way to reduce transportation emissions.",
      category: 'transport'
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    if (gameStarted && timeLeft > 0 && !showExplanation && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showExplanation) {
      handleTimeUp();
    }
  }, [timeLeft, showExplanation, gameOver, gameStarted]);

  const handleTimeUp = () => {
    setSelectedAnswer(null);
    setShowExplanation(true);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === currentQuestion.correctAnswer) {
      const timeBonus = Math.max(0, timeLeft - 5);
      setScore(score + 10 + timeBonus);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setTimeLeft(15);
    } else {
      setGameOver(true);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setGameOver(false);
    setTimeLeft(15);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowExplanation(false);
    setGameOver(false);
    setTimeLeft(15);
  };

  const getScoreRating = (finalScore: number) => {
    const maxScore = questions.length * 20; // 10 base + 10 max time bonus
    const percentage = (finalScore / maxScore) * 100;
    
    if (percentage >= 90) return { rating: "Eco Expert! 🌟", color: "text-green-600" };
    if (percentage >= 75) return { rating: "Sustainability Star! ⭐", color: "text-blue-600" };
    if (percentage >= 60) return { rating: "Eco Warrior! 🌱", color: "text-yellow-600" };
    if (percentage >= 40) return { rating: "Getting Greener! 🌿", color: "text-orange-600" };
    return { rating: "Keep Learning! 📚", color: "text-red-600" };
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="text-6xl mb-4">🌍</div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Carbon Footprint Quiz
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Test your knowledge about carbon emissions and learn how to reduce your environmental impact! 
            You have 15 seconds per question. Get bonus points for quick answers!
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6 max-w-md mx-auto">
            <div className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Quiz Info</div>
            <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <div>• {questions.length} questions</div>
              <div>• 15 seconds per question</div>
              <div>• 10 points + time bonus per correct answer</div>
              <div>• Learn about sustainability!</div>
            </div>
          </div>
          <button
            onClick={startGame}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Start Quiz
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
            Quiz Complete!
          </h1>
          <div className="text-2xl font-bold text-yellow-600 mb-2">
            Final Score: {score} points
          </div>
          <div className={`text-xl font-semibold mb-6 ${scoreRating.color}`}>
            {scoreRating.rating}
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">{score}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Points</div>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-lg font-semibold text-gray-800 dark:text-white">
                {questions.filter((_, index) => index < currentQuestionIndex).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Questions Answered</div>
            </div>
          </div>
          <div className="space-x-4">
            <button
              onClick={startGame}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Try Again
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
      {/* Quiz Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{score}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {currentQuestionIndex + 1}/{questions.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Question</div>
            </div>
          </div>
          <div className="text-center">
            <div className={`text-3xl font-bold ${timeLeft <= 5 ? 'text-red-600' : 'text-green-600'}`}>
              {timeLeft}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Seconds</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
          <div
            className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-6"
      >
        <div className="text-center mb-6">
          <div className="text-4xl mb-4">
            {currentQuestion.category === 'transport' && '🚗'}
            {currentQuestion.category === 'energy' && '⚡'}
            {currentQuestion.category === 'food' && '🍽️'}
            {currentQuestion.category === 'waste' && '♻️'}
            {currentQuestion.category === 'general' && '🌍'}
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            {currentQuestion.question}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              whileHover={!showExplanation ? { scale: 1.02 } : {}}
              whileTap={!showExplanation ? { scale: 0.98 } : {}}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                showExplanation
                  ? index === currentQuestion.correctAnswer
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : selectedAnswer === index
                    ? 'bg-red-100 border-red-500 text-red-800'
                    : 'bg-gray-100 border-gray-300 text-gray-600'
                  : selectedAnswer === index
                  ? 'bg-blue-100 border-blue-500 text-blue-800'
                  : 'bg-gray-50 border-gray-300 text-gray-800 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showExplanation && index === currentQuestion.correctAnswer && (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                )}
                {showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                  <X className="w-5 h-5 text-red-600" />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
          >
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Explanation:
            </h3>
            <p className="text-blue-700 dark:text-blue-300">
              {currentQuestion.explanation}
            </p>
            <div className="mt-4 text-center">
              <button
                onClick={handleNextQuestion}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CarbonFootprintQuiz;
