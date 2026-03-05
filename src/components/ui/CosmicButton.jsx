import React, { useState } from 'react';

const CosmicButton = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = `
    relative overflow-hidden
    font-light tracking-widest uppercase
    transition-all duration-500 ease-out
    border rounded-full
    disabled:opacity-30 disabled:cursor-not-allowed
  `;

  const sizeStyles = {
    sm: 'px-6 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-12 py-4 text-base',
  };

  const variantStyles = {
    primary: `
      border-cosmic-violet/30 text-cosmic-white
      hover:border-cosmic-violet hover:text-cosmic-violet
      ${isHovered ? 'glow-violet' : ''}
    `,
    secondary: `
      border-cosmic-cyan/30 text-cosmic-white
      hover:border-cosmic-cyan hover:text-cosmic-cyan
      ${isHovered ? 'glow-cyan' : ''}
    `,
    ghost: `
      border-transparent text-cosmic-white/60
      hover:text-cosmic-white hover:border-cosmic-white/20
    `,
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${isHovered ? 'animate-breathing' : ''}
        ${className}
      `}
    >
      {/* Background glow effect */}
      <span 
        className={`
          absolute inset-0 opacity-0 transition-opacity duration-500
          ${variant === 'primary' ? 'bg-cosmic-violet/10' : 'bg-cosmic-cyan/10'}
          ${isHovered ? 'opacity-100' : ''}
        `}
      />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default CosmicButton;