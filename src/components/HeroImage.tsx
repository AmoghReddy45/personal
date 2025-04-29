
import React from 'react';

const HeroImage = () => {
  return <div className="absolute inset-0 w-screen overflow-hidden">
    <img 
      src="/lovable-uploads/860a48fd-65b5-4fa8-ada8-36f19fc7e9e5.png" 
      alt="Classical Greek architecture landscape painting" 
      className="w-full h-full object-cover" 
    />
    <div className="absolute inset-0 bg-black/30"></div>
  </div>;
};

export default HeroImage;
