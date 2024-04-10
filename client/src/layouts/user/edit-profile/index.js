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

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/user/edit-profile/components/user-profile-header";
import PlatformSettings from "layouts/user/profile/components/PlatformSettings";

// Data
import EditProfile from "layouts/user/edit-profile/components/index.js";

function editProfile() {
  return (
    <DashboardLayout>
      {/* Profile Pic, Name, Grade, Settings*/}
      <Header />
      <SoftBox mt={5} mb={3}>
        <EditProfile />
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}
export default editProfile;
