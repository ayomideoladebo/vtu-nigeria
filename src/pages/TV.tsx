import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tv, CreditCard } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import toast from 'react-hot-toast';

const TV: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [smartCardNumber, setSmartCardNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { balance, debitWallet } = useWallet();

  const providers = [
    { id: 'dstv', name: 'DStv', logo: '📺', color: 'bg-blue-500' },
    { id: 'gotv', name: 'GOtv', logo: '📻', color: 'bg-green-500' },
    { id: 'startimes', name: 'Startimes', logo: '🎬', color: 'bg-purple-500' },
    { id: 'showmax', name: 'Showmax', logo: '🎭', color: 'bg-red-500' },
  ];

  const subscriptionPlans = {
    dstv: [
      { id: 'dstv-padi', name: 'DStv Padi', price: 2950, duration: '1 Month' },
      { id: 'dstv-yanga', name: 'DStv Yanga', price: 4200, duration: '1 Month' },
      { id: 'dstv-confam', name: 'DStv Confam', price: 7400, duration: '1 Month' },
      { id: 'dstv-compact', name: 'DStv Compact', price: 10500, duration: '1 Month' },
      { id: 'dstv-compact-plus', name: 'DStv Compact Plus', price: 16600, duration: '1 Month' },
      { id: 'dstv-premium', name: 'DStv Premium', price: 24500, duration: '1 Month' },
    ],
    gotv: [
      { id: 'gotv-smallie', name: 'GOtv Smallie', price: 1575, duration: '1 Month' },
      { id: 'gotv-jinja', name: 'GOtv Jinja', price: 2700, duration: '1 Month' },
      { id: 'gotv-jolli', name: 'GOtv Jolli', price: 3950, duration: '1 Month' },
      { id: 'gotv-max', name: 'GOtv Max', price: 5700, duration: '1 Month' },
      { id: 'gotv-supa', name: 'GOtv Supa', price: 7200, duration: '1 Month' },
    ],
    startimes: [
      { id: 'nova', name: 'Nova', price: 1300, duration: '1 Month' },
      { id: 'basic', name: 'Basic', price: 2200, duration: '1 Month' },
      { id: 'smart', name: 'Smart', price: 2800, duration: '1 Month' },
      { id: 'classic', name: 'Classic', price: 3300, duration: '1 Month' },
      { id: 'super', name: 'Super', price: 4900, duration: '1 Month' },
    ],
    showmax: [
      { id: 'mobile', name: 'Mobile', price: 1450, duration: '1 Month' },
      { id: 'standard', name: 'Standard', price: 2900, duration: '1 Month' },
      { id: 'pro', name: 'Pro', price: 4400, duration: '1 Month' },
    ],
  };

  const validateSmartCard = async () => {
    if (!selectedProvider || !smartCardNumber) {
      toast.error('Please select provider and enter smart card number');
      return;
    }

    setIsValidating(true);
    try {
      // Simulate API call to validate smart card
      await new Promise(resolve => setTimeout(resolve, 1500));
      setCustomerName('John Doe Customer'); // Mock customer name
      toast.success('Smart card validated successfully');
    } catch (error) {
      toast.error('Failed to validate smart card');
    } finally {
      setIsValidating(false);
    }
  };

  const handleSubscription = async () => {
    if (!selectedProvider || !selectedPlan || !smartCardNumber || !customerName) {
      toast.error('Please fill all fields and validate smart card');
      return;
    }

    const plan = subscriptionPlans[selectedProvider as keyof typeof subscriptionPlans]?.find(p => p.id === selectedPlan);
    if (!plan) {
      toast.error('Invalid plan selected');
      return;
    }

    if (plan.price > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = debitWallet(plan.price, `${selectedProvider.toUpperCase()} ${plan.name} Subscription - ${smartCardNumber}`);
      
      if (success) {
        toast.success('Subscription successful!');
        setSmartCardNumber('');
        setSelectedPlan('');
        setCustomerName('');
        setSelectedProvider('');
      } else {
        toast.error('Subscription failed. Please try again.');
      }
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedPlanData = selectedProvider && selectedPlan ? 
    subscriptionPlans[selectedProvider as keyof typeof subscriptionPlans]?.find(p => p.id === selectedPlan) : null;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-neon-gradient rounded-lg">
            <Tv className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">TV/Cable Subscription</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Subscribe to your favorite TV channels
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Subscribe to TV/Cable</h2>
          
          {/* Provider Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Select Provider</label>
            <div className="grid grid-cols-2 gap-3">
              {providers.map((provider) => (
                <button
                  key={provider.id}
                  onClick={() => {
                    setSelectedProvider(provider.id);
                    setSelectedPlan('');
                    setCustomerName('');
                  }}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedProvider === provider.id
                      ? 'border-neon-blue bg-neon-blue/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{provider.logo}</span>
                    <span className="font-medium">{provider.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Smart Card Number */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Smart Card Number</label>
            <div className="flex space-x-2">
              <input
                type="text"
                value={smartCardNumber}
                onChange={(e) => setSmartCardNumber(e.target.value)}
                className="flex-1 px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                placeholder="Enter smart card number"
              />
              <button
                onClick={validateSmartCard}
                disabled={isValidating || !selectedProvider || !smartCardNumber}
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

          {/* Subscription Plans */}
          {selectedProvider && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Select Plan</label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {subscriptionPlans[selectedProvider as keyof typeof subscriptionPlans]?.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedPlan === plan.id
                        ? 'border-neon-blue bg-neon-blue/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{plan.name}</p>
                        <p className="text-sm text-gray-500">{plan.duration}</p>
                      </div>
                      <p className="font-bold text-neon-blue">₦{plan.price.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Subscribe Button */}
          <button
            onClick={handleSubscription}
            disabled={isLoading || !selectedProvider || !selectedPlan || !smartCardNumber || !customerName}
            className="w-full py-3 bg-neon-gradient rounded-lg text-white font-semibold hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : selectedPlanData ? `Subscribe - ₦${selectedPlanData.price.toLocaleString()}` : 'Select Plan'}
          </button>
        </motion.div>

        {/* Balance & Summary */}
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

          {/* Subscription Summary */}
          {selectedPlanData && (
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Subscription Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Provider:</span>
                  <span className="font-medium">{selectedProvider.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Plan:</span>
                  <span className="font-medium">{selectedPlanData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{selectedPlanData.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span>Smart Card:</span>
                  <span className="font-medium">{smartCardNumber || 'Not entered'}</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-3">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-neon-blue">₦{selectedPlanData.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">💡 Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Validate smart card before subscription</li>
              <li>• Subscription starts immediately</li>
              <li>• Keep your receipt for support</li>
              <li>• Auto-renewal available for some plans</li>
              <li>• Contact support for activation issues</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TV;