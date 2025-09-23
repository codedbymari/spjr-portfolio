import React from 'react';

const LoadingScreen = ({ animationStage }) => {
  return (
    <>
      {/* Circular Reveal Overlay */}
      <div className={`
        fixed inset-0 z-40 bg-white
        transition-[clip-path] duration-[1500ms] ease-out
        ${animationStage === 'complete'
          ? 'clip-[circle(150%_at_50%_50%)]'
          : 'clip-[circle(0%_at_50%_50%)]'}
      `}>
        {/* Your actual page content can be rendered separately */}
      </div>

      {/* Black Loading Screen */}
      <div className={`
        fixed inset-0 z-50 bg-black flex items-center justify-center
        transform transition-all duration-[1500ms] ease-out
        ${animationStage === 'complete' ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}
      `}>
        <div className="text-center px-4">
          {/* Main Title */}
          <div className="overflow-hidden mb-6">
            <h1 className="font-normal uppercase tracking-wide leading-tight text-white text-[24px]">
              <span className={`
                block transform transition-all duration-[1200ms] ease-out
                ${animationStage === 'loading' ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}
              `}
              style={{transitionDelay: '300ms'}}
              >
                SIR
              </span>
              <span className={`
                block transform transition-all duration-[1200ms] ease-out
                ${animationStage === 'loading' ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}
              `}
              style={{transitionDelay: '800ms'}}
              >
                PRACTICE
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="overflow-hidden mb-8">
            <p className={`
              text-sm md:text-base font-light text-white/80 tracking-wide
              transform transition-all duration-[1000ms] ease-out
              ${animationStage === 'loading' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
            `}
            style={{transitionDelay: '1200ms'}}
            >            </p>
          </div>

          {/* Loading Animation Placeholder */}
          <div className={`
            flex justify-center items-center gap-1 mb-8
            transform transition-all duration-[800ms] ease-out
            ${animationStage === 'loading' ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
          `}
          style={{transitionDelay: '1600ms'}}
          >
            {/* Add spinner or animation here if needed */}
          </div>

          {/* Loading Text */}
          <p className={`
            mt-4 text-xs md:text-sm font-light text-white/50 tracking-widest uppercase
            transform transition-all duration-[700ms] ease-out
            ${animationStage === 'loading' ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}
          `}
          style={{transitionDelay: '2000ms'}}
          >
            {animationStage === 'loading' && 'Initializing...'}
          </p>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
