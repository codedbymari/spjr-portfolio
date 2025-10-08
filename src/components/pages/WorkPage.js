// src/components/pages/WorkPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../common/Header';

const WorkPage = ({ currentPage, onNavigate, isLoadingComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, colors } = useTheme();
  
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

  // Writing/Stories projects data (5 stories)
  const writingItems = [
    {
      id: 'ricos-story',
      title: 'Rico\'s Story',
      videoSrc: './assets/videos/rico.mp4',
      number: '1',
      isVideo: true,
      isFeatured: true
    },
    {
      id: 'ocean',
      title: 'The Ocean',
      imageSrc: './assets/images/ocean.jpeg',
      number: '2'
    },
    {
      id: 'mphepo',
      title: 'Mphepo',
      imageSrc: './assets/images/tree.png',
      number: '3'
    },
    {
      id: 'power-grace',
      title: 'Power × Grace',
      imageSrc: './assets/images/powerxgrace.png',
      number: '4'
    },
    {
      id: 'poetry-in-motion',
      title: 'Poetry in Motion',
      imageSrc: './assets/images/solokitchen.png',
      number: '5'
    }
  ];

  // Custom project grid
  const ProjectGrid = ({ items, sectionDelay = 0 }) => {
    const featuredItem = items.find(item => item.isFeatured);
    const regularItems = items.filter(item => !item.isFeatured);

    return (
      <div className="space-y-6 sm:space-y-8 md:space-y-10">
        {/* First Row: Featured video on left, 2 items stacked on right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          {/* Featured Video - Left side */}
          {featuredItem && (
            <motion.div
              className="group relative cursor-pointer"
              initial={getInitialState({ opacity: 0, y: 140 })}
              whileInView={getAnimateState({ opacity: 1, y: 0 })}
              transition={{ 
                duration: 2, 
                ease: [0.16, 1, 0.3, 1], 
                delay: isLoadingComplete ? sectionDelay : 0 
              }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onNavigate(featuredItem.id)}
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden rounded-sm">
                <div 
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    opacity: 0.1
                  }}
                />
                <video
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-[1.02]"
                  src={featuredItem.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
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
                  {featuredItem.number}
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
                    {featuredItem.title}
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
          )}

          {/* Right side - 2 items in a grid */}
          <div className="grid grid-cols-2 gap-6 sm:gap-8 md:gap-10">
            {regularItems.slice(0, 2).map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative cursor-pointer"
                initial={getInitialState({ opacity: 0, y: 140 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 2, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? sectionDelay + ((index + 1) * 0.1) : 0 
                }}
                viewport={{ once: true, margin: '-100px' }}
                whileHover={{ scale: 1.02 }}
                onClick={() => onNavigate(item.id)}
              >
                <div className="aspect-[4/3] w-full relative overflow-hidden rounded-sm">
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
        </div>

        {/* Second Row: Remaining items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {regularItems.slice(2).map((item, index) => (
            <motion.div
              key={item.id}
              className="group relative cursor-pointer"
              initial={getInitialState({ opacity: 0, y: 140 })}
              whileInView={getAnimateState({ opacity: 1, y: 0 })}
              transition={{ 
                duration: 2, 
                ease: [0.16, 1, 0.3, 1], 
                delay: isLoadingComplete ? sectionDelay + ((index + 3) * 0.1) : 0 
              }}
              viewport={{ once: true, margin: '-100px' }}
              whileHover={{ scale: 1.02 }}
              onClick={() => onNavigate(item.id)}
            >
              <div className="aspect-[4/3] w-full relative overflow-hidden rounded-sm">
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
      </div>
    );
  };

  return (
    <div 
      className="w-screen min-h-screen overflow-x-hidden relative transition-colors duration-500"
      style={{ 
        backgroundColor: colors.primary,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        position: 'relative'
      }}
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
            WRITING
          </h1>
        </motion.div>

        {/* Content Container */}
        <div className="w-full max-w-[1200px]">
          {/* Writing Section */}
          <div className="space-y-12 sm:space-y-14 md:space-y-16">
            {/* Writing Section Title */}
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
                  STORIES & REFLECTIONS
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
                POETRY, SHORT STORIES & PERSONAL ESSAYS
              </p>
            </motion.div>
            
            {/* Writing Projects Grid */}
            <ProjectGrid items={writingItems} sectionDelay={0.9} />
          </div>
        </div>
      </div>
      
      {/* Global styles */}
      <style>{`
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

export default WorkPage;