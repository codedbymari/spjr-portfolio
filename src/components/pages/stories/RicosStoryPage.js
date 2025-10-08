// src/components/pages/stories/RicosStoryPage.js
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const RicosStoryPage = ({ 
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
    "Rio de Janeiro is a city full of stories. Its houses stack up like old books on forgotten shelves. Dust from the pages ascends to God's skies, kissing the falling sun. Civilians breathe in evaporated words like oxygen. Plots they will never know the origins of inspire them. A veil of vibrancy and unity shrouds their lives, but let us not judge a book by its cover.",
    "Laughter comes down from the tall houses, mixing defiance with hope. Meanwhile, warning kites soar in the sky like flags held by young boys. Young women fill hair salons, teaching their daughters to braid hair. Meanwhile, their sons escape their parents' watch, rushing into the open kitchen sheds. The smell of fried frango and carne hangs in the air. At the bottom of the winding stairs and hills, young men on motorcycles stand ready.",
    "Amidst the noise and bustle, a rhythm emerges, bringing structure to the vibrant chaos. The stories behind us sit on mountain shelves and urge us to tell them. We, the quiet observers, oblige. We steal a ride on the back of a moving motorcycle, the wind rushing past us. Our spirits skim the dirty concrete streets of the slums. The sounds of Brazilian Portuguese fill the air, creating a lively tune.",
    "We turn a corner at a steep angle. Our driver leans to the side, and the street almost touches his right cheek. As the moto rises, our heads follow and meet the setting sun as it bids its final emphatic farewell. Applause fills the air, echoing against the purple-red night sky. Crowds of tourists and Cariocas alike swarm the boardwalk, wielding Caipirinhas and coconuts.",
    "The moto comes to an abrupt halt, launching us onto the lively boardwalk. We turn away from the ocean and spot an invisible wet, red trail of footsteps. This trail leads us to an American-Brazilian restaurant on the quieter side of the road. Tanned skin in swimsuits and Havaianas dry themselves as they cross the road. Men put on their buttonless shirts before reaching the bouncers at the establishment.",
    "A grand fountain with a mermaid sits in the restaurant's front courtyard. We hear Gringo's English as tourists pour in. We step into the main room. Diners gather at round tables as bartenders work their magic at the marble bar for the thirsty crowd. We gaze in awe at the chandelier above the centre stage. Its lights flicker against the silver tags on the young waiters' white shirts. And then we see the end of the trail of footsteps and meet the soul responsible for the footsteps we came to see.",
    "Rico, a Brazilian boy who will soon receive the name Brook, sits in the corner, absorbed in his thoughts. He unfolds his hands with clear intent. He lifts the instrument off the floor, catching the diners' attention. Intense anticipation fills his eyes as he lifts it, curious like it's his first time with a gun. The air in the room feels thick with humidity. He breathes out and sets off the first of several triggers deep in the guitar.",
    "The sound of the strings inspires the ears and lips of every individual within 30 feet. His body relaxes, and a smile spreads across his face. He greets the diners and begins to captivate them with gentle precision. The expansive heat of the sonic energy from Rico's melodies transports him back in time. Memories of his father's teary face grip his cerebrum and send the pain from his brain to his fingertips.",
    "Each strum draws the diners further into his world. Each hum releases a glimpse of the pain buried deep within Rico's dark brown eyes. His songs tell tales the diners will never be familiar with. Yet the pain pierces through their hearts, bringing them to his mercy. Here on this stage, the boy from the slums is king.",
    "The diners clap with joy, each sound pulling Rico deeper into this dream. See, Rico has always wanted this moment of grace on this make-shift dinner table stage to be his reality. He has always possessed the soul of a hero, and instruments are the wand that he uses to channel his powers. His only wish is to change lives. But each day, that hope breaks in the harsh reality of the favelas where he grew up in pieces.",
    "Lost in the applause and mental echoes of his music, Rico does not notice the gentle tap on his shoulder. Then he hears a warm voice say 'Obrigado, irmão. Thank you for sharing your song with us.' As the applause fades, Rico clings to his dream, knowing that each note he plays is a step towards a brighter future. Looking up at the observant person before him, who had saved him from drowning in his thoughts, Rico smiles once again \"Qual e sou nome?\".",
    "He knows that building relationships with these people is unwise, but he feels compelled to do it. One after the other, the diners surround Rico's table for one in awe. The restaurant manager pushes her way through the crowd to greet Rico. Congratulating him, she offers to cover his bill, but realises all he ordered was a bottle of water. Rico never ate on a job.",
    "She then pulls 200 Reais from her purse of tips to hand to Rico as payment for his impromptu performance. The fresh green aroma graces Rico's nostrils, inspiring a smile to crack from his dark lips. The grin applies pressure to the top of his cheeks, lifting his eyes. \"Vallejo!\".",
    "Pushing his chair back and placing his guitar on the table, Rico stands up for the very first time. Like the imposing favelas that look down on the City of God's riches, his slim figure towers over the diners. The temperature in the air drops and heat sweats turn to cold sweats, as Rico's voice deepens, \"Desculpe, I'm going to need more than that.\". Like clockwork the doors swing open. Followed by two gunshots demanding silence and seizing decorum from the restaurant's sound systems. Rico's pain had left his eyes and entered the restaurant."
  ];

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
          <source src="./assets/videos/rio-favelas.mp4" type="video/mp4" />
        </video>
        {/* Dynamic overlay */}
        <motion.div 
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      </div>

     
      {/* Back Button - Only shows on hover in top-left corner */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 z-50 flex items-start justify-start p-6 group"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={() => onNavigate('writing')}
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
            {/* Story Opening - Subtle Integration */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="mb-16"
            >
              <p className="text-white/70 text-[16px] md:text-[18px] font-light italic leading-loose tracking-wide">
                Part 1
              </p>
            </motion.div>

            {/* Title */}
            <motion.div
              style={{ y: titleY }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            >
              <h1 className="text-[64px] md:text-[96px] lg:text-[128px] font-light text-white font-mono tracking-[-0.02em] uppercase mb-8">
                RICO'S STORY
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              className="mb-16"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-16 h-[1px] bg-white/30"></div>
                <span className="text-white/60 text-[14px] font-mono uppercase tracking-[0.2em]">
                  BY SIR PRACTICE JR.
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

        {/* Content Section */}
        <div className="bg-black/60 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-8 py-24">
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
                  <p className="text-white/90 text-[18px] md:text-[20px] leading-[1.8] font-light tracking-[-0.01em] text-justify mb-6">
                    {paragraph}
                  </p>
                </motion.div>
              ))}

              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="pt-12 text-center"
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

export default RicosStoryPage;