import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import SearchView from './components/SearchView';
import VehiclesListView from './components/VehiclesListView';
import NepalVehicleDetail from './components/NepalVehicleDetail';
import { transportData } from './data/transportData';
import './App.css';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [currentView, setCurrentView] = useState('search'); // 'search', 'list', 'detail'
  const [selectedDestination, setSelectedDestination] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [isOffline, setIsOffline] = useState(false);

  // Simulate offline/online detection
  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial status
    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleEnterApp = () => {
    setShowLanding(false);
  };

  const handleSearch = (destination, startLocation) => {
    setSelectedDestination(destination);
    setCurrentView('list');
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSelectedDestination('');
  };

  const handleVehicleClick = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleCloseDetail = () => {
    setSelectedVehicle(null);
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    }
  };

  if (showLanding) {
    return <LandingPage onEnterApp={handleEnterApp} />;
  }

  return (
    <div className="app-nepal">
      <AnimatePresence mode="wait">
        {currentView === 'search' && (
          <motion.div
            key="search"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SearchView 
              onSearch={handleSearch} 
              isOffline={isOffline}
            />
          </motion.div>
        )}

        {currentView === 'list' && (
          <motion.div
            key="list"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <VehiclesListView
              destination={selectedDestination}
              vehicles={transportData.vehicles}
              onBack={handleBackToSearch}
              onVehicleClick={handleVehicleClick}
              isOffline={isOffline}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {selectedVehicle && (
        <NepalVehicleDetail
          vehicle={selectedVehicle}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
}

export default App;
