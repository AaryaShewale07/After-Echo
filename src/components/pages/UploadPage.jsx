import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useEcho } from '../../context/EchoContext';
import CosmicButton from '../ui/CosmicButton';
import Waveform from '../ui/Waveform';
import { useAudioAnalyzer } from '../../hooks/useAudioAnalyzer';

const UploadPage = () => {
  const { navigateTo, uploadVoice, hasConsented, setHasConsented } = useEcho();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showConsent, setShowConsent] = useState(true);
  const fileInputRef = useRef(null);
  const { audioData, generateRandomWaveform, stopVisualization } = useAudioAnalyzer();

  const acceptedFormats = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/x-m4a', 'audio/m4a'];

  useEffect(() => {
    if (file && status === 'uploaded') {
      generateRandomWaveform();
    }
    return () => stopVisualization();
  }, [file, status, generateRandomWaveform, stopVisualization]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && acceptedFormats.includes(droppedFile.type)) {
      setFile(droppedFile);
      setStatus('listening');
      setTimeout(() => setStatus('uploaded'), 2000);
    }
  }, []);

  const handleFileSelect = useCallback((e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setStatus('listening');
      setTimeout(() => setStatus('uploaded'), 2000);
    }
  }, []);

  const handleConsent = () => {
    setHasConsented(true);
    setShowConsent(false);
  };

  const handleContinue = () => {
    uploadVoice(file);
    navigateTo('analysis');
  };

  // Consent Modal
  if (showConsent && !hasConsented) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="cosmic-glass rounded-2xl p-8 max-w-lg text-center animate-fade-in">
          <div className="mb-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full border border-cosmic-violet/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-cosmic-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-xl font-light tracking-wide text-cosmic-white mb-4">
              Consent & Understanding
            </h2>
          </div>

          <div className="space-y-4 text-left text-sm text-cosmic-white/70 font-light leading-relaxed mb-8">
            <p>
              Before proceeding, please confirm:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-cosmic-violet mt-1">•</span>
                <span>You have the right to upload this voice recording</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cosmic-violet mt-1">•</span>
                <span>You understand this creates an echo, not a replica of the person</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cosmic-violet mt-1">•</span>
                <span>You can delete your voice data at any time</span>
              </li>
            </ul>
          </div>

          <div className="p-4 bg-cosmic-violet/5 rounded-lg border border-cosmic-violet/10 mb-8">
            <p className="text-xs text-cosmic-white/50 font-light">
              ⚠️ This technology should be used respectfully. Please be mindful of your emotional well-being.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <CosmicButton variant="ghost" onClick={() => navigateTo('landing')}>
              Go Back
            </CosmicButton>
            <CosmicButton onClick={handleConsent}>
              I Understand
            </CosmicButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Back button */}
      <button 
        onClick={() => navigateTo('landing')}
        className="absolute top-8 left-8 text-cosmic-white/40 hover:text-cosmic-white/80 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </button>

      {/* Page title */}
      <div className="mb-12 text-center animate-fade-in">
        <h2 className="text-2xl font-thin tracking-wide text-cosmic-white/90 mb-2">
          Upload a Voice
        </h2>
        <p className="text-sm font-light text-cosmic-white/40">
          Share a moment. Create an echo.
        </p>
      </div>

      {/* Upload zone */}
      <div 
        className={`
          relative w-full max-w-md aspect-square rounded-full
          border-2 border-dashed transition-all duration-500
          flex flex-col items-center justify-center
          cursor-pointer group
          ${isDragging 
            ? 'border-cosmic-violet bg-cosmic-violet/5 scale-105' 
            : 'border-cosmic-white/10 hover:border-cosmic-white/30'}
          ${file ? 'border-cosmic-violet/50' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !file && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp3,.wav,.m4a"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Inner glow effect */}
        <div className={`
          absolute inset-4 rounded-full transition-opacity duration-500
          ${isDragging || file ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}
        `} style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
        }} />

        {/* Content */}
        <div className="relative z-10 text-center px-8">
          {!file ? (
            <>
              <div className="mb-6">
                <svg className="w-12 h-12 mx-auto text-cosmic-white/20 group-hover:text-cosmic-violet/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <p className="text-sm font-light text-cosmic-white/40 mb-2">
                Drag & drop a voice note
              </p>
              <p className="text-xs text-cosmic-white/20">
                MP3, WAV, or M4A
              </p>
            </>
          ) : (
            <>
              <div className="mb-4">
                <Waveform 
                  data={audioData} 
                  width={200} 
                  height={60} 
                  color="gradient"
                  animated={status !== 'idle'}
                />
              </div>
              <p className="text-sm font-light text-cosmic-white/60 mb-1">
                {file.name}
              </p>
              <p className="text-xs text-cosmic-violet animate-pulse-glow">
                {status === 'listening' ? 'Listening...' : 
                 status === 'uploaded' ? 'Learning the echo...' : ''}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Action buttons */}
      {file && status === 'uploaded' && (
        <div className="mt-12 flex gap-4 animate-fade-in-up">
          <CosmicButton 
            variant="ghost"
            onClick={() => {
              setFile(null);
              setStatus('idle');
              stopVisualization();
            }}
          >
            Choose Different
          </CosmicButton>
          <CosmicButton onClick={handleContinue}>
            Continue
          </CosmicButton>
        </div>
      )}

      {/* Disclaimer */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs font-light text-cosmic-white/20">
          Your voice data is processed securely and can be deleted at any time
        </p>
      </div>
    </div>
  );
};

export default UploadPage;