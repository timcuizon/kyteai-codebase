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

import { useState, useEffect } from "react";

// react-router components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import DefaultNavbarMobile from "examples/Navbars/DefaultNavbar/DefaultNavbarMobile";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Soft UI Dashboard React examples
import Shop from "examples/Icons/Shop";

// SamWon Custom
import Logo from "assets/images/logos/logo_SamwonLogo.png";
import { getCookie } from "helpers/CookieHelper";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



function DefaultNavbar({ transparent, light, action }) {
  const [mobileNavbar, setMobileNavbar] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const openMobileNavbar = ({ currentTarget }) => setMobileNavbar(currentTarget.parentNode);
  const closeMobileNavbar = () => setMobileNavbar(false);

  const theme = useTheme();
  const isLargeDevice = useMediaQuery(theme.breakpoints.up('lg'));

  useEffect(() => {
    // A function that sets the display state for the DefaultNavbarMobile.
    function displayMobileNavbar() {
      if (window.innerWidth < breakpoints.values.lg) {
        setMobileView(true);
        setMobileNavbar(false);
      } else {
        setMobileView(false);
        setMobileNavbar(false);
      }
    }

    /** 
     The event listener that's calling the displayMobileNavbar function when 
     resizing the window.
    */
    window.addEventListener("resize", displayMobileNavbar);

    // Call the displayMobileNavbar function to set the state with the initial value.
    displayMobileNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", displayMobileNavbar);
  }, []);

  return (
    <Container sx={{ display: 'flex', justifyContent: 'center' }}>
      <SoftBox
        py={1.5}
        px={{ xs: transparent ? 4 : 5, sm: transparent ? 2 : 5, lg: transparent ? 0 : 5 }}
        my={2}
        mx={3}
        width={isLargeDevice ? '1000px' : 'calc(100% - 48px)'}
        borderRadius="lg"
        shadow={transparent ? "none" : "md"}
        color={light ? "white" : "dark"}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        position="fixed"
        
        zIndex={3}
        sx={({ palette: { transparent: transparentColor, white }, functions: { rgba } }) => ({
          backgroundColor: transparent ? transparentColor.main : rgba(white.main, 0.8),
          backdropFilter: transparent ? "none" : `saturate(200%) blur(30px)`,
        })}
      >
        <SoftBox component={Link} to="/" py={transparent ? 1.5 : 0.75} lineHeight={1} display={{lg: "flex" }} alignItems="center" className={`flex justify-center`}>
          <img 
            src={Logo}
            width={40} 
            height={40}
            className={`mr-2`}
          />
          <SoftTypography variant="button" fontWeight="bold" color={light ? "white" : "dark"}>
            Sam Won
          </SoftTypography>
        </SoftBox>
        <SoftBox color="inherit" display={{ xs: "none", lg: "flex" }} m={0} p={0}>
          <DefaultNavbarLink
            icon="home"
            name="Home"
            route="/"
            light={light}
          />
          <DefaultNavbarLink
            icon="book"
            name="Blog"
            route="/blog"
            light={light}
          />
           {/* <DefaultNavbarLink
            icon="key"
            name="Partnered Organizartion"
            route="/partnered-organization"
            light={light}
          /> */}
          <DefaultNavbarLink
            icon="info"
            name="Contacts & Information"
            route="/contact-information"
            light={light}
          />
          {
            getCookie("givenName") != null ?
            (
              <>
                <DefaultNavbarLink
                  icon="key"
                  name="Dashboard"
                  route="/dashboard"
                  light={light}
                />
                <DefaultNavbarLink
                  icon="person"
                  name={getCookie("givenName")}
                  route="/profile"
                  light={light}
                />
              </>
            )

            :
            
            (
              <>
                <DefaultNavbarLink
                  icon="key"
                  name="sign in"
                  route="/authentication/sign-in"
                  light={light}
                />
              </>
            )
          }
        </SoftBox>
        {/* {action &&
          (action.type === "internal" ? (
            <SoftBox display={{ xs: "none", lg: "inline-block" }}>
              <SoftButton
                component={Link}
                to={action.route}
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                circular
              >
                {action.label}
              </SoftButton>
            </SoftBox>
          ) : (
            <SoftBox display={{ xs: "none", lg: "inline-block" }}>
              <SoftButton
                component="a"
                href={action.route}
                target="_blank"
                rel="noreferrer"
                variant="gradient"
                color={action.color ? action.color : "info"}
                size="small"
                circular
              >
                {action.label}
              </SoftButton>
            </SoftBox>
          ))} */}
        <SoftBox
          display={{ xs: "inline-block", lg: "none" }}
          lineHeight={0}
          py={1.5}
          pl={1.5}
          color="inherit"
          sx={{ cursor: "pointer" }}
          onClick={openMobileNavbar}
        >
          <Icon fontSize="default">{mobileNavbar ? "close" : "menu"}</Icon>
        </SoftBox>
      </SoftBox>
      {mobileView && <DefaultNavbarMobile open={mobileNavbar} close={closeMobileNavbar} />}
    </Container>
  );
}

// Setting default values for the props of DefaultNavbar
DefaultNavbar.defaultProps = {
  transparent: false,
  light: false,
  action: false,
};

// Typechecking props for the DefaultNavbar
DefaultNavbar.propTypes = {
  transparent: PropTypes.bool,
  light: PropTypes.bool,
  action: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      type: PropTypes.oneOf(["external", "internal"]).isRequired,
      route: PropTypes.string.isRequired,
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
      label: PropTypes.string.isRequired,
    }),
  ]),
};

export default DefaultNavbar;
