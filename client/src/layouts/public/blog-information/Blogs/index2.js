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
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import tutMental from "assets/images/tutmental.svg";
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
        author="By Angelica Jane Evangelista, Azie Marie Libanan,Alvin Joseph Mapoy, K Ballesteros"
        title="Breaking the Stigma in Counseling"
        image={tutMental}
      >
        <SoftBox>
          <SoftTypography>
            Mental illness is the third most common disability in the Philippines (Martinez, 2020).
            According to the Philippine World Health Organization (WHO), Special Initiative for
            Mental Health conducted in the early part of 2020, at least 3.6 million Filipinos suffer
            from one kind of mental, neurological, and substance use disorder (DOH, 2020)
          </SoftTypography>
          <SoftTypography mt={1}>
            On a larger scale, mental and behavioral disorders account for about 14% of the global
            burden of disease, which means that as many as 450 million people suffer from these
            illnesses worldwide (DOH, 2020).
          </SoftTypography>
          <SoftTypography mt={1}>
            And with a pandemic suddenly taking the whole world by storm, the mental health of
            groups especially the older adults, health care providers, and people with underlying
            health conditions have suffered further and even more gravely (DOH, 2020).
          </SoftTypography>
          <SoftTypography mt={1}>
            As talked about in #UsapTayo’s March 20, 2021 twitter discussions, we have seen how
            Burnout and Pandemic Fatigue have been relevant consequences of the current global
            health crisis caused by COVID-19. The global community continues to suffer sustained and
            heightened feelings of distress from multiple stressors for over a year now (Recovering,
            2021).
          </SoftTypography>
          <SoftTypography mt={1}>
            Despite these reports highlighting the prevalence of Mental Health related concerns and
            problems, and shared pandemic fatigue, a lot of people still choose to go untreated (at
            least professionally). There is still a generally low percentage of Filipinos seeking
            professional help, and accessing mental health services in the country. Such reluctance,
            according to a narrative synthesis of 15 related studies, is found to be influenced
            heavily by various psychosocial, socio-cultural, systemic/structural, and economic
            factors (Martinez, 2020).
          </SoftTypography>
        </SoftBox>
      </BlogCoverPhotoLayout>
      <Footer />
    </PageLayout>
  );
}

export default BlogInformation;
