import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './LandingPage.css';

const LandingPage = ({ onEnterApp }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const containerRef = useRef(null);
  const pages = 9;

  const navigateToPage = (pageIndex) => {
    const container = containerRef.current;
    if (!container) return;
    const newPage = Math.max(0, Math.min(pages - 1, pageIndex));
    setCurrentPage(newPage);
    container.style.transform = `translateY(-${newPage * 100}vh)`;
  };

  // Load images after 1 second to reduce initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isScrolling = false;
    let scrollTimeout;
    let accumulatedDelta = 0;

    const handleScroll = (e) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      // Accumulate scroll delta for touchpad
      accumulatedDelta += e.deltaY;
      
      // Clear accumulated delta after a short delay
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        accumulatedDelta = 0;
      }, 100);

      // Only trigger if accumulated scroll is significant enough
      if (Math.abs(accumulatedDelta) < 50) {
        e.preventDefault();
        return;
      }

      const direction = accumulatedDelta > 0 ? 1 : -1;
      const newPage = Math.max(0, Math.min(pages - 1, currentPage + direction));
      
      if (newPage !== currentPage) {
        isScrolling = true;
        accumulatedDelta = 0;
        setCurrentPage(newPage);
        container.style.transform = `translateY(-${newPage * 100}vh)`;
        
        // Reset scrolling flag after animation
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
      e.preventDefault();
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [currentPage, pages]);

  const pageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <div className="landing-container">
      {/* Navigation Arrows */}
      <div className="navigation-arrows">
        <motion.button
          className="nav-arrow prev"
          onClick={() => navigateToPage(currentPage - 1)}
          disabled={currentPage === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={24} />
        </motion.button>
        <motion.button
          className="nav-arrow nav-down"
          onClick={() => navigateToPage(currentPage + 1)}
          disabled={currentPage === pages - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronDown size={24} />
        </motion.button>
      </div>

      {/* Page Indicators */}
      <div className="page-indicators">
        {[...Array(pages)].map((_, index) => (
          <div
            key={index}
            className={`page-indicator ${currentPage === index ? 'active' : ''}`}
            onClick={() => navigateToPage(index)}
          >
            <span className="page-number">{index + 1}</span>
          </div>
        ))}
      </div>

      {/* Pages Container */}
      <div className="pages-wrapper" ref={containerRef}>
        
        {/* PAGE 1 - Introduction */}
        <motion.section
          className="landing-page page-1"
          initial="hidden"
          animate={currentPage === 0 ? "visible" : "hidden"}
          variants={pageVariants}
        >
          <div className="map-background">
            <svg className="map-lines" viewBox="0 0 1200 800">
              <motion.path
                d="M 100 400 Q 300 200, 500 400 T 900 400"
                stroke="white"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.path
                d="M 200 300 Q 400 500, 600 300 T 1000 300"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              />
            </svg>
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="moving-dot"
                style={{
                  left: `${10 + i * 12}%`,
                  top: `${30 + (i % 3) * 20}%`
                }}
                animate={{
                  x: [0, 100, 0],
                  y: [0, -50, 0]
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </div>
          <motion.h1
            className="main-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            A Public Transportation
            <br />
            Locator System for Nepal
          </motion.h1>
          <motion.p
            className="subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Designed for real-world conditions. Built for low connectivity.
            <br />
            Made for everyday commuters.
          </motion.p>
          <motion.button
            className="download-report-button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const link = document.createElement('a');
              link.href = './report.pdf';
              link.download = 'Public_Transportation_Planning_Report_Nepal.pdf';
              link.target = '_blank';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
          >
            📄 Download Planning Report
          </motion.button>
          <motion.div
            className="scroll-hint"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.section>

        {/* PAGE 2 - Platform Compatibility */}
        <motion.section
          className="landing-page page-2"
          initial="hidden"
          animate={currentPage === 1 ? "visible" : "hidden"}
          variants={pageVariants}
        >
          <motion.h2
            className="page-title"
            initial={{ opacity: 0, y: 20 }}
            animate={currentPage === 1 ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            One system. Multiple platforms.
          </motion.h2>
          <div className="platforms-grid">
            {[
              { icon: '🤖', name: 'Android', delay: 0.5 },
              { icon: '🍎', name: 'iOS', delay: 0.7 },
              { icon: '🌐', name: 'Web App', delay: 0.9 }
            ].map((platform, i) => (
              <motion.div
                key={i}
                className="platform-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={currentPage === 1 ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: platform.delay, duration: 0.6 }}
              >
                <div className="platform-icon">{platform.icon}</div>
                <div className="platform-device">
                  {i === 0 && (
                    <div className="device-frame android">
                      <div className="device-screen">
                        <div className="platform-logo">🤖</div>
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <div className="device-frame ios">
                      <div className="device-screen">
                        <div className="platform-logo">🍎</div>
                      </div>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="device-frame web">
                      <div className="device-screen">
                        <div className="platform-logo">💻</div>
                      </div>
                    </div>
                  )}
                </div>
                <p className="platform-name">{platform.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* PAGE 3 - App Experience */}
        <motion.section
          className="landing-page page-3"
          initial="hidden"
          animate={currentPage === 2 ? "visible" : "hidden"}
          variants={pageVariants}
        >
          <motion.h2
            className="page-title"
            initial={{ opacity: 0 }}
            animate={currentPage === 2 ? { opacity: 1 } : {}}
          >
            Simple. Direct. Effective.
          </motion.h2>
          <div className="app-screens">
            <motion.div
              className="phone-mockup"
              initial={{ x: -100, opacity: 0 }}
              animate={currentPage === 2 ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="phone-frame">
                <div className="screen-content search-screen">
                  <div className="search-box">
                    <input type="text" placeholder="Where do you want to go?" readOnly />
                  </div>
                  <div className="mini-map" />
                </div>
              </div>
              <p className="screen-label">Search</p>
            </motion.div>

            <motion.div
              className="phone-mockup"
              initial={{ x: 100, opacity: 0 }}
              animate={currentPage === 2 ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="phone-frame">
                <div className="screen-content results-screen">
                  <div className="result-item">
                    <span>Bus 123</span>
                    <span>10 min</span>
                  </div>
                  <div className="result-item">
                    <span>Van 02</span>
                    <span>15 min</span>
                  </div>
                  <div className="result-item">
                    <span>Micro 45</span>
                    <span>8 min</span>
                  </div>
                </div>
              </div>
              <p className="screen-label">Results</p>
            </motion.div>
          </div>
          <motion.p
            className="explanation-text"
            initial={{ opacity: 0 }}
            animate={currentPage === 2 ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            The system finds vehicles that will reach your starting point.
          </motion.p>
        </motion.section>

        {/* PAGE 4 - Tracking Sources */}
        <motion.section
          className="landing-page page-4"
          initial="hidden"
          animate={currentPage === 3 ? "visible" : "hidden"}
          variants={pageVariants}
        >
          <motion.h2
            className="page-title"
            initial={{ opacity: 0 }}
            animate={currentPage === 3 ? { opacity: 1 } : {}}
          >
            Multi-Source Tracking
          </motion.h2>
          <div className="tracking-diagram">
            <div className="central-icon">🚌</div>
            {[
              { label: 'Driver GPS', x: 280, xMobile: 100, y: 0, yMobile: 0 },
              { label: 'Conductor GPS', x: 0, xMobile: 0, y: 210, yMobile: 100 },
              { label: 'Passenger Pooling', x: -310, xMobile: -120, y: 0, yMobile: 0 },
              { label: 'BLE Mesh', x: 0, xMobile: 0, y: -210, yMobile: -100 }
            ].map((source, i) => {
              const isMobile = typeof window !== 'undefined' && window.innerWidth <= 480;
              const offsetX = isMobile ? source.xMobile : source.x;
              const offsetY = isMobile ? source.yMobile : source.y;
              
              return (
                <motion.div
                  key={i}
                  className="source-node"
                  style={{
                    left: `calc(50% + ${offsetX}px)`,
                    top: `calc(50% + ${offsetY}px)`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={currentPage === 3 ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.6 }}
                >
                  <div className="source-label">{source.label}</div>
                  <motion.div
                    className="connection-line"
                    style={{
                      width: Math.abs(offsetX) || Math.abs(offsetY),
                      left: offsetX > 0 ? 'auto' : '50%',
                      right: offsetX > 0 ? '50%' : 'auto',
                      top: offsetY !== 0 ? (offsetY > 0 ? 'auto' : '50%') : '50%',
                      bottom: offsetY > 0 ? '50%' : 'auto',
                      transform: offsetY !== 0 ? 'rotate(90deg)' : 'none',
                      transformOrigin: 'center center'
                    }}
                    initial={{ scaleX: 0 }}
                    animate={currentPage === 3 ? { scaleX: 1 } : {}}
                    transition={{ delay: 0.8 + i * 0.15, duration: 0.5 }}
                  />
                </motion.div>
              );
            })}
          </div>
          <motion.p
            className="explanation-text"
            initial={{ opacity: 0 }}
            animate={currentPage === 3 ? { opacity: 1 } : {}}
            transition={{ delay: 1.2 }}
          >
            The system does not rely on a single source.
            <br />
            It combines multiple signals to estimate vehicle location.
          </motion.p>
        </motion.section>

        {/* PAGE 5 - Connectivity */}
        <motion.section
          className="landing-page page-5"
          initial="hidden"
          animate={currentPage === 4 ? "visible" : "hidden"}
          variants={pageVariants}
        >
          <motion.h2
            className="page-title"
            initial={{ opacity: 0 }}
            animate={currentPage === 4 ? { opacity: 1 } : {}}
          >
            Built for Low Connectivity
          </motion.h2>
          <div className="connectivity-features">
            {[
              'Internet partner collaboration',
              'Cell tower based location',
              'BLE mesh data sharing',
              'One connected device uploads for others'
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="feature-item"
                initial={{ opacity: 0, x: -30 }}
                animate={currentPage === 4 ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6 }}
              >
                <div className="feature-dot" />
                <p>{feature}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="data-flow-diagram"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={currentPage === 4 ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            <div className="flow-row">
              <div className="flow-node">📱</div>
              <div className="flow-node">📱</div>
              <div className="flow-node connected">📱</div>
              <div className="flow-node">📱</div>
            </div>
            <div className="flow-arrow">→</div>
            <div className="flow-node server">🖥️</div>
          </motion.div>
          <motion.p
            className="explanation-text"
            initial={{ opacity: 0 }}
            animate={currentPage === 4 ? { opacity: 1 } : {}}
            transition={{ delay: 1.3 }}
          >
            The system is designed to work even when internet access is limited.
          </motion.p>
        </motion.section>

        {/* PAGE 6 - Public Display Vision */}
        <motion.section
          className="landing-page page-6"
          initial="hidden"
          animate={currentPage === 5 ? "visible" : "hidden"}
          variants={pageVariants}
        >
          <motion.h2
            className="page-title"
            initial={{ opacity: 0 }}
            animate={currentPage === 5 ? { opacity: 1 } : {}}
          >
            Future Vision
          </motion.h2>
          <motion.div
            className="public-display-mockup"
            initial={{ opacity: 0, y: 30 }}
            animate={currentPage === 5 ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <div className="display-frame">
              <div className="display-header">Bus Stop Information</div>
              <div className="display-content">
                <div className="display-map" />
                <div className="display-list">
                  <div className="display-item">Route 42 • 5 min</div>
                  <div className="display-item">Route 15 • 12 min</div>
                  <div className="display-item">Route 88 • 8 min</div>
                </div>
              </div>
              <div className="display-ads">Ad Space</div>
            </div>
          </motion.div>
          <motion.p
            className="explanation-text"
            initial={{ opacity: 0 }}
            animate={currentPage === 5 ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            In the future, public displays can show live transport information
            <br />
            at bus stops and public places.
          </motion.p>
          <motion.p
            className="future-note"
            initial={{ opacity: 0 }}
            animate={currentPage === 5 ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
          >
            This phase will be introduced after system maturity.
          </motion.p>
        </motion.section>

        {/* PAGE 7 - Different Apps */}
        <motion.section
          className="landing-page page-7"
          initial="hidden"
          animate={currentPage === 6 ? "visible" : "hidden"}
          variants={pageVariants}
        >
          <motion.h2
            className="page-title"
            initial={{ opacity: 0 }}
            animate={currentPage === 6 ? { opacity: 1 } : {}}
          >
            Tailored for Each User
          </motion.h2>
          <div className="apps-comparison">
            <motion.div
              className="app-type-card"
              initial={{ x: -100, opacity: 0 }}
              animate={currentPage === 6 ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <div className="app-icon">👥</div>
              <h3>Public App</h3>
              <ul className="app-features">
                <li>Search destinations</li>
                <li>Find nearest vehicles</li>
                <li>View live locations</li>
                <li>Confidence indicators</li>
                <li>Offline route cache</li>
                <li>Crowdsourced updates</li>
              </ul>
            </motion.div>
            <motion.div
              className="app-type-card"
              initial={{ x: 100, opacity: 0 }}
              animate={currentPage === 6 ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <div className="app-icon">🚗</div>
              <h3>Driver App</h3>
              <ul className="app-features">
                <li>GPS tracking</li>
                <li>Route management</li>
                <li>Passenger notifications</li>
                <li>Low-data mode</li>
                <li>Offline operation</li>
                <li>Earning analytics</li>
              </ul>
            </motion.div>
          </div>
          <motion.p
            className="explanation-text"
            initial={{ opacity: 0 }}
            animate={currentPage === 6 ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Two apps. One ecosystem. Different needs met perfectly.
          </motion.p>
        </motion.section>

        {/* PAGE 8 - Screenshots */}
        <motion.section
          className="landing-page page-8"
          initial="hidden"
          animate={currentPage === 7 ? "visible" : "hidden"}
          variants={pageVariants}
        >
          <motion.h2
            className="page-title"
            initial={{ opacity: 0 }}
            animate={currentPage === 7 ? { opacity: 1 } : {}}
          >
            App Interface Preview
          </motion.h2>
          <div className="screenshots-grid">
            {imagesLoaded ? [
              { src: './assets/Screenshot_20260128-161714_Trebuchet.png', alt: 'App Screenshot 1' },
              { src: './assets/Screenshot_20260128-161806_Trebuchet.png', alt: 'App Screenshot 2' },
              { src: './assets/Screenshot_20260128-161820_Trebuchet.png', alt: 'App Screenshot 3' }
            ].map((screenshot, i) => (
              <motion.div
                key={i}
                className="screenshot-container"
                initial={{ opacity: 0, y: 30 }}
                animate={currentPage === 7 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
              >
                <img 
                  src={screenshot.src} 
                  alt={screenshot.alt} 
                  className="screenshot-img"
                  onError={(e) => {
                    console.error('Failed to load image:', screenshot.src);
                    e.target.style.display = 'none';
                  }}
                />
              </motion.div>
            )) : (
              <div className="loading-placeholder">Loading screenshots...</div>
            )}
          </div>
          <motion.p
            className="explanation-text"
            initial={{ opacity: 0 }}
            animate={currentPage === 7 ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Real interface design for the public transportation app.
          </motion.p>
        </motion.section>

        {/* PAGE 9 - Impact */}
        <motion.section
          className="landing-page page-9"
          initial="hidden"
          animate={currentPage === 8 ? "visible" : "hidden"}
          variants={pageVariants}
        >
          <motion.h2
            className="page-title impact-title"
            initial={{ opacity: 0 }}
            animate={currentPage === 8 ? { opacity: 1 } : {}}
          >
            Why This Matters
          </motion.h2>
          <div className="impact-points">
            {[
              'Public transport is used by millions in Nepal',
              'Lack of information causes daily inconvenience',
              'This system fits today\'s technology reality',
              'Can scale across Asian countries with similar conditions'
            ].map((point, i) => (
              <motion.div
                key={i}
                className="impact-item"
                initial={{ opacity: 0, y: 20 }}
                animate={currentPage === 8 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.6 }}
              >
                <div className="impact-number">{i + 1}</div>
                <p>{point}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            className="final-statement"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={currentPage === 8 ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <h3>This is not just an app.</h3>
            <h3>It is a transportation intelligence system.</h3>
          </motion.div>
          <motion.button
            className="enter-app-button"
            initial={{ opacity: 0, y: 20 }}
            animate={currentPage === 8 ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.6, duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEnterApp}
          >
            Experience the System
          </motion.button>

          <motion.footer
            className="landing-footer"
            initial={{ opacity: 0 }}
            animate={currentPage === 8 ? { opacity: 1 } : {}}
            transition={{ delay: 2, duration: 0.6 }}
          >
            <div className="footer-content">
              <div className="founder-info">
                <h4>Founder</h4>
                <p className="founder-name">Manish Ghimire</p>
              </div>
              <div className="contact-info">
                <a href="https://manishghimire.info.np" target="_blank" rel="noopener noreferrer" className="contact-link">🌐 manishghimire.info.np</a>
              </div>
            </div>
          </motion.footer>
        </motion.section>
      </div>
    </div>
  );
};

export default LandingPage;
