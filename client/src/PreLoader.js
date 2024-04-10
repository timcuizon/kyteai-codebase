import React from 'react';
import SamWonPreloader from './assets/preloader/data.json';
import Lottie from 'lottie-react';
import './Preloader.css'; // Import the CSS file for styling

const Preloader = () => {
  return (
    <div className="preloader-container">
      <Lottie 
      animationData={SamWonPreloader} 
      style={{ width: '700px', height: '700px' }}
      />
    </div>
  );
};

export default Preloader;