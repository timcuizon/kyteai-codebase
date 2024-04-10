// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Container, IconButton, Typography } from "@mui/material";
import Logo from "assets/images/logos/samwon-logo.png";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

function Footer() {
  const [year, setYear] = useState("2024");

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  return (
    <SoftBox
      component="footer"
      py={6}
      sx={{ backgroundColor: "#1E4C2B", color: "white", display: "flex", justifyContent: "center" }}
    >
      <Container maxWidth="xl">
        <Grid container justifyContent="center" alignItems="center" spacing={4} mb={3}>
          <Grid
            item
            xs={12}
            md={6}
            className="logo-acknowledge"
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Grid sx={{ display: isMobile ? "flex" : "block", flexDirection: "row", alignItems: "center" }}>
              <SoftBox
                p={3}
                className="logo-wrapper"
                sx={{ display: "flex", justifyContent: "center", alignItems: "start" }}
              >
                <a href="/" target="_blank">
                  <img
                    className="logo lazyload"
                    src={Logo}
                    alt="Sam Won"
                    style={{ width: isMobile ? "500px" : "100px", height: "auto" }}
                  />
                </a>
              </SoftBox>
              <Grid sx={{ display: "flex", flexDirection: "column", alignItems: isMobile ? "start" : "center" }}>
                <SoftTypography
                  variant="h4"
                  color="white"
                  mb={3}
                  sx={{ borderBottom: "2px solid #FDB813" }}
                >
                  Sam Won
                </SoftTypography>
                <SoftTypography textAlign="center" variant="body2" color="light" className="footer-school-acknowledge">
                  Sam Won is a cutting-edge counseling management system using artificial
                  intelligence to enhance the administrative efficiency and accessibility services,
                  fostering a transformative and user-friendly counseling experience.
                </SoftTypography>
              </Grid>
            </Grid>
            {/* <div className="socials mt-3">
              <IconButton size="large" href="https://twitter.com/ism_super" target="_blank">
                <TwitterIcon color="white" />
              </IconButton>
              <IconButton size="large" href="https://www.facebook.com/internationalschoolmanilaph/" target="_blank">
                <FacebookIcon color="white" />
              </IconButton>
              <IconButton size="large" href="https://www.youtube.com/c/ISManila1920" target="_blank">
                <YouTubeIcon color="white" />
              </IconButton>
              <IconButton size="large" href="https://www.instagram.com/ismanila1920/" target="_blank">
                <InstagramIcon color="white" />
              </IconButton>
              <IconButton size="large" href="https://www.linkedin.com/school/international-school-manila" target="_blank">
                <LinkedInIcon color="white" />
              </IconButton>
            </div> */}
          </Grid>

          
        </Grid>
        <hr />
        <SoftTypography variant="body2" color="light" mt={2} textAlign="center">
          &copy; {year} Sam Won. All rights reserved.
        </SoftTypography>
      </Container>
    </SoftBox>
  );
}

export default Footer;
