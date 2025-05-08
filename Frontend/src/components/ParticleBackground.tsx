import React from 'react';

const ParticleBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="bg-dots absolute inset-0"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-radial from-astra-green/10 to-transparent opacity-20"></div>
      
      {/* Ray white effect coming from top on the right side */}
      <div className="absolute -top-20 right-[20%] w-[15vw] h-[60vh] bg-gradient-to-b from-astra-green/30 to-transparent opacity-20 rotate-15 transform-gpu blur-md"></div>
      <div className="absolute -top-10 right-[22%] w-[8vw] h-[40vh] bg-gradient-to-b from-astra-green/40 to-transparent opacity-25 rotate-12 transform-gpu blur-sm"></div>
      
      {/* Green gradient effect at the bottom left */}
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-gradient-radial from-astra-green/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-[25vw] h-[25vh] bg-gradient-radial from-astra-light-green/20 to-transparent rounded-full blur-2xl"></div>
    </div>
  );
};

export default ParticleBackground;
