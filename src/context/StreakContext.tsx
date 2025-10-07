import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Friend {
  id: string;
  name: string;
  avatar?: string;
  department: string;
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  level: number;
  points: number;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  friends: Friend[];
  todayCompleted: boolean;
  streakRewards: {
    level: number;
    reward: string;
    unlocked: boolean;
  }[];
}

interface StreakContextType {
  streakData: StreakData;
  markActivityComplete: (activityType: string) => void;
  getStreakBadge: (streak: number) => string;
  getStreakColor: (streak: number) => string;
  isStreakActive: (friendId: string) => boolean;
}

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export const useStreak = () => {
  const context = useContext(StreakContext);
  if (context === undefined) {
    throw new Error('useStreak must be used within a StreakProvider');
  }
  return context;
};

interface StreakProviderProps {
  children: ReactNode;
}

export const StreakProvider: React.FC<StreakProviderProps> = ({ children }) => {
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 7,
    longestStreak: 15,
    todayCompleted: false,
    friends: [
      {
        id: '1',
        name: 'Sarah Chen',
        department: 'Computer Science',
        currentStreak: 12,
        longestStreak: 18,
        lastActivityDate: '2024-01-15',
        level: 8,
        points: 1250
      },
      {
        id: '2',
        name: 'Alex Rodriguez',
        department: 'Environmental Science',
        currentStreak: 5,
        longestStreak: 12,
        lastActivityDate: '2024-01-15',
        level: 6,
        points: 890
      },
      {
        id: '3',
        name: 'Emma Thompson',
        department: 'Business',
        currentStreak: 8,
        longestStreak: 14,
        lastActivityDate: '2024-01-14',
        level: 7,
        points: 1100
      }
    ],
    streakRewards: [
      { level: 3, reward: 'Eco Badge', unlocked: true },
      { level: 7, reward: 'Bonus Points (50)', unlocked: true },
      { level: 14, reward: 'Exclusive T-Shirt', unlocked: false },
      { level: 30, reward: 'Campus Store Voucher', unlocked: false },
      { level: 50, reward: 'Sustainability Certificate', unlocked: false }
    ]
  });

  // Check if today is completed on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const lastActivity = localStorage.getItem('lastActivityDate');
    if (lastActivity === today) {
      setStreakData(prev => ({ ...prev, todayCompleted: true }));
    }
  }, []);

  const markActivityComplete = (activityType: string) => {
    const today = new Date().toDateString();

    setStreakData(prev => {
      const newStreak = prev.todayCompleted ? prev.currentStreak : prev.currentStreak + 1;
      const newLongestStreak = Math.max(newStreak, prev.longestStreak);

      // Update friends' streaks (simulate activity)
      const updatedFriends = prev.friends.map(friend => ({
        ...friend,
        currentStreak: Math.floor(Math.random() * 20) + 1,
        lastActivityDate: today
      }));

      const updatedData = {
        ...prev,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        todayCompleted: true,
        friends: updatedFriends
      };

      localStorage.setItem('lastActivityDate', today);
      localStorage.setItem('streakData', JSON.stringify(updatedData));

      return updatedData;
    });
  };

  const getStreakBadge = (streak: number): string => {
    if (streak >= 50) return '🔥 Legend';
    if (streak >= 30) return '⭐ Champion';
    if (streak >= 14) return '🏆 Veteran';
    if (streak >= 7) return '🌟 Dedicated';
    if (streak >= 3) return '💚 Consistent';
    return '🌱 Getting Started';
  };

  const getStreakColor = (streak: number): string => {
    if (streak >= 50) return 'text-purple-600 dark:text-purple-400';
    if (streak >= 30) return 'text-yellow-600 dark:text-yellow-400';
    if (streak >= 14) return 'text-orange-600 dark:text-orange-400';
    if (streak >= 7) return 'text-green-600 dark:text-green-400';
    if (streak >= 3) return 'text-blue-600 dark:text-blue-400';
    return 'text-gray-600 dark:text-gray-400';
  };

  const isStreakActive = (friendId: string): boolean => {
    const friend = streakData.friends.find(f => f.id === friendId);
    if (!friend) return false;

    const today = new Date();
    const lastActivity = new Date(friend.lastActivityDate);
    const diffTime = Math.abs(today.getTime() - lastActivity.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays <= 1; // Active if participated today or yesterday
  };

  return (
    <StreakContext.Provider value={{
      streakData,
      markActivityComplete,
      getStreakBadge,
      getStreakColor,
      isStreakActive
    }}>
      {children}
    </StreakContext.Provider>
  );
};
