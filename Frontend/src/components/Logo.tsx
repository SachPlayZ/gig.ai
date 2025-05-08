
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4L28 11V21L16 28L4 21V11L16 4Z" stroke="#B0FCCE" strokeWidth="2" className="animate-pulse-glow" />
            <path d="M16 9L22 12.5V19.5L16 23L10 19.5V12.5L16 9Z" fill="#2BFFF8" fillOpacity="0.3" />
            <path d="M16 14L18 15.5V18.5L16 20L14 18.5V15.5L16 14Z" fill="#2BFFF8" />
            <path d="M16 4V9M16 23V28M10 12.5L4 11M22 12.5L28 11M10 19.5L4 21M22 19.5L28 21" stroke="#B0FCCE" strokeWidth="1" />
          </svg>
        </div>
      </div>
      <div className="text-astra-white font-semibold tracking-wider text-xl">Astrabit</div>
    </div>
  );
};

export default Logo;
