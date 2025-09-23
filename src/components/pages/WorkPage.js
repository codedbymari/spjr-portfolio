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

  // Writing/Stories projects data (6 stories)
  const writingItems = [
    {
      id: 'ocean',
      title: 'The Ocean',
      imageSrc: './assets/images/ocean.jpeg',
      number: '1'
    },
    {
      id: 'mphepo',
      title: 'Mphepo',
      imageSrc: './assets/images/tree.png',
      number: '2'
    },
    {
      id: 'power-grace',
      title: 'Power × Grace',
      imageSrc: './assets/images/tomyself.jpg',
      number: '3'
    },
    {
      id: 'ricos-story',
      title: 'Rico\'s Story',
      imageSrc: './assets/images/rico.png',
      number: '5'
    },
    {
      id: 'poetry-in-motion',
      title: 'Poetry in Motion',
      imageSrc: './assets/images/solokitchen.png',
      number: '6'
    }
  ];

  // Music projects data (1 project)
  const musicItems = [
    {
      id: 'music-project',
      title: 'With intentions ft. Practice',
      imageSrc: './assets/images/music.jpeg',
      number: '1'
    }
  ];

  // Project grid component
  const ProjectGrid = ({ items, sectionDelay = 0 }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="group relative cursor-pointer"
          initial={getInitialState({ opacity: 0, y: 140 })}
          whileInView={getAnimateState({ opacity: 1, y: 0 })}
          transition={{ 
            duration: 2, 
            ease: [0.16, 1, 0.3, 1], 
            delay: isLoadingComplete ? sectionDelay + (index * 0.1) : 0 
          }}
          viewport={{ once: true, margin: '-100px' }}
          whileHover={{ scale: 1.02 }}
          onClick={() => onNavigate(item.id)}
        >
          {/* Project Image - Consistent aspect ratio */}
          <div className="aspect-[1.2/1] w-full relative overflow-hidden rounded-sm">
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
            
            {/* Coming Soon Overlay */}
            {item.title === 'Coming Soon' && (
              <div 
                className="absolute inset-0 backdrop-blur-sm flex items-center justify-center z-10"
                style={{ backgroundColor: isDark ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)' }}
              >
                <span 
                  className="text-sm font-mono uppercase tracking-wide"
                  style={{ color: isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)' }}
                >
                  Coming Soon
                </span>
              </div>
            )}
          </div>
          
          {/* Project Info */}
          <div className="flex items-start justify-start w-full pt-3 md:pt-4 overflow-hidden">
            <span 
              className="font-normal tracking-[-0.01em] uppercase font-mono transition-colors duration-300"
              style={{
                color: colors.text.primary,
                fontSize: 'clamp(10px, 2.2vw, 13px)'
              }}
            >
              {item.number}
            </span>
            <span 
              className="font-normal tracking-[-0.01em] uppercase font-mono mx-2 transition-colors duration-300"
              style={{
                color: colors.text.primary,
                fontSize: 'clamp(10px, 2.2vw, 13px)'
              }}
            >
              /
            </span>
            <div className="flex-1 relative h-[14px] sm:h-[15px] md:h-[16px] overflow-hidden">
              {/* Default Title */}
              <motion.div 
                className="absolute top-0 left-0 font-normal tracking-[-0.01em] uppercase font-mono leading-none transition-colors duration-300"
                style={{
                  color: colors.text.primary,
                  fontSize: 'clamp(10px, 2.2vw, 13px)'
                }}
                initial={{ opacity: 1, y: 0 }}
                whileHover={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {item.title}
              </motion.div>
              {/* Hover Title */}
              <motion.div 
                className="absolute top-0 left-0 font-normal tracking-[-0.01em] uppercase font-mono leading-none transition-colors duration-300"
                style={{
                  color: colors.text.primary,
                  fontSize: 'clamp(10px, 2.2vw, 13px)'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              >
                {item.title === 'Coming Soon' ? 'STAY TUNED' : 'VIEW PROJECT'}
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div 
      className="w-screen min-h-screen overflow-x-hidden relative transition-colors duration-500"
      style={{ backgroundColor: colors.primary }}
    >
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentPage={currentPage}
        onNavigate={onNavigate}
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
            className="font-light tracking-[-0.02em] uppercase font-mono text-center transition-colors duration-500"
            style={{
              color: colors.text.primary,
              fontSize: 'clamp(32px, 8.5vw, 72px)'
            }}
          >
            WORK
          </h1>
        </motion.div>

        {/* Content Container */}
        <div className="w-full max-w-[1200px] space-y-20 sm:space-y-24 md:space-y-28 lg:space-y-32">
          
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
                  className="font-light tracking-[-0.01em] uppercase font-mono transition-colors duration-500"
                  style={{
                    color: colors.text.primary,
                    fontSize: 'clamp(18px, 4.5vw, 32px)'
                  }}
                >
                  WRITING 
                </h2>
              </div>
              <p 
                className="font-mono uppercase tracking-[-0.01em] ml-12 sm:ml-14 md:ml-18 transition-colors duration-500"
                style={{
                  color: colors.text.primary,
                  opacity: 0.6,
                  fontSize: 'clamp(10px, 2.5vw, 14px)'
                }}
              >
                SHORT STORIES & REFLECTIONS
              </p>
            </motion.div>
            
            {/* Writing Projects Grid */}
            <ProjectGrid items={writingItems} sectionDelay={0.9} />
          </div>

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
                delay: isLoadingComplete ? 0.5 : 0 
              }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-start mb-2">
                <div 
                  className="w-8 sm:w-10 md:w-12 h-[1px] mr-4 sm:mr-5 md:mr-6 transition-colors duration-500"
                  style={{ backgroundColor: colors.text.primary, opacity: 0.3 }}
                ></div>
                <h2 
                  className="font-light tracking-[-0.01em] uppercase font-mono transition-colors duration-500"
                  style={{
                    color: colors.text.primary,
                    fontSize: 'clamp(18px, 4.5vw, 32px)'
                  }}
                >
                  MUSIC
                </h2>
              </div>
              <p 
                className="font-mono uppercase tracking-[-0.01em] ml-12 sm:ml-14 md:ml-18 transition-colors duration-500"
                style={{
                  color: colors.text.primary,
                  opacity: 0.6,
                  fontSize: 'clamp(10px, 2.5vw, 14px)'
                }}
              >
                FEATURES & COLLABORATIONS
              </p>
            </motion.div>
            
            {/* Music Projects Grid */}
            <ProjectGrid items={musicItems} sectionDelay={1.7} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
        }
        
        .font-mono {
          font-family: 'Azeret Mono', monospace;
        }

        /* Enhanced mobile optimizations */
        @media (max-width: 640px) {
          /* Prevent horizontal scroll on mobile */
          body {
            overflow-x: hidden;
          }
          
          /* Better touch targets on mobile */
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }

        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          /* Optimize spacing for tablets */
          .space-y-20 > * + * {
            margin-top: 4rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default WorkPage;