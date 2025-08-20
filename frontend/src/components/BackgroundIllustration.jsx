import React from 'react';

const BackgroundIllustration = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-20">
      {/* This can be a world map image or a complex gradient */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("https://www.transparentpng.com/thumb/world-map/world-map-clipart-transparent-background-15.png")', backgroundSize: '120% auto', backgroundPosition: 'center', filter: 'grayscale(50%) blur(1px)' }}></div>
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-800 opacity-50"></div>
    </div>
  );
};

export default BackgroundIllustration;
