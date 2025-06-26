import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, MapPin, Users, ArrowLeftRight } from 'lucide-react';
import toast from 'react-hot-toast';

const Flights: React.FC = () => {
  const [tripType, setTripType] = useState('round-trip');
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState('economy');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const cities = [
    { code: 'LOS', name: 'Lagos', country: 'Nigeria' },
    { code: 'ABV', name: 'Abuja', country: 'Nigeria' },
    { code: 'PHC', name: 'Port Harcourt', country: 'Nigeria' },
    { code: 'KAN', name: 'Kano', country: 'Nigeria' },
    { code: 'IBD', name: 'Ibadan', country: 'Nigeria' },
    { code: 'LHR', name: 'London', country: 'United Kingdom' },
    { code: 'JFK', name: 'New York', country: 'United States' },
    { code: 'DXB', name: 'Dubai', country: 'UAE' },
    { code: 'CDG', name: 'Paris', country: 'France' },
    { code: 'FRA', name: 'Frankfurt', country: 'Germany' },
  ];

  const mockFlights = [
    {
      id: 1,
      airline: 'Air Peace',
      logo: '✈️',
      departure: '08:30',
      arrival: '10:45',
      duration: '2h 15m',
      price: 85000,
      stops: 'Direct',
      aircraft: 'Boeing 737'
    },
    {
      id: 2,
      airline: 'Arik Air',
      logo: '🛩️',
      departure: '14:20',
      arrival: '16:50',
      duration: '2h 30m',
      price: 92000,
      stops: 'Direct',
      aircraft: 'Airbus A320'
    },
    {
      id: 3,
      airline: 'Dana Air',
      logo: '✈️',
      departure: '18:15',
      arrival: '20:35',
      duration: '2h 20m',
      price: 78000,
      stops: 'Direct',
      aircraft: 'Boeing 737'
    },
  ];

  const handleSearch = async () => {
    if (!fromCity || !toCity || !departDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (tripType === 'round-trip' && !returnDate) {
      toast.error('Please select return date for round trip');
      return;
    }

    setIsSearching(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSearchResults(mockFlights);
      toast.success('Flights found!');
    } catch (error) {
      toast.error('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleBookFlight = (flight: any) => {
    toast.success(`Booking ${flight.airline} flight for ₦${flight.price.toLocaleString()}`);
    // In a real app, this would redirect to booking page
  };

  const swapCities = () => {
    const temp = fromCity;
    setFromCity(toCity);
    setToCity(temp);
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
            <Plane className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold gradient-text">Flight Booking</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Search and book domestic and international flights
        </p>
      </motion.div>

      {/* Search Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass p-6 rounded-xl"
      >
        <h2 className="text-xl font-semibold mb-4">Search Flights</h2>
        
        {/* Trip Type */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setTripType('round-trip')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                tripType === 'round-trip'
                  ? 'border-neon-blue bg-neon-blue/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              Round Trip
            </button>
            <button
              onClick={() => setTripType('one-way')}
              className={`px-4 py-2 rounded-lg border-2 transition-all ${
                tripType === 'one-way'
                  ? 'border-neon-blue bg-neon-blue/10'
                  : 'border-white/20 hover:border-white/40'
              }`}
            >
              One Way
            </button>
          </div>
        </div>

        {/* Cities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
              >
                <option value="">Select departure city</option>
                {cities.map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.name} ({city.code}) - {city.country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-2">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={toCity}
                onChange={(e) => setToCity(e.target.value)}
                className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
              >
                <option value="">Select destination city</option>
                {cities.map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.name} ({city.code}) - {city.country}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={swapCities}
              className="absolute right-2 top-8 p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Swap cities"
            >
              <ArrowLeftRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Departure Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
              />
            </div>
          </div>

          {tripType === 'round-trip' && (
            <div>
              <label className="block text-sm font-medium mb-2">Return Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  min={departDate || new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                />
              </div>
            </div>
          )}
        </div>

        {/* Passengers and Class */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">Passengers</label>
            <div className="relative">
              <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                value={passengers}
                onChange={(e) => setPassengers(parseInt(e.target.value))}
                className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Passenger' : 'Passengers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Class</label>
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
              className="w-full px-4 py-3 glass rounded-lg border border-white/20 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
            >
              <option value="economy">Economy</option>
              <option value="premium-economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First Class</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="w-full py-3 bg-neon-gradient rounded-lg text-white font-semibold hover-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSearching ? 'Searching Flights...' : 'Search Flights'}
        </button>
      </motion.div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-6 rounded-xl"
        >
          <h2 className="text-xl font-semibold mb-4">
            Available Flights ({searchResults.length})
          </h2>
          
          <div className="space-y-4">
            {searchResults.map((flight, index) => (
              <motion.div
                key={flight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-white/20 rounded-lg hover:border-neon-blue/50 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{flight.logo}</div>
                    <div>
                      <p className="font-semibold">{flight.airline}</p>
                      <p className="text-sm text-gray-500">{flight.aircraft}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-8">
                    <div className="text-center">
                      <p className="text-lg font-semibold">{flight.departure}</p>
                      <p className="text-sm text-gray-500">{fromCity}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-500">{flight.duration}</p>
                      <div className="w-16 h-px bg-gray-300 my-1"></div>
                      <p className="text-xs text-gray-400">{flight.stops}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-lg font-semibold">{flight.arrival}</p>
                      <p className="text-sm text-gray-500">{toCity}</p>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-neon-blue">
                        ₦{flight.price.toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleBookFlight(flight)}
                        className="mt-2 px-4 py-2 bg-neon-gradient rounded-lg text-white text-sm hover-glow transition-all"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Demo Notice */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass p-6 rounded-xl border-2 border-yellow-500/20 bg-yellow-500/5"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
            <span className="text-yellow-500 text-sm">💡</span>
          </div>
          <div>
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-400">Demo Mode</h3>
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              This is a demo flight booking system. No real bookings will be processed.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Flights;