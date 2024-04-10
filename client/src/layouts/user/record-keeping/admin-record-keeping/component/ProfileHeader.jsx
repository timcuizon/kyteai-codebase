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
import SoftButton from "components/SoftButton";
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
import { useMediaQuery } from "@mui/material";

import Preloader from "PreLoader";

import AddAffiliatesModal from "./AddAffiliates";
import RemoveAffiliatesModal from "./RemoveAffiliates";

function ProfileHeader({ name, userId, role, email, dob, sex, pictureProfile }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [tabValue, setTabValue] = useState(0);

  const [affiliates, setAffiliates] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userEmail = searchParams.get("email");

  const isSmallScreen = useMediaQuery("(min-width:600px)");

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }
    GetAffiliate();
    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  async function GetAffiliate() {
    const formData = new FormData();
    // const email = "justinbarcos2001@gmail.com";
    const email = userEmail;

    formData.append("email", email);

    await axios
      .post(localStorage.getItem("samwonAPI") + "/api/Profile/AffiliateGet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("This is response: ", response.data);
        // Check if response data is an array
        if (Array.isArray(response.data)) {
          // Map over the response data array and create an array of objects
          const affiliatesData = response.data.map((item) => ({
            fullname: item["fullname"],
            picture: item["picture"],
            email: item["email"],
            relationship: item["relationship"],
          }));
          // Save the array of objects in state
          setAffiliates(affiliatesData);
          console.log("This is affiliatesData length:", affiliatesData.length);
        } else {
          // If response data is not an array, set affiliatesData to an empty array
          setAffiliates([]);
          console.log("Response data is not an array");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleViewProfile(email) {
    window.location.replace("/records/list?email=" + email);
  }

  const handleSetTabValue = (event, newValue) => setTabValue(newValue);

  const navigate = useNavigate();

  //=============== Affiliates
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
            <Grid item>
              <SoftTypography variant="text" fontWeight="normal" fontSize="14px" mr={1}>
                {role == "Parent" ? "Associated child/children:" : "Parents/Guardians"}
              </SoftTypography>
              <SoftBox sx={{ display: isSmallScreen ? "flex" : "block", alignItems: "center" }}>
                {affiliates.length > 0 ? (
                  <SoftBox
                    className={"flex max-w-[29rem] w-auto overflow-x-auto bg-transparent mr-5"}
                  >
                    <div className="flex bg-transparent">
                      {affiliates.map((affiliate, index) => (
                        <Card
                          key={index}
                          style={{
                            width: "9rem", // Set the fixed width of the cards
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column",
                            marginRight: "10px",
                            marginBottom: "10px",
                            padding: "10px",
                          }}
                          onClick={() => handleViewProfile(affiliate.email)}
                        >
                          <SoftAvatar
                            src={affiliate.picture}
                            alt="profile-image"
                            variant="rounded"
                            size="xs"
                            shadow="sm"
                          />
                          <SoftTypography
                            fontWeight="normal"
                            fontSize="12px"
                            style={{ textAlign: "center" }}
                          >
                            {affiliate.fullname}
                          </SoftTypography>
                        </Card>
                      ))}
                    </div>
                  </SoftBox>
                ) : (
                  <>
                    <SoftTypography fontWeight="medium" fontSize="14px" marginRight="2rem">
                      No affiliates at the moment
                    </SoftTypography>
                  </>
                )}
                <SoftBox className={"block"}>
                  <SoftButton
                    variant="outlined"
                    color="info"
                    size="small"
                    type="button"
                    style={{ marginBottom: "1rem", width: "100%" }}
                  >
                    <AddAffiliatesModal role={role} userId={userId} />
                  </SoftButton>
                  <SoftButton
                    variant="outlined"
                    color="error"
                    size="small"
                    type="button"
                    style={{ display: "block", width: "100%" }}
                  >
                    <RemoveAffiliatesModal role={role} email={email} userId={userId} />
                  </SoftButton>
                </SoftBox>
              </SoftBox>
            </Grid>
          </Grid>
        </Card>
      </SoftBox>
    </>
  );
}

export default ProfileHeader;
