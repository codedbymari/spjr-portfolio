import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Header from '../../common/Header';

const WithIntentionsPage = ({ currentPage, onNavigate, isLoadingComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isStreamOpen, setIsStreamOpen] = useState(false);
  const { isDark, colors } = useTheme();

  const getInitialState = (props) => props;
  const getAnimateState = (props) => props;

  const SpotifyLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" fill="#1DB954"/>
    </svg>
  );

  const AppleMusicLogo = () => (
    <svg width="24" height="24" viewBox="0 0 361 361" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="appleMusicGradient" x1="180" y1="358.6047" x2="180" y2="7.7586" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{stopColor: '#FA233B'}} />
          <stop offset="1" style={{stopColor: '#FB5C74'}} />
        </linearGradient>
      </defs>
      <path d="M360,112.61c0-4.3,0-8.6-0.02-12.9c-0.02-3.62-0.06-7.24-0.16-10.86c-0.21-7.89-0.68-15.84-2.08-23.64 c-1.42-7.92-3.75-15.29-7.41-22.49c-3.6-7.07-8.3-13.53-13.91-19.14c-5.61-5.61-12.08-10.31-19.15-13.91 c-7.19-3.66-14.56-5.98-22.47-7.41c-7.8-1.4-15.76-1.87-23.65-2.08c-3.62-0.1-7.24-0.14-10.86-0.16C255.99,0,251.69,0,247.39,0 H112.61c-4.3,0-8.6,0-12.9,0.02c-3.62,0.02-7.24,0.06-10.86,0.16C80.96,0.4,73,0.86,65.2,2.27c-7.92,1.42-15.28,3.75-22.47,7.41 c-7.07,3.6-13.54,8.3-19.15,13.91c-5.61,5.61-10.31,12.07-13.91,19.14c-3.66,7.2-5.99,14.57-7.41,22.49 c-1.4,7.8-1.87,15.76-2.08,23.64c-0.1,3.62-0.14,7.24-0.16,10.86C0,104.01,0,108.31,0,112.61v134.77c0,4.3,0,8.6,0.02,12.9 c0.02,3.62,0.06,7.24,0.16,10.86c0.21,7.89,0.68,15.84,2.08,23.64c1.42,7.92,3.75,15.29,7.41,22.49c3.6,7.07,8.3,13.53,13.91,19.14 c5.61,5.61,12.08,10.31,19.15,13.91c7.19,3.66,14.56,5.98,22.47,7.41c7.8,1.4,15.76,1.87,23.65,2.08c3.62,0.1,7.24,0.14,10.86,0.16 c4.3,0.03,8.6,0.02,12.9,0.02h134.77c4.3,0,8.6,0,12.9-0.02c3.62-0.02,7.24-0.06,10.86-0.16c7.89-0.21,15.85-0.68,23.65-2.08 c7.92-1.42,15.28-3.75,22.47-7.41c7.07-3.6,13.54-8.3,19.15-13.91c5.61-5.61,10.31-12.07,13.91-19.14 c3.66-7.2,5.99-14.57,7.41-22.49c1.4-7.8,1.87-15.76,2.08-23.64c0.1-3.62,0.14-7.24,0.16-10.86c0.03-4.3,0.02-8.6,0.02-12.9V112.61 z" fill="url(#appleMusicGradient)" fillRule="evenodd" clipRule="evenodd"/>
      <path d="M254.5,55c-0.87,0.08-8.6,1.45-9.53,1.64l-107,21.59l-0.04,0.01c-2.79,0.59-4.98,1.58-6.67,3 c-2.04,1.71-3.17,4.13-3.6,6.95c-0.09,0.6-0.24,1.82-0.24,3.62c0,0,0,109.32,0,133.92c0,3.13-0.25,6.17-2.37,8.76 c-2.12,2.59-4.74,3.37-7.81,3.99c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01 c-4.98,1.93-8.71,4.39-11.68,7.51c-5.89,6.17-8.28,14.54-7.46,22.38c0.7,6.69,3.71,13.09,8.88,17.82 c3.49,3.2,7.85,5.63,12.99,6.66c5.33,1.07,11.01,0.7,19.31-0.98c4.42-0.89,8.56-2.28,12.5-4.61c3.9-2.3,7.24-5.37,9.85-9.11 c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1.19-8.7,1.19-13.26l0-116.15c0-6.22,1.76-7.86,6.78-9.08c0,0,88.94-17.94,93.09-18.75 c5.79-1.11,8.52,0.54,8.52,6.61l0,79.29c0,3.14-0.03,6.32-2.17,8.92c-2.12,2.59-4.74,3.37-7.81,3.99 c-2.33,0.47-4.66,0.94-6.99,1.41c-8.84,1.78-14.59,2.99-19.8,5.01c-4.98,1.93-8.71,4.39-11.68,7.51 c-5.89,6.17-8.49,14.54-7.67,22.38c0.7,6.69,3.92,13.09,9.09,17.82c3.49,3.2,7.85,5.56,12.99,6.6c5.33,1.07,11.01,0.69,19.31-0.98 c4.42-0.89,8.56-2.22,12.5-4.55c3.9-2.3,7.24-5.37,9.85-9.11c2.62-3.75,4.31-7.92,5.24-12.35c0.96-4.57,1-8.7,1-13.26V64.46 C263.54,58.3,260.29,54.5,254.5,55z" fill="#FFFFFF" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  );

  return (
    <div 
      className="w-screen min-h-screen relative overflow-x-hidden transition-colors duration-500"
      style={{ backgroundColor: isDark ? '#000000' : 'rgb(251, 249, 247)' }}
    >
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
      
      <div className="pt-20 px-6">
        <div className="max-w-[1400px] mx-auto">
          
          <section className="px-0 py-7">
            <div className="grid items-start gap-6 grid-cols-1 md:grid-cols-2 h-full">
              
              <motion.div 
                className="relative px-0 aspect-square w-full h-full"
                initial={getInitialState({ opacity: 0.001, scale: 0.95 })}
                whileInView={getAnimateState({ opacity: 1, scale: 1 })}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 0.2 : 0 
                }}
                viewport={{ once: true }}
              >
                <img
                  src="./assets/images/75155340_8290242.webp"
                  alt="With intentions feat. Practice album cover"
                  className="w-full h-full object-cover"
                  style={{
                    backgroundColor: '#e2e0e1'
                  }}
                />
              </motion.div>

              <motion.div 
                className="col-span-1 h-full p-6 md:pt-0 md:px-0 pb-2 md:pb-0"
                initial={getInitialState({ opacity: 0.001, y: 40 })}
                whileInView={getAnimateState({ opacity: 1, y: 0 })}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.16, 1, 0.3, 1], 
                  delay: isLoadingComplete ? 0.4 : 0 
                }}
                viewport={{ once: true }}
              >
                <section className="flex flex-col justify-between h-full">
                  <div className="grid gap-2">
                    <div className="font-bold whitespace-normal text-2xl">
                      <h1 
                        className="whitespace-pre-wrap max-w-prose font-bold text-base md:text-2xl"
                        style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                      >
                        Svn T
                      </h1>
                      <p 
                        className="max-w-prose whitespace-pre-wrap text-base md:text-2xl -mt-1 md:mt-0"
                        style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                      >
With intentions                      </p>
                      <p 
                        className="max-w-prose whitespace-pre-wrap text-base md:text-2xl -mt-1 md:mt-0"
                        style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                      >
feat. Practice                      </p>
                    </div>
                  </div>

                  <div>
                   
                    <button
                      onClick={() => setIsStreamOpen(!isStreamOpen)}
                      className="text-base w-full p-6 relative font-bold cursor-pointer text-left flex items-center justify-between transition-colors duration-200"
                      style={{ 
                        color: isDark ? '#FFFFFF' : '#000000',
                        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'}`
                      }}
                    >
                      <span>Stream</span>
                      <motion.div
                        animate={{ rotate: isStreamOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.div>
                    </button>

                    <motion.div
                      initial={false}
                      animate={{ 
                        height: isStreamOpen ? 'auto' : 0,
                        opacity: isStreamOpen ? 1 : 0
                      }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                      style={{ 
                        borderTop: isStreamOpen ? `1px solid ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'}` : 'none'
                      }}
                    >
                      <div className="pt-6 pb-4 px-6 space-y-4">
                        <motion.a
                          href="https://open.spotify.com/album/7zD50SjOzbnjVpk3BjIT6J"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-4 text-sm font-bold uppercase tracking-wide transition-all duration-300"
                          style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                          whileHover={{ x: 10, opacity: 0.7 }}
                        >
                          <div className="flex items-center justify-center w-8">
                            <SpotifyLogo />
                          </div>
                          <span>Spotify</span>
                        </motion.a>
                        
                        <motion.a
                          href="https://music.apple.com/us/album/with-intentions-feat-practice-single/1840211102"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-4 text-sm font-bold uppercase tracking-wide transition-all duration-300"
                          style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                          whileHover={{ x: 10, opacity: 0.7 }}
                        >
                          <div className="flex items-center justify-center w-8">
                            <AppleMusicLogo />
                          </div>
                          <span>Apple Music</span>
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                </section>
              </motion.div>
            </div>
          </section>

          <motion.header 
            className="items-center justify-center hidden md:flex"
            initial={getInitialState({ opacity: 0.001 })}
            whileInView={getAnimateState({ opacity: 1 })}
            transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1], 
              delay: isLoadingComplete ? 0.6 : 0 
            }}
            viewport={{ once: true }}
          >
            <h1 
              className="whitespace-pre-wrap max-w-prose-narrow font-bold text-base md:text-2xl w-full flex items-center justify-center py-14 border-t border-b"
              style={{ 
                color: isDark ? '#FFFFFF' : '#000000',
                borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'
              }}
            >
Listen to more of my tracks
            </h1>
          </motion.header>

          <motion.section
            className="py-12 border-b"
            style={{ borderColor: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)' }}
            initial={getInitialState({ opacity: 0.001 })}
            whileInView={getAnimateState({ opacity: 1 })}
            transition={{ 
              duration: 1, 
              ease: [0.16, 1, 0.3, 1], 
              delay: isLoadingComplete ? 0.8 : 0 
            }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Tucker 1955', page: 'tucker-1955', image: './assets/images/tucker.webp'},
                { title: 'Son of a Farmer', page: 'son-of-a-farmer', image: './assets/images/sofaf.webp'},
                { title: 'Practice', page: 'practice', image: './assets/images/practice-p.webp'},
                { title: 'Crossroads to Home', page: 'crossroads-to-home', image: './assets/images/crossroads.webp' },
                { title: 'Great Expectation', page: 'great-expectation', image: './assets/images/greatexpec.webp'}
              ].map((track, index) => (
                <motion.button
                  key={track.page}
                  onClick={() => onNavigate(track.page)}
                  className="group w-full cursor-pointer text-left"
                  initial={getInitialState({ opacity: 0.001, y: 20 })}
                  whileInView={getAnimateState({ opacity: 1, y: 0 })}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: isLoadingComplete ? 0.1 * index : 0 
                  }}
                  viewport={{ once: true }}
                >
                  <div className="relative aspect-video w-full overflow-hidden mb-4">
                    <img
                      src={track.image}
                      alt={track.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <h3 
                      className="font-normal text-base"
                      style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                    >
                      {track.title}
                    </h3>
                    <span 
                      className="font-normal text-base whitespace-nowrap"
                      style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                    >
                      {track.duration}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.section>

          
        </div>
      </div>
    </div>
  );
};

export default WithIntentionsPage;