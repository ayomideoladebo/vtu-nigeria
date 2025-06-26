import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, DollarSign, Activity, Settings, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalUsers: 15420,
    activeUsers: 12350,
    totalTransactions: 89650,
    totalRevenue: 45680000,
    pendingTransactions: 234,
    failedTransactions: 156,
  };

  const revenueData = [
    { month: 'Jan', revenue: 3200000, transactions: 5400 },
    { month: 'Feb', revenue: 3800000, transactions: 6200 },
    { month: 'Mar', revenue: 4200000, transactions: 7100 },
    { month: 'Apr', revenue: 3900000, transactions: 6800 },
    { month: 'May', revenue: 4600000, transactions: 7800 },
    { month: 'Jun', revenue: 5200000, transactions: 8500 },
  ];

  const serviceData = [
    { name: 'Airtime', value: 35, color: '#00D4FF' },
    { name: 'Data', value: 30, color: '#FF0080' },
    { name: 'Electricity', value: 20, color: '#7C3AED' },
    { name: 'TV/Cable', value: 10, color: '#00FF94' },
    { name: 'Education', value: 5, color: '#FFD700' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', joined: '2024-01-20' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Pending', joined: '2024-01-19' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Active', joined: '2024-01-18' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', status: 'Suspended', joined: '2024-01-17' },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: BarChart3 },
    { id: 'users', name: 'Users', icon: Users },
    { id: 'transactions', name: 'Transactions', icon: Activity },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-sm text-green-500">+12.5%</span>
          </div>
          <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-sm text-green-500">+8.2%</span>
          </div>
          <p className="text-2xl font-bold">{stats.totalTransactions.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Transactions</p>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-sm text-green-500">+15.3%</span>
          </div>
          <p className="text-2xl font-bold">₦{(stats.totalRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
              <YAxis stroke="rgba(255,255,255,0.6)" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '8px',
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#00D4FF" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-4">Service Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={serviceData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {serviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">User Management</h3>
        <button className="px-4 py-2 bg-neon-gradient rounded-lg text-white hover-glow transition-all">
          Add User
        </button>
      </div>

      <div className="glass rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">Recent Users</h4>
            <input
              type="text"
              placeholder="Search users..."
              className="px-4 py-2 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
            />
          </div>
        </div>
        
        <div className="divide-y divide-white/10">
          {recentUsers.map((user) => (
            <div key={user.id} className="p-6 hover:bg-white/5 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-neon-gradient rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">Joined: {user.joined}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-500/20 text-green-500' :
                    user.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {user.status}
                  </span>
                  <button className="px-3 py-1 bg-blue-500 rounded text-white text-sm hover:bg-blue-600 transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTransactions = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Transaction Management</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-green-500">{(stats.totalTransactions - stats.pendingTransactions - stats.failedTransactions).toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Successful</p>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-yellow-500">{stats.pendingTransactions.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-red-500" />
            </div>
          </div>
          <p className="text-2xl font-bold text-red-500">{stats.failedTransactions.toLocaleString()}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
        </div>
      </div>

      <div className="glass p-6 rounded-xl">
        <h4 className="font-semibold mb-4">Transaction Volume</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
            <YAxis stroke="rgba(255,255,255,0.6)" />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="transactions" fill="url(#colorGradient)" />
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00D4FF" />
                <stop offset="100%" stopColor="#FF0080" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">System Settings</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-xl">
          <h4 className="font-semibold mb-4">Service Pricing</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span>Airtime Commission</span>
              <span className="font-medium">2.5%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span>Data Commission</span>
              <span className="font-medium">3.0%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span>Electricity Commission</span>
              <span className="font-medium">1.5%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
              <span>TV Commission</span>
              <span className="font-medium">2.0%</span>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl">
          <h4 className="font-semibold mb-4">System Configuration</h4>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Maintenance Mode</span>
              <button className="px-3 py-1 bg-green-500 rounded text-white text-sm">
                Disabled
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span>Auto Refund</span>
              <button className="px-3 py-1 bg-green-500 rounded text-white text-sm">
                Enabled
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span>Email Notifications</span>
              <button className="px-3 py-1 bg-green-500 rounded text-white text-sm">
                Enabled
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span>SMS Notifications</span>
              <button className="px-3 py-1 bg-yellow-500 rounded text-white text-sm">
                Disabled
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <Shield className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold text-red-500">Admin Panel</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Manage users, transactions, and system settings
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="glass p-2 rounded-xl">
        <div className="flex space-x-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-red-500 text-white'
                    : 'hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'users' && renderUsers()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'settings' && renderSettings()}
      </motion.div>
    </div>
  );
};

export default Admin;