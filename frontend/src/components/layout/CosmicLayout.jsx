import React from 'react';
import NebulaBackground from '../backgrounds/NebulaBackground';
import ParticleField from '../backgrounds/ParticleField';

const CosmicLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-cosmic-black relative overflow-hidden">
      <NebulaBackground />
      <ParticleField />
      
      {/* Content layer */}
      <div className="relative z-20 min-h-screen">
        {children}
      </div>
    </div>
  );
};

export default CosmicLayout;