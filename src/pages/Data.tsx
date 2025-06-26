import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Phone } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import toast from 'react-hot-toast';

const Data: React.FC = () => {
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { balance, debitWallet } = useWallet();

  const networks = [
    { id: 'mtn', name: 'MTN', color: 'bg-yellow-500', logo: '🟨' },
    { id: 'glo', name: 'Glo', color: 'bg-green-500', logo: '🟩' },
    { id: 'airtel', name: 'Airtel', color: 'bg-red-500', logo: '🟥' },
    { id: '9mobile', name: '9mobile', color: 'bg-emerald-500', logo: '🟢' },
  ];

  const dataPlans = {
    mtn: [
      { id: 'mtn-1gb', name: '1GB - 30 Days', price: 1200, data: '1GB', validity: '30 Days' },
      { id: 'mtn-2gb', name: '2GB - 30 Days', price: 2400, data: '2GB', validity: '30 Days' },
      { id: 'mtn-5gb', name: '5GB - 30 Days', price: 5500, data: '5GB', validity: '30 Days' },
      { id: 'mtn-10gb', name: '10GB - 30 Days', price: 10000, data: '10GB', validity: '30 Days' },
    ],
    glo: [
      { id: 'glo-1gb', name: '1GB - 30 Days', price: 1000, data: '1GB', validity: '30 Days' },
      { id: 'glo-2gb', name: '2GB - 30 Days', price: 2000, data: '2GB', validity: '30 Days' },
      { id: 'glo-5gb', name: '5GB - 30 Days', price: 4500, data: '5GB', validity: '30 Days' },
      { id: 'glo-10gb', name: '10GB - 30 Days', price: 9000, data: '10GB', validity: '30 Days' },
    ],
    airtel: [
      { id: 'airtel-1gb', name: '1GB - 30 Days', price: 1200, data: '1GB', validity: '30 Days' },
      { id: 'airtel-2gb', name: '2GB - 30 Days', price: 2300, data: '2GB', validity: '30 Days' },
      { id: 'airtel-5gb', name: '5GB - 30 Days', price: 5300, data: '5GB', validity: '30 Days' },
      { id: 'airtel-10gb', name: '10GB - 30 Days', price: 10500, data: '10GB', validity: '30 Days' },
    ],
    '9mobile': [
      { id: '9mobile-1gb', name: '1GB - 30 Days', price: 1100, data: '1GB', validity: '30 Days' },
      { id: '9mobile-2gb', name: '2GB - 30 Days', price: 2200, data: '2GB', validity: '30 Days' },
      { id: '9mobile-5gb', name: '5GB - 30 Days', price: 5000, data: '5GB', validity: '30 Days' },
      { id: '9mobile-10gb', name: '10GB - 30 Days', price: 9500, data: '10GB', validity: '30 Days' },
    ],
  };

  const handlePurchase = async () => {
    if (!selectedNetwork || !selectedPlan || !phoneNumber) {
      toast.error('Please fill all fields');
      return;
    }

    const plan = dataPlans[selectedNetwork as keyof typeof dataPlans]?.find(p => p.id === selectedPlan);
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
      
      const success = debitWallet(plan.price, `${selectedNetwork.toUpperCase()} ${plan.data} Data Bundle - ${phoneNumber}`);
      
      if (success) {
        toast.success('Data bundle purchase successful!');
        setPhoneNumber('');
        setSelectedPlan('');
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

  const selectedPlanData = selectedNetwork && selectedPlan ? 
    dataPlans[selectedNetwork as keyof typeof dataPlans]?.find(p => p.id === selectedPlan) : null;

  return (
    <div className="space-y-4 sm:space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-4 sm:p-6 rounded-xl"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-neon-gradient rounded-lg">
            <Wifi className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold gradient-text">Data Bundle</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Purchase data bundles for all networks
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
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Purchase Data Bundle</h2>
          
          {/* Network Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-3">Select Network</label>
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {networks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => {
                    setSelectedNetwork(network.id);
                    setSelectedPlan('');
                  }}
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

          {/* Data Plans */}
          {selectedNetwork && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Select Data Plan</label>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {dataPlans[selectedNetwork as keyof typeof dataPlans]?.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all ${
                      selectedPlan === plan.id
                        ? 'border-neon-blue bg-neon-blue/10'
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-sm sm:text-base">{plan.data}</p>
                        <p className="text-xs sm:text-sm text-gray-500">{plan.validity}</p>
                      </div>
                      <p className="font-bold text-neon-blue text-sm sm:text-base">₦{plan.price.toLocaleString()}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

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

          {/* Purchase Button */}
          <button
            onClick={handlePurchase}
            disabled={isLoading || !selectedNetwork || !selectedPlan || !phoneNumber}
            className="w-full py-3 bg-neon-gradient rounded-lg text-white font-semibold hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
          >
            {isLoading ? 'Processing...' : selectedPlanData ? `Purchase ${selectedPlanData.data} - ₦${selectedPlanData.price.toLocaleString()}` : 'Select Plan'}
          </button>
        </motion.div>

        {/* Balance & Summary */}
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

          {/* Purchase Summary */}
          {selectedPlanData && (
            <div className="glass p-4 sm:p-6 rounded-xl">
              <h3 className="text-base sm:text-lg font-semibold mb-4">Purchase Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Network:</span>
                  <span className="font-medium text-sm">{selectedNetwork.toUpperCase()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Data:</span>
                  <span className="font-medium text-sm">{selectedPlanData.data}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Validity:</span>
                  <span className="font-medium text-sm">{selectedPlanData.validity}</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-3">
                  <span className="font-semibold text-sm">Total:</span>
                  <span className="font-bold text-neon-blue text-sm">₦{selectedPlanData.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="glass p-4 sm:p-6 rounded-xl">
            <h3 className="text-base sm:text-lg font-semibold mb-4">💡 Tips</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              <li>• Data is delivered instantly</li>
              <li>• Check your phone number carefully</li>
              <li>• Data validity starts immediately</li>
              <li>• Contact support if data doesn't reflect</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Data;