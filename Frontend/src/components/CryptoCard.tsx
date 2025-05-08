import React, { useEffect } from 'react';

const CryptoCard: React.FC = () => {
  // Add floating animation effect on component mount
  useEffect(() => {
    const interval = setInterval(() => {
      const card = document.getElementById('crypto-3d');
      if (card) {
        card.classList.toggle('translate-y-2');
      }
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto flex items-center justify-center h-full">
      {/* Add a subtle highlight that interacts with the ray */}
      <div className="absolute top-0 right-[15%] w-[30%] h-[40%] bg-white opacity-5 blur-xl rounded-full"></div>
      
      {/* Add tiny white dots scattered on the right side */}
      <div className="absolute right-0 h-full w-full overflow-hidden pointer-events-none">
        {/* First cluster - more concentrated at the top right to connect with ray */}
        {[...Array(60)].map((_, i) => (
          <div 
            key={`top-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 2.5 + 0.5}px`,
              height: `${Math.random() * 2.5 + 0.5}px`,
              top: `${Math.random() * 40}%`,
              right: `${Math.random() * 50}%`,
              opacity: Math.random() * 0.7 + 0.2,
              animation: `float-dot ${Math.random() * 5 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Second cluster - scattered throughout the right side */}
        {[...Array(80)].map((_, i) => (
          <div 
            key={`scatter-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 2.5 + 0.5}px`,
              height: `${Math.random() * 2.5 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              right: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.2,
              animation: `float-dot ${Math.random() * 5 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        
        {/* Third cluster - right edge of the page */}
        {[...Array(40)].map((_, i) => (
          <div 
            key={`edge-${i}`}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 2 + 0.5}px`,
              height: `${Math.random() * 2 + 0.5}px`,
              top: `${Math.random() * 100}%`,
              right: `0`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `float-dot-side ${Math.random() * 5 + 8}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <style>
        {`
          @keyframes float-dot {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
            50% { transform: translateY(-15px) translateX(10px); opacity: 0.6; }
          }
          
          @keyframes float-dot-side {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0.2; }
            50% { transform: translateY(-10px) translateX(-5px); opacity: 0.5; }
          }
        `}
      </style>
      
      <img 
        id="crypto-3d" 
        // src="/lovable-uploads/8779686a-9fbc-4678-a98f-21e4766dc670.png" 
        src="/Layout.png"
        alt="Crypto Network Diagram" 
        className="w-full h-auto object-contain transition-transform duration-3000 ease-in-out transform hover:scale-110 animate-float scale-185"
        style={{ 
          filter: 'drop-shadow(0 0 15px rgba(43, 255, 248, 0.4))',
          maxHeight: '700px'
        }}
      />
    </div>
  );
};

export default CryptoCard;
