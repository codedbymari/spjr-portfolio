import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../common/Header';
import { useTheme } from '../../contexts/ThemeContext';

const AboutPage = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const { isDark, colors } = useTheme();

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div 
      className="w-screen min-h-screen overflow-x-hidden relative transition-colors duration-500"
      style={{ backgroundColor: colors.primary }}
    >
      <Header 
        currentPage={currentPage}
        onNavigate={onNavigate}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      {/* Main About Section */}
      <section 
        className="flex flex-col items-center justify-start min-h-screen pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-5 md:px-8 lg:px-5 relative z-10 transition-colors duration-500"
        style={{ backgroundColor: colors.primary }}
      >
        
        {/* Page Title */}
        <div className="flex flex-col items-center w-full max-w-[1200px] mb-12 sm:mb-16 md:mb-20">
          <motion.div 
            className="w-full h-px mb-4 sm:mb-5"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: 1.5, 
              ease: [0.16, 1, 0.3, 1],
              delay: 0.8 
            }}
          >
            <div 
              className="w-full h-px transition-colors duration-500" 
              style={{ backgroundColor: colors.border }}
            />
          </motion.div>
        </div>

        {/* Main Content Grid - Responsive Layout */}
        <div className="w-full max-w-[1200px] space-y-12 md:space-y-16 lg:space-y-20">
          
          {/* First Row - Large Image + Text */}
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
            
            {/* Large Portrait Image */}
            <motion.div
              className="flex-[3_0_0] lg:flex-[2_0_0] -mt-100"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 100 }}
              transition={{ 
                duration: 1.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: 1.2
              }}
            >
              <div className="aspect-[3/4] w-full relative overflow-hidden rounded-sm">
                <img
                  className="w-full h-full object-cover transition-all duration-500"
                  src="/assets/images/portfolio.jpeg"
                  alt="Sir Practice - Portrait"
                  style={{
                    filter: isDark ? 'none' : 'brightness(0.95) contrast(1.1)'
                  }}
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <div className="flex-[2_0_0] lg:flex-[1_0_0] flex flex-col justify-center space-y-6 md:space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.4
                }}
                className="text-[16px] sm:text-[18px] md:text-[20px] font-light leading-[1.5] transition-colors duration-500"
                style={{ color: colors.text.primary }}
              >
                Storyteller. Philosopher. Cartographer of the human experience. Sir Practice weaves together African heritage, global identity, and urban realities into narratives that pulse with authenticity.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.6
                }}
                className="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6] transition-colors duration-500"
                style={{ color: colors.text.secondary }}
              >
                Rooted in the belief that growth is a cycle of inhaling hope and exhaling purpose, his work serves as both compass and companion—illuminating stories that breathe in the margins.
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 50 }}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: 1.8
                }}
                className="text-[14px] sm:text-[15px] md:text-[16px] font-light italic leading-[1.6] transition-colors duration-500"
                style={{ 
                  fontFamily: 'Fahkwang, sans-serif',
                  color: colors.text.primary
                }}
              >
                "Go forward and create the evidence of your existence."
              </motion.div>
            </div>
          </div>

          {/* Three Images with Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
           {/* First Image - Empty for now */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 100 }}
              transition={{ 
                duration: 1.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: 2.0
              }}
            >
   <div className="aspect-square w-full relative overflow-hidden rounded-sm group">
                <img
                  className="w-full h-full object-cover transition-all duration-500 group-hover:filter-none"
                  src="/assets/images/3.jpeg"
                  alt="Artistic Work - Landscape"
                  style={{
                    filter: isDark 
                      ? 'grayscale(1) brightness(0.75) contrast(1.1)' 
                      : 'grayscale(0.8) brightness(0.9) contrast(1.05)',
                    objectPosition: 'center 20%'
                  }}
                />
              </div>            </motion.div>
            {/* Second Image */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 100 }}
              transition={{ 
                duration: 1.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: 2.2
              }}
            >
              <div className="aspect-square w-full relative overflow-hidden rounded-sm group">
                <img
                  className="w-full h-full object-cover transition-all duration-500 group-hover:filter-none"
                  src="/assets/images/1.jpeg"
                  alt="Artistic Work - Landscape"
                  style={{
                    filter: isDark 
                      ? 'grayscale(1) brightness(0.75) contrast(1.1)' 
                      : 'grayscale(0.8) brightness(0.9) contrast(1.05)'
                  }}
                />
              </div>
            </motion.div>

            {/* Third Image */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 100 }}
              transition={{ 
                duration: 1.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: 2.4
              }}
            >
              <div className="aspect-square w-full relative overflow-hidden rounded-sm group">
                <img
                  className="w-full h-full object-cover transition-all duration-500 group-hover:filter-none"
                  src="/assets/images/2.jpeg"
                  alt="Artistic Work - Kitchen"
                  style={{
                    filter: isDark 
                      ? 'grayscale(1) brightness(0.75) contrast(1.1)' 
                      : 'grayscale(0.8) brightness(0.9) contrast(1.05)'
                  }}
                />
              </div>
            </motion.div>
          </div>
          
          {/* Background/Process Section */}
          <motion.div
            className="pt-12 md:pt-16 lg:pt-20"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 100 }}
            transition={{ 
              duration: 1.8, 
              ease: [0.16, 1, 0.3, 1],
              delay: 3.0
            }}
          >
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16">
              <div className="flex-1">
                <h3 
                  className="text-[20px] sm:text-[22px] md:text-[24px] font-normal uppercase tracking-[-0.01em] mb-4 md:mb-6 font-mono transition-colors duration-500"
                  style={{ color: colors.text.primary }}
                >
                  Background
                </h3>
                <p 
                  className="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6] transition-colors duration-500"
                  style={{ color: colors.text.secondary }}
                >
                  Sir Practice Jr. is a writer, public speaker, and cultural architect whose work fuses storytelling with lived experience across continents. Drawing from roots that stretch from London's estates to global diasporic communities, he crafts narratives that explore faith, identity, ambition, and belonging - always with an eye toward transformation and empowerment. His voice moves fluidly between poetry, prose, and spoken word, carrying the cadence of the street and the weight of philosophy. Through his distinctive command of voice - both written and spoken - he builds bridges between tradition and innovation, preservation and reinvention. His multidisciplinary approach, spanning literature, performance, and community-driven projects like Pen2Purpose, creates work that is at once intimate and expansive, preserving cultural memory while reimagining what it means to speak with power and grace in the modern world.
                </p>
              </div>
              
              <div className="flex-1">
                <h3 
                  className="text-[20px] sm:text-[22px] md:text-[24px] font-normal uppercase tracking-[-0.01em] mb-4 md:mb-6 font-mono transition-colors duration-500"
                  style={{ color: colors.text.primary }}
                >
                  Philosophy
                </h3>
                <p 
                  className="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6] mb-4 transition-colors duration-500"
                  style={{ color: colors.text.secondary }}
                >
                  Life rests on three pillars: <span className="font-semibold">God</span>, <span className="font-semibold">Family</span>, <span className="font-semibold">Greatness</span>. It moves to the rhythm of <span className="font-semibold">Prayer</span>, <span className="font-semibold">Practice</span>, <span className="font-semibold">Play</span>, and is shaped by <span className="font-semibold">Focus</span>, <span className="font-semibold">Craft</span>, <span className="font-semibold">Faith</span>. These are compass points that keep one aligned - a reminder that greatness without God and family is hollow, that discipline without joy is brittle, and that faith is the breath that sustains every pursuit.
                </p>
                <p 
                  className="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6] mb-4 transition-colors duration-500"
                  style={{ color: colors.text.secondary }}
                >
                  From this foundation, every creation becomes an act of cartography—mapping the territories between who we were, who we are, and who we might become. The practice itself becomes the destination.
                </p>
                <p 
                  className="text-[14px] sm:text-[15px] md:text-[16px] font-light leading-[1.6] transition-colors duration-500"
                  style={{ color: colors.text.primary }}
                >
                  <span className="font-semibold">Art as compass, story as shelter, and identity as journey.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Fahkwang:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Switzer:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', sans-serif;
          transition: background-color 0.5s ease;
        }
        
        .font-mono {
          font-family: 'Azeret Mono', monospace;
        }

        /* Light theme specific adjustments */
        .light .aspect-square img {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .light .aspect-[3\/4] img {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }

        /* Dark theme specific adjustments */
        .dark .aspect-square img {
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }

        .dark .aspect-[3\/4] img {
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7);
        }

        /* Smooth transitions for all theme changes */
        * {
          transition-property: background-color, color, border-color, box-shadow;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          transition-duration: 500ms;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;