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

// Authentication layout components
import BlogCoverPhotoLayout from "layouts/public/authentication/components/BlogCoverPhotoLayout";
// Images
import promotesMH from "assets/images/promoting-mental-health.svg";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Footer from "layouts/public/authentication/components/Footer";

function BlogInformation() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  return (

    <PageLayout background="white">
    <DefaultNavbar
      action={{
        type: "external",
        route: "https://creative-tim.com/product/soft-ui-dashboard-react",
        label: "free download",
        color: "dark",
      }}
    />
    <BlogCoverPhotoLayout
      date="January 3, 2024"
      author="By Word Health Organization"
      title="Promoting Mental Health"
      image={promotesMH}
    >
      <SoftBox>
        <SoftTypography>
          There is no health without mental health. WHO advocates for a whole-of-government and whole-of-society response anchored on a shared vision for the future of mental health in the Region. Mental health promotion involves actions to strengthen the policy environment and the use of strategic communication for network building, stakeholder engagement, enhanced mental health literacy, and behavior change. 
        </SoftTypography>
        <SoftTypography mt={2}>
          Mental health promotion interventions improve overall wellbeing and are delivered in the settings where people live, work, learn, and thrive. These include school and workplace mental health programs, early childhood interventions, social support and community engagement, women empowerment, anti-discrimination programs, and other interventions that address the social determinants of mental health. In order to maximize impact, mental health promotion activities must be linked closely with mental health services, and engage a variety of health and non-health (e.g. education, labor, social welfare, justice, environment, etc.) sectors.
        </SoftTypography>
        <SoftTypography>
          WHO also leads high-profile advocacy campaigns to mobilize partners and resources, whilst raising awareness among decision makers and the general public. These include annual advocacy days on mental health, suicide prevention, and dementia, and other special initiatives.
        </SoftTypography>
      </SoftBox>
    </BlogCoverPhotoLayout>
    <Footer/>
    </PageLayout>
  );
}

export default BlogInformation;
