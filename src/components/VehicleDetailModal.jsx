import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Clock, Users, Navigation, CheckCircle2, Circle } from 'lucide-react';
import './VehicleDetailModal.css';

const VehicleDetailModal = ({ vehicle, type, onClose }) => {
  if (!vehicle) return null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
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
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 }
    }
  };

  const scheduleItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4
      }
    })
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 2,
        ease: "easeOut"
      }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>

          <div className="modal-header">
            <div className={`modal-icon ${type}`}>
              {type === 'bus' ? '🚌' : '🚆'}
            </div>
            <div>
              <h2>{vehicle.name}</h2>
              <p className="modal-route">{vehicle.route} - ID: {vehicle.id}</p>
            </div>
          </div>

          <div className="modal-stats">
            <div className="stat-card">
              <MapPin size={20} />
              <div>
                <span className="stat-label">Current Location</span>
                <span className="stat-value">Near {vehicle.nextStop}</span>
              </div>
            </div>

            <div className="stat-card">
              <Clock size={20} />
              <div>
                <span className="stat-label">Arrival Time</span>
                <span className="stat-value">{vehicle.eta}</span>
              </div>
            </div>

            <div className="stat-card">
              <Users size={20} />
              <div>
                <span className="stat-label">Passengers</span>
                <span className="stat-value">{vehicle.currentPassengers} / {vehicle.capacity}</span>
              </div>
            </div>

            <div className="stat-card">
              <Navigation size={20} />
              <div>
                <span className="stat-label">Status</span>
                <span className={`stat-value ${vehicle.status === 'Delayed' ? 'delayed' : 'on-time'}`}>
                  {vehicle.status}
                </span>
              </div>
            </div>
          </div>

          <div className="route-progress">
            <h3>Route Progress</h3>
            <motion.div 
              className="progress-bar-container"
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="progress-bar-fill"
                variants={progressVariants}
              />
            </motion.div>
          </div>

          <div className="schedule-section">
            <h3>Schedule & Stops</h3>
            <div className="schedule-list">
              {vehicle.schedule.map((stop, index) => (
                <motion.div
                  key={index}
                  className={`schedule-item ${stop.status}`}
                  custom={index}
                  variants={scheduleItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="schedule-icon">
                    {stop.status === 'completed' ? (
                      <CheckCircle2 size={20} className="completed-icon" />
                    ) : stop.status === 'upcoming' ? (
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      >
                        <Circle size={20} className="upcoming-icon" />
                      </motion.div>
                    ) : (
                      <Circle size={20} className="pending-icon" />
                    )}
                  </div>
                  <div className="schedule-info">
                    <span className="schedule-stop">{stop.stop}</span>
                    <span className="schedule-time">{stop.time}</span>
                  </div>
                  {stop.status === 'upcoming' && (
                    <motion.div
                      className="upcoming-badge"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      Next
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div className="location-map">
            <div className="map-placeholder">
              <motion.div
                className="location-pin"
                animate={{
                  y: [0, -10, 0],
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
              <span className="coordinates">
                {vehicle.currentLocation.lat.toFixed(4)}, {vehicle.currentLocation.lng.toFixed(4)}
              </span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VehicleDetailModal;
