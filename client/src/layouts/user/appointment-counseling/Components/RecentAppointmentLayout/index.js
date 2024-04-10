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

//Link
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import * as React from "react";
import Stack from "@mui/material/Stack";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import NoRecentAppointmentVector from "assets/images/No data-rafiki.svg";


//SoftButton
import SoftButton from "components/SoftButton";

function CurrentScheduleCard({ RN, Date, Time, Modality }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card sx={{ height: "100%" }}>
      <SoftBox p={2}>
        <SoftBox
          component="img"
          src={NoRecentAppointmentVector}
          alt="waves"
          left={0}
          width="100%"
          height="75%"
          py={2}
          pr={0.5}
          mb={3}
        />
        <SoftBox px={1}>
          {/* <SoftBox mb={2}>
          <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            RN:{RN}
          </SoftTypography>
          <SoftTypography component="div" variant="button" color="text" fontWeight="regular">
            Date:{Date}
          </SoftTypography>
          <SoftTypography variant="h6" fontWeight="medium" textTransform="capitalize">
            Time:{Time}
          </SoftTypography>
          <SoftTypography component="div" variant="button" color="text" fontWeight="regular">
            Modality:{Modality}
          </SoftTypography>
          <SoftTypography component="div" variant="button" color="text" fontWeight="regular">
            Link:{Modality}
          </SoftTypography>
          
         
        </SoftBox> */}
        </SoftBox> 
        <SoftBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SoftTypography  variant="gradient" color="info" size="medium">
            No Recent Appointment
          </SoftTypography>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default CurrentScheduleCard;
