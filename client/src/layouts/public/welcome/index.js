import WelcomeCoverLayout from "layouts/public/welcome/coverLayout";
import { useEffect } from "react";
import axios from "axios";

function Welcome() {

  return (
    <>
      <div>{name}</div>
      <WelcomeCoverLayout />
    </>
  );
}

export default Welcome;
