import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '../common/Header';

const AboutPage = ({ currentPage, onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    return () => {
      clearTimeout(contentTimer);
    };
  }, []);

  return (
    <div className="w-screen min-h-screen bg-[#000000] overflow-x-hidden relative">
      <Header 
        currentPage={currentPage}
        onNavigate={onNavigate}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
      
      {/* Main About Section */}
      <section className="flex flex-col items-center justify-start min-h-screen bg-[#000000] pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-5 md:px-8 lg:px-5 relative z-10">
        
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
            <div className="w-full h-px bg-[#333333]" />
          </motion.div>
        </div>

        {/* Main Content Grid - Responsive Layout */}
        <div className="w-full max-w-[1200px] space-y-12 md:space-y-16 lg:space-y-20">
          
          {/* First Row - Large Image + Text */}
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 lg:gap-16">
            
            {/* Large Portrait Image - NO FILTER */}
            <motion.div
              className="flex-[3_0_0] lg:flex-[2_0_0]"
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
                  className="w-full h-full object-cover"
                  src="/assets/images/portfolio.jpeg"
                  alt="Sir Practice - Portrait"
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
                className="text-[#ffffff] text-[16px] sm:text-[18px] md:text-[20px] font-light leading-[1.5]"
                style={{ fontFamily: 'Fahkwang, sans-serif' }}
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
                className="text-[#cccccc] text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6]"
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
                className="text-[#fbf9f7] text-[14px] sm:text-[15px] md:text-[16px] font-light italic leading-[1.6]"
                style={{ fontFamily: 'Fahkwang, sans-serif' }}
              >
                "Go forward and create the evidence of your existence."
              </motion.div>
            </div>
          </div>

          {/* Three Images with Filter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* First Image */}
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: showContent ? 1 : 0, y: showContent ? 0 : 100 }}
              transition={{ 
                duration: 1.8, 
                ease: [0.16, 1, 0.3, 1],
                delay: 2.0
              }}
            >
              <div className="aspect-square w-full relative overflow-hidden rounded-sm">
                <img
                  className="w-full h-full object-cover filter grayscale brightness-75 contrast-110 hover:filter-none transition-all duration-500"
                  src="/assets/images/4.JPEG"
                  alt="Artistic Work - Tree"
                />
              </div>
            </motion.div>

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
              <div className="aspect-square w-full relative overflow-hidden rounded-sm">
                <img
                  className="w-full h-full object-cover filter grayscale brightness-75 contrast-110 hover:filter-none transition-all duration-500"
                  src="/assets/images/1.jpeg"
                  alt="Artistic Work - Landscape"
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
              <div className="aspect-square w-full relative overflow-hidden rounded-sm">
                <img
                  className="w-full h-full object-cover filter grayscale brightness-75 contrast-110 hover:filter-none transition-all duration-500"
                  src="/assets/images/2.jpeg"
                  alt="Artistic Work - Kitchen"
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
                <h3 className="text-[#ffffff] text-[20px] sm:text-[22px] md:text-[24px] font-normal uppercase tracking-[-0.01em] mb-4 md:mb-6 font-mono">
                  Background
                </h3>
                <p className="text-[#cccccc] text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6] mb-4">
                  Emerging as a distinctive voice in contemporary literature, Sir Practice Jr. bridges traditional storytelling with modern artistic expression, creating work that spans from the favelas of Rio to the estates of London.
                </p>
                <p className="text-[#cccccc] text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6]">
                  Through vivid, cinematic narratives and philosophical exploration, his multidisciplinary approach weaves together visual art and written narrative as waypoints in cultural preservation and self-discovery.
                </p>
              </div>
              
              <div className="flex-1">
                <h3 className="text-[#ffffff] text-[20px] sm:text-[22px] md:text-[24px] font-normal uppercase tracking-[-0.01em] mb-4 md:mb-6 font-mono">
                  Philosophy
                </h3>
                <p className="text-[#cccccc] text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6] mb-4">
                  Every creation is an act of cartography—mapping the territories between who we were, who we are, and who we might become. The practice itself becomes the destination.
                </p>
                <p className="text-[#fbf9f7] text-[14px] sm:text-[15px] md:text-[16px] font-light leading-[1.6]" style={{ fontFamily: 'Fahkwang, sans-serif' }}>
                  Art as compass. Story as shelter. Identity as journey.
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
          background-color: #000000;
        }
        
        .font-mono {
          font-family: 'Azeret Mono', monospace;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;