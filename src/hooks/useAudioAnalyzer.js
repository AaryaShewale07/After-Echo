import { useState, useRef, useCallback, useEffect } from 'react';

export const useAudioAnalyzer = () => {
  const [audioData, setAudioData] = useState(new Array(64).fill(0));
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const sourceRef = useRef(null);
  const animationRef = useRef(null);

  const initializeAudio = useCallback(async (file) => {
    if (!file) return;

    try {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 128;

      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      
      sourceRef.current = audioContextRef.current.createBufferSource();
      sourceRef.current.buffer = audioBuffer;
      sourceRef.current.connect(analyserRef.current);
      analyserRef.current.connect(audioContextRef.current.destination);

      return true;
    } catch (error) {
      console.error('Error initializing audio:', error);
      return false;
    }
  }, []);

  const startVisualization = useCallback(() => {
    if (!analyserRef.current) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const updateVisual = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      setAudioData(Array.from(dataArray).map(v => v / 255));
      animationRef.current = requestAnimationFrame(updateVisual);
    };

    updateVisual();
    setIsPlaying(true);
  }, []);

  const stopVisualization = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    setIsPlaying(false);
  }, []);

  const generateRandomWaveform = useCallback(() => {
    const generate = () => {
      setAudioData(prev => 
        prev.map(() => Math.random() * 0.6 + 0.2)
      );
      animationRef.current = requestAnimationFrame(generate);
    };
    generate();
    setIsPlaying(true);
  }, []);

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    audioData,
    isPlaying,
    initializeAudio,
    startVisualization,
    stopVisualization,
    generateRandomWaveform,
  };
};