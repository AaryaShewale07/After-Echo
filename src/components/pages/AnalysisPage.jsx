import React, { useState, useEffect } from 'react';
import { useEcho } from '../../context/EchoContext';
import CosmicLoadingRing from '../ui/CosmicLoadingRing';
import CosmicButton from '../ui/CosmicButton';

const AnalysisPage = () => {
  const { navigateTo, startAnalysis, voiceAnalysis, isAnalyzing } = useEcho();
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const phases = [
    { name: 'Rhythm', description: 'Mapping the tempo and flow...' },
    { name: 'Emotion', description: 'Sensing the emotional patterns...' },
    { name: 'Silence', description: 'Understanding the pauses...' },
    { name: 'Essence', description: 'Capturing the echo...' },
  ];

  useEffect(() => {
    startAnalysis();
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(progressInterval);
  }, [startAnalysis]);

  useEffect(() => {
    const phaseIndex = Math.min(Math.floor(progress / 25), 3);
    setCurrentPhase(phaseIndex);
    
    if (progress === 100) {
      setTimeout(() => setShowResults(true), 500);
    }
  }, [progress]);

  const AnalysisAttribute = ({ label, value, delay }) => (
    <div 
      className="animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-light text-cosmic-white/60 tracking-wide uppercase">
          {label}
        </span>
        <span className="text-sm font-light text-cosmic-violet">
          {Math.round(value * 100)}%
        </span>
      </div>
      <div className="h-1 bg-cosmic-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-cosmic-violet to-cosmic-cyan rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${value * 100}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {!showResults ? (
        <>
          {/* Loading state */}
          <div className="mb-12">
            <CosmicLoadingRing progress={progress} size={220} />
          </div>

          {/* Phase indicator */}
          <div className="text-center mb-8 h-16">
            <p className="text-lg font-light text-cosmic-white/80 mb-2 animate-pulse">
              {phases[currentPhase].name}
            </p>
            <p className="text-sm font-light text-cosmic-white/40">
              {phases[currentPhase].description}
            </p>
          </div>

          {/* Phase dots */}
          <div className="flex gap-3">
            {phases.map((_, index) => (
              <div
                key={index}
                className={`
                  w-2 h-2 rounded-full transition-all duration-500
                  ${index <= currentPhase 
                    ? 'bg-cosmic-violet glow-violet' 
                    : 'bg-cosmic-white/10'}
                `}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {/* Results */}
          <div className="w-full max-w-md animate-fade-in">
            <div className="text-center mb-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border border-cosmic-violet/30 flex items-center justify-center glow-violet">
                <svg className="w-10 h-10 text-cosmic-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-thin tracking-wide text-cosmic-white mb-2">
                Echo Captured
              </h2>
              <p className="text-sm font-light text-cosmic-white/40">
                The voice has been analyzed
              </p>
            </div>

            {/* Analysis results */}
            <div className="cosmic-glass rounded-2xl p-8 space-y-6 mb-8">
              <h3 className="text-xs font-light tracking-[0.2em] uppercase text-cosmic-white/30 mb-6">
                Voice Signature
              </h3>
              
              {voiceAnalysis && (
                <>
                  <AnalysisAttribute label="Rhythm" value={voiceAnalysis.rhythm} delay={100} />
                  <AnalysisAttribute label="Emotion" value={voiceAnalysis.emotion} delay={200} />
                  <AnalysisAttribute label="Silence" value={voiceAnalysis.silence} delay={300} />
                  <AnalysisAttribute label="Pitch" value={voiceAnalysis.pitch} delay={400} />
                  <AnalysisAttribute label="Tempo" value={voiceAnalysis.tempo} delay={500} />
                </>
              )}
            </div>

            {/* Disclaimer */}
            <div className="text-center mb-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
              <p className="text-xs font-light text-cosmic-white/30 italic">
                "This is an echo, not the person."
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 justify-center animate-fade-in-up" style={{ animationDelay: '700ms' }}>
              <CosmicButton variant="ghost" onClick={() => navigateTo('upload')}>
                Upload Different
              </CosmicButton>
              <CosmicButton onClick={() => navigateTo('conversation')}>
                Begin Conversation
              </CosmicButton>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalysisPage;