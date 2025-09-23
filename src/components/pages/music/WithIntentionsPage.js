import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../../common/Header';

const MusicPage = ({ currentPage, onNavigate, isLoadingComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Animation helper functions (matching your project style)
  const getInitialState = (props) => props;
  const getAnimateState = (props) => props;

  return (
    <div className="w-screen min-h-screen bg-black relative overflow-x-hidden">
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
      
      {/* Main Content */}
      <div className="pt-20 px-8">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 py-16 lg:py-24">
            
            {/* Left Column - Album Art */}
            <motion.div
              className="relative"
              initial={getInitialState({ opacity: 0.001, x: -60 })}
              whileInView={getAnimateState({ opacity: 1, x: 0 })}
              transition={{ 
                duration: 2, 
                ease: [0.16, 1, 0.3, 1], 
                delay: isLoadingComplete ? 0.3 : 0 
              }}
              viewport={{ once: true }}
            >
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                <img
                  src="./assets/images/music.jpeg"
                  alt="With intentions feat. Practice album cover"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column - Song Info */}
            <motion.div
              className="flex flex-col justify-center space-y-8"
              initial={getInitialState({ opacity: 0.001, x: 60 })}
              whileInView={getAnimateState({ opacity: 1, x: 0 })}
              transition={{ 
                duration: 2, 
                ease: [0.16, 1, 0.3, 1], 
                delay: isLoadingComplete ? 0.5 : 0 
              }}
              viewport={{ once: true }}
            >
              {/* Track Number */}
              <div className="flex items-center">
                <div className="w-12 h-[1px] bg-[#ffffff] opacity-30 mr-6"></div>
                <span className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide opacity-60">
                  Track 01
                </span>
              </div>

              {/* Song Title */}
              <h1 className="text-[#ffffff] text-[42px] md:text-[56px] lg:text-[64px] font-light tracking-[-0.02em] uppercase font-mono leading-tight">
                WITH<br />
                INTENTIONS
              </h1>

              {/* Featuring */}
              <div className="text-[#ffffff] text-[18px] md:text-[24px] font-light tracking-[-0.01em] uppercase font-mono opacity-80">
                FEAT. PRACTICE
              </div>

              {/* Song Details */}
              <div className="space-y-4 pt-8">
                <div className="flex items-center space-x-8">
                  <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide opacity-60">
                    Artist
                  </div>
                  <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide">
                    SVN T
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide opacity-60">
                    Duration
                  </div>
                  <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide">
                    3:03
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide opacity-60">
                    Released
                  </div>
                  <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide">
                    2025
                  </div>
                </div>
                
                <div className="flex items-center space-x-8">
                  <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide opacity-60">
                    Label
                  </div>
                  <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide">
                    NII Productions
                  </div>
                </div>
              </div>

              {/* Stream Links */}
              <div className="pt-8 space-y-4">
                <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide opacity-60 mb-4">
                  Stream Now
                </div>
                
                <motion.a
                  href="https://open.spotify.com/album/7zD50SjOzbnjVpk3BjIT6J"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 text-[#ffffff] text-[12px] font-mono uppercase tracking-wide hover:opacity-80 transition-opacity"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-8 h-[1px] bg-[#1DB954] group-hover:w-12 transition-all duration-300"></div>
                  <span>Spotify</span>
                </motion.a>
                
                <motion.a
                  href="https://music.apple.com/us/album/with-intentions-feat-practice-single/1840211102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-4 text-[#ffffff] text-[12px] font-mono uppercase tracking-wide hover:opacity-80 transition-opacity"
                  whileHover={{ x: 10 }}
                >
                  <div className="w-8 h-[1px] bg-[#FF3B30] group-hover:w-12 transition-all duration-300"></div>
                  <span>Apple Music</span>
                </motion.a>
              </div>
            </motion.div>
          </div>



          {/* Credits Section */}
          <motion.div
            className="py-24 border-t border-white/10"
            initial={getInitialState({ opacity: 0.001, y: 60 })}
            whileInView={getAnimateState({ opacity: 1, y: 0 })}
            transition={{ 
              duration: 2, 
              ease: [0.16, 1, 0.3, 1], 
              delay: isLoadingComplete ? 0.9 : 0 
            }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div className="lg:col-span-1">
                <h3 className="text-[#ffffff] text-[24px] font-light tracking-[-0.01em] uppercase font-mono mb-8">
                  Credits
                </h3>
              </div>
              
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide opacity-60">
                      Artists
                    </div>
                    <div className="space-y-2">
                      <div className="text-[#ffffff] text-[14px] font-mono">SVN T</div>
                      <div className="text-[#ffffff] text-[14px] font-mono">Practice</div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide opacity-60">
                      Production
                    </div>
                    <div className="space-y-2">
                      <div className="text-[#ffffff] text-[14px] font-mono">© 2025 NII Productions</div>
                      <div className="text-[#ffffff] text-[14px] font-mono">℗ 2025 NII Productions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation Footer */}
          <motion.div
            className="py-16 border-t border-white/10"
            initial={getInitialState({ opacity: 0.001 })}
            whileInView={getAnimateState({ opacity: 1 })}
            transition={{ 
              duration: 1.5, 
              ease: [0.16, 1, 0.3, 1], 
              delay: isLoadingComplete ? 1.1 : 0 
            }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <button
                onClick={() => onNavigate('work')}
                className="group flex items-center space-x-4 text-[#ffffff] text-[12px] font-mono uppercase tracking-wide hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-[1px] bg-[#ffffff] opacity-30 group-hover:w-12 transition-all duration-300"></div>
                <span>Back to Work</span>
              </button>
              
              <div className="text-[#ffffff] text-[12px] font-mono uppercase tracking-wide opacity-40 mt-8 md:mt-0">
                01 / 01
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MusicPage;