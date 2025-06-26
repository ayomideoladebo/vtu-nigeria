import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Phone } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import toast from 'react-hot-toast';

const Airtime: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { balance, debitWallet } = useWallet();

  const networks = [
    { id: 'mtn', name: 'MTN', color: 'bg-yellow-500', logo: '🟨' },
    { id: 'glo', name: 'Glo', color: 'bg-green-500', logo: '🟩' },
    { id: 'airtel', name: 'Airtel', color: 'bg-red-500', logo: '🟥' },
    { id: '9mobile', name: '9mobile', color: 'bg-emerald-500', logo: '🟢' },
  ];

  const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

  const handlePurchase = async () => {
    if (!selectedNetwork || !phoneNumber || !amount) {
      toast.error('Please fill all fields');
      return;
    }

    const purchaseAmount = parseInt(amount);
    if (purchaseAmount > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = debitWallet(purchaseAmount, `${selectedNetwork.toUpperCase()} Airtime Purchase - ${phoneNumber}`);
      
      if (success) {
        toast.success('Airtime purchase successful!');
        setPhoneNumber('');
        setAmount('');
        setSelectedNetwork('');
      } else {
        toast.error('Purchase failed. Please try again.');
      }
    } catch (error) {
      toast.error('Purchase failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-4 sm:p-6 rounded-xl"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-neon-gradient rounded-lg">
            <Smartphone className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold gradient-text">Airtime Purchase</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Buy airtime for all networks instantly
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Purchase Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-4 sm:p-6 rounded-xl"
        >
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Purchase Airtime</h2>
          
          {/* Network Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Select Network</label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {networks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => setSelectedNetwork(network.id)}
                  className={`p-3 sm:p-4 rounded-lg border-2 transition-all ${
                    selectedNetwork === network.id
                      ? 'border-neon-blue bg-neon-blue/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-xl sm:text-2xl">{network.logo}</span>
                    <span className="font-medium text-sm sm:text-base">{network.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all text-sm sm:text-base"
                placeholder="Enter phone number"
              />
            </div>
          </div>

          {/* Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all text-sm sm:text-base"
              placeholder="Enter amount"
            />
          </div>

          {/* Quick Amounts */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Quick Amounts</label>
            <div className="grid grid-cols-3 gap-2">
              {quickAmounts.map((quickAmount) => (
                <button
                  key={quickAmount}
                  onClick={() => setAmount(quickAmount.toString())}
                  className="p-2 text-xs sm:text-sm rounded-lg border border-white/20 hover:border-neon-blue hover:bg-neon-blue/10 transition-all"
                >
                  ₦{quickAmount}
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            disabled={isLoading || !selectedNetwork || !phoneNumber || !amount}
            className="w-full py-3 bg-neon-gradient rounded-lg text-white font-semibold hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isLoading ? 'Processing...' : `Purchase Airtime - ₦${amount || '0'}`}
          </button>
        </motion.div>

        {/* Balance & Recent Transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 sm:space-y-6"
        >
          {/* Balance Card */}
          <div className="glass p-4 sm:p-6 rounded-xl">
            <h3 className="text-base sm:text-lg font-semibold mb-2">Wallet Balance</h3>
            <p className="text-2xl sm:text-3xl font-bold text-neon-blue">₦{balance.toLocaleString()}</p>
          </div>

          {/* Tips */}
          <div className="glass p-4 sm:p-6 rounded-xl">
            <h3 className="text-base sm:text-lg font-semibold mb-4">💡 Tips</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <li>• Airtime is delivered instantly</li>
              <li>• Double-check phone number before purchase</li>
              <li>• Keep your transaction reference for support</li>
              <li>• Minimum purchase is ₦50</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Airtime;