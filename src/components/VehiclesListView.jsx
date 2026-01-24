import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, MapPin, Wifi, WifiOff } from 'lucide-react';
import NepalVehicleCard from './NepalVehicleCard';
import './VehiclesListView.css';

const VehiclesListView = ({ destination, vehicles, onBack, onVehicleClick, isOffline }) => {
  const containerRef = useRef(null);
  const { scrollY, scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const mapOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const mapScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const listY = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  return (
    <div className="vehicles-list-view" ref={containerRef}>
      <motion.header
        className="list-header"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.button
          className="back-button"
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
        </motion.button>
        <div className="header-info-section">
          <h2>Going to {destination}</h2>
          <p>{vehicles.length} vehicles available</p>
        </div>
        <div className={`connection-indicator ${isOffline ? 'offline' : 'online'}`}>
          {isOffline ? <WifiOff size={16} /> : <Wifi size={16} />}
        </div>
      </motion.header>

      {isOffline && (
        <motion.div
          className="offline-notice"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          📡 Showing cached & predicted locations
        </motion.div>
      )}

      <motion.div
        className="map-preview-section"
        style={{
          opacity: mapOpacity,
          scale: mapScale
        }}
      >
        <div className="map-preview-placeholder">
          <motion.div
            className="destination-marker"
            animate={{
              y: [0, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            📍
          </motion.div>
          <p className="map-destination-label">{destination}</p>
          <div className="vehicle-markers">
            {vehicles.slice(0, 3).map((vehicle, index) => (
              <motion.div
                key={vehicle.id}
                className="mini-vehicle-marker"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                style={{
                  left: `${20 + index * 25}%`,
                  top: `${40 + index * 10}%`
                }}
              >
                {vehicle.type === 'Bus' ? '🚌' : vehicle.type === 'Micro' ? '🚐' : vehicle.type === 'Tempo' ? '🛺' : vehicle.type === 'Magic' ? '🚕' : '🚙'}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        className="vehicles-container"
        style={{ y: listY }}
      >
        <div className="section-header">
          <h3>🚌 Available Vehicles</h3>
          <p>Tap any vehicle for detailed information</p>
        </div>

        <motion.div
          className="vehicles-grid-nepal"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {vehicles.map((vehicle) => (
            <NepalVehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onClick={onVehicleClick}
            />
          ))}
        </motion.div>

        {vehicles.length === 0 && (
          <motion.div
            className="no-vehicles"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="no-vehicles-icon">🚌</div>
            <h3>No vehicles found</h3>
            <p>Try searching for a different destination</p>
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 1 }}
        animate={{ opacity: scrollYProgress.get() > 0.1 ? 0 : 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓ Scroll for vehicles
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VehiclesListView;
