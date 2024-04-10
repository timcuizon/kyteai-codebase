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
import { useMediaQuery } from "@mui/material";

function Header() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [role, setRole] = useState("");
  const [affiliateName, setAffiliateName] = useState("");
  const [affiliatePicture, setAffiliatePicture] = useState("");
  const [affiliateRelationship, setAffiliateRelationship] = useState("");
  const [affiliates, setAffiliates] = useState([]);
  const isSmallScreen = useMediaQuery("(min-width:600px)");

  // setPicture(getCookie("picture"));
  // setName(getCookie("name"));

  const isParent = getCookie("role");

  useEffect(() => {
    const formData = new FormData();
    // const email = "justinbarcos2001@gmail.com";
    const email = getCookie("email");

    formData.append("email", email);

    axios
      .post(localStorage.getItem("samwonAPI") + "/api/Profile/GetProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log("This is response: ", response.data);
        setEmail(response.data[0]["email"]);
        setDob(response.data[0]["dob"]);
        setSex(response.data[0]["sex"]);
        setRole(response.data[0]["role"]);
      })
      .catch((err) => {
        // console.log(err);
      });

    axios
      .post(localStorage.getItem("samwonAPI") + "/api/Profile/AffiliateGet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log("This is response: ", response.data);
        // Check if response data is an array
        if (Array.isArray(response.data)) {
          // Map over the response data array and create an array of objects
          const affiliatesData = response.data.map((item) => ({
            fullname: item["fullname"],
            picture: item["picture"],
            relationship: item["relationship"],
          }));
          // Save the array of objects in state
          setAffiliates(affiliatesData);
          // console.log("This is affiliatesData length:", affiliatesData.length);
        } else {
          // If response data is not an array, set affiliatesData to an empty array
          setAffiliates([]);
          // console.log("Response data is not an array");
        }
      })
      .catch((err) => {
        // console.log(err);
      });
  }, []);

  // console.log("This is affiliates : ",affiliates.data)

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

  useEffect(() => {
    setPicture(getCookie("picture"));
    setName(getCookie("givenName") + " " + getCookie("familyName"));
  }, []); // Run once when the component mounts

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile/edit-profile");
  };

  return (
    <SoftBox position="relative">
      <DashboardNavbar absolute light />
      <SoftBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
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
        <Grid container lg={12} item xs={12} sm={12} xl={12} spacing={3} alignItems="center">
          <Grid item>
            <SoftAvatar
              src={picture}
              alt="profile-image"
              variant="rounded"
              size="xxl"
              shadow="sm"
            />
          </Grid>
          <Grid item>
            <SoftBox height="100%" mt={0.5} lineHeight={1}>
              <SoftTypography fontSize="24px" fontWeight="medium">
                {name}
              </SoftTypography>
            </SoftBox>
            <Grid container item spacing={2} alignItems="center">
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
              <Grid container item spacing={2} alignItems="center">
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
                      <Icon>male</Icon>&nbsp; {sex}
                    </SoftTypography>
                  </SoftBox>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {isParent === "Parent" ? (
            <Grid item>
              <SoftTypography variant="text" fontWeight="normal" fontSize="14px" mr={1}>
                Associated child/children:
              </SoftTypography>
              <SoftBox sx={{ display: isSmallScreen ? "flex" : "block", alignItems: "center" }}>
                {affiliates.length > 0 ? (
                  affiliates.map((affiliate, index) => (
                    <Card
                      key={index}
                      style={{
                        width: "10rem",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        marginRight: "10px",
                        marginBottom: "10px",
                        padding: "10px",
                      }}
                    >
                      <SoftAvatar
                        src={affiliate.picture}
                        alt="profile-image"
                        variant="rounded"
                        size="xs"
                        shadow="sm"
                      />
                      <SoftTypography fontWeight="normal" fontSize="12px">
                        {affiliate.fullname}
                      </SoftTypography>
                    </Card>
                  ))
                ) : (
                  <SoftTypography fontWeight="medium" fontSize="14px">
                    You have no affiliates at the moment
                  </SoftTypography>
                )}
              </SoftBox>
            </Grid>
          ) : null}
        </Grid>
      </Card>
    </SoftBox>
  );
}

export default Header;
