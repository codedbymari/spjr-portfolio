// src/components/pages/WorkPage.js
import { motion } from 'framer-motion';
import { useState } from 'react';
import Header from '../common/Header';

const WorkPage = ({ currentPage, onNavigate, isLoadingComplete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Animation helper functions (matching your project grid pattern)
  const getInitialState = (props) => props;
  const getAnimateState = (props) => props;

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className="group relative cursor-pointer"
          initial={getInitialState({ opacity: 0.001, y: 140 })}
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
          <div className="aspect-[1.2/1] w-full relative overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={item.imageSrc}
              alt={item.title}
            />
            {/* Coming Soon Overlay */}
            {item.title === 'Coming Soon' && (
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white/80 text-sm font-mono uppercase tracking-wide">
                  Coming Soon
                </span>
              </div>
            )}
          </div>
          
          {/* Project Info */}
          <div className="flex items-start justify-start w-full pt-4 overflow-hidden">
            <span className="text-[#ffffff] text-[13px] font-normal tracking-[-0.01em] uppercase font-mono">
              {item.number}
            </span>
            <span className="text-[#ffffff] text-[13px] font-normal tracking-[-0.01em] uppercase font-mono mx-2">
              /
            </span>
            <div className="flex-1 relative">
              {/* Default Title */}
              <div className="text-[#ffffff] text-[13px] font-normal tracking-[-0.01em] uppercase font-mono leading-relaxed transform transition-transform duration-500 group-hover:-translate-y-6">
                {item.title}
              </div>
              {/* Hover Title */}
              <div className="absolute top-0 text-[#ffffff] text-[13px] font-normal tracking-[-0.01em] uppercase font-mono opacity-80 transform translate-y-6 transition-transform duration-500 group-hover:translate-y-0">
                {item.title === 'Coming Soon' ? 'STAY TUNED' : 'VIEW PROJECT'}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="w-screen min-h-screen bg-black relative">
      <Header 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        currentPage={currentPage}
        onNavigate={onNavigate}
      />
      
      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-start px-8 py-20">
        {/* Page Title */}
        <motion.div
          className="mb-24"
          initial={getInitialState({ opacity: 0.001, y: 60 })}
          whileInView={getAnimateState({ opacity: 1, y: 0 })}
          transition={{ 
            duration: 1.5, 
            ease: [0.16, 1, 0.3, 1], 
            delay: isLoadingComplete ? 0.5 : 0 
          }}
          viewport={{ once: true }}
        >
          <h1 className="text-[#ffffff] text-[48px] md:text-[72px] font-light tracking-[-0.02em] uppercase font-mono text-center">
            WORK
          </h1>
        </motion.div>

        {/* Content Container */}
        <div className="w-full max-w-[1200px] space-y-32">
          
          {/* Writing Section */}
          <div className="space-y-16">
            {/* Writing Section Title */}
            <motion.div
              className="relative"
              initial={getInitialState({ opacity: 0.001, y: 40 })}
              whileInView={getAnimateState({ opacity: 1, y: 0 })}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1], 
                delay: isLoadingComplete ? 0.7 : 0 
              }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-start mb-2">
                <div className="w-12 h-[1px] bg-[#ffffff] opacity-30 mr-6"></div>
                <h2 className="text-[#ffffff] text-[24px] md:text-[32px] font-light tracking-[-0.01em] uppercase font-mono">
                  WRITING 
                </h2>
              </div>
              <p className="text-[#ffffff] text-[14px] opacity-60 font-mono uppercase tracking-[-0.01em] ml-18">
                SHORT STORIES & REFLECTIONS
              </p>
            </motion.div>
            
            {/* Writing Projects Grid */}
            <ProjectGrid items={writingItems} sectionDelay={0.9} />
          </div>

          {/* Music Section */}
          <div className="space-y-16">
            {/* Music Section Title */}
            <motion.div
              className="relative"
              initial={getInitialState({ opacity: 0.001, y: 40 })}
              whileInView={getAnimateState({ opacity: 1, y: 0 })}
              transition={{ 
                duration: 1.5, 
                ease: [0.16, 1, 0.3, 1], 
                delay: isLoadingComplete ? 0.5 : 0 
              }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-start mb-2">
                <div className="w-12 h-[1px] bg-[#ffffff] opacity-30 mr-6"></div>
                <h2 className="text-[#ffffff] text-[24px] md:text-[32px] font-light tracking-[-0.01em] uppercase font-mono">
                  MUSIC
                </h2>
              </div>
              <p className="text-[#ffffff] text-[14px] opacity-60 font-mono uppercase tracking-[-0.01em] ml-18">
                FEATURES & COLLABORATIONS
              </p>
            </motion.div>
            
            {/* Music Projects Grid */}
            <ProjectGrid items={musicItems} sectionDelay={1.7} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkPage;