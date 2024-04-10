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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
import PlaceholderCard from "examples/Cards/PlaceholderCard";

// Overview page components
import Header from "layouts/user/profile/components/user-profile-header-change-password";
import PlatformSettings from "layouts/user/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/user/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";

function UserProfileChangePassword() {
  return (
    <DashboardLayout>
      {/* Profile Pic, Name, Grade, Settings*/}
      <Header />
      <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>

          {/* Information */}
          <Grid item xs={12} md={6} xl={4}>
            <Card>
              <SoftBox p={3} mb={1} textAlign="left">
                <SoftBox component="form" role="form">
                  <SoftBox mb={2}>
                     <SoftBox mb={1} ml={1}>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Change Password
                        </SoftTypography>
                      </SoftBox>
                      <SoftInput type="changePassowrd" placeholder="Change Password" />
                    </SoftBox>
                    <SoftBox mb={2}>
                    <SoftBox mb={1} ml={0.5}>
                     <SoftTypography component="label" variant="caption" fontWeight="bold">
                       Confirm New Password
                     </SoftTypography>
                   </SoftBox>
                   <SoftInput type="confirmNewPassword" placeholder="Confirm New Password" />
                  </SoftBox>
                  <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth>
            Confirm
          </SoftButton>
        </SoftBox>
                </SoftBox>
               </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mb={3}>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default UserProfileChangePassword;
