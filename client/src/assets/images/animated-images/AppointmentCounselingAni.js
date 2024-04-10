import React from 'react';
import AppointmentCounselingAni from 'assets/images/animated-images/animation_AppointmentCounseling.json';
import Lottie from 'lottie-react';

const AppointmentCounselingAnimation = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {/* <img src='./assets/preloader/loader_SamWon.gif' /> */}
      <Lottie animationData={AppointmentCounselingAni}/>
    </div>
  );
};

export default AppointmentCounselingAnimation;