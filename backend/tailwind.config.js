/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cosmic: {
          black: '#000000',
          deepBlue: '#0a0a1f',
          purple: '#2d1b4e',
          violet: '#8b5cf6',
          cyan: '#22d3ee',
          white: '#e8e8ff',
          nebula: '#1a0a2e',
        }
      },
      fontFamily: {
        cosmic: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'nebula-float': 'nebulaFloat 60s ease-in-out infinite',
        'nebula-float-reverse': 'nebulaFloatReverse 80s ease-in-out infinite',
        'particle-drift': 'particleDrift 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'breathing': 'breathing 3s ease-in-out infinite',
        'waveform-pulse': 'waveformPulse 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'cosmic-ring': 'cosmicRing 3s linear infinite',
      },
      keyframes: {
        nebulaFloat: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(50px, -30px) scale(1.1)' },
          '50%': { transform: 'translate(-30px, 50px) scale(0.95)' },
          '75%': { transform: 'translate(-50px, -20px) scale(1.05)' },
        },
        nebulaFloatReverse: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(-40px, 40px) scale(1.1) rotate(5deg)' },
          '66%': { transform: 'translate(40px, -30px) scale(0.9) rotate(-5deg)' },
        },
        particleDrift: {
          '0%': { transform: 'translateY(100vh) translateX(0)' },
          '100%': { transform: 'translateY(-100vh) translateX(100px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5, boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { opacity: 1, boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
        },
        breathing: {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.9 },
          '50%': { transform: 'scale(1.02)', opacity: 1 },
        },
        waveformPulse: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.3)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        cosmicRing: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [],
}