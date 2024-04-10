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
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Billing page components
import UserInformation from "layouts/public/authentication/components/UserInformation";

function UserInformationCard() {
  return (
    <Card id="delete-account">
      <SoftBox pt={3} px={2}>
        <SoftTypography variant="h6" fontWeight="medium">
          Schedule Management
        </SoftTypography>
      </SoftBox>
      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <UserInformation
            name="oliver liam"
            ticket="00054682"
            status="Pending Approval"
            age="8"
            gender="male"
            email="oliver@burrito.com"
            appointmentDate="2023-09-22"
            appointmentTime="10:00AM - 11:00AM"
          />
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default UserInformationCard;
