import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useEcho } from '../../context/EchoContext';
import CosmicButton from '../ui/CosmicButton';
import Waveform from '../ui/Waveform';
import TypewriterText from '../ui/TypewriterText';

const ConversationPage = () => {
  const { navigateTo, messages, addMessage, deleteVoiceData } = useEcho();
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState('text'); // 'text' | 'voice'
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);
  const [waveformData, setWaveformData] = useState(new Array(40).fill(0.1));

  // Simulated AI responses
  const aiResponses = [
    "I hear you... the silence between words holds meaning too.",
    "That resonates with something familiar... like a distant memory.",
    "In the echo of your words, I sense warmth.",
    "Time moves differently here, in this space between voices.",
    "Your words create ripples... let them settle.",
  ];

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setWaveformData(new Array(40).fill(0).map(() => Math.random() * 0.8 + 0.2));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSend = useCallback(() => {
    if (!inputValue.trim()) return;

    // Add user message
    addMessage({
      type: 'user',
      content: inputValue,
      timestamp: Date.now(),
    });

    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      addMessage({
        type: 'echo',
        content: randomResponse,
        timestamp: Date.now(),
      });
      setIsTyping(false);
      
      if (mode === 'voice') {
        setIsPlaying(true);
        setTimeout(() => setIsPlaying(false), 3000);
      }
    }, 2000);
  }, [inputValue, addMessage, mode, aiResponses]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleDelete = () => {
    if (window.confirm('This will permanently delete all voice data and conversation history. Continue?')) {
      deleteVoiceData();
      navigateTo('landing');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 cosmic-glass border-b border-cosmic-white/5">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={() => navigateTo('landing')}
            className="text-cosmic-white/40 hover:text-cosmic-white/80 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          <div className="text-center">
            <h1 className="text-sm font-light tracking-[0.2em] text-cosmic-white/60 uppercase">
              Echo Active
            </h1>
          </div>

          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="text-cosmic-white/40 hover:text-cosmic-white/80 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Settings dropdown */}
      {showSettings && (
        <div className="fixed top-16 right-4 z-40 cosmic-glass rounded-lg p-4 animate-fade-in min-w-48">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-cosmic-white/60">Voice + Text</span>
              <button
                onClick={() => setMode(mode === 'text' ? 'voice' : 'text')}
                className={`w-10 h-5 rounded-full transition-colors ${mode === 'voice' ? 'bg-cosmic-violet' : 'bg-cosmic-white/10'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${mode === 'voice' ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            <hr className="border-cosmic-white/5" />
            <button
              onClick={handleDelete}
              className="text-xs text-red-400/60 hover:text-red-400 transition-colors w-full text-left"
            >
              Delete Voice Data
            </button>
          </div>
        </div>
      )}

      {/* Messages area */}
      <main className="flex-1 overflow-y-auto pt-20 pb-32">
        <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
          {messages.length === 0 && (
            <div className="text-center py-20 animate-fade-in">
              <p className="text-sm font-light text-cosmic-white/30">
                Begin your conversation with the echo...
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                {message.type === 'echo' && (
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-cosmic-violet/20 border border-cosmic-violet/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-cosmic-violet animate-pulse" />
                    </div>
                    <span className="text-xs text-cosmic-white/30 font-light">Echo</span>
                  </div>
                )}
                
                <div className={`
                  px-5 py-4 rounded-2xl
                  ${message.type === 'user' 
                    ? 'bg-cosmic-violet/20 border border-cosmic-violet/20 rounded-br-none' 
                    : 'cosmic-glass rounded-bl-none'}
                `}>
                  <p className="text-sm font-light text-cosmic-white/80 leading-relaxed">
                    {message.type === 'echo' && index === messages.length - 1 ? (
                      <TypewriterText text={message.content} speed={30} cursor={false} />
                    ) : (
                      message.content
                    )}
                  </p>
                  
                  {/* Voice waveform for echo messages in voice mode */}
                  {message.type === 'echo' && mode === 'voice' && index === messages.length - 1 && isPlaying && (
                    <div className="mt-3 pt-3 border-t border-cosmic-white/5">
                      <Waveform 
                        data={waveformData} 
                        width={200} 
                        height={30} 
                        color="violet"
                        animated={true}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="cosmic-glass px-5 py-4 rounded-2xl rounded-bl-none">
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-cosmic-violet/50 animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input area */}
      <footer className="fixed bottom-0 left-0 right-0 z-30 cosmic-glass border-t border-cosmic-white/5">
        <div className="max-w-2xl mx-auto px-4 py-4">
          {/* Disclaimer */}
          <p className="text-center text-[10px] font-light text-cosmic-white/20 mb-3">
            This is an echo, not the person. Responses are AI-generated.
          </p>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="w-full bg-cosmic-white/5 border border-cosmic-white/10 rounded-full px-5 py-3 text-sm font-light text-cosmic-white placeholder-cosmic-white/30 focus:outline-none focus:border-cosmic-violet/50 transition-colors"
              />
            </div>
            
            <CosmicButton 
              onClick={handleSend}
              size="sm"
              disabled={!inputValue.trim() || isTyping}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </CosmicButton>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ConversationPage;