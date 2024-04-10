import PropTypes from "prop-types";
import React from 'react';

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";

// Authentication layout components
import Footer from "layouts/public/authentication/components/Footer";

import Logo from "assets/images/logos/logo_SamwonLogo.png";
import { Card } from "@mui/material";
import TransparentBlogCard from "../TransparentBlogCardFolderOnly";
import curved9 from "assets/images/curved-images/curved-6.jpg";

function WelcomeCoverLayout({sloganBG, whySamwonBG, featureBG}) {
  
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
      
      {/* Slogan */}
      <div className="snap-y snap-mandatory h-screen overflow-y-auto overflow-x-hidden" >
        <div className="snap-start">
    
          <SoftBox
            minHeight="100vh"
            sx={{
              backgroundImage: `url(${sloganBG})`,
              backgroundSize: "cover"
            }}
          >
            <Grid container justifyContent="center" sx={{ textAlign: "center", height: "100vh"}}>
              <Grid item xs={10} lg={7} justifyContent="center" sx={{ textAlign: "center", height: "100%"}}>
                <div className="grid place-content-center h-full">
                  <div className="grid place-content-center">
                    <img
                      src={Logo} 
                      className="h-[200px] lg:h-[300px]" />
                  </div>

                  <span className="text-themeorange font-themeHeader mt-5 text-3xl lg:text-5xl">
                    Sam Won, Because Everybody needs Sam Won
                  </span>
                  <span className="text-black font-themeContent mt-3 text-sm lg:text-lg">
                    Sam Won is a E-Counseling Web application that have an integrated Visual Self Expression tool
                  </span>
                </div>
                
              </Grid>
            </Grid>
          </SoftBox>
        </div>

      {/* Why Sam Won */}
        <div className="snap-start bg-whyPhone md:bg-themeGreen1">
          <Grid
            container
            justifyContent="center"
            sx={{
              minHeight: "100vh",
              margin: 0,
            }}
          >
            <Grid item xs={10} sm={9} md={6} xl={4}>
              <div className="h-screen grid place-content-center text-center">
                <div 
                  className="w-[35vh] xs:w-[30vh] sm:w-[35vh] md:w-[26vh] lg:w-[40vh] mb-6 justify-center"
                >
                  <Card>
                    <span className="font-themeHeader font-extrabold w-full relative text-3xl lg:text-4xl text-themeorange p-3">
                      Why Sam Won?
                    </span>
                  </Card>
                </div>
                <div className="font-themeContent w-full text-md relative text-justify indent-[50px]">
                  {/*Temporary*/}

                  Sam Won, an E-Counseling web application with an integrated Drawing Analysis Tool, 
                  offers a versatile platform for creative expression, relaxation, skill development, 
                  community engagement, and education, all within a user-friendly and secure environment. 
                  It adapts to diverse user needs, making it a multifunctional tool for personal and 
                  professional use, transcending specific contexts.
                </div>
              </div>
            </Grid>

            <Grid item xs={12} md={5}>
              <SoftBox
                height="100%"
                display={{ xs: "none", md: "block" }}
                position="relative"
                right={{ md: "-12rem", xl: "-16rem" }}
                mr={-16}
                sx={{
                  transform: "skewX(-10deg)",
                  overflow: "hidden",
                  borderBottomLeftRadius: ({ borders: { borderRadius } }) => borderRadius.lg,
                }}
              >
                <SoftBox
                  ml={-8}
                  height="100%"
                  sx={{
                    backgroundImage: `url(${whySamwonBG})`,
                    backgroundSize: "cover",
                    transform: "skewX(10deg)",
                  }}
                />
              </SoftBox>
            </Grid>
          </Grid>
        </div>

        <div className="snap-start">
          <SoftBox
            minHeight="100vh"
            sx={{
              backgroundImage: `url(${featureBG})`,
              backgroundSize: "cover"
            }}
          >
            <Grid container justifyContent="center" sx={{ textAlign: "center", height: "100vh"}}>
              <Grid item xs={10} lg={7} justifyContent="center" sx={{ textAlign: "center", height: "100%"}}>
                <div className="grid place-content-center h-full">
                  <div className="grid place-content-center">
                    <Card className="bg-themeGreen1 p-3 lg:p-5 mb-8" p={5}>
                      <span className="font-themeHeader text-3xl text-themeorange">
                        Features
                      </span>
                    </Card>
                  </div>
                  <div className="grid">
                    <div className="snap-x snap-mandatory h-[50vh] md:h-[45vh] lg:h-[50vh] w-[40vh] md:w-[50vh] lg:w-[100vh] overflow-x-auto whitespace-nowrap relative flex gap-3 flex-nowrap justify-between">
                      <div className="snap-start h-full w-[100%] md:w-[48%] lg:w-[24%] inline-block flex-shrink-0">
                        <Card c>
                          <TransparentBlogCard
                          image={curved9}
                            title="Blog Section"
                            action={{
                              type: "internal",
                              route: "/blog-information",
                              color: "info",
                              label: "Read More",
                            }}
                          />
                        </Card>
                      </div>
                      <div className="snap-start h-full w-[100%] md:w-[48%] lg:w-[24%] inline-block flex-shrink-0">
                        <Card c>
                          <TransparentBlogCard
                            image={curved9}
                            title="Record Keeping"
                            action={{
                              type: "internal",
                              route: "/blog-information",
                              color: "info",
                              label: "Read More",
                            }}
                          />
                        </Card>
                      </div>
                      <div className="snap-start h-full w-[100%] md:w-[48%] lg:w-[24%] inline-block flex-shrink-0">
                        <Card c>
                          <TransparentBlogCard
                            image={curved9}
                            title="Visual Self Expression Tool"
                            action={{
                              type: "internal",
                              route: "/blog-information",
                              color: "info",
                              label: "Read More",
                            }}
                          />
                        </Card>
                      </div>
                      <div className="snap-start h-full w-[100%] md:w-[48%] lg:w-[24%] inline-block flex-shrink-0">
                        <Card c>
                          <TransparentBlogCard
                            image={curved9}
                            title="Parent/Student Space"
                            action={{
                              type: "internal",
                              route: "/blog-information",
                              color: "info",
                              label: "Read More",
                            }}
                          />
                        </Card>
                      </div>
                      <div className="snap-start h-full w-[100%] md:w-[48%] lg:w-[24%] inline-block flex-shrink-0">
                        <Card c>
                          <TransparentBlogCard
                            image={curved9}
                            title="Schedule Management"
                            action={{
                              type: "internal",
                              route: "/blog-information",
                              color: "info",
                              label: "Read More",
                            }}
                          />
                        </Card>
                      </div>
                      <div className="snap-start h-full w-[100%] md:w-[48%] lg:w-[24%] inline-block flex-shrink-0">
                        <Card c>
                          <TransparentBlogCard
                            image={curved9}
                            title="Record Keeping"
                            action={{
                              type: "internal",
                              route: "/blog-information",
                              color: "info",
                              label: "Read More",
                            }}
                          />
                        </Card>
                      </div>
                    </div>
                  </div>
                </div>
                
              </Grid>
            </Grid>
          </SoftBox>
        </div>

        <div class="snap-start">
          <Footer />
        </div>
      </div>
        
    </PageLayout>
  );
}

// Setting default values for the props of WelcomeCoverLayout
WelcomeCoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
};

// Typechecking props for the WelcomeCoverLayout
WelcomeCoverLayout.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  header: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  top: PropTypes.number,
  children: PropTypes.node.isRequired,
};

export default WelcomeCoverLayout;
