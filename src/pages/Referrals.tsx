import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Share2, Copy, Gift, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const Referrals: React.FC = () => {
  const [referralCode] = useState('VTU2024JOHN');
  const [referralLink] = useState('https://vtunigeria.com/ref/VTU2024JOHN');

  const referralStats = {
    totalReferrals: 12,
    activeReferrals: 8,
    totalEarnings: 15600,
    pendingEarnings: 2400,
  };

  const referralHistory = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 's***@gmail.com',
      joinDate: '2024-01-15',
      status: 'Active',
      earnings: 2000,
    },
    {
      id: 2,
      name: 'Michael Brown',
      email: 'm***@yahoo.com',
      joinDate: '2024-01-12',
      status: 'Active',
      earnings: 1500,
    },
    {
      id: 3,
      name: 'Emma Wilson',
      email: 'e***@gmail.com',
      joinDate: '2024-01-10',
      status: 'Pending',
      earnings: 0,
    },
    {
      id: 4,
      name: 'David Lee',
      email: 'd***@outlook.com',
      joinDate: '2024-01-08',
      status: 'Active',
      earnings: 3200,
    },
  ];

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard!`);
  };

  const shareReferral = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join VTU Nigeria',
        text: 'Join me on VTU Nigeria and get ₦500 bonus when you sign up!',
        url: referralLink,
      });
    } else {
      copyToClipboard(referralLink, 'Referral link');
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-neon-gradient rounded-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Referral Program</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Earn money by referring friends and family to VTU Nigeria
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-blue-500">{referralStats.totalReferrals}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Referrals</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-500">{referralStats.activeReferrals}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Active Referrals</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Gift className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-purple-500">₦{referralStats.totalEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Earnings</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Gift className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-yellow-500">₦{referralStats.pendingEarnings.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending Earnings</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Referral Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Share Your Referral</h2>
          
          {/* Referral Code */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Referral Code</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={referralCode}
                readOnly
                className="flex-1 px-4 py-3 glass rounded-lg border border-white/20 bg-gray-50 dark:bg-gray-800"
              />
              <button
                onClick={() => copyToClipboard(referralCode, 'Referral code')}
                className="px-4 py-3 bg-neon-gradient rounded-lg text-white hover-glow transition-all"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Referral Link */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Your Referral Link</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 glass rounded-lg border border-white/20 bg-gray-50 dark:bg-gray-800 text-sm"
              />
              <button
                onClick={() => copyToClipboard(referralLink, 'Referral link')}
                className="px-4 py-3 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-colors"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Share Button */}
          <button
            onClick={shareReferral}
            className="w-full py-3 bg-neon-gradient rounded-lg text-white font-semibold hover-glow transition-all flex items-center justify-center space-x-2"
          >
            <Share2 className="w-5 h-5" />
            <span>Share Referral Link</span>
          </button>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-neon-blue/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-neon-blue font-bold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-medium">Share Your Link</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Share your unique referral link with friends and family
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-neon-pink/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-neon-pink font-bold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-medium">They Sign Up</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  When someone signs up using your link, they get ₦500 bonus
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-neon-purple/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-neon-purple font-bold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-medium">You Earn Money</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You earn ₦1,000 for each successful referral
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-neon-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-neon-green font-bold text-sm">4</span>
              </div>
              <div>
                <h3 className="font-medium">Ongoing Rewards</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Earn 2% commission on their transactions for 6 months
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Referral History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="glass rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold">Your Referrals</h2>
        </div>
        
        <div className="divide-y divide-white/10">
          {referralHistory.map((referral, index) => (
            <motion.div
              key={referral.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-neon-gradient rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {referral.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{referral.name}</p>
                    <p className="text-sm text-gray-500">{referral.email}</p>
                    <p className="text-xs text-gray-400">
                      Joined: {new Date(referral.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    referral.status === 'Active' 
                      ? 'bg-green-500/20 text-green-500' 
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}>
                    {referral.status}
                  </span>
                  <p className="text-lg font-semibold text-neon-blue mt-1">
                    ₦{referral.earnings.toLocaleString()}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Referrals;