import React, { useState, useEffect } from 'react';
import { useEcho } from '../../context/EchoContext';
import CosmicButton from '../ui/CosmicButton';
import TypewriterText from '../ui/TypewriterText';

const LandingPage = () => {
  const { navigateTo } = useEcho();
  const [showSubtext, setShowSubtext] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-4 transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
      {/* Logo / Brand */}
      <div className="mb-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <h1 className="text-4xl md:text-5xl font-thin tracking-[0.3em] text-cosmic-white/90">
          AFTER<span className="text-cosmic-violet">ECHO</span>
        </h1>
      </div>

      {/* Main tagline */}
      <div className="text-center mb-16 max-w-2xl">
        <h2 className="text-2xl md:text-4xl font-extralight tracking-wide text-cosmic-white leading-relaxed">
          <TypewriterText 
            text="Some voices never fade."
            speed={80}
            onComplete={() => setTimeout(() => setShowSubtext(true), 500)}
          />
        </h2>
        
        {showSubtext && (
          <p className="mt-4 text-xl md:text-2xl font-thin tracking-wide text-cosmic-violet animate-fade-in">
            <TypewriterText 
              text="They echo."
              speed={100}
              onComplete={() => setTimeout(() => setShowButton(true), 800)}
            />
          </p>
        )}
      </div>

      {/* CTA Button */}
      {showButton && (
        <div className="animate-fade-in-up">
          <CosmicButton 
            onClick={() => navigateTo('upload')}
            size="lg"
          >
            Begin the Echo
          </CosmicButton>
        </div>
      )}

      {/* Bottom tagline */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <p className="text-xs font-thin tracking-[0.2em] text-cosmic-white/30 uppercase">
          A digital space where voices live on
        </p>
      </div>
    </div>
  );
};

export default LandingPage;