import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';
import Header from '../common/Header';

const Pen2PurposePage = ({ currentPage, onNavigate, isInitialLoad = true, isLoadingComplete = true }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get theme context
const { isDark, colors } = useTheme();

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setIsSubmitted(true);
      // Here you would typically send the email to your backend
      console.log('Email submitted:', email);
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  const getInitialState = (defaultInitial) => {
    if (!isLoadingComplete) {
      return { opacity: 0, y: 100 };
    }
    return defaultInitial;
  };

  const getAnimateState = (defaultAnimate) => {
    if (!isLoadingComplete) {
      return { opacity: 0, y: 100 };
    }
    return defaultAnimate;
  };

  return (
    <div 
      className="w-screen min-h-screen overflow-x-hidden relative transition-colors duration-500"
      style={{ backgroundColor: colors.primary }}
    >
      {/* Header */}
      <Header 
        currentPage={currentPage}
        onNavigate={onNavigate}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Main Content */}
      <main className="pt-[80px] sm:pt-[90px] md:pt-[100px]">
        
        {/* Hero Section */}
        <section 
          className="flex flex-col items-center justify-center min-h-[60vh] py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-8 lg:px-5 relative z-10 transition-colors duration-500"
          style={{ backgroundColor: colors.primary }}
        >
          <div className="flex flex-col items-center w-full max-w-[1200px] pb-8 sm:pb-10 md:pb-12">
            
            {/* Title */}
            <motion.div
              initial={getInitialState({ opacity: 0, y: 100 })}
              animate={getAnimateState({ opacity: 1, y: 0 })}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1],
                delay: isLoadingComplete ? 0.3 : 0 
              }}
              className="font-normal tracking-[-0.03em] leading-[100%] text-center mb-8 sm:mb-10 md:mb-12 transition-colors duration-500"
              style={{
                fontFamily: 'Switzer, sans-serif',
                fontSize: 'clamp(48px, 12vw, 120px)',
                fontWeight: 400,
                color: colors.text.primary
              }}
            >
              PEN2PURPOSE
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={getInitialState({ opacity: 0, y: 50 })}
              animate={getAnimateState({ opacity: 1, y: 0 })}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1],
                delay: isLoadingComplete ? 0.6 : 0 
              }}
              className="text-center max-w-[600px] text-[16px] sm:text-[18px] md:text-[20px] font-light leading-[1.5] transition-colors duration-500"
              style={{ 
                color: colors.text.primary
              }}
            >
              NYC based. Write with us every last Saturday of the month at a local café near you! 
            </motion.div>

          </div>
        </section>

        {/* Main Content Section */}
        <section 
          className="flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 px-4 sm:px-5 md:px-8 lg:px-5 relative z-10 transition-colors duration-500"
          style={{ backgroundColor: colors.primary }}
        >
          
          {/* Divider Line */}
          <div className="flex flex-col items-center w-full max-w-[1200px] pb-12 sm:pb-14 md:pb-16">
            <motion.div 
              className="w-full h-px mb-8 sm:mb-10 md:mb-12"
              initial={getInitialState({ width: '0%' })}
              animate={getAnimateState({ width: '100%' })}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1],
                delay: isLoadingComplete ? 0.8 : 0 
              }}
            >
              <div 
                className="w-full h-px transition-colors duration-500"
                style={{ backgroundColor: colors.border }}
              />
            </motion.div>
          </div>

          {/* Content Grid */}
          <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 md:gap-20 w-full max-w-[1200px]">
            
            {/* Left Content - About the Community */}
            <div className="flex-1 space-y-6 sm:space-y-8 md:space-y-10">
              
              <motion.div
                initial={getInitialState({ opacity: 0, y: 50 })}
                animate={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: isLoadingComplete ? 1.0 : 0 
                }}
              >
                <h2 
                  className="text-[24px] sm:text-[28px] md:text-[32px] font-normal mb-4 sm:mb-5 md:mb-6 transition-colors duration-500"
                  style={{ 
                    fontFamily: 'Switzer, sans-serif',
                    color: colors.text.primary
                  }}
                >
                  What is Pen2Purpose?
                </h2>
                <p 
                  className="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6] transition-colors duration-500"
                  style={{ color: colors.text.primary }}
                >
                  Pen2Purpose is a writing group. We gather at the end of each month to share our stories, explore our craft, and support each other's creative journey.
                </p>
              </motion.div>

              <motion.div
                initial={getInitialState({ opacity: 0, y: 50 })}
                animate={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: isLoadingComplete ? 1.2 : 0 
                }}
              >
                {/* Additional content can go here */}
              </motion.div>

              <motion.div
                initial={getInitialState({ opacity: 0, y: 50 })}
                animate={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: isLoadingComplete ? 1.4 : 0 
                }}
              >
                <h3 
                  className="text-[20px] sm:text-[22px] md:text-[24px] font-normal mb-4 sm:mb-5 md:mb-6 transition-colors duration-500"
                  style={{ 
                    fontFamily: 'Switzer, sans-serif',
                    color: colors.text.primary
                  }}
                >
                  Meeting Details
                </h3>
                <div 
                  className="space-y-2 sm:space-y-3 text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.6] transition-colors duration-500"
                  style={{ color: colors.text.primary }}
                >
                  <p><strong>When:</strong> Last Saturday of each month</p>
                  <p><strong>Where:</strong> A local café near you</p>
                  <p><strong>Who:</strong> Writers of all levels, from beginners to published writers</p>
                </div>
              </motion.div>
            </div>
            
            {/* Right Content - Email Signup */}
            <div className="flex-1 lg:max-w-[400px]">
              <motion.div
                className="p-8 sm:p-10 md:p-12 rounded-lg transition-colors duration-500"
                style={{ backgroundColor: colors.secondary }}
                initial={getInitialState({ opacity: 0, y: 50 })}
                animate={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 1.5, 
                  ease: [0.16, 1, 0.3, 1],
                  delay: isLoadingComplete ? 1.6 : 0 
                }}
              >
                <h3 
                  className="text-[24px] sm:text-[26px] md:text-[28px] font-normal mb-6 sm:mb-7 md:mb-8 transition-colors duration-500"
                  style={{ 
                    fontFamily: 'Switzer, sans-serif',
                    color: colors.text.primary
                  }}
                >
                  Join Our Community
                </h3>
                
                {!isSubmitted ? (
                  <div className="space-y-6">
                    
                    <div className="space-y-4">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        className="w-full px-0 py-4 bg-transparent border-0 border-b text-[14px] sm:text-[15px] md:text-[16px] placeholder-[#666666] focus:outline-none transition-colors duration-300"
                        style={{ 
                          borderColor: colors.border,
                          color: colors.text.primary
                        }}
                        onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
                      />
                      <motion.button
                        onClick={handleSubmit}
                        className="w-full py-4 px-8 text-[11px] sm:text-[12px] md:text-[13px] font-normal tracking-[-0.01em] uppercase font-mono hover:opacity-80 transition-all duration-300 cursor-pointer rounded-sm"
                        style={{ 
                          backgroundColor: colors.accent,
                          color: colors.buttonText
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        JOIN PEN2PURPOSE
                      </motion.button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div 
                      className="text-[16px] sm:text-[17px] md:text-[18px] font-normal leading-[1.5] mb-4 transition-colors duration-500"
                      style={{ color: colors.text.primary }}
                    >
                      🎉 Welcome to Pen2Purpose!
                    </div>
                    <p 
                      className="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-[1.5] transition-colors duration-500"
                      style={{ color: colors.text.secondary }}
                    >
                      You'll receive updates about our monthly meetups and community events.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Bottom Quote Section */}
        <section 
          className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-24 px-4 sm:px-5 md:px-8 lg:px-5 relative z-10 transition-colors duration-500"
          style={{ backgroundColor: colors.primary }}
        >
          <motion.blockquote
            className="text-center max-w-[800px]"
            initial={getInitialState({ opacity: 0, y: 50 })}
            animate={getAnimateState({ opacity: 1, y: 0 })}
            transition={{ 
              duration: 1.5, 
              ease: [0.16, 1, 0.3, 1],
              delay: isLoadingComplete ? 1.8 : 0 
            }}
          >
            {/* Quote content can go here */}
          </motion.blockquote>
        </section>

      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Azeret+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Fahkwang:wght@200;300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Switzer:wght@300;400;500;600&display=swap');
        
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
      `}</style>
    </div>
  );
};

export default Pen2PurposePage;