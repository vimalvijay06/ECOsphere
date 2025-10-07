import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Send,
  Image,
  Smile,
  TrendingUp,
  Award,
  Calendar,
  MapPin,
  Clock,
  Filter,
  Search,
  UserPlus,
  UserCheck,
  Star,
  Globe,
  Lock,
  Crown,
  Zap,
  Target,
  BookOpen,
  Coffee,
  Gamepad2
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useApp } from '../context/AppContext';
import CreateCommunityModal from '../components/CreateCommunityModal';

interface Friend {
  id: number;
  name: string;
  avatar?: string;
  level: number;
  department: string;
  ecoPoints: number;
  status: 'online' | 'offline' | 'away';
  lastActive: string;
  mutualFriends: number;
  isFriend: boolean;
  friendshipStatus: 'none' | 'pending' | 'friends' | 'requested';
}

interface Post {
  id: number;
  author: {
    name: string;
    avatar?: string;
    level: number;
    department: string;
  };
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  type: 'achievement' | 'challenge' | 'tip' | 'discussion';
}

interface TeamChallenge {
  id: number;
  title: string;
  description: string;
  category: string;
  participants: number;
  maxParticipants: number;
  progress: number;
  deadline: string;
  rewards: string[];
  status: 'active' | 'completed' | 'upcoming';
}

const Community: React.FC = () => {
  const { user } = useUser();
  const { communities } = useApp();
  const [posts, setPosts] = useState<Post[]>([]);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [teamChallenges, setTeamChallenges] = useState<TeamChallenge[]>([]);
  const [activeTab, setActiveTab] = useState<'feed' | 'friends' | 'teams' | 'discussions'>('feed');
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [friendSearchTerm, setFriendSearchTerm] = useState('');

  // Mock data - replace with API calls
  useEffect(() => {
    const mockFriends: Friend[] = [
      {
        id: 1,
        name: 'Sarah Chen',
        level: 15,
        department: 'Computer Science',
        ecoPoints: 2840,
        status: 'online',
        lastActive: '2 min ago',
        mutualFriends: 8,
        isFriend: true,
        friendshipStatus: 'friends'
      },
      {
        id: 2,
        name: 'Alex Rodriguez',
        level: 14,
        department: 'Environmental Science',
        ecoPoints: 2650,
        status: 'away',
        lastActive: '1 hour ago',
        mutualFriends: 12,
        isFriend: true,
        friendshipStatus: 'friends'
      },
      {
        id: 3,
        name: 'Emma Thompson',
        level: 13,
        department: 'Business',
        ecoPoints: 2480,
        status: 'offline',
        lastActive: '3 hours ago',
        mutualFriends: 5,
        isFriend: false,
        friendshipStatus: 'pending'
      },
      {
        id: 4,
        name: 'Michael Park',
        level: 12,
        department: 'Engineering',
        ecoPoints: 2350,
        status: 'online',
        lastActive: 'Just now',
        mutualFriends: 3,
        isFriend: false,
        friendshipStatus: 'none'
      }
    ];

    const mockPosts: Post[] = [
      {
        id: 1,
        author: {
          name: 'Sarah Chen',
          level: 15,
          department: 'Computer Science'
        },
        content: 'Just completed my 30-day zero waste challenge! Feeling amazing about reducing my environmental impact. Who else is working on sustainability goals this month? 🌱',
        timestamp: '2024-01-15T10:30:00Z',
        likes: 24,
        comments: 8,
        shares: 3,
        isLiked: true,
        type: 'achievement'
      },
      {
        id: 2,
        author: {
          name: 'Alex Rodriguez',
          level: 12,
          department: 'Environmental Science'
        },
        content: 'Great tip for everyone: Switch to reusable water bottles! I\'ve saved over 50 plastic bottles this month alone. Small changes make a big difference! 💧',
        timestamp: '2024-01-15T08:15:00Z',
        likes: 18,
        comments: 12,
        shares: 7,
        type: 'tip'
      },
      {
        id: 3,
        author: {
          name: 'Emma Thompson',
          level: 18,
          department: 'Business'
        },
        content: 'Our dorm sustainability team just planted 20 new trees on campus! Join us for our next community garden event this weekend. Every tree counts! 🌳',
        image: '/api/placeholder/400/300',
        timestamp: '2024-01-14T16:45:00Z',
        likes: 45,
        comments: 15,
        shares: 12,
        type: 'achievement'
      }
    ];

    const mockTeamChallenges: TeamChallenge[] = [
      {
        id: 1,
        title: 'Computer Science Energy Challenge',
        description: 'Reduce energy consumption in CS department by 20% this month',
        category: 'Energy',
        participants: 23,
        maxParticipants: 50,
        progress: 65,
        deadline: '2024-01-31',
        rewards: ['Department Trophy', 'Bonus Points'],
        status: 'active'
      },
      {
        id: 2,
        title: 'Campus-wide Recycling Drive',
        description: 'Collect and properly recycle electronics and batteries',
        category: 'Waste',
        participants: 156,
        maxParticipants: 200,
        progress: 78,
        deadline: '2024-02-15',
        rewards: ['Gift Cards', 'Certificates'],
        status: 'active'
      },
      {
        id: 3,
        title: 'Transportation Challenge',
        description: 'Encourage carpooling and public transport usage',
        category: 'Transportation',
        participants: 89,
        maxParticipants: 150,
        progress: 59,
        deadline: '2024-03-01',
        rewards: ['Free Parking Passes', 'Eco-badges'],
        status: 'active'
      }
    ];

    setTimeout(() => {
      setPosts(mockPosts);
      setTeamChallenges(mockTeamChallenges);
      setLoading(false);
    }, 1000);
  }, []);

  const tabs = [
    { key: 'feed', label: 'Community Feed', icon: MessageCircle },
    { key: 'teams', label: 'Team Challenges', icon: Users },
    { key: 'discussions', label: 'Discussions', icon: MessageCircle }
  ];

  const handleLikePost = (postId: number) => {
    setPosts(prev => prev.map(post =>
      post.id === postId
        ? {
            ...post,
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleCreatePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now(),
        author: {
          name: user?.name || 'User',
          level: user?.level || 1,
          department: 'Computer Science'
        },
        content: newPost,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: 0,
        shares: 0,
        type: 'discussion'
      };

      setPosts(prev => [post, ...prev]);
      setNewPost('');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <CreateCommunityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Community Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Connect with fellow eco-warriors, share achievements, and join team challenges!
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white dark:bg-gray-700 text-green-700 dark:text-green-300 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* Community Feed Tab */}
      {activeTab === 'feed' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="flex-1">
                  <textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your sustainability journey, tips, or achievements..."
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white resize-none"
                    rows={3}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Image className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleCreatePost}
                      disabled={!newPost.trim()}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        newPost.trim()
                          ? 'bg-green-500 hover:bg-green-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>Post</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Posts */}
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                {/* Post Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
                      {post.author.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-800 dark:text-white">
                          {post.author.name}
                        </h3>
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded">
                          Level {post.author.level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {post.author.department} • {new Date(post.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    post.type === 'achievement' ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' :
                    post.type === 'tip' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' :
                    post.type === 'challenge' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' :
                    'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300'
                  }`}>
                    {post.type}
                  </span>
                </div>

                {/* Post Content */}
                <p className="text-gray-800 dark:text-white mb-4">
                  {post.content}
                </p>

                {post.image && (
                  <div className="mb-4">
                    <img
                      src={post.image}
                      alt="Post image"
                      className="w-full rounded-lg"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleLikePost(post.id)}
                      className={`flex items-center space-x-2 transition-colors ${
                        post.isLiked
                          ? 'text-red-500'
                          : 'text-gray-500 dark:text-gray-400 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                      <span className="text-sm font-medium">{post.likes}</span>
                    </motion.button>

                    <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{post.comments}</span>
                    </button>

                    <button className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 hover:text-green-500 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm font-medium">{post.shares}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Community Stats
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Active Members</span>
                  <span className="font-medium text-gray-800 dark:text-white">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Posts Today</span>
                  <span className="font-medium text-gray-800 dark:text-white">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Team Challenges</span>
                  <span className="font-medium text-gray-800 dark:text-white">12</span>
                </div>
              </div>
            </motion.div>

            {/* Trending Topics */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Trending
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">#ZeroWaste</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">#EnergySaving</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">#TeamChallenge</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Team Challenges Tab */}
      {activeTab === 'teams' && (
        <motion.div className="text-right mb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 inline-flex"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Community</span>
          </motion.button>
        </motion.div>
      )}

      {activeTab === 'teams' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communities.map((community, index) => (
              <motion.div
                key={community.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 card-hover"
              >
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                  {community.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {community.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{community.members} members</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={community.isJoined}
                  className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                    community.isJoined
                      ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {community.isJoined ? 'Joined' : 'Join Community'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Discussions Tab */}
      {activeTab === 'discussions' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <MessageCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
            Discussion Forums
          </h3>
          <p className="text-gray-500 dark:text-gray-500">
            Discussion forum features will be implemented here.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Community;
