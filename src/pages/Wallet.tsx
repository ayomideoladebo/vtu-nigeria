import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet as WalletIcon, Plus, CreditCard, Banknote } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import toast from 'react-hot-toast';

const Wallet: React.FC = () => {
  const [fundAmount, setFundAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { balance, fundWallet } = useWallet();

  const quickAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

  const handleFundWallet = async () => {
    const amount = parseInt(fundAmount);
    if (!amount || amount < 100) {
      toast.error('Minimum funding amount is ₦100');
      return;
    }

    setIsLoading(true);
    try {
      const success = await fundWallet(amount);
      if (success) {
        toast.success('Wallet funded successfully!');
        setFundAmount('');
      } else {
        toast.error('Funding failed. Please try again.');
      }
    } catch (error) {
      toast.error('Funding failed. Please try again.');
    } finally {
      setIsLoading(false);
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
            <WalletIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">My Wallet</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Manage your wallet balance and funding
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-8 rounded-xl text-center"
        >
          <div className="mb-4">
            <div className="w-16 h-16 bg-neon-gradient rounded-full flex items-center justify-center mx-auto mb-4">
              <WalletIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Current Balance</h2>
            <p className="text-4xl font-bold gradient-text">₦{balance.toLocaleString()}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="p-4 bg-green-500/10 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">This Month</p>
              <p className="text-xl font-bold text-green-600 dark:text-green-400">+₦25,000</p>
            </div>
            <div className="p-4 bg-red-500/10 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">Spent</p>
              <p className="text-xl font-bold text-red-600 dark:text-red-400">-₦18,500</p>
            </div>
          </div>
        </motion.div>

        {/* Fund Wallet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Fund Wallet</h2>
          
          {/* Amount Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              value={fundAmount}
              onChange={(e) => setFundAmount(e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
              placeholder="Enter amount (min. ₦100)"
            />
          </div>

          {/* Quick Amounts */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Quick Amounts</label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => setFundAmount(amount.toString())}
                  className="p-2 text-sm rounded-lg border border-white/20 hover:border-neon-blue hover:bg-neon-blue/10 transition-all"
                >
                  ₦{amount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Payment Method</label>
            <div className="space-y-2">
              <button className="w-full p-4 rounded-lg border-2 border-neon-blue bg-neon-blue/10 transition-all flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-neon-blue" />
                <div className="text-left">
                  <p className="font-medium">Paystack</p>
                  <p className="text-sm text-gray-500">Pay with card, bank transfer, or USSD</p>
                </div>
              </button>
              <button className="w-full p-4 rounded-lg border border-white/20 hover:border-white/40 transition-all flex items-center space-x-3">
                <Banknote className="w-5 h-5" />
                <div className="text-left">
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-gray-500">Direct bank transfer</p>
                </div>
              </button>
            </div>
          </div>

          {/* Fund Button */}
          <button
            onClick={handleFundWallet}
            disabled={isLoading || !fundAmount}
            className="w-full py-3 bg-neon-gradient rounded-lg text-white font-semibold hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>{isLoading ? 'Processing...' : `Fund Wallet - ₦${fundAmount || '0'}`}</span>
          </button>
        </motion.div>
      </div>

      {/* Wallet Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <div className="glass p-6 rounded-xl text-center">
          <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Instant Funding</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Fund your wallet instantly with multiple payment options
          </p>
        </div>

        <div className="glass p-6 rounded-xl text-center">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <WalletIcon className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Secure Storage</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Your funds are secured with bank-level encryption
          </p>
        </div>

        <div className="glass p-6 rounded-xl text-center">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Plus className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No Hidden Fees</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Transparent pricing with no hidden charges
          </p>
        </div>
      </motion.div>

      {/* Demo Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass p-6 rounded-xl border-2 border-yellow-500/20 bg-yellow-500/5"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <span className="text-yellow-500 text-sm">💡</span>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">Demo Mode</h3>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              This is a demo application. No real payments will be processed.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Wallet;