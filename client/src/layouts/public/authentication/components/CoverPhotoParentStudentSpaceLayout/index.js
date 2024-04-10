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

function ParentStudentSpaceCoverPhoto({ title, description, image, children, date, author }) {
  return (
    
      <SoftBox
        width="calc(100% - 2rem)"
        maxWidth="2500px"
        minHeight="50vh"
        borderRadius="lg"
        mx={2}
        my={2}
        pt={6}
        pb={28}
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            image &&
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
      </SoftBox>
  );
}

// Setting default values for the props of BasicLayout
ParentStudentSpaceCoverPhoto.defaultProps = {
  title: "",
  description: "",
  author: "",
  date: "",
};

// Typechecking props for the BasicLayout
ParentStudentSpaceCoverPhoto.propTypes = {
  image: PropTypes.string.isRequired,
};

export default ParentStudentSpaceCoverPhoto;
