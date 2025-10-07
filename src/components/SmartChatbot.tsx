import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Lightbulb, HelpCircle, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface SmartChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const SmartChatbot: React.FC<SmartChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hi! I\'m your Eco Assistant. I can help you with sustainability tips, challenge guidance, and answer questions about the Campus Sustainability Dashboard. What would you like to know?',
      timestamp: new Date(),
      suggestions: [
        'How do I join a challenge?',
        'What are streak rewards?',
        'Show me energy saving tips',
        'How to track my progress?'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content?: string) => {
    const messageContent = content || inputValue.trim();
    if (!messageContent) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: messageContent,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(messageContent);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();

    let response = '';
    let suggestions: string[] = [];

    if (input.includes('challenge') || input.includes('join')) {
      response = 'To join a challenge, go to the Challenges page and click "Join Challenge" on any active challenge. You can filter by category, difficulty, and status to find challenges that interest you!';
      suggestions = ['How do points work?', 'What are streak rewards?', 'Show me current challenges'];
    } else if (input.includes('streak') || input.includes('reward')) {
      response = 'Streaks are daily participation chains! Complete at least one sustainability activity each day to maintain your streak. Rewards unlock at 3, 7, 14, 30, and 50 days. Friend circles can also earn group streak rewards!';
      suggestions = ['How to maintain streaks?', 'What are group rewards?', 'Show my current streak'];
    } else if (input.includes('energy') || input.includes('tip')) {
      response = 'Great question! Here are some energy-saving tips: 1) Unplug chargers when not in use, 2) Use LED bulbs, 3) Turn off lights when leaving rooms, 4) Use natural light during the day. Each tip can save you points!';
      suggestions = ['Water saving tips', 'Waste reduction tips', 'Transportation tips'];
    } else if (input.includes('point') || input.includes('score')) {
      response = 'Points are earned by completing challenges, maintaining streaks, and participating in sustainability activities. Higher difficulty challenges give more points. You can redeem points in the Rewards store!';
      suggestions = ['How to earn more points?', 'What are badges?', 'Show rewards store'];
    } else if (input.includes('badge') || input.includes('achievement')) {
      response = 'Badges are earned for reaching milestones like completing challenges, maintaining long streaks, or achieving specific sustainability goals. They appear on your profile and show your eco-expertise!';
      suggestions = ['How to get more badges?', 'Show my badges', 'What badges exist?'];
    } else {
      response = 'I\'m here to help with your sustainability journey! You can ask me about challenges, streaks, rewards, tips, or any other questions about the Campus Sustainability Dashboard.';
      suggestions = ['How do I join a challenge?', 'What are streak rewards?', 'Show me energy saving tips'];
    }

    return {
      id: (Date.now() + 1).toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      suggestions
    };
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        onClick={onClose}
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 20 }}
      className="fixed bottom-6 right-6 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-white">Eco Assistant</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              <div className={`flex items-start space-x-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user'
                    ? 'bg-blue-500'
                    : 'bg-green-500'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                <div className={`p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white'
                }`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>

              {/* Suggestions */}
              {message.suggestions && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="px-2 py-1 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 text-xs rounded-full hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex space-x-1">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="w-2 h-2 bg-gray-500 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                  className="w-2 h-2 bg-gray-500 rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-gray-500 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask me anything about sustainability..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim()}
            className={`p-2 rounded-lg transition-colors ${
              inputValue.trim()
                ? 'bg-green-500 hover:bg-green-600 text-white'
                : 'bg-gray-200 dark:bg-gray-600 text-gray-400 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SmartChatbot;
