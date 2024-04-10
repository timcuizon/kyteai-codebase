// @mui material components
import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard React examples
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React icons
import Cube from "examples/Icons/Cube";
import Document from "examples/Icons/Document";
import Settings from "examples/Icons/Settings";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";
import { useNavigate } from "react-router-dom";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import curved0 from "assets/images/curved-images/curved0.jpg";

import { getCookie } from "helpers/CookieHelper";
import axios from "axios";
import { json, useLocation } from "react-router-dom";

import Preloader from "PreLoader";

function ProfileHeader({ name, userId, role, email, dob, sex, pictureProfile }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const navigate = useNavigate();

  return (
    <>
      <SoftBox position="relative">
        <SoftBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="8.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
              `${linearGradient(
                rgba(gradients.info.main, 0.6),
                rgba(gradients.info.state, 0.6)
              )}, url(${curved0})`,
            backgroundSize: "cover",
            backgroundPosition: "50%",
            overflow: "hidden",
          }}
        />
        <Card
          sx={{
            backdropFilter: `saturate(200%) blur(30px)`,
            backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
            boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
            position: "relative",
            mt: -8,
            mx: 3,
            py: 2,
            px: 2,
          }}
        >
          <Grid
            container
            lg={12}
            item
            xs={12}
            sm={12}
            xl={12}
            spacing={3}
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <SoftAvatar
                src={pictureProfile}
                alt="profile-image"
                variant="rounded"
                size="xxl"
                shadow="sm"
              />
            </Grid>
            <Grid item>
              <SoftBox height="100%" mt={0.5} lineHeight={1}>
                <SoftTypography fontSize="24px" fontWeight="medium">
                  {name} [{userId}]
                </SoftTypography>
              </SoftBox>
              <Grid container lg={12} item xs={12} sm={12} xl={12} spacing={3} alignItems="center">
                <Grid item>
                  <SoftBox height="100%" mt={0.5} lineHeight={1}>
                    <SoftTypography variant="text" fontWeight="normal" fontSize="14px">
                      <Icon>person</Icon>&nbsp;{role}
                    </SoftTypography>
                  </SoftBox>
                </Grid>
                <Grid item>
                  <SoftBox height="100%" mt={0.5} lineHeight={1}>
                    <SoftTypography variant="text" fontWeight="normal" fontSize="14px">
                      <Icon>mail</Icon>&nbsp; {email}
                    </SoftTypography>
                  </SoftBox>
                </Grid>
                <Grid
                  container
                  lg={12}
                  item
                  xs={12}
                  sm={12}
                  xl={12}
                  spacing={3}
                  alignItems="center"
                >
                  <Grid item>
                    <SoftBox height="100%" mt={0.5} lineHeight={1}>
                      <SoftTypography variant="text" fontWeight="normal" fontSize="14px">
                        <Icon>cake</Icon>&nbsp; {dob}
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                  <Grid item>
                    <SoftBox height="100%" mt={0.5} lineHeight={1}>
                      <SoftTypography variant="text" fontWeight="normal" fontSize="14px">
                        <Icon>{sex.toLowerCase()}</Icon>&nbsp; {sex}
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </SoftBox>
    </>
  );
}

export default ProfileHeader;
