import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Smartphone,
  Wifi,
  Zap,
  Tv,
  GraduationCap,
  Plane,
  Wallet,
  History,
  Users,
  MessageCircle,
  Shield
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();

  const menuItems = [
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
    <div className="w-64 glass border-r border-white/20 dark:border-white/10 h-full overflow-y-auto">
      <div className="p-6">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${isActive
                      ? 'bg-neon-gradient text-white shadow-lg'
                      : 'hover:bg-white/10 hover:transform hover:scale-105'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {user?.role === 'admin' && (
          <div className="mt-8 pt-6 border-t border-white/20 dark:border-white/10">
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
              Admin
            </h3>
            <div className="space-y-2">
              {adminItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (menuItems.length + index) * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-3 p-3 rounded-lg transition-all ${isActive
                          ? 'bg-red-500 text-white shadow-lg'
                          : 'hover:bg-red-500/10 hover:text-red-500 hover:transform hover:scale-105'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;