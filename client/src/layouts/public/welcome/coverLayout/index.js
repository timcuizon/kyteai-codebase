import React, { useEffect, useState } from "react";
// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/public/authentication/components/Footer";
import EnhancingStudents from "assets/images/enhancing_students.svg";

// Modules used
import SloganPage from "./slogan";
import WhySamWonPage from "./whySamwon";
import FeaturesPage from "./features";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SoftButton from "components/SoftButton";

import homeDecor1 from "assets/images/home-decor-1.jpg";

import colors from "assets/theme/base/colors.js";
import HeroImage from "assets/images/calmlady.jpg";
import BannerImage from "assets/images/img_TeacherStudents.jpg";

import { ChevronDoubleDown } from "react-bootstrap-icons";
import HomepageAnimation from "assets/images/homepage/HomepageAnimation";
import GridItem from "./features-content/GridItems";
import backgroundWaves from "assets/images/bg/Wavess.svg";
import backgroundWaves2 from "assets/images/bg/Wavesss.svg";
import Logo from "assets/images/logos/logo_SamwonLogo.png";
import QRCode from "assets/images/qr/qr-sam-wom.svg";

import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import Fade from "react-reveal/Fade";
import BottomImage from "assets/images/stable-diffusion-turbo.jpeg";
import { Foo } from "./features/featureSection";

function WelcomeCoverLayout({ sloganBG, whySamwonBG, featureBG }) {
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    [theme.breakpoints.down("lg")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    alignSelf: "center",
  }));

  const Title = styled(SoftTypography)(({ theme }) => ({
    fontSize: "64px",
    color: "#fff",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //Place content here
  const gridItems = [
    { title: "Visual Self-Expression Tool", subtext: "Subtext 1" },
    { title: "Record Keeping", subtext: "Subtext 2" },
    { title: "Blogs", subtext: "Subtext 3" },
    { title: "Parent & Student Space", subtext: "Subtext 4" },
    { title: "Schedule Management", subtext: "Subtext 5" },
    { title: "Title 6", subtext: "Subtext 6" },
  ];

  const boxStyle = {
    backgroundImage: `url(${backgroundWaves})`,
    backgroundSize: "cover", // Adjust as needed
    backgroundPosition: "center", // Adjust as needed
    height: "300px", // Set the desired height
    width: "100%", // Set the desired width
  };

  const boxStyle2 = {
    backgroundImage: `url(${backgroundWaves2})`,
    backgroundSize: "cover", // Adjust as needed
    backgroundPosition: "center", // Adjust as needed
    height: "300px", // Set the desired height
    width: "100%", // Set the desired width
  };

  return (
    <PageLayout sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
      <DefaultNavbar
        action={{
          type: "external",
          route: "https://creative-tim.com/product/soft-ui-dashboard-react",
          label: "free download",
          color: "dark",
        }}
      />
      <Box style={boxStyle} sx={{ minHeight: "100dvh" }}>
        <Container
          sx={{
            minHeight: "100dvh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CustomBox>
            <Box sx={{ flex: "2" }}>
              {/* <Fade duration={3000}> */}
                <Title variant="h1" sx={{ mt: 5, mb: 4 }}>
                  Tailored Counseling for Student Success
                </Title>
              {/* </Fade> */}
              {/* <Fade duration={3000}> */}
                <Typography variant="body2" sx={{ fontSize: "16px", color: "#fff", my: "4" }}>
                  Providing personalized guidance and support to students, ensuring a path tailored
                  to their unique needs and aspirations for ultimate success.
                </Typography>
              {/* </Fade> */}
            </Box>
            <Box
              sx={{ flex: "1.25", display: "flex", justifyContent: "center", alignItems: "center" }}
            >
              <HomepageAnimation
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  marginBottom: "2rem",
                }}
                alt="Hero"
              />
            </Box>
          </CustomBox>
        </Container>
      </Box>
      <Container
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Fade duration={3000}>
          <div>
            {/* <FeaturesPage /> */}
            <Foo />
          </div>
        </Fade>
      </Container>
      <div style={{ maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1.0) 50%, transparent 100%)' }}>
        <img
          src={backgroundWaves2}
          className="-z-10 bottom-0 right-0 hidden w-full lg:block"
          alt="background shape"
        />
      </div>

      <section className="m-4 md:m-8 dark:bg-gray-800 dark:text-gray-100">
        <div className="container mx-auto p-4 my-6 space-y-2 text-center">
          <h2 className="text-5xl font-bold">Counseling Services with Sam Won</h2>
          <p className="dark:text-gray-400 italic">Features for enhanced service delivery</p>
        </div>
        <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center p-4">
            <lord-icon
              src="https://cdn.lordicon.com/pbygjxws.json"
              trigger="loop"
              delay="1500"
              // state="in-reveal"
              colors="primary:#1e4c2b,secondary:#fdb813"
              style={{ width: "150px", height: "150px" }}
            ></lord-icon>
            <h3 className="my-3 text-3xl font-semibold">Efficient Counseling Management</h3>
            <div className="space-y-1 leadi">
              <p>
                Sam Won streamlines counseling services, focusing on schedules, record-keeping, and
                complaint resolution, boosting efficiency.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <lord-icon
              src="https://cdn.lordicon.com/sexyvfpq.json"
              trigger="loop"
              delay="1500"
              colors="primary:#1e4c2b"
              style={{ width: "150px", height: "150px" }}
            ></lord-icon>
            <h3 className="my-3 text-3xl font-semibold">Communication and Accessibility</h3>
            <div className="space-y-1 leadi">
              <p>
                Breaking the barriers, offering accessible platforms for students, parents, and
                counselors to voice concerns.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <lord-icon
              src="https://cdn.lordicon.com/rsqqvkcg.json"
              trigger="loop"
              delay="1500"
              colors="primary:#fdb813,secondary:#1e4c2b,tertiary:#1e4c2b"
              style={{ width: "150px", height: "150px" }}
            ></lord-icon>
            <h3 className="my-3 text-3xl font-semibold">Personalized Support Solutions</h3>
            <div className="space-y-1 leadi">
              <p>
                Tailors counseling services to individual needs, ensuring effective 
                guidance and support for all.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <lord-icon
              src="https://cdn.lordicon.com/hfhizoed.json"
              trigger="loop"
              delay="1500"
              colors="primary:#3a3347,secondary:#0a5c15,tertiary:#fdb813,quaternary:#ffc738,quinary:#f24c00"
              style={{ width: "150px", height: "150px" }}
            ></lord-icon>
            <h3 className="my-3 text-3xl font-semibold">User-Friendly Interface and Flexibility</h3>
            <div className="space-y-1 leadi">
              <p>
                A user-friendly design and customizable features provide a seamless counseling
                experience.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <lord-icon
              src="https://cdn.lordicon.com/oqhcnkcg.json"
              trigger="loop"
              delay="1500"
              colors="primary:#fdb813,secondary:#1e4c2b"
              style={{ width: "150px", height: "150px" }}
            ></lord-icon>
            <h3 className="my-3 text-3xl font-semibold">Secure Data Management</h3>
            <div className="space-y-1 leadi">
              <p>
                Ensures data security and privacy through robust encryption, access controls, and
                compliance with regulations.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center p-4">
            <lord-icon
              src="https://cdn.lordicon.com/iwwjmbhj.json"
              trigger="loop"
              delay="1500"
              colors="primary:#1e4c2b"
              style={{ width: "150px", height: "150px" }}
            ></lord-icon>
            <h3 className="my-3 text-3xl font-semibold">Appointment Reminders and Notifications</h3>
            <div className="space-y-1 leadi">
              <p>Automated notifications for timely attendance and schedule management for you.</p>
            </div>
          </div>
        </div>
      </section>
      {/* </Box>
          </Fade>
        </Container>
      </Box> */}
      <Container
        sx={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Grid container className="details" lg={12} spacing={2} item xs={12} xl={12} md={12}>
          <Grid item className="container02" lg={6} md={12} sm={12} xs={12}>
            <SoftTypography
              variant="h2"
              fontWeight="bold"
              mb={5}
              sx={{
                color: "#212427",
                borderBottom: "2px #FDB813 solid",
              }}
              // className={'details-heading heading2'}
            >
              Enhancing Student Success
            </SoftTypography>
            <span className="details-sub-heading">
              Our website offers a range of features designed to support students in their academic
              and personal journeys. From managing appointments with guidance counselors to
              providing a dedicated space for students and parents to connect, our platform is
              revolutionizing the way guidance counseling is delivered. Additionally, our virtual
              self-expression feature allows students to explore their interests and express
              themselves creatively. Join us today and experience the future of guidance counseling.
            </span>
          </Grid>
          <Grid
            item
            lg={6}
            md={12}
            sm={12}
            xs={12}
            sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}
            className="pb-10"
          >
            <img
              alt="image"
              src={EnhancingStudents}
              className="details-image rounded-full "
              sx={{ borderBottom: "10px #FDB813 solid" }}
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </PageLayout>
  );
}

export default WelcomeCoverLayout;
