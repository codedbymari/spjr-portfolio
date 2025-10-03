// src/components/pages/stories/PoetryInMotionPage.js
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PoetryInMotionPage = ({ 
  currentPage, 
  onNavigate, 
  isAudioPlaying, 
  onToggleAudio, 
  isReadingMode, 
  onToggleReadingMode, 
  audioRef 
}) => {
  const [, setIsLoaded] = useState(false);
  const { scrollY } = useScroll();
  
  // Parallax effects
  const titleY = useTransform(scrollY, [0, 500], [0, -100]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.5, 0.8]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

   const storyParagraphs = [
    "The streetlights illuminate a maze of roads and alleyways in the Walthamstow Estate; a small town riddled with hope, drama, and tragedy. Jubilant children battle the heat of cramped streets, where caramel feet tread without rest, enchanted by the absence of pain.",
    
    "Hungry bellies roar like racing car engines. Some beg, some steal, others have found peace. Then, there are the defiant few. With big red permanent markers for feet, they seek to rewrite their script with every step.",
    
    "Like inspectors with infrared specs, we follow their footsteps. We pass boys gambling, throwing pennies at the wall like it was a wishing well. We turn the corner and hear a youthful voice prevail through a sound system:",
    
    "\"The nights for the big steppers, go-getters. If you wanna soar with us, then grow feathers. We hunt through the darkness to find treasures. So, faking a brave heart is never clever!\"",
    
    "Police sirens ring in the distance. The red footsteps lead to a humble house in the beating heart of the estate. The windows are wide open. The night's news flows through the curtains like a welcome breeze. So, we too oblige and enter through the kitchen window. We observe a woman at the stove, with a young girl sitting beside her and paying close attention. A young man barges through the kitchen door, attempting to pick food from a boiling pot. Smack! He recoils at the immediate warning; the young girl laughs at his failed attempt. We follow the defeated young man down a tight, cluttered hallway. It is stacked with brown boxes and dusty black bin bags. They are bursting with treasures accumulated over the years. We skip a bustling living room. Bright red footsteps lead upstairs into a dimly lit room.",
    
    "Peeking through the gap in the door, we find our protagonist, Solo. He sits against the wall on a single bed. Beside him is a makeshift bookshelf. Decorated by Garvey, Socrates, Bell Hooks, and other great writers.",
    
    "We examine as Solo stands up and stretches his 5-foot-10, muscular body. He sizes himself up against a poster above the mirror. It shows a victorious Muhammad Ali standing over a defeated Sonny Liston. Through the mirror, we see three moles form a perfect crescent underneath his left eye. His eyelids open to reveal glossy dark brown eyes, spaced evenly on both sides of his broad black nose. Solo starts to smile. His burgundy-brown lips part, revealing crooked teeth, incomplete with a missing tooth. His smile turns into a cheeky grin, followed by a cocky chuckle. We see \"God\", \"Family\", and \"Greatness\" tattooed on Solo's right arm as he reaches for a container beside the bookcase. Out of the container comes a pearly white denture that Solo fixes into his mouth.",
    
    "Solo sits back down and picks up the pile of paper on his bed. We are now comfortable on the bean bag in the corner of Solo's prison-sized bedroom. Flicking through his thoughts in physical form, Solo picks a page and begins to read:",
    
    "\"I've always thought of you and aspired to be you. I believed I had the potential, but doubt stopped me from believing. The world sees my confidence, but at 25 I started therapy. My friend Benny advised me to try it before I even turned 21. I never felt like I needed it. But she understood my ambitions in depth. A close friend of mind, with different skin, gender, and interests. It is quite telling that I hold her in high regard. Her challenges and intellect will be common in these memoirs I write for you, the silent watchers. I will entitle them Letters to My Future Self – The President.\"",
    
    "\"The link between starting therapy when I was fine and the mention of Benny is a mentality. I am relentless, philosophical, and intuitive at my best. Benny recognised something in that that required attention. The attention that at that time I felt capable of administering to myself, but she replied 'Prevention is better than cure!'.\"",
    
    "\"This led me to think about my trajectory and my current environment. Putting the two together, where would I be in 20 years? Would I be closer to my dreams or would the weight of my surroundings swallow me whole? It's hard to distinguish between fuel for the engine and fuel for a fire that burns everything to…\"",
    
    "Solo's meditations were viciously ended by bullets piercing the flesh of windows. Even the night tales that blew through the curtains ceased. The once lively estate fell silent without warning. At this point, we as watchers had already fled to the safety and shelter of our seats in the sky. We saw Solo's head stretch out from his bedroom window. He looked down at the streets, once filled with jubilant children. Their melted caramel feet were now riddled with bullets.",
    
    "Police sirens flooded in, bringing noise back to the streets. It was like awakening from a strange dream to the crescendo of beating rain. Helpless mothers' hearts burst through weary window panes.",
    
    "Solo returned to his room and although we were no longer in there with him, we could deduce what he did next: Solo would have picked out a blank page from his puddle of thoughts and with his pen that now seemed to be filled with the blood spilled on the streets, the same colour of defiant red that seemed to grace Solo's feet, he would write down 5 last words before going to sleep - \"Is this poetry in motion?\""
  ];
  
  const isQuote = (text) => {
    return text.includes('"') && (text.includes('nights for the big steppers') || text.includes('Is this poetry in motion'));
  };

  return (
    <div className="relative w-screen min-h-screen bg-black overflow-x-hidden">
      {/* Video Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="./assets/videos/solo.mp4" type="video/mp4" />
        </video>
        {/* Dynamic overlay */}
        <motion.div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

      {/* Audio element */}
      {audioRef && (
        <audio ref={audioRef} loop>
          <source src="./assets/audio/poetry-ambient.mp3" type="audio/mpeg" />
        </audio>
      )}

      {/* Back Button - Only shows on hover in top-left corner */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 z-50 flex items-start justify-start p-6 group"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={() => onNavigate('work')}
          className="w-12 h-12 bg-black/30 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 transition-all duration-300 opacity-0 group-hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <div className="text-sm">←</div>
        </motion.button>
      </motion.div>

      {/* Control Bar */}
      <div className="fixed top-8 right-8 z-50 flex flex-col gap-3">
        

       
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-8 py-24">
          <div className="max-w-6xl mx-auto text-center">
            {/* Title */}
            <motion.div
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              <h1 className="text-[30px] md:text-[50px] lg:text-[108px] font-light text-white font-mono tracking-[-0.02em] uppercase mb-6">
                POETRY IN MOTION

              </h1>
             
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-[1px] bg-white/30"></div>
                <span className="text-white/60 text-[14px] font-mono uppercase tracking-[0.2em]">
                  A JOURNEY THROUGH THE ESTATE
                </span>
                <div className="w-16 h-[1px] bg-white/30"></div>
              </div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/40 text-xs font-mono"
              >
                SCROLL
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Story Content Section */}
        <div className="bg-black/70 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-8 py-24">
            {/* Flowing story text */}
            <div className="space-y-8">
              {storyParagraphs.map((paragraph, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ 
                    duration: 1.2, 
                    ease: [0.16, 1, 0.3, 1], 
                    delay: index * 0.1 
                  }}
                  className={`${
                    isReadingMode 
                      ? 'opacity-40 hover:opacity-100 transition-opacity duration-500' 
                      : ''
                  }`}
                >
                  {isQuote(paragraph) ? (
                    <div className="my-12 px-8">
                      <p className="text-white/95 text-[20px] md:text-[22px] leading-[1.8] font-light tracking-[-0.01em] text-center italic border-l-4 pl-6">
                        {paragraph.replace(/"/g, '')}
                      </p>
                    </div>
                  ) : (
                    <p className="text-white/90 text-[18px] md:text-[20px] leading-[1.8] font-light tracking-[-0.01em] text-justify mb-6">
                      {paragraph}
                    </p>
                  )}
                </motion.div>
              ))}

              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="pt-16 text-center"
              >
                <p className="text-white/40 text-[12px] font-mono uppercase tracking-[0.2em]">
                  © Sir Practice Jr. 
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoetryInMotionPage;