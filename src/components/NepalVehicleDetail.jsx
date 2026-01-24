import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Users, Navigation, Info, Satellite, Wifi } from 'lucide-react';
import './NepalVehicleDetail.css';

const NepalVehicleDetail = ({ vehicle, onClose }) => {
  if (!vehicle) return null;

  const getVehicleIcon = (type) => {
    const icons = {
      'Bus': '🚌',
      'Micro': '🚐',
      'Tempo': '🛺',
      'Magic': '🚕',
      'Jeep': '🚙'
    };
    return icons[type] || '🚌';
  };

  const getConfidenceExplanation = (confidence, sources) => {
    if (confidence >= 80) {
      return "High accuracy - Multiple live sources confirm location";
    } else if (confidence >= 50) {
      return "Moderate accuracy - Based on recent reports & prediction";
    } else {
      return "Estimated - Based on typical route patterns & crowdsourced data";
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: 50
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="nepal-modal-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="nepal-modal-content"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-button-nepal" onClick={onClose}>
            <X size={24} />
          </button>

          <div className="nepal-modal-header">
            <div className="vehicle-icon-large">
              {getVehicleIcon(vehicle.type)}
            </div>
            <div className="header-info">
              <h2>{vehicle.route}</h2>
              <p className="vehicle-details-text">{vehicle.type} • {vehicle.vehicleNumber}</p>
            </div>
          </div>

          <div className="confidence-section">
            <div className="confidence-badge-large">
              <div 
                className="confidence-circle-large"
                style={{
                  background: `conic-gradient(
                    ${vehicle.confidence >= 80 ? '#48bb78' : vehicle.confidence >= 50 ? '#ed8936' : '#a0aec0'} ${vehicle.confidence * 3.6}deg, 
                    #e2e8f0 0deg
                  )`
                }}
              >
                <div className="confidence-value-large">
                  {vehicle.confidence}%
                </div>
              </div>
              <div className="confidence-text">
                <strong>Location Confidence</strong>
                <p>{getConfidenceExplanation(vehicle.confidence, vehicle.dataSources)}</p>
              </div>
            </div>
          </div>

          <div className="data-sources-section">
            <h4><Info size={16} /> Data Sources</h4>
            <div className="sources-badges">
              {vehicle.dataSources.includes('gps') && (
                <div className="source-badge">
                  <Satellite size={16} /> GPS Tracking
                </div>
              )}
              {vehicle.dataSources.includes('crowd') && (
                <div className="source-badge">
                  <Users size={16} /> Crowd Reports
                </div>
              )}
              {vehicle.dataSources.includes('network') && (
                <div className="source-badge">
                  <Wifi size={16} /> Network Sync
                </div>
              )}
              {vehicle.dataSources.includes('landmark') && (
                <div className="source-badge">
                  <MapPin size={16} /> Landmark Check-in
                </div>
              )}
            </div>
          </div>

          <div className="quick-stats">
            <div className="stat-item-nepal">
              <Clock size={20} />
              <div>
                <span className="stat-label-nepal">ETA</span>
                <span className="stat-value-nepal">{vehicle.eta}</span>
              </div>
            </div>
            <div className="stat-item-nepal">
              <Users size={20} />
              <div>
                <span className="stat-label-nepal">Occupancy</span>
                <span className="stat-value-nepal">{vehicle.currentPassengers}/{vehicle.capacity}</span>
              </div>
            </div>
            <div className="stat-item-nepal">
              <Navigation size={20} />
              <div>
                <span className="stat-label-nepal">Status</span>
                <span className="stat-value-nepal">{vehicle.status}</span>
              </div>
            </div>
          </div>

          <div className="route-stops-section">
            <h3>📍 Route & Stops</h3>
            <div className="stops-timeline">
              {vehicle.route_stops.map((stop, index) => (
                <motion.div
                  key={index}
                  className={`stop-item ${stop.status}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="stop-indicator">
                    {stop.status === 'completed' ? '✓' : stop.status === 'upcoming' ? '📍' : '○'}
                  </div>
                  <div className="stop-content">
                    <div className="stop-name-row">
                      <span className="stop-name">{stop.name}</span>
                      <span className="stop-time">{stop.time}</span>
                    </div>
                    <span className="stop-landmark">{stop.landmark}</span>
                    {stop.status === 'upcoming' && (
                      <motion.span
                        className="next-badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        Next Stop
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="map-section">
            <div className="map-placeholder-nepal">
              <motion.div
                className="location-marker"
                animate={{
                  y: [0, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                📍
              </motion.div>
              <p>Live Location Tracking</p>
              <span className="coordinates-nepal">
                {vehicle.currentLocation.lat.toFixed(4)}, {vehicle.currentLocation.lng.toFixed(4)}
              </span>
              <div className="last-updated-badge">
                Last updated: {vehicle.lastUpdated}
              </div>
            </div>
          </div>

          <div className="additional-info">
            <div className="info-row">
              <span>Fare</span>
              <strong>{vehicle.fare}</strong>
            </div>
            <div className="info-row">
              <span>Crowd Level</span>
              <strong>{vehicle.crowdLevel}</strong>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NepalVehicleDetail;
