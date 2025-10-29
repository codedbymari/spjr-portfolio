import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import Header from '../../common/Header';

const Tucker1955Page = ({ currentPage, onNavigate, isLoadingComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expandedTrack, setExpandedTrack] = useState(null);
  const audioRef = useRef(null);
  const { isDark } = useTheme();

  const getInitialState = (props) => props;
  const getAnimateState = (props) => props;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    audio.currentTime = percentage * duration;
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 5v14l11-7L8 5z" fill="currentColor"/>
    </svg>
  );

  const PauseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" fill="currentColor"/>
    </svg>
  );

  const ChevronDownIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  const tracks = [
    { title: 'Son of a Farmer', page: 'son-of-a-farmer', image: './assets/images/sofaf.webp'},
    { title: 'With Intentions', page: 'with-intentions', image: './assets/images/withintens.webp'},
    { title: 'Practice', page: 'practice', image: './assets/images/practice-p.webp'},
    { title: 'Crossroads to Home', page: 'crossroads-to-home', image: './assets/images/crossroads.webp' },
    { title: 'Great Expectation', page: 'great-expectation', image: './assets/images/greatexpec.png'}
  ];

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
                  src="./assets/images/trucker1955.webp"
                  alt="Tucker 1955 album cover"
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
                        className="whitespace-pre-wrap max-w-prose font-normal text-base md:text-2xl"
                        style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                      >
                        Sir Practice Jr
                      </h1>
                      <p 
                        className="max-w-prose whitespace-pre-wrap text-base md:text-2xl -mt-1 md:mt-0"
                        style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                      >
                        Tucker 1955
                      </p>
                    </div>
                  </div>

                  <div className="flex-1 flex items-center py-8">
                    <p 
                      className="text-sm md:text-base font-bold leading-relaxed"
                      style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                    >
"Soul deeper than the ocean, show you what my motion do,<br/>
Spend time with people that have chosen you,<br/>
Breaking through the concrete — what a rose will do.<br/>
Born to be a statement, first estate was mama's golden womb,<br/>
Memento mori — remember you die,<br/>
So carpe diem — remember you can fly."                    </p>
                  </div>

                  <div>
                    <div
                      className="w-full p-6 relative"
                      style={{ 
                        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.25)'}`
                      }}
                    >
                      <button
                        onClick={() => setExpandedTrack(expandedTrack === 'main' ? null : 'main')}
                        className="flex items-center gap-2 text-sm transition-opacity hover:opacity-70 mb-4"
                        style={{ color: isDark ? '#FFFFFF' : '#000000', opacity: 0.7 }}
                      >
                        <span>Listen Now</span>
                        <motion.div
                          animate={{ rotate: expandedTrack === 'main' ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDownIcon />
                        </motion.div>
                      </button>

                      <motion.div
                        initial={false}
                        animate={{
                          height: expandedTrack === 'main' ? 'auto' : 0,
                          opacity: expandedTrack === 'main' ? 1 : 0
                        }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div className="pt-2">
                          <audio
                            ref={audioRef}
                            src="./assets/audio/TUCKER - 1955.mp3"
                            preload="metadata"
                          />
                          
                          <div className="flex items-center gap-4">
                            <button
                              onClick={togglePlay}
                              className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-105"
                              style={{
                                backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
                                color: isDark ? '#FFFFFF' : '#000000'
                              }}
                            >
                              {isPlaying ? <PauseIcon /> : <PlayIcon />}
                            </button>
                            
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span 
                                  className="text-sm font-mono"
                                  style={{ color: isDark ? '#FFFFFF' : '#000000', opacity: 0.7 }}
                                >
                                  {formatTime(currentTime)}
                                </span>
                                <span 
                                  className="text-sm font-mono"
                                  style={{ color: isDark ? '#FFFFFF' : '#000000', opacity: 0.7 }}
                                >
                                  {formatTime(duration)}
                                </span>
                              </div>
                              
                              <div
                                className="w-full h-1 rounded-full cursor-pointer relative"
                                style={{ backgroundColor: isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)' }}
                                onClick={handleSeek}
                              >
                                <div
                                  className="h-full rounded-full transition-all duration-100"
                                  style={{
                                    width: `${duration ? (currentTime / duration) * 100 : 0}%`,
                                    backgroundColor: isDark ? '#FFFFFF' : '#000000'
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
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
more of my tracks            </h1>
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
              {tracks.map((track, index) => (
                <motion.div
                  key={track.page}
                  className="group w-full"
                  initial={getInitialState({ opacity: 0.001, y: 20 })}
                  whileInView={getAnimateState({ opacity: 1, y: 0 })}
                  transition={{ 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: isLoadingComplete ? 0.1 * index : 0 
                  }}
                  viewport={{ once: true }}
                >
                  <div 
                    className="relative w-full overflow-hidden mb-4 cursor-pointer"
                    style={{ paddingBottom: '56.25%' }}
                    onClick={() => onNavigate(track.page)}
                  >
                    <img
                      src={track.image}
                      alt={track.title}
                      className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundColor: isDark ? '#1a1a1a' : '#f5f5f5' }}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <h3 
                        className="font-normal text-base"
                        style={{ color: isDark ? '#FFFFFF' : '#000000' }}
                      >
                        {track.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default Tucker1955Page;