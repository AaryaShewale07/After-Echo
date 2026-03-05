import React, { memo } from 'react';

const Waveform = memo(({ 
  data = [], 
  width = 300, 
  height = 80, 
  color = 'violet',
  animated = false,
  className = '',
}) => {
  const bars = data.length || 40;
  const barWidth = width / bars - 2;
  
  const getColor = () => {
    switch (color) {
      case 'cyan':
        return {
          fill: 'rgba(34, 211, 238, 0.8)',
          glow: 'rgba(34, 211, 238, 0.5)',
        };
      case 'gradient':
        return {
          fill: 'url(#waveformGradient)',
          glow: 'rgba(139, 92, 246, 0.5)',
        };
      default:
        return {
          fill: 'rgba(139, 92, 246, 0.8)',
          glow: 'rgba(139, 92, 246, 0.5)',
        };
    }
  };

  const colors = getColor();

  return (
    <svg 
      width={width} 
      height={height} 
      className={`${className}`}
      viewBox={`0 0 ${width} ${height}`}
    >
      <defs>
        <linearGradient id="waveformGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <filter id="waveformGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#waveformGlow)">
        {[...Array(bars)].map((_, i) => {
          const value = data[i] || (animated ? Math.random() * 0.5 + 0.25 : 0.1);
          const barHeight = value * (height - 10);
          const x = i * (barWidth + 2) + 1;
          const y = (height - barHeight) / 2;

          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={colors.fill}
              rx={barWidth / 2}
              className={animated ? 'animate-waveform-pulse' : ''}
              style={{
                animationDelay: `${i * 0.05}s`,
              }}
            />
          );
        })}
      </g>
    </svg>
  );
});

Waveform.displayName = 'Waveform';

export default Waveform;