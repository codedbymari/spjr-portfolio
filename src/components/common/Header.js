import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

// Header Component with auto-hide on scroll
const Header = ({ isMenuOpen, setIsMenuOpen, onNavigate, currentPage, isHeroLoaded }) => {
  const { isDark, colors } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const handleMenuItemClick = (page) => {
    setIsMenuOpen(false);
    onNavigate(page);
  };

  // Hook to detect if device supports hover (desktop) vs touch (mobile)
  const [isHoverDevice, setIsHoverDevice] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device supports hover and is not a touch device
    const checkHoverCapability = () => {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const hasPointer = window.matchMedia('(pointer: fine)').matches;
      setIsHoverDevice(hasHover && hasPointer);
    };

    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkHoverCapability();
    checkMobile();
    
    // Listen for changes
    const hoverQuery = window.matchMedia('(hover: hover)');
    const pointerQuery = window.matchMedia('(pointer: fine)');
    
    hoverQuery.addListener(checkHoverCapability);
    pointerQuery.addListener(checkHoverCapability);
    window.addEventListener('resize', checkMobile);

    return () => {
      hoverQuery.removeListener(checkHoverCapability);
      pointerQuery.removeListener(checkHoverCapability);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Auto-hide header on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Show header after hero is loaded
  useEffect(() => {
    if (isHeroLoaded) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isHeroLoaded]);

  // Use colors from theme context for consistent styling
  const textColor = isDark ? 'text-white' : 'text-black';

  return (
    <>
      <motion.nav 
        className="fixed top-0 right-0 left-0 z-50 shadow-none transition-colors duration-300"
        style={{ backgroundColor: colors.primary }}
        initial={{ opacity: 0, y: -100 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -100
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-center justify-between px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 py-2 sm:py-3 md:py-4 w-full max-w-screen-2xl mx-auto">
          {/* Left - Logo */}
          <div className="flex-1 flex items-center min-w-0">
            <motion.button 
              className={`${textColor} text-xs sm:text-sm md:text-[13px] lg:text-[13px] xl:text-[13px] font-mono uppercase tracking-wide hover:opacity-70 transition-opacity truncate`}
              style={{ color: colors.text.primary }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('landing')}
            >
              SPJr
            </motion.button>
          </div>
          
          {/* Center - Description */}
          <div className="flex-1 flex items-center justify-center min-w-0 px-2">
            <motion.div 
              className="font-mono uppercase tracking-wide text-center"
              style={{ color: colors.text.primary }}
            >
              <span className="hidden sm:block md:hidden text-sm">(WRITER, ARTIST & PUBLIC SPEAKER)</span>
              <span className="hidden md:block text-[13px] lg:text-[13px] xl:text-[13px]">(WRITER, ARTIST & PUBLIC SPEAKER)</span>
            </motion.div>
          </div>
          
          {/* Right - MENU Button */}
          <div className="flex-1 flex items-center justify-end min-w-0 gap-2">
            <motion.button 
              className={`${textColor} text-xs sm:text-sm md:text-[13px] lg:text-[13px] xl:text-[13px] font-mono uppercase tracking-wide hover:opacity-70 transition-opacity cursor-pointer relative z-[60] px-2 py-1`}
              style={{ color: colors.text.primary }}
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

      {/* Navigation Menu Overlay - Theme-aware */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop - Semi-transparent overlay that dims the page content */}
            <motion.div
              className="fixed inset-0 z-[55] cursor-pointer"
              style={{ backgroundColor: isDark ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMenuOpen(false)}
            />
            
            {/* Menu Panel - Slides in from the right */}
            <motion.div
              className="fixed top-0 right-0 h-full z-[56] shadow-2xl overflow-y-auto transition-colors duration-300
                         w-full
                         xs:w-4/5 xs:max-w-sm
                         sm:w-80 sm:max-w-md
                         md:w-96 md:max-w-lg
                         lg:w-[420px] lg:max-w-xl
                         xl:w-[450px] xl:max-w-2xl"
              style={{ backgroundColor: colors.primary }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: "tween",
                duration: 0.4, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <div className="min-h-full flex flex-col px-4 sm:px-6 md:px-8 lg:px-10 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-12">
                
                {/* Close Button and Theme Toggle */}
                <div className="flex justify-between items-center mb-8 sm:mb-10 md:mb-12">
                  {/* Theme Toggle in Menu */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <ThemeToggle size="default" />
                  </motion.div>
                  <motion.button
                    className="font-mono uppercase tracking-wide hover:opacity-70 transition-opacity p-2 -m-2"
                    style={{ color: colors.text.primary }}
                    onClick={() => setIsMenuOpen(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label="Close menu"
                  >
                    <span className="hidden xs:inline">CLOSE</span>
                    <span className="xs:hidden">✕</span>
                  </motion.button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 flex flex-col justify-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10">
                  {[
                    { text: "work", page: "work", delay: 0.1 },
                    { text: "about", page: "about", delay: 0.15 },
                    { text: "pen2purpose", page: "pen2purpose", delay: 0.2 },
                  ].map((item, index) => (
                    <motion.button
                      key={index}
                      className={`group text-left font-normal uppercase tracking-tight leading-tight hover:opacity-70 transition-all duration-300 cursor-pointer relative py-2 sm:py-3 ${
                        currentPage === item.page ? 'opacity-70' : ''
                      }`}
                      style={{ 
                        fontSize: 'clamp(24px, 6vw, 40px)',
                        color: colors.text.primary
                      }}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ 
                        delay: item.delay, 
                        duration: 0.6, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      whileHover={isHoverDevice && !isMobile ? { 
                        scale: 1.02,
                        x: -8,
                        transition: { duration: 0.2 }
                      } : {
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      onClick={() => handleMenuItemClick(item.page)}
                    >
                      <span className="relative">
                        {item.text}
                        <motion.span
                          className="absolute bottom-0 left-0 h-0.5 transition-all duration-300"
                          style={{ 
                            backgroundColor: colors.text.primary,
                            width: currentPage === item.page ? '100%' : '0%'
                          }}
                          whileHover={{ width: '100%' }}
                        />
                      </span>
                    </motion.button>
                  ))}
                </div>

                {/* Bottom Section */}
                <motion.div 
                  className="mt-auto pt-8 sm:pt-10 md:pt-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <div className="text-xs sm:text-sm font-mono uppercase tracking-wide opacity-50 mb-4 sm:mb-6"
                       style={{ color: colors.text.primary }}>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 sm:gap-4">
                    {[
                      { text: "Instagram", href: "https://www.instagram.com/sirpractice/" },
                      { text: "Email", href: "#email" }
                    ].map((link, index) => (
                      <motion.a
                        key={index}
                        href={link.href}
                        target={link.href.startsWith('http') ? "_blank" : "_self"}
                        rel={link.href.startsWith('http') ? "noopener noreferrer" : ""}
                        className="group font-mono uppercase tracking-wide hover:opacity-70 transition-all duration-300 py-2 px-1 -mx-1 rounded relative overflow-hidden"
                        style={{ color: colors.text.primary }}
                        whileHover={isHoverDevice && !isMobile ? { x: -8 } : {}}
                        transition={{ duration: 0.2 }}
                      >
                        <span className="relative z-10 text-sm sm:text-base md:text-lg">{link.text}</span>
                        <motion.span
                          className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300"
                          style={{ backgroundColor: colors.text.primary }}
                        />
                      </motion.a>
                    ))}
                  </div>

                  <div className="text-xs font-mono uppercase tracking-wide opacity-30 mt-6 sm:mt-8"
                       style={{ color: colors.text.primary }}>
                    © 2025 SPJr
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Custom CSS */}
      <style jsx>{`
        @media (min-width: 480px) {
          .xs\\:block { display: block; }
          .xs\\:hidden { display: none; }
          .xs\\:inline { display: inline; }
          .xs\\:w-4\\/5 { width: 80%; }
          .xs\\:max-w-sm { max-width: 24rem; }
        }
        
        @media (max-width: 479px) {
          .xs\\:block { display: none; }
          .xs\\:hidden { display: block; }
          .xs\\:inline { display: none; }
        }

        .menu-item {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }

        @media (max-width: 768px) {
          button {
            min-height: 44px;
            min-width: 44px;
          }
        }

        @media (max-width: 320px) {
          .menu-panel {
            padding-left: 12px;
            padding-right: 12px;
          }
        }

        body.menu-open {
          overflow: hidden;
        }

        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
          .text-shadow {
            text-shadow: 0 0 1px rgba(255, 255, 255, 0.1);
          }
        }

        button:focus-visible {
          outline: 2px solid rgba(128, 128, 128, 0.5);
          outline-offset: 2px;
        }

        .menu-panel {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .menu-panel::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};

export default Header;