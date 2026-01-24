import React from 'react';
import { motion } from 'framer-motion';
import './StatsCard.css';

const StatsCard = ({ icon: Icon, label, value, color, delay = 0 }) => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: "easeOut"
      }
    }
  };

  const countVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        delay: delay + 0.3
      }
    }
  };

  return (
    <motion.div
      className="stats-card"
      style={{ borderLeftColor: color }}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
        transition: { duration: 0.2 }
      }}
    >
      <div className="stats-icon" style={{ background: color }}>
        <Icon size={24} />
      </div>
      <div className="stats-content">
        <span className="stats-label">{label}</span>
        <motion.span
          className="stats-value"
          variants={countVariants}
        >
          {value}
        </motion.span>
      </div>
    </motion.div>
  );
};

export default StatsCard;
