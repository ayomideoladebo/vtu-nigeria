import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { WalletProvider } from './contexts/WalletContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Airtime from './pages/Airtime';
import Data from './pages/Data';
import Electricity from './pages/Electricity';
import TV from './pages/TV';
import Education from './pages/Education';
import Flights from './pages/Flights';
import Wallet from './pages/Wallet';
import Transactions from './pages/Transactions';
import Referrals from './pages/Referrals';
import Support from './pages/Support';
import Admin from './pages/Admin';
import Profile from './pages/Profile';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <WalletProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-dark-bg dark:to-gray-900 transition-colors duration-300">
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/airtime" element={<Airtime />} />
                  <Route path="/data" element={<Data />} />
                  <Route path="/electricity" element={<Electricity />} />
                  <Route path="/tv" element={<TV />} />
                  <Route path="/education" element={<Education />} />
                  <Route path="/flights" element={<Flights />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/transactions" element={<Transactions />} />
                  <Route path="/referrals" element={<Referrals />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </Layout>
              <Toaster 
                position="top-right"
                toastOptions={{
                  className: 'glass',
                  style: {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: 'white',
                  },
                }}
              />
            </div>
          </Router>
        </WalletProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;