import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Smartphone, 
  Wifi, 
  Zap, 
  Tv, 
  GraduationCap, 
  Plane, 
  Shield, 
  Star,
  CheckCircle,
  Users
} from 'lucide-react';

const Home: React.FC = () => {
  const services = [
    { icon: Smartphone, title: 'Airtime', description: 'Buy airtime for all networks' },
    { icon: Wifi, title: 'Data Bundles', description: 'Purchase data for MTN, Glo, Airtel, 9mobile' },
    { icon: Zap, title: 'Electricity', description: 'Pay electricity bills instantly' },
    { icon: Tv, title: 'TV/Cable', description: 'Subscribe to DStv, GOtv, Startimes' },
    { icon: GraduationCap, title: 'Education', description: 'WAEC, NECO result checker' },
    { icon: Plane, title: 'Flights', description: 'Book domestic & international flights' },
  ];

  const features = [
    { icon: Shield, title: 'Secure', description: 'Bank-level security for all transactions' },
    { icon: Star, title: 'Instant', description: 'Lightning-fast service delivery' },
    { icon: CheckCircle, title: 'Reliable', description: '99.9% uptime guarantee' },
    { icon: Users, title: 'Support', description: '24/7 customer support' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-neon-pink/20 to-neon-purple/20 opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6"
            >
              <span className="gradient-text">VTU Nigeria</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto px-4"
            >
              Your one-stop platform for airtime, data, bills payment, and more. 
              Experience the future of digital transactions.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center px-4"
            >
              <Link
                to="/register"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-neon-gradient rounded-lg text-white font-semibold hover-glow transition-all text-base sm:text-lg"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-6 sm:px-8 py-3 sm:py-4 glass rounded-lg font-semibold hover:bg-white/20 transition-all text-base sm:text-lg"
              >
                Login
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 sm:py-20 bg-white/5 dark:bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Our Services</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Everything you need in one platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass p-4 sm:p-6 rounded-xl hover-glow transition-all group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-neon-gradient rounded-lg flex items-center justify-center mb-4 group-hover:animate-pulse">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{service.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Why Choose Us</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              Built for the modern Nigerian
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center group"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-neon-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-neon-blue/10 via-neon-pink/10 to-neon-purple/10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 gradient-text">Ready to Get Started?</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of satisfied customers already using our platform
            </p>
            <Link
              to="/register"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-neon-gradient rounded-lg text-white font-semibold hover-glow transition-all text-base sm:text-lg"
            >
              Create Your Account
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;