import React from 'react';

const CosmicLoadingRing = ({ progress = 0, size = 200, showPercentage = true }) => {
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Outer glow ring */}
      <svg
        className="absolute inset-0 animate-cosmic-ring"
        width={size}
        height={size}
      >
        <defs>
          <linearGradient id="cosmicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#cosmicGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          filter="url(#glow)"
          opacity="0.3"
        />
      </svg>

      {/* Progress ring */}
      <svg
        className="absolute inset-0 -rotate-90"
        width={size}
        height={size}
      >
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - 10}
          fill="none"
          stroke="rgba(139, 92, 246, 0.1)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - 10}
          fill="none"
          stroke="url(#cosmicGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter="url(#glow)"
          className="transition-all duration-500 ease-out"
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {showPercentage && (
            <span className="text-2xl font-thin text-cosmic-white tracking-wider">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      </div>

      {/* Orbiting particles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-cosmic-violet animate-cosmic-ring"
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: `0 ${radius - 20}px`,
            animationDuration: `${3 + i}s`,
            animationDelay: `${i * 0.5}s`,
            boxShadow: '0 0 10px rgba(139, 92, 246, 0.8)',
          }}
        />
      ))}
    </div>
  );
};

export default CosmicLoadingRing;