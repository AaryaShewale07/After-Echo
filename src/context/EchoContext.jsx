import React, { createContext, useContext, useState, useCallback } from 'react';

const EchoContext = createContext(null);

export const EchoProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [voiceFile, setVoiceFile] = useState(null);
  const [voiceAnalysis, setVoiceAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [messages, setMessages] = useState([]);

  const navigateTo = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const uploadVoice = useCallback((file) => {
    setVoiceFile(file);
  }, []);

  const startAnalysis = useCallback(() => {
    setIsAnalyzing(true);
    // Simulate analysis process
    setTimeout(() => {
      setVoiceAnalysis({
        rhythm: 0.78,
        emotion: 0.65,
        silence: 0.42,
        pitch: 0.55,
        tempo: 0.70,
      });
      setIsAnalyzing(false);
    }, 5000);
  }, []);

  const addMessage = useCallback((message) => {
    setMessages(prev => [...prev, message]);
  }, []);

  const deleteVoiceData = useCallback(() => {
    setVoiceFile(null);
    setVoiceAnalysis(null);
    setMessages([]);
    setHasConsented(false);
  }, []);

  const value = {
    currentPage,
    voiceFile,
    voiceAnalysis,
    isAnalyzing,
    hasConsented,
    messages,
    navigateTo,
    uploadVoice,
    startAnalysis,
    setHasConsented,
    addMessage,
    deleteVoiceData,
  };

  return (
    <EchoContext.Provider value={value}>
      {children}
    </EchoContext.Provider>
  );
};

export const useEcho = () => {
  const context = useContext(EchoContext);
  if (!context) {
    throw new Error('useEcho must be used within an EchoProvider');
  }
  return context;
};