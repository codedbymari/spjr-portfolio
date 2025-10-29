// src/components/pages/MusicPage.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../common/Header';
import EmailGate from '../EmailGate';
import { hasMusicAccess } from '../../services/storageService';

const MusicPage = ({ currentPage, onNavigate, isLoadingComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const { isDark, colors } = useTheme();
  
  // Check access on mount
  useEffect(() => {
    const checkAccess = () => {
      const access = hasMusicAccess();
      setHasAccess(access);
      setIsCheckingAccess(false);
    };
    
    // Small delay to prevent flash
    setTimeout(checkAccess, 100);
  }, []);
  
  // Handle successful verification
  const handleVerified = () => {
    setHasAccess(true);
  };
  
  // Animation helper functions
  const getInitialState = (props) => {
    if (!isLoadingComplete) {
      return { opacity: 0, y: 100 };
    }
    return props;
  };

  const getAnimateState = (props) => {
    if (!isLoadingComplete) {
      return { opacity: 0, y: 100 };
    }
    return props;
  };

  // Music projects data (6 tracks) - ordered by number
  const musicItems = [
    {
      id: 'tucker-1955',
      title: 'Tucker 1955',
      imageSrc: './assets/images/tucker.webp',
      number: '1'
    },
    {
      id: 'great-expectation',
      title: 'Great Expectation',
      imageSrc: './assets/images/greatexpec.png',
      number: '2'
    },
    {
      id: 'practice',
      title: 'Practice',
      imageSrc: './assets/images/practice-p.webp',
      number: '3'
    },
    {
      id: 'son-of-a-farmer',
      title: 'Son of a Farmer',
      imageSrc: './assets/images/sofaf.webp',
      number: '4'
    },
    {
      id: 'crossroads-to-home',
      title: 'Crossroads to Home',
      imageSrc: './assets/images/crossroads.webp',
      number: '5'
    },
    {
      id: 'with-intentions',
      title: 'With intentions ft. Practice',
      imageSrc: './assets/images/withintens.webp',
      number: '6'
    }
  ];
  
  // Custom project grid for music
  const MusicGrid = ({ items, sectionDelay = 0 }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            className="group relative cursor-pointer"
            initial={getInitialState({ opacity: 0, y: 60 })}
            whileInView={getAnimateState({ opacity: 1, y: 0 })}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1], 
              delay: isLoadingComplete ? sectionDelay + (index * 0.05) : 0 
            }}
            viewport={{ once: true, margin: '-50px' }}
            whileHover={{ scale: 1.02 }}
            onClick={() => onNavigate(item.id)}
          >
            <div className="aspect-square w-full relative overflow-hidden rounded-sm">
              <div 
                className="absolute inset-0 z-0"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                  opacity: 0.1
                }}
              />
              <img
                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.02]"
                src={item.imageSrc}
                alt={item.title}
                style={{
                  filter: isDark ? 'brightness(0.95)' : 'brightness(1.05)'
                }}
              />
            </div>
            
            <div className="flex items-start justify-start w-full pt-3 md:pt-4 overflow-hidden">
              <span 
                className="font-normal tracking-[-0.01em] uppercase transition-colors duration-300"
                style={{
                  color: colors.text.primary,
                  fontSize: 'clamp(10px, 2.2vw, 13px)',
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale'
                }}
              >
                {item.number}
              </span>
              <span 
                className="font-normal tracking-[-0.01em] uppercase mx-2 transition-colors duration-300"
                style={{
                  color: colors.text.primary,
                  fontSize: 'clamp(10px, 2.2vw, 13px)',
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  WebkitFontSmoothing: 'antialiased',
                  MozOsxFontSmoothing: 'grayscale'
                }}
              >
                /
              </span>
              <div className="flex-1 relative h-[14px] sm:h-[15px] md:h-[16px] overflow-hidden">
                <motion.div 
                  className="absolute top-0 left-0 font-normal tracking-[-0.01em] uppercase leading-none transition-colors duration-300"
                  style={{
                    color: colors.text.primary,
                    fontSize: 'clamp(10px, 2.2vw, 13px)',
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                  }}
                  initial={{ opacity: 1, y: 0 }}
                  whileHover={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  {item.title}
                </motion.div>
                <motion.div 
                  className="absolute top-0 left-0 font-normal tracking-[-0.01em] uppercase leading-none transition-colors duration-300"
                  style={{
                    color: colors.text.primary,
                    fontSize: 'clamp(10px, 2.2vw, 13px)',
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                >
                  VIEW PROJECT
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Show loading state briefly
  if (isCheckingAccess) {
    return (
      <div 
        className="w-screen min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.primary }}
      >
        <div
          className="animate-pulse uppercase tracking-wide"
          style={{
            color: colors.text.primary,
            opacity: 0.5,
            fontSize: 'clamp(10px, 2vw, 12px)',
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div 
      className="w-screen min-h-screen overflow-x-hidden relative transition-colors duration-500"
      style={{ 
        backgroundColor: colors.primary,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
      }}
    >
      <AnimatePresence mode="wait">
        {!hasAccess ? (
          <EmailGate key="email-gate" onVerified={handleVerified} />
        ) : (
          <motion.div
            key="music-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Header 
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
              currentPage={currentPage}
              onNavigate={onNavigate}
              isHeroLoaded={true}
            />
            
            {/* Main Content Container */}
            <div className="flex flex-col items-center justify-start px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-16 sm:py-20 md:py-24">
              {/* Page Title */}
              <motion.div
                className="mb-16 sm:mb-20 md:mb-24"
                initial={getInitialState({ opacity: 0, y: 60 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 0.5 : 0 
                }}
                viewport={{ once: true }}
              >
                <h1 
                  className="font-light tracking-[-0.02em] uppercase text-center transition-colors duration-500"
                  style={{
                    color: colors.text.primary,
                    fontSize: 'clamp(32px, 8.5vw, 72px)',
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                    fontWeight: 400,
                    letterSpacing: '-0.03em',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                  }}
                >
                  MUSIC
                </h1>
              </motion.div>

              {/* Content Container */}
              <div className="w-full max-w-[1200px]">
                {/* Music Section */}
                <div className="space-y-12 sm:space-y-14 md:space-y-16">
                  {/* Music Section Title */}
                  <motion.div
                    className="relative"
                    initial={getInitialState({ opacity: 0, y: 40 })}
                    whileInView={getAnimateState({ opacity: 1, y: 0 })}
                    transition={{ 
                      duration: 1.5, 
                      ease: [0.16, 1, 0.3, 1], 
                      delay: isLoadingComplete ? 0.7 : 0 
                    }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center justify-start mb-2">
                      <div 
                        className="w-8 sm:w-10 md:w-12 h-[1px] mr-4 sm:mr-5 md:mr-6 transition-colors duration-500"
                        style={{ backgroundColor: colors.text.primary, opacity: 0.3 }}
                      ></div>
                      <h2 
                        className="font-light tracking-[-0.01em] uppercase transition-colors duration-500"
                        style={{
                          color: colors.text.primary,
                          fontSize: 'clamp(18px, 4.5vw, 32px)',
                          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                          fontWeight: 300,
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale'
                        }}
                      >
                        TRACKS & COLLABORATIONS
                      </h2>
                    </div>
                    <p 
                      className="uppercase tracking-[-0.01em] ml-12 sm:ml-14 md:ml-18 transition-colors duration-500"
                      style={{
                        color: colors.text.primary,
                        opacity: 0.6,
                        fontSize: 'clamp(10px, 2.5vw, 14px)',
                        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale'
                      }}
                    >
                      FEATURES, COLLABORATIONS & UNRELEASED TRACKS
                    </p>
                  </motion.div>
                  
                  {/* Music Projects Grid */}
                  <MusicGrid items={musicItems} sectionDelay={0.3} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Global styles */}
      <style jsx="true">{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        }
      `}</style>
    </div>
  );
};

export default MusicPage;