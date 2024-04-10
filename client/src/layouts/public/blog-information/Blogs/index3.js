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
import lusogIsip from "assets/images/lusog-Isip.svg";
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
        date="December 22, 2021"
        author="By URC"
        title="Mental Health on the Move in the Philippines – Meet the Lusog-Isip App"
        image={lusogIsip}
      >
        <SoftBox>
          <SoftTypography>
            The USAID RenewHealth Project – in collaboration with the Philippine Department of
            Health (DOH) – has successfully launched the first ever mobile application to support
            Filipinos’ mental health needs. The app is available in both English and Filipino.
          </SoftTypography>
          <SoftTypography mt={1}>
            In the era of COVID-19, mobile phones are one of the few reliable tools available to
            health professionals to reach individuals facing mental health challenges while confined
            to their homes. This app successfully delivers self-help tools and individualized mental
            health resources to users at a time when face-to-face interventions are challenging.
          </SoftTypography>
          <SoftTypography mt={1}>
            And the app is an important part of RenewHealth’s efforts to connect Filipinos with
            community-based drug rehabilitation (CBDR). Through RenewHealth, URC works to help
            persons who use drugs, people in recovery, and their families obtain access to informal
            care, self-help resources, and community-based rehabilitation and recovery support to
            reduce or prevent drug dependence.
          </SoftTypography>

          <SoftTypography mt={1} fontWeight="bold">
            Meeting Mental Health Needs Remotely During COVID-19
          </SoftTypography>
          <SoftTypography mt={1}>
            The COVID-19 pandemic has contributed to growing – and often unmet – mental health
            needs. The DOH estimates that at least 3.6 million Filipinos are facing mental health
            issues during the pandemic, including depression, substance use disorders such as
            alcohol use disorder, and mood disorders like bipolar disorder. COVID-19 infection in
            itself has been found to directly impact a person’s mental health. A recent DOH study
            found that one of three COVID-19 patients in the Philippines was diagnosed with a mental
            health condition within six months of testing positive for COVID-19. Government-mandated
            lockdowns to prevent the spread of the virus – and associated social isolation – have
            exacerbated existing mental health challenges.
          </SoftTypography>
          <SoftTypography mt={1}>
            DOH’s Mental Health Division Chief Health Program Officer, Frances Prescilla Cuevas
            says: “As the Department of Health and our health workers strive towards coping and
            living with this pandemic, we must find ways to care for the mental well-being of our
            fellow Filipinos who continue to suffer because of this current circumstance.”
          </SoftTypography>
          <SoftTypography mt={1} fontWeight="bold">
            Lusog-Isip App Provides Toolkit to Improve Mental Health
          </SoftTypography>
          <SoftTypography mt={1}>
            The Lusog-Isip app, which means healthy minds in Filipino, meets people where they are –
            and puts mental health in their hands – literally.
          </SoftTypography>
          <SoftTypography mt={1}>
            After a year of development together with the DOH Mental Health Unit, the mobile app is
            now available to the public. The app provides access to self-help and self-care
            resources to address mental health and substance abuse needs by inviting users to assess
            their well-being and their coping strategies. It then presents targeted resources and
            next steps to improve that status. The app offers evidence-based tools and materials to
            the user, including:
          </SoftTypography>
          <SoftTypography mt={1} style={{ whiteSpace: "pre-line" }}>
            Workbooks{"\n"}
            Exercises{"\n"}
            Audio guides{"\n"}
            Journaling{"\n"}
            Mood tracking{"\n"}
            Self-care reminders
          </SoftTypography>

          <SoftTypography mt={1}>
            If the user finds that the self-help tools are insufficient to meet their mental health
            needs, the app also provides a list of available mental health and psychosocial support
            services– both online and nearby.
          </SoftTypography>
          <SoftTypography mt={1}>
            Culturally adapted, the app’s features and interventions are “contextualized according
            to the needs of Filipinos,” said the DOH’s Cuevas. Launched on October 15 in conjunction
            with Mental Health Week in the Philippines, the Lusog-Isip app can be downloaded for
            free through Google Play and Apple App Stores. Personal information is kept
            confidential.
          </SoftTypography>
          <SoftTypography mt={1} fontWeight="bold">
            Pilot Testing Indicates App Successfully Reaches Target Audiences
          </SoftTypography>
          <SoftTypography mt={1}>The app was successfully pilot tested to assess:</SoftTypography>
          <SoftTypography mt={1}>
            Different domains of the app {"\n"}
            including its understandability{"\n"}
            interface designand objectivity{"\n"}
            The most frequently used app feature{"\n"}
            Improvement in overall well-being after using the app{"\n"}
            Improvement in coping strategies after using the app{"\n"}
            Key take-away messages after using the app
          </SoftTypography>
          <SoftTypography mt={1}>
            The results of the pilot test indicated that users had several take-away messages after
            using the app, including:
          </SoftTypography>
          <SoftTypography mt={1}>
            Active management of mental health is important{"\n"}
            {"\n"} Self-awareness is the first step to improve well-being Building a strong social
            support system can improve mental health{"\n"}
            Healthy coping mechanisms for stress can improve our well-being{"\n"}
            Journaling is an important tool to identify patterns in mental health stressors{
              "\n"
            }{" "}
          </SoftTypography>
          <SoftTypography mt={1}>
            The pilot test indicated that the users of the Lusog-Isip app reported improved
            well-being and the ability to use certain coping strategies such as cognitive
            reappraisal and emotional expression. Users also appreciated the cultural relevance and
            contextualization of the contents to the Filipino population.
          </SoftTypography>
          <SoftTypography mt={1}>
            Further improvement and testing will be conducted to make the app pertinent to
            sub-populations such as teenagers and substance users.
          </SoftTypography>
          <SoftTypography mt={1}>
            Michelle Lang-Alli, USAID Philippines Office of Health Director, says, “we hope that
            Lusog-Isip will provide access to self-help tools and materials for improving clients’
            mental health, and address substance use – one of USAID’s key priorities.”
          </SoftTypography>
          <SoftTypography mt={1}>
            USAID is committed to supporting the promotion of the app across schools, workplaces,
            and communities throughout the Philippines.
          </SoftTypography>
        </SoftBox>
      </BlogCoverPhotoLayout>
      <Footer />
    </PageLayout>
  );
}

export default BlogInformation;
