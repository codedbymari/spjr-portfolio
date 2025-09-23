import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Header Component with right-sliding menu
const Header = ({ isMenuOpen, setIsMenuOpen, onNavigate, currentPage }) => {
  
  const handleMenuItemClick = (page) => {
    setIsMenuOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <motion.nav 
        className="fixed top-0 right-0 left-0 z-50 bg-black shadow-none"
        initial={{ opacity: 0.001, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between px-[8px] sm:px-[10px] md:px-[15px] lg:px-[10px] py-[8px] sm:py-[10px] md:py-[12px] lg:py-[10px] w-full">
          {/* Left - Logo - Better Mobile Typography */}
          <div className="flex-1 flex items-center">
            <motion.button 
              className="text-white text-[13px] sm:text-[14px] md:text-[15px] font-mono uppercase tracking-[0em] hover:opacity-70 transition-opacity"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('landing')}
            >
              SPJr
            </motion.button>
          </div>
          
          {/* Center - Description - Hide on Small Mobile */}
          <div className="flex-1 flex items-center justify-center">
            <motion.div 
              className="text-white text-[11px] sm:text-[12px] md:text-[14px] lg:text-[15px] font-mono uppercase tracking-[0em] hidden xs:block"
            >
              <span className="hidden sm:inline">WRITER & ARTIST</span>
              <span className="sm:hidden">(W&A)</span>
            </motion.div>
          </div>
          
          {/* Right - MENU Button */}
          <div className="flex-1 flex items-center justify-end">
            <motion.button 
              className="text-white text-[13px] sm:text-[14px] md:text-[15px] font-mono uppercase tracking-[0em] hover:opacity-70 transition-opacity cursor-pointer relative z-[60]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              animate={{ 
                opacity: isMenuOpen ? 0.7 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              MENU
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Navigation Menu Overlay - Responsive Width */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-[55]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel - Responsive Width and Better Mobile Layout */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full sm:w-[320px] md:w-[380px] lg:w-[400px] bg-black z-[56] shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: "tween",
                duration: 0.4, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <div className="pt-[60px] sm:pt-[70px] md:pt-[80px] px-[20px] sm:px-[30px] md:px-[40px] h-full flex flex-col">
                
                {/* Close Button for Mobile - Only visible on small screens */}
                <div className="flex justify-end mb-4 sm:hidden">
                  <motion.button
                    className="text-white text-[14px] font-mono uppercase tracking-[0em] hover:opacity-70 transition-opacity"
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    CLOSE
                  </motion.button>
                </div>

                {/* Menu Items - Responsive Typography */}
                <div className="flex flex-col space-y-[16px] sm:space-y-[18px] md:space-y-[20px]">
                  {[
                    { text: "work", page: "work", delay: 0.1 },
                    { text: "about", page: "about", delay: 0.15 },
                    { text: "join pen2purpose", page: "pen2purpose", delay: 0.2 },
                  ].map((item, index) => (
                    <motion.button
                      key={index}
                      className={`text-left text-white font-normal uppercase tracking-[-0.01em] leading-[90%] hover:opacity-70 transition-all duration-300 cursor-pointer border-b border-transparent hover:border-white pb-1 sm:pb-2 ${
                        currentPage === item.page ? 'opacity-70 border-white' : ''
                      }`}
                      style={{ 
                        fontFamily: 'Fahkwang, sans-serif',
                        fontSize: 'clamp(28px, 7vw, 36px)' // Responsive font size
                      }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ 
                        delay: item.delay, 
                        duration: 0.6, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      whileHover={{ 
                        scale: 1.02,
                        x: -10,
                        transition: { duration: 0.2 }
                      }}
                      onClick={() => handleMenuItemClick(item.page)}
                    >
                      {item.text}
                    </motion.button>
                  ))}
                </div>

                {/* Bottom Section - Social Links - Better Mobile Layout */}
                <motion.div 
                  className="mt-auto pb-[30px] sm:pb-[35px] md:pb-[40px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="flex flex-col space-y-[8px] sm:space-y-[10px]">
                    <motion.a
                      href="#"
                      className="text-white text-[12px] sm:text-[13px] md:text-[14px] font-mono uppercase tracking-[0em] hover:opacity-70 transition-opacity"
                      whileHover={{ x: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Instagram
                    </motion.a>
                    
                    <motion.a
                      href="#"
                      className="text-white text-[12px] sm:text-[13px] md:text-[14px] font-mono uppercase tracking-[0em] hover:opacity-70 transition-opacity"
                      whileHover={{ x: -5 }}
                      transition={{ duration: 0.2 }}
                    >
                      Email
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom CSS for extra responsiveness */}
      <style jsx>{`
        /* Custom breakpoint for extra small devices */
        @media (min-width: 475px) {
          .xs\\:block {
            display: block;
          }
        }
        
        @media (max-width: 474px) {
          .xs\\:block {
            display: none;
          }
        }

        /* Ensure menu items don't get too small on mobile */
        @media (max-width: 375px) {
          .menu-item {
            font-size: 24px !important;
          }
        }

        /* Prevent horizontal overflow on very small screens */
        @media (max-width: 320px) {
          .menu-panel {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </>
  );
};

export default Header;