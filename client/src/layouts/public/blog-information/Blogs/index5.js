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
import counselorImportant from "assets/images/counselorimportant.svg";
import promotesMH from "assets/images/promoting-mental-health.svg";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import newGen from "assets/images/newgen.svg";
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
        date="September 22, 2023"
        author="By Laura Hoxworth"
        title="How a New Generation of School Counselors is Tackling the Youth Mental Health Crisis"
        image={newGen}
      >
        <SoftBox>
          <SoftTypography>
            When the pandemic hit, Aloise Phelps saw how schools across the country were struggling
            to meet students’ growing mental health needs. She felt called to help, but unsure about
            what to do. It was a conversation with UVA professor Julia Taylor that convinced her to
            become a school counselor. “If you want to help youth,” Phelps remembers Taylor saying,
            “go where they are – and that’s schools.”
          </SoftTypography>
          <SoftTypography mt={1}>
            Phelps enrolled in UVA’s counselor education program – specifically, in the youth mental
            health leadership emphasis, which launched in 2020 to help address a growing youth
            mental health crisis.
          </SoftTypography>
          <SoftTypography mt={1}>
            “Youth mental health needs have skyrocketed,” said Taylor, an associate professor at the
            UVA School of Education and Human Development and co-director of the Virginia
            Partnership for School Mental Health. “The school mental health leadership emphasis was
            designed to ensure that graduate students are responsive to rising youth mental health
            concerns and serve as leaders working within comprehensive school mental health
            services.”
          </SoftTypography>
          <SoftTypography mt={1}>
            Hina Zafar, who graduated from the program in 2022, is entering her second year as a
            school counselor. While much of her time is spent in one-on-one sessions with students,
            she also spends her days leading group counseling sessions and collaborating with other
            counselors, teachers, and administrators on school-wide initiatives. Then there’s the
            emails and parent communication.
          </SoftTypography>
          <SoftTypography mt={1}>
            Providing school-based mental health support means working within a complex system – not
            only with students, but also teachers, nurses, social workers, administrators and
            district leaders, parents and the larger community. A core element of UVA's program is
            to teach graduate students the unique role that a school counselor plays within these
            systems.
          </SoftTypography>
          <SoftTypography mt={1}>
            Natoya Haskins, associate professor and director of the counselor education program,
            said school counselors are in an optimal position to spearhead system-wide initiatives
            that support student mental health. “Counselors take a preventative approach by offering
            programming that promotes self-acceptance, empathy, healthy relationships, and
            motivation,” she said. “With their comprehensive perspective, counselors can drive
            changes that foster an environment where students at every grade level can thrive
            socially, emotionally, and academically.”
          </SoftTypography>
          <SoftTypography mt={1}>
            Students who elect into the emphasis complete nine extra hours of coursework on topics
            like comprehensive school mental health services, psychopathology, and family therapy.
            With grant funding from a state partnership designed to aid recruitment and retention of
            mental health professionals in Virginia schools, many also complete extra internship
            hours, write research-to-practice briefs, and engage with community of school mental
            health practitioners.
          </SoftTypography>
          <SoftTypography mt={1}>
            Through these courses and experiences, students in the program learn about how to
            provide culturally responsive, evidence-based interventions at different levels:
            including division, school, large group, small group, and individual. They practice how
            to collaborate, consult, and advocate with a variety of students and colleagues through
            extensive internship hours.
          </SoftTypography>
          <SoftTypography mt={1}>
            “Our students graduate with an understanding of their unique role on a multidisciplinary
            team,” Taylor said. “They learn about systems issues and root cause analysis – how to
            figure out the root of a problem in order to recommend appropriate interventions to
            solve that problem, rather than put band-aids over system issues.”
          </SoftTypography>
          <SoftTypography mt={1}>
            Of course, not everything is within their control. Structural and societal problems like
            equal access and stigma are much larger than a school counselor can solve. But
            understanding their role within complex systems helps them focus their energy to best
            advocate for their students and avoid burnout.
          </SoftTypography>
          <SoftTypography mt={1}>
            "Advocacy is a critical component of the school counseling role,” Taylor said. “They
            have to understand and identify barriers to student success and then work within complex
            systems to help eliminate them.”
          </SoftTypography>
          <SoftTypography mt={1}>
            Phelps, who is beginning her first year as a full-time counselor, said one of the most
            important skills she learned during graduate school was how to advocate for students.
            “It's not just about changing their schedules or handing them tissues, it's truly, are
            you willing to go to bat for the student?” she said. “I really feel like my skills in
            that were honed to where I can represent a student in a meeting who may not be able to
            speak for themselves.”
          </SoftTypography>
          <SoftTypography mt={1}>
            Each week, Zafar meets with a team of counselors, teachers, and academic coaches to plan
            school-wide programming. This year, after realizing that many students are struggling
            with self-management and relationship-building skills, she said her team has plans to
            implement a new, more intentional approach to supporting these skills, using a framework
            she learned about in graduate school.
          </SoftTypography>
          <SoftTypography mt={1}>
            “There isn't one part of the program that I feel was a waste of time,” she said.
          </SoftTypography>
          <SoftTypography mt={1}>
            Zafar acknowledges that she can’t solve every problem for her students, which she said
            can be discouraging at times. But she also understands that the relationships she builds
            with students reach far beyond the school grounds.
          </SoftTypography>
          <SoftTypography mt={1}>
            “A lot of students we refer outside to therapists, and sometimes the relationship they
            have with us will influence what they think therapy might be like,” she said. “If they
            don't feel like they can trust us, why are they going to want to go talk to some other
            person that doesn't even know anything about their life? I feel like we can set a
            foundation for mental health support and what that can look like. Oftentimes, the way we
            talk about mental health support can ease students into the transition of starting
            therapy.”
          </SoftTypography>
          <SoftTypography mt={1}>
            “For many students, the counselor may be the only adult in school they trust to listen
            without judgment during difficult times,” said Haskins. “Students rely on their
            counselor to offer a safe space, show empathy, maintain privacy, and give care focused
            solely on the student's needs.”
          </SoftTypography>
          <SoftTypography mt={1}>
            With the growing need for greater mental health support in schools, a career as a school
            counselor offers excellent job security. But above all, both Zafar and Phelps said the
            job is about building relationships with students – and it's those relationships that
            inspire and motivate them every day.
          </SoftTypography>
          <SoftTypography mt={1}>
            “I wanted a job that gave me purpose, and this is definitely purposeful work,” Phelps
            said. “I feel like I'm the most privileged person in the world because I get to build
            relationships with kids for a living. It is so fulfilling to watch them grow and learn
            and to be able to help them walk across the graduation stage, or work through a parent's
            divorce, or deal with their anxiety. I'm just always very humbled by the opportunity
            when kids let me into their lives.”
          </SoftTypography>
        </SoftBox>
      </BlogCoverPhotoLayout>
      <Footer />
    </PageLayout>
  );
}

export default BlogInformation;
