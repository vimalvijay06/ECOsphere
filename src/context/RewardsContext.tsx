import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Reward {
  id: number;
  name: string;
  description: string;
  type: 'coupon' | 'badge' | 'merchandise' | 'experience' | 'digital';
  pointsCost: number;
  category: 'food' | 'shopping' | 'entertainment' | 'education' | 'eco-products';
  availability: number;
  totalAvailable: number;
  expiryDate: string;
  image: string;
  provider: string;
  terms: string[];
  isLimited: boolean;
  isNew: boolean;
  discount?: string;
  status: 'available' | 'claimed' | 'expired' | 'locked';
}

export interface ClaimedReward {
  id: number;
  reward: Reward;
  claimedAt: string;
  code?: string;
  status: 'active' | 'used' | 'expired';
  expiresAt: string;
  usedAt?: string;
}

interface RewardsContextType {
  availableRewards: Reward[];
  claimedRewards: ClaimedReward[];
  redeemReward: (rewardId: number) => Promise<{ success: boolean; message: string; code?: string }>;
  useReward: (claimedRewardId: number) => Promise<{ success: boolean; message: string }>;
  getRewardHistory: () => ClaimedReward[];
  updateRewardAvailability: (rewardId: number, newAvailability: number) => void;
  addNewReward: (reward: Omit<Reward, 'id'>) => void;
  removeReward: (rewardId: number) => void;
}

const RewardsContext = createContext<RewardsContextType | undefined>(undefined);

export const useRewards = () => {
  const context = useContext(RewardsContext);
  if (!context) {
    throw new Error('useRewards must be used within a RewardsProvider');
  }
  return context;
};

export const RewardsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [availableRewards, setAvailableRewards] = useState<Reward[]>([
    {
      id: 1,
      name: 'Campus Café 20% Off',
      description: 'Get 20% off your next purchase at any campus café',
      type: 'coupon',
      pointsCost: 150,
      category: 'food',
      availability: 45,
      totalAvailable: 50,
      expiryDate: '2024-12-31',
      image: '/rewards/cafe-discount.jpg',
      provider: 'Campus Dining Services',
      terms: ['Valid for one-time use', 'Cannot be combined with other offers', 'Valid at all campus locations'],
      isLimited: true,
      isNew: false,
      discount: '20%',
      status: 'available'
    },
    {
      id: 2,
      name: 'Eco Warrior Badge',
      description: 'Exclusive digital badge for completing 10 sustainability challenges',
      type: 'badge',
      pointsCost: 500,
      category: 'education',
      availability: 100,
      totalAvailable: 100,
      expiryDate: '2024-12-31',
      image: '/rewards/eco-badge.png',
      provider: 'EcoSphere',
      terms: ['Digital badge displayed on profile', 'Permanent achievement', 'Unlocks special features'],
      isLimited: false,
      isNew: true,
      status: 'available'
    },
    {
      id: 3,
      name: 'Reusable Water Bottle',
      description: 'Premium stainless steel water bottle with campus logo',
      type: 'merchandise',
      pointsCost: 800,
      category: 'eco-products',
      availability: 12,
      totalAvailable: 25,
      expiryDate: '2024-06-30',
      image: '/rewards/water-bottle.jpg',
      provider: 'Campus Store',
      terms: ['Physical pickup required', 'Available in multiple colors', 'Limited edition design'],
      isLimited: true,
      isNew: true,
      status: 'available'
    },
    {
      id: 4,
      name: 'Movie Night Tickets',
      description: 'Two free tickets to campus movie night events',
      type: 'experience',
      pointsCost: 300,
      category: 'entertainment',
      availability: 8,
      totalAvailable: 20,
      expiryDate: '2024-05-31',
      image: '/rewards/movie-tickets.jpg',
      provider: 'Student Activities',
      terms: ['Valid for any movie night event', 'Must be used within 30 days', 'Non-transferable'],
      isLimited: true,
      isNew: false,
      status: 'available'
    },
    {
      id: 5,
      name: 'Sustainability Workshop Access',
      description: 'Free access to premium sustainability workshops and seminars',
      type: 'experience',
      pointsCost: 600,
      category: 'education',
      availability: 30,
      totalAvailable: 50,
      expiryDate: '2024-12-31',
      image: '/rewards/workshop.jpg',
      provider: 'Environmental Studies Dept',
      terms: ['Access to all workshops this semester', 'Certificate of completion included', 'Priority booking'],
      isLimited: false,
      isNew: false,
      status: 'available'
    },
    {
      id: 6,
      name: 'Green Transportation Pass',
      description: 'Free public transportation pass for one month',
      type: 'coupon',
      pointsCost: 400,
      category: 'eco-products',
      availability: 20,
      totalAvailable: 30,
      expiryDate: '2024-08-31',
      image: '/rewards/transport-pass.jpg',
      provider: 'City Transit Authority',
      terms: ['Valid for 30 days from activation', 'Covers all city buses and trains', 'Non-transferable'],
      isLimited: true,
      isNew: true,
      status: 'available'
    }
  ]);

  const [claimedRewards, setClaimedRewards] = useState<ClaimedReward[]>([
    {
      id: 1,
      reward: availableRewards[0],
      claimedAt: '2024-01-10T14:30:00Z',
      code: 'CAFE20-XYZ123',
      status: 'active',
      expiresAt: '2024-02-10T23:59:59Z'
    },
    {
      id: 2,
      reward: availableRewards[1],
      claimedAt: '2024-01-05T10:15:00Z',
      status: 'active',
      expiresAt: '2024-12-31T23:59:59Z'
    }
  ]);

  // Generate unique redemption code
  const generateRedemptionCode = (reward: Reward): string => {
    const prefix = reward.name.substring(0, 4).toUpperCase().replace(/\s/g, '');
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}-${timestamp}-${random}`;
  };

  // Calculate expiry date based on reward type
  const calculateExpiryDate = (reward: Reward): string => {
    const now = new Date();
    let expiryDate = new Date(now);

    switch (reward.type) {
      case 'coupon':
        expiryDate.setDate(now.getDate() + 30); // 30 days
        break;
      case 'experience':
        expiryDate.setDate(now.getDate() + 60); // 60 days
        break;
      case 'merchandise':
        expiryDate.setDate(now.getDate() + 14); // 14 days for pickup
        break;
      case 'badge':
      case 'digital':
        expiryDate.setFullYear(now.getFullYear() + 1); // 1 year
        break;
      default:
        expiryDate.setDate(now.getDate() + 30);
    }

    return expiryDate.toISOString();
  };

  const redeemReward = async (rewardId: number): Promise<{ success: boolean; message: string; code?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reward = availableRewards.find(r => r.id === rewardId);
        
        if (!reward) {
          resolve({ success: false, message: 'Reward not found' });
          return;
        }

        if (reward.availability <= 0) {
          resolve({ success: false, message: 'This reward is out of stock' });
          return;
        }

        if (reward.status !== 'available') {
          resolve({ success: false, message: 'This reward is not available for redemption' });
          return;
        }

        // Generate redemption code for applicable rewards
        const code = ['coupon', 'experience', 'merchandise'].includes(reward.type) 
          ? generateRedemptionCode(reward) 
          : undefined;

        // Create claimed reward
        const claimedReward: ClaimedReward = {
          id: Date.now(),
          reward: { ...reward },
          claimedAt: new Date().toISOString(),
          code,
          status: 'active',
          expiresAt: calculateExpiryDate(reward)
        };

        // Update availability
        setAvailableRewards(prev => 
          prev.map(r => 
            r.id === rewardId 
              ? { ...r, availability: r.availability - 1 }
              : r
          )
        );

        // Add to claimed rewards
        setClaimedRewards(prev => [...prev, claimedReward]);

        resolve({ 
          success: true, 
          message: `Successfully redeemed ${reward.name}!`,
          code 
        });
      }, 1000); // Simulate API delay
    });
  };

  const useReward = async (claimedRewardId: number): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const claimedReward = claimedRewards.find(r => r.id === claimedRewardId);
        
        if (!claimedReward) {
          resolve({ success: false, message: 'Claimed reward not found' });
          return;
        }

        if (claimedReward.status !== 'active') {
          resolve({ success: false, message: 'This reward has already been used or expired' });
          return;
        }

        // Check if expired
        if (new Date() > new Date(claimedReward.expiresAt)) {
          setClaimedRewards(prev =>
            prev.map(r =>
              r.id === claimedRewardId
                ? { ...r, status: 'expired' as const }
                : r
            )
          );
          resolve({ success: false, message: 'This reward has expired' });
          return;
        }

        // Mark as used
        setClaimedRewards(prev =>
          prev.map(r =>
            r.id === claimedRewardId
              ? { ...r, status: 'used' as const, usedAt: new Date().toISOString() }
              : r
          )
        );

        resolve({ 
          success: true, 
          message: `Successfully used ${claimedReward.reward.name}!` 
        });
      }, 500);
    });
  };

  const getRewardHistory = (): ClaimedReward[] => {
    return claimedRewards.sort((a, b) => 
      new Date(b.claimedAt).getTime() - new Date(a.claimedAt).getTime()
    );
  };

  const updateRewardAvailability = (rewardId: number, newAvailability: number) => {
    setAvailableRewards(prev =>
      prev.map(r =>
        r.id === rewardId
          ? { ...r, availability: Math.max(0, newAvailability) }
          : r
      )
    );
  };

  const addNewReward = (reward: Omit<Reward, 'id'>) => {
    const newReward: Reward = {
      ...reward,
      id: Date.now()
    };
    setAvailableRewards(prev => [...prev, newReward]);
  };

  const removeReward = (rewardId: number) => {
    setAvailableRewards(prev => prev.filter(r => r.id !== rewardId));
  };

  // Auto-expire rewards
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setClaimedRewards(prev =>
        prev.map(reward => {
          if (reward.status === 'active' && new Date(reward.expiresAt) < now) {
            return { ...reward, status: 'expired' as const };
          }
          return reward;
        })
      );
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  const value: RewardsContextType = {
    availableRewards,
    claimedRewards,
    redeemReward,
    useReward,
    getRewardHistory,
    updateRewardAvailability,
    addNewReward,
    removeReward
  };

  return (
    <RewardsContext.Provider value={value}>
      {children}
    </RewardsContext.Provider>
  );
};
