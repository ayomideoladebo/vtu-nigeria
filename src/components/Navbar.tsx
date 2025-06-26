import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Moon, Sun, User, LogOut, Wallet, Bell, Menu, X, Home, LayoutDashboard, Smartphone, Wifi, Zap, Tv, GraduationCap, Plane, History, Users, MessageCircle, Settings, Shield } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { useWallet } from '../contexts/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const { balance } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Smartphone, label: 'Airtime', path: '/airtime' },
    { icon: Wifi, label: 'Data', path: '/data' },
    { icon: Zap, label: 'Electricity', path: '/electricity' },
    { icon: Tv, label: 'TV/Cable', path: '/tv' },
    { icon: GraduationCap, label: 'Education', path: '/education' },
    { icon: Plane, label: 'Flights', path: '/flights' },
    { icon: Wallet, label: 'Wallet', path: '/wallet' },
    { icon: History, label: 'Transactions', path: '/transactions' },
    { icon: Users, label: 'Referrals', path: '/referrals' },
    { icon: MessageCircle, label: 'Support', path: '/support' },
  ];

  const adminItems = [
    { icon: Shield, label: 'Admin Panel', path: '/admin' },
  ];

  return (
    <nav className="glass border-b border-white/20 dark:border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-neon-gradient rounded-lg flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">VTU Nigeria</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated && (
              <>
                <div className="glass px-4 py-2 rounded-lg">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Balance:</span>
                  <span className="ml-2 font-semibold text-neon-blue">
                    ₦{balance.toLocaleString()}
                  </span>
                </div>
                
                <button className="relative p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link to="/profile" className="flex items-center space-x-2 hover:bg-white/10 p-2 rounded-lg transition-colors">
                  <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-pink rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-neon-gradient rounded-lg text-white hover-glow transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-white/20 dark:border-white/10 max-h-screen overflow-y-auto"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Balance for mobile */}
              {isAuthenticated && (
                <div className="glass p-3 rounded-lg mb-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Balance:</span>
                  <span className="ml-2 font-semibold text-neon-blue">
                    ₦{balance.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Navigation Items */}
              {isAuthenticated && (
                <div className="space-y-2">
                  {menuItems.slice(1).map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-neon-gradient text-white'
                            : 'hover:bg-white/10'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}

                  {/* Admin Items */}
                  {user?.role === 'admin' && (
                    <div className="pt-4 border-t border-white/20">
                      {adminItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMenuOpen(false)}
                            className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${
                              isActive
                                ? 'bg-red-500 text-white'
                                : 'hover:bg-red-500/10 hover:text-red-500'
                            }`}
                          >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
              
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                <span>{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    className="block w-full p-2 text-center rounded-lg hover:bg-white/10 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full p-2 text-center bg-neon-gradient rounded-lg text-white hover-glow transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;