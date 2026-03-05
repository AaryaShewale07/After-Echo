import React, { memo } from 'react';
import { useMousePosition } from '../../hooks/useMousePosition';

const NebulaBackground = memo(() => {
  const { normalizedPosition } = useMousePosition();

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic-black via-cosmic-deepBlue to-cosmic-black" />
      
      {/* Nebula clouds */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full nebula-gradient animate-nebula-float opacity-60"
        style={{
          top: '10%',
          left: '20%',
          transform: `translate(${normalizedPosition.x * 30}px, ${normalizedPosition.y * 30}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      
      <div 
        className="absolute w-[600px] h-[600px] rounded-full animate-nebula-float-reverse opacity-40"
        style={{
          bottom: '10%',
          right: '10%',
          background: 'radial-gradient(ellipse at center, rgba(34, 211, 238, 0.2) 0%, transparent 70%)',
          transform: `translate(${-normalizedPosition.x * 20}px, ${-normalizedPosition.y * 20}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />
      
      <div 
        className="absolute w-[500px] h-[500px] rounded-full animate-nebula-float opacity-30"
        style={{
          top: '50%',
          left: '60%',
          background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
          animationDelay: '-20s',
        }}
      />

      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.8 + 0.2,
              animation: `pulseGlow ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Distant galaxies */}
      <div 
        className="absolute w-2 h-2 rounded-full"
        style={{
          top: '20%',
          right: '30%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.8) 0%, transparent 70%)',
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
        }}
      />
      
      <div 
        className="absolute w-1 h-1 rounded-full"
        style={{
          bottom: '30%',
          left: '15%',
          background: 'radial-gradient(circle, rgba(34, 211, 238, 0.8) 0%, transparent 70%)',
          boxShadow: '0 0 15px rgba(34, 211, 238, 0.5)',
        }}
      />
    </div>
  );
});

NebulaBackground.displayName = 'NebulaBackground';

export default NebulaBackground;