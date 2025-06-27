import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  Users,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { balance, transactions } = useWallet();

  const chartData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 5000 },
    { name: 'Apr', amount: 4500 },
    { name: 'May', amount: 6000 },
    { name: 'Jun', amount: 5500 },
  ];

  const pieData = [
    { name: 'Airtime', value: 35, color: '#00D4FF' },
    { name: 'Data', value: 30, color: '#FF0080' },
    { name: 'Electricity', value: 20, color: '#7C3AED' },
    { name: 'TV/Cable', value: 15, color: '#00FF94' },
  ];

  const stats = [
    {
      title: 'Total Balance',
      value: `₦${balance.toLocaleString()}`,
      change: '+12.5%',
      changeType: 'positive',
      icon: Wallet,
    },
    {
      title: 'This Month',
      value: '₦45,230',
      change: '+8.2%',
      changeType: 'positive',
      icon: TrendingUp,
    },
    {
      title: 'Transactions',
      value: transactions.length.toString(),
      change: '+23.1%',
      changeType: 'positive',
      icon: Activity,
    },
    {
      title: 'Referrals',
      value: '12',
      change: '+4.1%',
      changeType: 'positive',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-4 sm:p-6 rounded-xl"
      >
        <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
          Here's what's happening with your account today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass p-3 sm:p-6 rounded-xl hover-glow transition-all"
            >
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div className="p-1.5 sm:p-2 bg-neon-gradient rounded-lg">
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-xs sm:text-sm ${stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                  }`}>
                  {stat.changeType === 'positive' ? (
                    <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-lg sm:text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Spending Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-4 sm:p-6 rounded-xl"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Monthly Spending</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="amount" fill="url(#colorGradient)" />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00D4FF" />
                    <stop offset="100%" stopColor="#FF0080" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Service Usage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass p-4 sm:p-6 rounded-xl"
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Service Usage</h3>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={window.innerWidth < 640 ? 60 : 80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                // labelStyle={{ fontSize: window.innerWidth < 640 ? '10px' : '12px' }}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass p-4 sm:p-6 rounded-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg sm:text-xl font-semibold">Recent Transactions</h3>
          <button className="text-neon-blue hover:text-neon-pink transition-colors text-sm sm:text-base">
            View All
          </button>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-white/5 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${transaction.type === 'credit' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                  }`}>
                  {transaction.type === 'credit' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm sm:text-base truncate">{transaction.description}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold text-sm sm:text-base ${transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
                  }`}>
                  {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                </p>
                <p className={`text-xs ${transaction.status === 'success' ? 'text-green-500' :
                  transaction.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                  }`}>
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;