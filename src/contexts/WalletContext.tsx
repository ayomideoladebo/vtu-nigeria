import React, { createContext, useContext, useState, useEffect } from 'react';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  status: 'success' | 'pending' | 'failed';
  date: string;
  reference?: string;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  fundWallet: (amount: number) => Promise<boolean>;
  debitWallet: (amount: number, description: string) => boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

// Mock transactions for demo
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'credit',
    amount: 10000,
    description: 'Wallet Funding via Paystack',
    status: 'success',
    date: '2024-01-20T14:30:00Z',
    reference: 'REF-2024-001',
  },
  {
    id: '2',
    type: 'debit',
    amount: 1000,
    description: 'MTN Airtime Purchase',
    status: 'success',
    date: '2024-01-20T15:45:00Z',
    reference: 'REF-2024-002',
  },
  {
    id: '3',
    type: 'debit',
    amount: 2500,
    description: 'GLO 5GB Data Bundle',
    status: 'success',
    date: '2024-01-21T09:15:00Z',
    reference: 'REF-2024-003',
  },
];

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(15000);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);

  useEffect(() => {
    const savedBalance = localStorage.getItem('walletBalance');
    const savedTransactions = localStorage.getItem('walletTransactions');
    
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
    
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      date: new Date().toISOString(),
    };
    
    const updatedTransactions = [newTransaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem('walletTransactions', JSON.stringify(updatedTransactions));
    
    if (transaction.type === 'credit') {
      const newBalance = balance + transaction.amount;
      setBalance(newBalance);
      localStorage.setItem('walletBalance', newBalance.toString());
    } else if (transaction.type === 'debit') {
      const newBalance = balance - transaction.amount;
      setBalance(newBalance);
      localStorage.setItem('walletBalance', newBalance.toString());
    }
  };

  const fundWallet = async (amount: number): Promise<boolean> => {
    // Mock payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addTransaction({
      type: 'credit',
      amount,
      description: 'Wallet Funding via Paystack',
      status: 'success',
      reference: `REF-${Date.now()}`,
    });
    
    return true;
  };

  const debitWallet = (amount: number, description: string): boolean => {
    if (balance >= amount) {
      addTransaction({
        type: 'debit',
        amount,
        description,
        status: 'success',
        reference: `REF-${Date.now()}`,
      });
      return true;
    }
    return false;
  };

  return (
    <WalletContext.Provider value={{
      balance,
      transactions,
      addTransaction,
      fundWallet,
      debitWallet,
    }}>
      {children}
    </WalletContext.Provider>
  );
};