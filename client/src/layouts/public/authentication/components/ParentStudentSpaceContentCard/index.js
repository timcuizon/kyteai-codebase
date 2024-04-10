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

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";

import ParentStudentSpace from "layouts/public/authentication/components/ParentStudentSpaceContentCard/data/index.js";

function ParentStudentSpaceContent() {
  return (
    <SoftBox p={2}>
      <SoftBox>
          <SoftBox pt={1} mb={0.5}>
            <ParentStudentSpace
              name="oliver liam"
              referencedNumber="00054682"
              status="Pending Approval"
              age="8"
              gender="male"
              email="oliver@burrito.com"
              contactNumber="00054682"
              details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna fringilla urna porttitor rhoncus dolor purus. Duis ut diam quam nulla porttitor massa id neque aliquam. Dui nunc mattis enim ut. Sed velit dignissim sodales ut eu sem integer. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Ac placerat vestibulum lectus mauris. Platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras. Tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Et sollicitudin ac orci phasellus egestas.

              Dolor purus non enim praesent elementum facilisis. Interdum velit euismod in pellentesque massa placerat duis. Varius morbi enim nunc faucibus. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Dui sapien eget mi proin sed libero enim. Ante in nibh mauris cursus mattis molestie a iaculis at. Aliquam etiam erat velit scelerisque. Eros donec ac odio tempor orci dapibus. Sed id semper risus in hendrerit gravida rutrum quisque. Viverra orci sagittis eu volutpat odio facilisis mauris sit amet. Justo donec enim diam vulputate ut pharetra sit amet aliquam. Luctus accumsan tortor posuere ac. Ipsum dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Amet nisl suscipit adipiscing bibendum. Gravida in fermentum et sollicitudin ac orci phasellus egestas. Ut diam quam nulla porttitor massa id neque. Vel quam elementum pulvinar etiam non quam lacus. Amet commodo nulla facilisi nullam vehicula ipsum a arcu. Pellentesque habitant morbi tristique senectus et. Curabitur gravida arcu ac tortor.
              
              Arcu odio ut sem nulla. Tellus elementum sagittis vitae et leo. Lacus luctus accumsan tortor posuere ac ut consequat semper viverra. Sed libero enim sed faucibus turpis in eu mi. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Elementum nibh tellus molestie nunc non blandit massa enim. Ut tristique et egestas quis ipsum suspendisse ultrices gravida. Facilisis volutpat est velit egestas dui id ornare arcu odio. Aliquet risus feugiat in ante metus dictum at tempor commodo. Maecenas ultricies mi eget mauris pharetra et ultrices. Arcu risus quis varius quam."
            
            //other information

             pgName="John Smith"
             pgContactNumber="0929873928932"
             relationship="Father"
             pgEmail="john.smith@gmail.com"
             pgAddress="BGC, Taguig City"
            
            />
          </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

export default ParentStudentSpaceContent;
