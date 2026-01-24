import React from 'react';
import { motion } from 'framer-motion';
import { Bus, Train, MapPin, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import './VehicleCard.css';

const VehicleCard = ({ vehicle, type, onClick }) => {
  const Icon = type === 'bus' ? Bus : Train;
  const isDelayed = vehicle.status === 'Delayed';
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      transition: {
        duration: 0.3
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const occupancyPercentage = (vehicle.currentPassengers / vehicle.capacity) * 100;

  return (
    <motion.div
      className="vehicle-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={() => onClick(vehicle)}
    >
      <div className="vehicle-header">
        <div className="vehicle-icon-wrapper">
          <motion.div
            variants={pulseVariants}
            animate="pulse"
            className={`vehicle-icon ${type}`}
          >
            <Icon size={24} />
          </motion.div>
        </div>
        <div className="vehicle-info">
          <h3>{vehicle.name}</h3>
          <span className="vehicle-route">{vehicle.route}</span>
        </div>
        <div className={`status-badge ${isDelayed ? 'delayed' : 'on-time'}`}>
          {isDelayed ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
          {vehicle.status}
        </div>
      </div>

      <div className="vehicle-details">
        <div className="detail-item">
          <MapPin size={18} />
          <div>
            <span className="detail-label">Next Stop</span>
            <span className="detail-value">{vehicle.nextStop}</span>
          </div>
        </div>

        <div className="detail-item">
          <Clock size={18} />
          <div>
            <span className="detail-label">ETA</span>
            <span className="detail-value">{vehicle.eta}</span>
          </div>
        </div>

        <div className="detail-item">
          <Users size={18} />
          <div>
            <span className="detail-label">Occupancy</span>
            <span className="detail-value">
              {vehicle.currentPassengers}/{vehicle.capacity}
            </span>
          </div>
        </div>
      </div>

      <div className="occupancy-bar">
        <motion.div
          className={`occupancy-fill ${occupancyPercentage > 80 ? 'high' : occupancyPercentage > 50 ? 'medium' : 'low'}`}
          initial={{ width: 0 }}
          animate={{ width: `${occupancyPercentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
      <span className="occupancy-label">{Math.round(occupancyPercentage)}% Full</span>
    </motion.div>
  );
};

export default VehicleCard;
