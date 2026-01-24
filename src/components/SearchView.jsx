import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Navigation, Wifi, WifiOff } from 'lucide-react';
import './SearchView.css';

const SearchView = ({ onSearch, isOffline }) => {
  const [destination, setDestination] = useState('');
  const [startLocation, setStartLocation] = useState('Current Location');
  const [isEditingStart, setIsEditingStart] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const popularDestinations = [
    { name: 'Ratnapark', icon: '🚌', subtitle: 'Bus Park' },
    { name: 'Thamel', icon: '🏨', subtitle: 'Tourist Area' },
    { name: 'Bhaktapur', icon: '🏛️', subtitle: 'Durbar Square' },
    { name: 'Patan', icon: '🕌', subtitle: 'Durbar Square' },
    { name: 'Koteshwor', icon: '📍', subtitle: 'Chowk' },
    { name: 'Kalanki', icon: '🚏', subtitle: 'Major Hub' },
    { name: 'Lagankhel', icon: '🚍', subtitle: 'Bus Stand' },
    { name: 'Airport', icon: '✈️', subtitle: 'TIA' }
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const handleSearch = () => {
    if (destination.trim()) {
      onSearch(destination, startLocation);
    }
  };

  return (
    <motion.div
      className="search-view"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="search-header">
        <motion.div
          className="app-logo"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          🚌
        </motion.div>
        <div className="header-text">
          <h1>यात्रा साथी</h1>
          <p>Nepal Public Transport Locator</p>
        </div>
        <div className={`connection-status ${isOffline ? 'offline' : 'online'}`}>
          {isOffline ? <WifiOff size={18} /> : <Wifi size={18} />}
        </div>
      </div>

      {isOffline && (
        <motion.div
          className="offline-banner"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📶 Offline - Showing cached & predicted data
        </motion.div>
      )}

      <div className="search-container">
        <motion.div
          className="main-question"
          variants={itemVariants}
        >
          <h2>Where do you want to go?</h2>
        </motion.div>

        <motion.div
          className="search-input-wrapper destination"
          variants={itemVariants}
        >
          <Search size={20} />
          <input
            type="text"
            placeholder="Enter destination (e.g., Bhaktapur)"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </motion.div>

        <motion.div
          className="search-input-wrapper start"
          variants={itemVariants}
          onClick={() => setIsEditingStart(true)}
        >
          <Navigation size={20} />
          {isEditingStart ? (
            <input
              type="text"
              placeholder="Enter starting point"
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              onBlur={() => setIsEditingStart(false)}
              autoFocus
            />
          ) : (
            <span>{startLocation}</span>
          )}
          <MapPin size={16} className="location-icon" />
        </motion.div>

        <motion.button
          className="search-button"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSearch}
          disabled={!destination.trim()}
        >
          Find Transport
        </motion.button>
      </div>

      <motion.div
        className="popular-destinations"
        variants={containerVariants}
      >
        <h3>Popular Destinations</h3>
        <div className="destinations-grid">
          {popularDestinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              className="destination-card"
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setDestination(dest.name);
                handleSearch();
              }}
            >
              <span className="dest-icon">{dest.icon}</span>
              <div className="dest-info">
                <span className="dest-name">{dest.name}</span>
                <span className="dest-subtitle">{dest.subtitle}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="info-section"
        variants={itemVariants}
      >
        <div className="info-card">
          <h4>🎯 How it works</h4>
          <ul>
            <li>Enter where you want to go</li>
            <li>See vehicles coming to your area</li>
            <li>Check confidence & ETA</li>
            <li>Track in real-time or offline</li>
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchView;
