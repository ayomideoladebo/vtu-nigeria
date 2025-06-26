import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, FileText } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import toast from 'react-hot-toast';

const Education: React.FC = () => {
  const [selectedService, setSelectedService] = useState('');
  const [examNumber, setExamNumber] = useState('');
  const [examYear, setExamYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { balance, debitWallet } = useWallet();

  const services = [
    { 
      id: 'waec', 
      name: 'WAEC Result Checker', 
      price: 1000, 
      logo: '📜',
      description: 'Check WAEC/WASSCE results'
    },
    { 
      id: 'neco', 
      name: 'NECO Result Checker', 
      price: 1000, 
      logo: '📋',
      description: 'Check NECO/SSCE results'
    },
    { 
      id: 'nabteb', 
      name: 'NABTEB Result Checker', 
      price: 1000, 
      logo: '📄',
      description: 'Check NABTEB results'
    },
    { 
      id: 'jamb', 
      name: 'JAMB Result Checker', 
      price: 1000, 
      logo: '🎓',
      description: 'Check JAMB UTME results'
    },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const handlePurchase = async () => {
    if (!selectedService || !examNumber || !examYear) {
      toast.error('Please fill all fields');
      return;
    }

    const service = services.find(s => s.id === selectedService);
    if (!service) {
      toast.error('Invalid service selected');
      return;
    }

    if (service.price > balance) {
      toast.error('Insufficient balance');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const success = debitWallet(service.price, `${service.name} - ${examNumber} (${examYear})`);
      
      if (success) {
        toast.success('Result checker purchased successfully!');
        // In a real app, this would redirect to the result checking page
        toast.success('Redirecting to result checker...');
        setExamNumber('');
        setExamYear('');
        setSelectedService('');
      } else {
        toast.error('Purchase failed. Please try again.');
      }
    } catch (error) {
      toast.error('Purchase failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectedServiceData = services.find(s => s.id === selectedService);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-neon-gradient rounded-lg">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Education Services</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Check examination results for WAEC, NECO, NABTEB, and JAMB
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Select Service</h2>
          
          {/* Service Options */}
          <div className="space-y-3 mb-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedService === service.id
                    ? 'border-neon-blue bg-neon-blue/10'
                    : 'border-white/20 hover:border-white/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{service.logo}</span>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-500">{service.description}</p>
                    </div>
                  </div>
                  <p className="font-bold text-neon-blue">₦{service.price.toLocaleString()}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Exam Details */}
          {selectedService && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Examination Number</label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={examNumber}
                    onChange={(e) => setExamNumber(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                    placeholder="Enter examination number"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Examination Year</label>
                <select
                  value={examYear}
                  onChange={(e) => setExamYear(e.target.value)}
                  className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                >
                  <option value="">Select year</option>
                  {years.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purchase Button */}
              <button
                onClick={handlePurchase}
                disabled={isLoading || !selectedService || !examNumber || !examYear}
                className="w-full py-3 bg-neon-gradient rounded-lg text-white font-semibold hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Processing...' : `Purchase Result Checker - ₦${selectedServiceData?.price.toLocaleString() || '0'}`}
              </button>
            </div>
          )}
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

          {/* Purchase Summary */}
          {selectedServiceData && (
            <div className="glass p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">Purchase Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{selectedServiceData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Exam Number:</span>
                  <span className="font-medium">{examNumber || 'Not entered'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Year:</span>
                  <span className="font-medium">{examYear || 'Not selected'}</span>
                </div>
                <div className="flex justify-between border-t border-white/20 pt-3">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-neon-blue">₦{selectedServiceData.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Information */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">📚 Information</h3>
            <div className="space-y-4 text-sm">
              <div>
                <h4 className="font-medium text-neon-blue mb-2">WAEC Result Checker</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Check your West African Examinations Council (WAEC) results online instantly.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-neon-pink mb-2">NECO Result Checker</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Access your National Examinations Council (NECO) results quickly and securely.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-neon-purple mb-2">NABTEB Result Checker</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  Check National Business and Technical Examinations Board results.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-neon-green mb-2">JAMB Result Checker</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  View your Joint Admissions and Matriculation Board (JAMB) UTME results.
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="glass p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">💡 Tips</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <li>• Ensure your examination number is correct</li>
              <li>• Select the correct examination year</li>
              <li>• Results are available immediately after purchase</li>
              <li>• Keep your receipt for future reference</li>
              <li>• Contact support if you encounter any issues</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Education;