import React, { useState } from 'react';
import HomePageAnimation from './counseling-1.json'; // Make sure the path is correct
import Lottie from 'react-lottie';

const HomepageAnimation = () => {
  const [isHovered, setIsHovered] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: HomePageAnimation, // Use the variable directly
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  return (
    <div
      sx={{
        cursor: 'default !important',
      }}
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <Lottie
        sx={{
          cursor: 'default !important',
        }}
        options={defaultOptions}
        height='100%' // Set the desired height
        width='100%' // Set the desired width
        isStopped={!isHovered}
        isPaused={!isHovered}
      />
    </div>
  );
};

export default HomepageAnimation;
