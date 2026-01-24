import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Satellite, Users, MapPin as MapPinIcon, AlertCircle } from 'lucide-react';
import './NepalVehicleCard.css';

const NepalVehicleCard = ({ vehicle, onClick }) => {
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

  const getStatusColor = (status) => {
    const colors = {
      'MOVING': '#48bb78',
      'STOPPED': '#ed8936',
      'DELAYED': '#f56565',
      'ENDED': '#a0aec0'
    };
    return colors[status] || '#a0aec0';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#48bb78';
    if (confidence >= 50) return '#ed8936';
    return '#a0aec0';
  };

  const getDataSourceIcon = (source) => {
    const icons = {
      'gps': <Satellite size={14} />,
      'crowd': <Users size={14} />,
      'network': <Wifi size={14} />,
      'landmark': <MapPinIcon size={14} />
    };
    return icons[source];
  };

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
      y: -4,
      boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
      transition: {
        duration: 0.2
      }
    }
  };

  const occupancyPercentage = (vehicle.currentPassengers / vehicle.capacity) * 100;

  return (
    <motion.div
      className="nepal-vehicle-card"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onClick={() => onClick(vehicle)}
    >
      <div className="vehicle-header-nepal">
        <div className="vehicle-type-badge">
          <span className="vehicle-emoji">{getVehicleIcon(vehicle.type)}</span>
          <span className="vehicle-type-text">{vehicle.type}</span>
        </div>
        <div 
          className="confidence-indicator"
          style={{ 
            background: `conic-gradient(${getConfidenceColor(vehicle.confidence)} ${vehicle.confidence * 3.6}deg, #e2e8f0 0deg)` 
          }}
        >
          <div className="confidence-inner">
            {vehicle.confidence}%
          </div>
        </div>
      </div>

      <div className="route-info-nepal">
        <h3>{vehicle.route}</h3>
        <span className="vehicle-number">{vehicle.vehicleNumber}</span>
      </div>

      <div className="next-stop-info">
        <div className="next-stop-label">Next Stop</div>
        <div className="next-stop-name">{vehicle.nextStop}</div>
        <div className="eta-display">{vehicle.eta}</div>
      </div>

      <div className="vehicle-meta">
        <div className="meta-item">
          <span 
            className="status-dot"
            style={{ background: getStatusColor(vehicle.status) }}
          />
          <span>{vehicle.status}</span>
        </div>
        <div className="meta-item last-updated">
          <AlertCircle size={14} />
          <span>{vehicle.lastUpdated}</span>
        </div>
      </div>

      <div className="data-sources">
        {vehicle.dataSources.map((source, index) => (
          <motion.div
            key={source}
            className="data-source-icon"
            title={source}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            {getDataSourceIcon(source)}
          </motion.div>
        ))}
      </div>

      <div className="occupancy-bar-nepal">
        <motion.div
          className={`occupancy-fill-nepal ${occupancyPercentage > 80 ? 'high' : occupancyPercentage > 50 ? 'medium' : 'low'}`}
          initial={{ width: 0 }}
          animate={{ width: `${occupancyPercentage}%` }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>
      <div className="occupancy-info">
        <span>{vehicle.currentPassengers}/{vehicle.capacity} passengers</span>
        <span className="fare-info">{vehicle.fare}</span>
      </div>
    </motion.div>
  );
};

export default NepalVehicleCard;
