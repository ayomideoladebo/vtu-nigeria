import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import toast from 'react-hot-toast';

const Electricity: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [meterNumber, setMeterNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState('');
  const [meterType, setMeterType] = useState('prepaid');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { balance, debitWallet } = useWallet();

  const providers = [
    { id: 'ikeja', name: 'Ikeja Electric', logo: '⚡' },
    { id: 'eko', name: 'Eko Electric', logo: '🔌' },
    { id: 'abuja', name: 'Abuja Electric', logo: '💡' },
    { id: 'kano', name: 'Kano Electric', logo: '⚡' },
    { id: 'phcn', name: 'PHCN', logo: '🔋' },
    { id: 'eedc', name: 'EEDC', logo: '⚡' },
  ];

  const quickAmounts = [1000, 2000, 5000, 10000, 15000, 20000];

  const validateMeter = async () => {
    if (!selectedProvider || !meterNumber) {
      toast.error('Please select provider and enter meter number');
      return;
    }

    setIsValidating(true);
    try {
      // Simulate API call to validate meter
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCustomerName('John Doe Customer'); // Mock customer name
      toast.success('Meter validated successfully');
    } catch (error) {
      toast.error('Failed to validate meter');
    } finally {
      setIsValidating(false);
    }
  };

  const handlePayment = async () => {
    if (!selectedProvider || !meterNumber || !amount || !customerName) {
      toast.error('Please fill all fields and validate meter');
      return;
    }

    const paymentAmount = parseInt(amount);
    if (paymentAmount < 1000) {
      toast.error('Minimum payment is ₦1,000');
      return;
    }

    if (paymentAmount > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      const success = debitWallet(paymentAmount, `${selectedProvider.toUpperCase()} Electricity Payment - ${meterNumber}`);

      if (success) {
        toast.success('Electricity payment successful!');
        setMeterNumber('');
        setAmount('');
        setCustomerName('');
        setSelectedProvider('');
      } else {
        toast.error('Payment failed. Please try again.');
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
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
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Electricity Bills</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Pay your electricity bills instantly
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Pay Electricity Bill</h2>

          {/* Provider Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Select Provider</label>
            <div className="grid grid-cols-2 gap-3">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => {
                    setSelectedProvider(provider.id);
                    setCustomerName('');
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${selectedProvider === provider.id
                      ? 'border-neon-blue bg-neon-blue/10'
                      : 'border-white/20 hover:border-white/40'
                    }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{provider.logo}</span>
                    <span className="font-medium text-sm">{provider.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Meter Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Meter Type</label>
            <div className="flex space-x-4">
              <button
                onClick={() => setMeterType('prepaid')}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${meterType === 'prepaid'
                    ? 'border-neon-blue bg-neon-blue/10'
                    : 'border-white/20 hover:border-white/40'
                  }`}
              >
                Prepaid
              </button>
              <button
                onClick={() => setMeterType('postpaid')}
                className={`px-4 py-2 rounded-lg border-2 transition-all ${meterType === 'postpaid'
                    ? 'border-neon-blue bg-neon-blue/10'
                    : 'border-white/20 hover:border-white/40'
                  }`}
              >
                Postpaid
              </button>
            </div>
          </div>

          {/* Meter Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Meter Number</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={meterNumber}
                onChange={(e) => setMeterNumber(e.target.value)}
                className="flex-1 px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                placeholder="Enter meter number"
              />
              <button
                onClick={validateMeter}
                disabled={isValidating || !selectedProvider || !meterNumber}
                className="px-4 py-3 bg-neon-gradient rounded-lg text-white font-medium hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isValidating ? 'Validating...' : 'Validate'}
              </button>
            </div>
          </div>

          {/* Customer Name */}
          {customerName && (
            <div className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm text-green-600 dark:text-green-400">
                <strong>Customer:</strong> {customerName}
              </p>
            </div>
          )}

          {/* Amount */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
              placeholder="Enter amount (min. ₦1,000)"
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
                  className="p-2 text-sm rounded-lg border border-white/20 hover:border-neon-blue hover:bg-neon-blue/10 transition-all"
                >
                  ₦{quickAmount.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Button */}
          <button
            onClick={handlePayment}
            disabled={isLoading || !selectedProvider || !meterNumber || !amount || !customerName}
            className="w-full py-3 bg-neon-gradient rounded-lg text-white font-semibold hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing Payment...' : `Pay ₦${amount || '0'}`}
          </button>
        </motion.div>

        {/* Balance & Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          {/* Balance Card */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-2">Wallet Balance</h3>
            <p className="text-3xl font-bold text-neon-blue">₦{balance.toLocaleString()}</p>
          </div>

          {/* Payment Info */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Provider:</span>
                <span className="font-medium">{selectedProvider ? providers.find(p => p.id === selectedProvider)?.name : 'Not selected'}</span>
              </div>
              <div className="flex justify-between">
                <span>Meter Type:</span>
                <span className="font-medium capitalize">{meterType}</span>
              </div>
              <div className="flex justify-between">
                <span>Meter Number:</span>
                <span className="font-medium">{meterNumber || 'Not entered'}</span>
              </div>
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-medium">{customerName || 'Not validated'}</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">💡 Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Validate meter number before payment</li>
              <li>• Keep your receipt for future reference</li>
              <li>• Minimum payment is ₦1,000</li>
              <li>• Prepaid tokens are sent via SMS</li>
              <li>• Contact support if payment fails</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Electricity;