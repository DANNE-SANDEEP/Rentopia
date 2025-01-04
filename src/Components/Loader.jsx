import React, { useState, useEffect } from 'react';

const StylishLoader = () => {
  const [animate, setAnimate] = useState(false);
  const [startPulse, setStartPulse] = useState(false);
  const textPart1 = 'Rent';
  const textPart2 = 'opia.';

  useEffect(() => {
    setAnimate(true);
    // Start the pulse effect after all letters have appeared
    const totalLength = textPart1.length + textPart2.length;
    const pulseDelay = (totalLength * 100) + 500; // Letters animation time + buffer
    const timer = setTimeout(() => {
      setStartPulse(true);
    }, pulseDelay);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="relative">
        {/* Main text animation */}
        <div className={`flex ${startPulse ? 'animate-pulse' : ''}`}>
          {/* First part - RENT (bold) */}
          {textPart1.split('').map((letter, index) => (
            <span
              key={`part1-${index}`}
              className={`text-5xl font-bold text-white opacity-0 transform ${
                animate ? 'animate-fadeIn' : ''
              }`}
              style={{
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {letter}
            </span>
          ))}
          
          {/* Second part - opia. (normal) */}
          {textPart2.split('').map((letter, index) => (
            <span
              key={`part2-${index}`}
              className={`text-5xl font-normal text-white opacity-0 transform ${
                animate ? 'animate-fadeIn' : ''
              }`}
              style={{
                animationDelay: `${(index + textPart1.length) * 100}ms`,
                animationFillMode: 'forwards'
              }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Dots animation */}
        <div className="flex justify-center mt-8 space-x-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`w-3 h-3 bg-white rounded-full opacity-0 ${
                animate ? 'animate-bounce' : ''
              } ${startPulse ? 'animate-pulse' : ''}`}
              style={{
                animationDelay: `${i * 200}ms`,
                animationDuration: '1s',
                animationIterationCount: 'infinite'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Define custom animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.3;
    }
  }

  .animate-pulse {
    animation: pulse 2s ease-in-out infinite;
  }
`;
document.head.appendChild(style);

export default StylishLoader;