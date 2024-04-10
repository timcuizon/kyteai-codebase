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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import SamWonPicBlogs from "assets/images/blogs2.svg";


// Authentication layout components
import Footer from "layouts/public/authentication/components/Footer";
import curved9 from "assets/images/curved-images/curved-6.jpg";

import TransparentBlogCardFolderOnly from "layouts/public/authentication/components/TransparentBlogCardFolderOnly";
import { Container } from "@mui/material";
import promotesMH from "assets/images/promoting-mental-health.svg";
import tutMental from "assets/images/tutmental.svg";
import lusogIsip from "assets/images/lusog-Isip.svg";
import counselorImportant from "assets/images/counselorimportant.svg";
import newGen from "assets/images/newgen.svg";

function CoverLayout({ color, header, title, description, image, top, children }) {
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

      
      <SoftBox>
        
      <SoftBox>
        <img
          src={SamWonPicBlogs}
          alt="samWonContactUs"
          style={{
            width: "100vw",
            height: "90vh",
            objectFit: "cover",
          }}
        ></img>
      </SoftBox>
      <Container>

        
        <SoftBox mt={2} mb={2} display="flex" justifyContent="center" alignItems="center">
          <SoftTypography
            sx={{ borderBottom: "3px #FDB813 solid", textAlign: "center" }}
            color="colorISMgreen"
            variant="h1"
            fontWeight="bold"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            BLOGS
          </SoftTypography>
        </SoftBox>
        <Grid container lg={12} xs={12} sm={12} xl={12} md={12}  style={{ justifyContent: "center" }}>
          <Grid item lg={3} xs={12} md={12} m={1}>
            <TransparentBlogCardFolderOnly
              image={promotesMH}
              title="Promoting mental health"
              // description="Finding temporary housing for your dog should be as easy as renting an Airbnb. That’s the idea behind Rover..."
              date="November 3, 2023"
              author="By Word Health Organization"
              // role="Student"
              action={{
                type: "internal",
                route: "/blog-information",
                color: "info",
                label: "Read More",
              }}
            />
          </Grid>
          <Grid item lg={3} xs={12} md={12} spacing={2} m={1}>
            <TransparentBlogCardFolderOnly
              image={tutMental}
              title="Breaking the Stigma in Counseling"
              // description="Finding temporary housing for your dog should be as easy as renting an Airbnb. That’s the idea behind Rover..."
              date="April 16, 2021"
              author="By Angelica Jane Evangelista, Azie Marie Libanan,Alvin Joseph Mapoy, K Ballesteros"
              // role="Student"
              action={{
                type: "internal",
                route: "/blog-information/Blogs/index2.js",
                color: "info",
                label: "Read More",
              }}
            />
          </Grid>
          <Grid item lg={3} xs={12} md={12} spacing={2} m={1}>
            <TransparentBlogCardFolderOnly
              image={lusogIsip}
              title="Mental Health on the Move in the Philippines – Meet the Lusog-Isip App"
              // description="Finding temporary housing for your dog should be as easy as renting an Airbnb. That’s the idea behind Rover..."
              date="December 22, 2021"
              author="By URC"
              // role="Student"
              action={{
                type: "internal",
                route: "/blog-information/Blogs/index3.js",
                color: "info",
                label: "Read More",
              }}
            />
          </Grid>
          <Grid item lg={3} xs={12} md={12} spacing={2} m={1}>
            <TransparentBlogCardFolderOnly
              image={counselorImportant}
              title="Why School Counselors Matter"
              // description="Finding temporary housing for your dog should be as easy as renting an Airbnb. That’s the idea behind Rover..."
              date="February 1, 2019"
              author="By Letisha Marrero"
              // role="Student"
              action={{
                type: "internal",
                route: "/blog-information/Blogs/index4.js",
                color: "info",
                label: "Read More",
              }}
            />
          </Grid>
          <Grid item lg={3} xs={12} md={12} spacing={2} m={1}>
            <TransparentBlogCardFolderOnly
              image={newGen }
              title="How a New Generation of School Counselors is Tackling the Youth Mental Health Crisis"
              // description="Finding temporary housing for your dog should be as easy as renting an Airbnb. That’s the idea behind Rover..."
              date="September 22, 2023"
              author="By Laura Hoxworth"
              // role="Student"
              action={{
                type: "internal",
                route: "/blog-information/Blogs/index5.js",
                color: "info",
                label: "Read More",
              }}
            />
          </Grid>
        </Grid>
      </Container>
      </SoftBox>
    

      <Footer />
    </PageLayout>
  );
}

// Setting default values for the props of CoverLayout
CoverLayout.defaultProps = {
  header: "",
  title: "",
  description: "",
  color: "info",
  top: 20,
};

// Typechecking props for the CoverLayout
CoverLayout.propTypes = {
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

export default CoverLayout;
