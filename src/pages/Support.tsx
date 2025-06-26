import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Phone, Mail, Clock, HelpCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const Support: React.FC = () => {
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! How can I help you today?',
      time: '10:30 AM',
    },
  ]);

  const categories = [
    { id: 'account', name: 'Account Issues', icon: '👤' },
    { id: 'payment', name: 'Payment Problems', icon: '💳' },
    { id: 'transaction', name: 'Transaction Issues', icon: '📱' },
    { id: 'technical', name: 'Technical Support', icon: '🔧' },
    { id: 'billing', name: 'Billing Questions', icon: '📄' },
    { id: 'other', name: 'Other', icon: '❓' },
  ];

  const faqs = [
    {
      question: 'How do I fund my wallet?',
      answer: 'You can fund your wallet using Paystack, bank transfer, or USSD. Go to the Wallet section and click "Fund Wallet" to see all available options.',
    },
    {
      question: 'Why did my transaction fail?',
      answer: 'Transactions can fail due to insufficient balance, network issues, or incorrect details. Check your balance and try again. If the problem persists, contact support.',
    },
    {
      question: 'How long does airtime delivery take?',
      answer: 'Airtime is delivered instantly in most cases. If you don\'t receive it within 5 minutes, please contact our support team.',
    },
    {
      question: 'Can I get a refund for failed transactions?',
      answer: 'Yes, failed transactions are automatically refunded to your wallet within 24 hours. If you don\'t see the refund, please contact support.',
    },
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: chatMessages.length + 1,
      type: 'user',
      message: message.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages([...chatMessages, newMessage]);
    setMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        type: 'bot',
        message: 'Thank you for your message. Our support team will get back to you shortly. Is there anything else I can help you with?',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);

    toast.success('Message sent successfully!');
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
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Customer Support</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Get help with your account, transactions, and technical issues
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Phone className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="font-medium">Phone Support</p>
                <p className="text-sm text-gray-500">+234 800 123 4567</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Mail className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-gray-500">support@vtunigeria.com</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="font-medium">Business Hours</p>
                <p className="text-sm text-gray-500">24/7 Support</p>
              </div>
            </div>
          </div>

          {/* Issue Categories */}
          <div className="mt-6">
            <h3 className="font-semibold mb-3">Select Issue Category</h3>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    selectedCategory === category.id
                      ? 'border-neon-blue bg-neon-blue/10'
                      : 'border-white/20 hover:border-white/40'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Live Chat */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">Live Chat</h2>
          
          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto mb-4 space-y-3">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-neon-gradient text-white'
                      : 'bg-white/10 border border-white/20'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex space-x-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-3 bg-neon-gradient rounded-lg text-white hover-glow transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center space-x-2 mb-4">
            <HelpCircle className="w-6 h-6 text-neon-blue" />
            <h2 className="text-xl font-semibold">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group">
                <summary className="cursor-pointer p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="font-medium">{faq.question}</span>
                </summary>
                <div className="mt-2 p-3 text-sm text-gray-600 dark:text-gray-300 bg-white/5 rounded-lg">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 text-left rounded-lg hover:bg-white/5 transition-colors">
                📱 Check Transaction Status
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-white/5 transition-colors">
                💳 Report Payment Issue
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-white/5 transition-colors">
                🔄 Request Refund
              </button>
              <button className="w-full p-3 text-left rounded-lg hover:bg-white/5 transition-colors">
                📞 Schedule Callback
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Support;