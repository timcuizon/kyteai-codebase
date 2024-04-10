/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Authentication layout components
import CoverLayout from "layouts/public/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";

import ChildrenPic from "assets/images/PaartOrgImgs/childrenpic.jpg";
import AppleLogo from "assets/images/PaartOrgImgs/AppleLogo.png";
import CokeLogo from "assets/images/PaartOrgImgs/CokeLogo.png";
import FerrariLogo from "assets/images/PaartOrgImgs/FerrariLogo.png";
import GoogleLogo from "assets/images/PaartOrgImgs/GoogleLogo.png";
import MarvelLogo from "assets/images/PaartOrgImgs/MarvelLogo.png";
import MasterCardLogo from "assets/images/PaartOrgImgs/MasterCardLogo.png";
import McdoLogo from "assets/images/PaartOrgImgs/McdoLogo.png";
import NasaLogo from "assets/images/PaartOrgImgs/NasaLogo.png";
import NikeLogo from "assets/images/PaartOrgImgs/NikeLogo.png";
import RazerLogo from "assets/images/PaartOrgImgs/RazerLogo.png";
import SBLogo from "assets/images/PaartOrgImgs/SBLogo.png";
import TeslaLogo from "assets/images/PaartOrgImgs/TeslaLogo.png";
import kidsplaying from "assets/images/PaartOrgImgs/kidsplaying.jpg";
import kidsplaying2 from "assets/images/PaartOrgImgs/kidsplaying2.jpg";
function PartneredOrganization() {

  const backgroundImageStyle = {
    backgroundImage: `url(${ChildrenPic})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        {/* Background/container 1*/}
        <div className='w-full h-full lg:px-80 y-60 py-32 flex justify-center flex-col items-center bg-local bg-cover relative z-40' style={backgroundImageStyle}>
          <div className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% absolute inset-0 opacity-60'>

          </div>
          {/* Header */}
          <div className='text-6xl text-center md:text-7xl font-extrabold py-3 z-0 items-center md:text-center'>
            <p>
              Partnered Organization
            </p>
          </div>

          {/* Org Logos */}
          <div className='py-3 z-0 grid grid-cols-3 gap-3 align-middle content-center items-center md:grid-cols-6'>
            
              <img className='w-32' src={AppleLogo} alt="img" />
              <img className='w-32' src={CokeLogo} alt="img" />
              <img className='w-32' src={FerrariLogo} alt="img" />
              <img className='w-32' src={GoogleLogo} alt="img" />
              <img className='w-32' src={MarvelLogo} alt="img" />
              <img className='w-32' src={MasterCardLogo} alt="img" />
              <img className='w-32' src={McdoLogo} alt="img" />
              <img className='w-32' src={NasaLogo} alt="img" />
              <img className='w-32' src={NikeLogo} alt="img" />
              <img className='w-32' src={RazerLogo} alt="img" />
              <img className='w-32' src={SBLogo} alt="img" />
              <img className='w-32' src={TeslaLogo} alt="img" />
          
        </div>

          {/* Description */}
          <div className='py-3 z-0 text-black font-medium text-2xl text-center flex justify-self-auto'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec orci at urna hendrerit hendrerit. Sed fermentum, ipsum vel vestibulum consectetur, justo nunc iaculis purus, a iaculis sapien odio id justo. Morbi id neque fringilla, congue justo vitae, auctor tortor. Phasellus euismod ligula et odio maximus, in efficitur metus commodo. Aliquam ut efficitur justo, ut rutrum neque. Nulla facilisi. Phasellus venenatis, tellus ac ultrices tincidunt, felis neque volutpat ipsum, id pharetra ligula urna vitae dui.</p>
          </div>

          {/* Button */}
          <div className='px-6 py-3 z-0 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105'>
            <button class="rounded-full ...">See more</button>
          </div>
        </div>

        {/* Background/container 2 */}
        <div className='w-full h-full lg:px-80 pb-32 text-center flex justify-center flex-col items-center'>
          {/* Header */}
          <div className='text-6xl font-extrabold py-3'>
            <p> Come join and partner with us</p>
          </div>

          {/* Description */}
          <div className='py-3 pt-2 font-medium text-xl text-center'>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec orci at urna hendrerit hendrerit. Sed fermentum, ipsum vel vestibulum consectetur, justo nunc iaculis purus, a iaculis sapien odio id justo. Morbi id neque fringilla, congue justo vitae, auctor tortor. Phasellus euismod ligula et odio maximus, in efficitur metus commodo. </p>
          </div>

          {/* Images */}
          <div className='py-3 pt-2'>
            <tr>
              <td><img className='w-full h-full' src={kidsplaying} alt="img" /></td>
              <td><img className='w-full h-full' src={kidsplaying2} alt="img" /></td>
            </tr>
          </div>

          {/* Button */}
          <div className='px-9 py-3 pt-2 z-0 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-md transition duration-300 ease-in-out transform hover:scale-105'>
            <button class="rounded-full ...">Partner with us!</button>
          </div>

          {/* Persuation */}
          <div className='text-6xl font-extrabold pt-6 pb-3'>
            <p>Why partner with Sam Won?</p>
          </div>

          {/* Description */}
          <div className='py-3 pt-2 font-medium text-xl text-center'>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec orci at urna hendrerit hendrerit. Sed fermentum, ipsum vel vestibulum consectetur, justo nunc iaculis purus, a iaculis sapien odio id justo. Morbi id neque fringilla, congue justo vitae, auctor tortor. Phasellus euismod ligula et odio maximus, in efficitur metus commodo. Aliquam ut efficitur justo, ut rutrum neque. Nulla facilisi. Phasellus venenatis, tellus ac ultrices tincidunt, felis neque volutpat ipsum, id pharetra ligula urna vitae dui.</p>
          </div>

        </div>
      </div>
    </DashboardLayout>
  );
}
export default PartneredOrganization;
