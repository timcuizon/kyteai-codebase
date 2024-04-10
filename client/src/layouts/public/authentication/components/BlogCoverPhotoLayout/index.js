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

// Authentication layout components
import Footer from "layouts/public/authentication/components/Footer";
import { Container } from "@mui/material";

function BlogCoverPhotoLayout({ title, description, image, children, date, author }) {
  return (
    <SoftBox>
      <SoftBox>
        <img
          src={image}
          alt="samWonContactUs"
          style={{
            width: "100vw",
            height: "80vh",
            objectFit: "cover",
          }}
        ></img>
      </SoftBox>
      <SoftBox>
        <Container>
          <SoftBox mt={3} mb={1}>
            <SoftTypography variant="h1" sx={3} color="colorISMgreen" fontWeight="bold">
              {title}
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={1}>
            <SoftTypography
              variant="Caption"
              justifyConeten="start"
              fontSize="14px"
              component="p"
              color="secondary"
              fontWeight="medium"
            >
              {date}
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={2} fontSize="12px">
            <SoftTypography>{author}</SoftTypography>
          </SoftBox>
          <SoftBox mb={2}>
            <SoftTypography variant="body2" color="black" fontWeight="regular" fontSize="16px">
              {children}
            </SoftTypography>
          </SoftBox>
        </Container>
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of BasicLayout
BlogCoverPhotoLayout.defaultProps = {
  title: "",
  description: "",
  author: "",
  date: "",
};

// Typechecking props for the BasicLayout
BlogCoverPhotoLayout.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default BlogCoverPhotoLayout;
