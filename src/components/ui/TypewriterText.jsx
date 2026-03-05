import React, { useState, useEffect } from 'react';

const TypewriterText = ({ 
  text, 
  speed = 50, 
  delay = 0,
  onComplete,
  className = '',
  cursor = true,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);

    const startTimeout = setTimeout(() => {
      let currentIndex = 0;
      
      const typeInterval = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.slice(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [text, speed, delay, onComplete]);

  useEffect(() => {
    if (!cursor) return;
    
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, [cursor]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && !isComplete && (
        <span 
          className={`inline-block w-px h-[1em] bg-cosmic-violet ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
          style={{ verticalAlign: 'text-bottom' }}
        />
      )}
    </span>
  );
};

export default TypewriterText;