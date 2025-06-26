import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { History, Download, Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';
import { format } from 'date-fns';

const Transactions: React.FC = () => {
  const { transactions } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalCredit = transactions
    .filter(t => t.type === 'credit' && t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebit = transactions
    .filter(t => t.type === 'debit' && t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-500 bg-green-500/20';
      case 'pending':
        return 'text-yellow-500 bg-yellow-500/20';
      case 'failed':
        return 'text-red-500 bg-red-500/20';
      default:
        return 'text-gray-500 bg-gray-500/20';
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
            <History className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Transaction History</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          View and manage all your transactions
        </p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-sm text-green-500">Total Credit</span>
          </div>
          <p className="text-2xl font-bold text-green-500">₦{totalCredit.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <TrendingDown className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-sm text-red-500">Total Debit</span>
          </div>
          <p className="text-2xl font-bold text-red-500">₦{totalDebit.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass p-6 rounded-xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <History className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-sm text-blue-500">Total Transactions</span>
          </div>
          <p className="text-2xl font-bold text-blue-500">{transactions.length}</p>
        </motion.div>
      </div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass p-6 rounded-xl"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
              placeholder="Search transactions..."
            />
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
            >
              <option value="all">All Types</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Export Button */}
          <button className="px-6 py-3 bg-neon-gradient rounded-lg text-white font-medium hover-glow transition-all flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export</span>
          </button>
        </div>
      </motion.div>

      {/* Transactions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="glass rounded-xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-semibold">
            Transactions ({filteredTransactions.length})
          </h2>
        </div>
        
        <div className="divide-y divide-white/10">
          {filteredTransactions.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No transactions found matching your criteria.
            </div>
          ) : (
            filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="p-6 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${
                      transaction.type === 'credit' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {transaction.type === 'credit' ? (
                        <TrendingUp className="w-5 h-5" />
                      ) : (
                        <TrendingDown className="w-5 h-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(transaction.date), 'MMM dd, yyyy • hh:mm a')}
                      </p>
                      {transaction.reference && (
                        <p className="text-xs text-gray-400 mt-1">
                          Ref: {transaction.reference}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${
                      transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                    </p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Transactions;