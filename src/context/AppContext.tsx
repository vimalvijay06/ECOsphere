import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for shared data
interface Challenge {
  id: number;
  title: string;
  description: string;
  category: 'Energy' | 'Water' | 'Waste' | 'Transportation' | 'Food';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: number;
  points: number;
  participants: number;
  maxParticipants?: number;
  startDate: string;
  endDate: string;
  deadline?: string;
  location?: string;
  isActive: boolean;
  isJoined?: boolean;
  progress?: number;
  status: 'upcoming' | 'active' | 'completed';
  image?: string;
}

interface Reward {
  id: number;
  name: string;
  description: string;
  type: 'coupon' | 'badge';
}

interface GameState {
  streak: number;
  lastPlayedDate: string | null;
  ecoPoints: number;
  rewards: Reward[];
}

interface Community {
  id: number;
  name: string;
  description: string;
  members: number;
  isJoined?: boolean;
}

interface AnalyticsData {
  totalUsers: number;
  activeChallenges: number;
  totalPointsDistributed: number;
  avgSustainabilityScore: number;
  energySaved: number;
  waterSaved: number;
  wasteReduced: number;
  treesEquivalent: number;
  co2Reduced: number;
  topCategories: { category: string; participants: number }[];
  monthlyGrowth: { month: string; users: number; challenges: number }[];
}

interface MiniGame {
  id: number;
  name: string;
  description: string;
  category: 'Educational' | 'Action' | 'Puzzle' | 'Strategy';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  estimatedTime: number;
  status: 'active' | 'inactive';
  image?: string;
}

// Define context type
interface AppContextType {
  challenges: Challenge[];
  analytics: AnalyticsData;
  joinChallenge: (challengeId: number) => void;
  updateAnalytics: () => void;
  communities: Community[];
  createCommunity: (name: string, description: string) => void;
  gameState: GameState;
  playGame: (score: number) => void;
  miniGames: MiniGame[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Initial mock data
const initialChallenges: Challenge[] = [
    {
        id: 1, title: 'No Car Week', description: 'Commit to using public transport, walking, or cycling for one week.', category: 'Transportation', difficulty: 'Medium', duration: 7, points: 150, participants: 45, maxParticipants: 100, startDate: '2024-01-20', endDate: '2024-01-27', location: 'Campus-wide', isActive: true, status: 'active', progress: 60
    },
    {
        id: 2, title: 'Energy Saver Challenge', description: 'Reduce your daily energy consumption by 20%.', category: 'Energy', difficulty: 'Easy', duration: 5, points: 100, participants: 78, startDate: '2024-01-25', endDate: '2024-01-30', isActive: true, status: 'active', progress: 80
    },
    {
        id: 3, title: 'Zero Waste Month', description: 'Go the entire month without producing any landfill waste.', category: 'Waste', difficulty: 'Hard', duration: 30, points: 300, participants: 12, maxParticipants: 50, startDate: '2024-02-01', endDate: '2024-02-29', isActive: false, status: 'upcoming'
    },
    {
        id: 4, title: 'Water Conservation Week', description: 'Track and reduce your daily water usage.', category: 'Water', difficulty: 'Medium', duration: 7, points: 120, participants: 34, startDate: '2024-01-15', endDate: '2024-01-22', isActive: true, status: 'completed', progress: 100, isJoined: true
    }
];

const initialGameState: GameState = {
  streak: 0,
  lastPlayedDate: null,
  ecoPoints: 1200,
  rewards: [],
};

const initialCommunities: Community[] = [
  { id: 1, name: 'Eco Warriors', description: 'A group for passionate environmentalists.', members: 120, isJoined: true },
  { id: 2, name: 'Campus Gardeners', description: 'Cultivating green spaces on campus.', members: 75 },
  { id: 3, name: 'Recycling Rangers', description: 'Dedicated to improving campus recycling efforts.', members: 90 },
];

const initialAnalytics: AnalyticsData = {
  totalUsers: 1247,
  activeChallenges: 2,
  totalPointsDistributed: 45680,
  avgSustainabilityScore: 78.5,
  energySaved: 245.6,
  waterSaved: 890.2,
  wasteReduced: 67.8,
  treesEquivalent: 12.5,
  co2Reduced: 156.3,
  topCategories: [
    { category: 'Energy', participants: 234 },
    { category: 'Waste', participants: 189 },
    { category: 'Water', participants: 156 },
    { category: 'Transportation', participants: 98 }
  ],
  monthlyGrowth: [
    { month: 'Jan', users: 1247, challenges: 8 },
    { month: 'Dec', users: 1189, challenges: 6 },
    { month: 'Nov', users: 1056, challenges: 5 },
    { month: 'Oct', users: 934, challenges: 4 }
  ]
};

const initialMiniGames: MiniGame[] = [
  {
    id: 1,
    name: 'Waste Sorting Challenge',
    description: 'Sort waste items into the correct bins as quickly as possible.',
    category: 'Educational',
    difficulty: 'Easy',
    points: 50,
    estimatedTime: 3,
    status: 'active',
    image: '/games/waste-sorting.png',
  },
  {
    id: 2,
    name: 'Eco-Quiz',
    description: 'Test your knowledge on various sustainability topics.',
    category: 'Puzzle',
    difficulty: 'Medium',
    points: 75,
    estimatedTime: 5,
    status: 'active',
    image: '/games/eco-quiz.png',
  },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [challenges, setChallenges] = useState<Challenge[]>(initialChallenges);
  const [analytics, setAnalytics] = useState<AnalyticsData>(initialAnalytics);
  const [communities, setCommunities] = useState<Community[]>(initialCommunities);
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [miniGames, setMiniGames] = useState<MiniGame[]>(initialMiniGames);

  const joinChallenge = (challengeId: number) => {
    setChallenges(prev =>
      prev.map(c =>
        c.id === challengeId && !c.isJoined
          ? { ...c, isJoined: true, participants: c.participants + 1 }
          : c
      )
    );
  };

  const updateAnalytics = () => {
    setAnalytics(prev => ({
      ...prev,
      totalUsers: prev.totalUsers + Math.floor(Math.random() * 2),
    }));
  };

  const createCommunity = (name: string, description: string) => {
    const newCommunity: Community = {
      id: Date.now(),
      name,
      description,
      members: 1,
      isJoined: true,
    };
    setCommunities(prev => [newCommunity, ...prev]);
  };

  const playGame = (score: number) => {
    setGameState(prev => {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      const newStreak = prev.lastPlayedDate === yesterday ? prev.streak + 1 : 1;
      const newEcoPoints = prev.ecoPoints + score;
      const newRewards = [...prev.rewards];

      if ([3, 5, 10].includes(newStreak)) {
        newRewards.push({
          id: Date.now(),
          name: `Streak Reward: Day ${newStreak}`,
          description: newStreak === 3 ? '10% off at Green Café' : newStreak === 5 ? 'Free eco tote bag' : 'Plant a tree in your name',
          type: 'coupon',
        });
      }

      return {
        streak: newStreak,
        lastPlayedDate: today,
        ecoPoints: newEcoPoints,
        rewards: newRewards,
      };
    });
  };

  const value = {
    challenges,
    analytics,
    joinChallenge,
    updateAnalytics,
    communities,
    createCommunity,
    gameState,
    playGame,
    miniGames,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
