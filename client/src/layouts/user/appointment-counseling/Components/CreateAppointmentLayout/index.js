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
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import * as React from "react";
import Stack from "@mui/material/Stack";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import AppointmentVector from "assets/images/Webinar-bro.svg";
import Divider from "@mui/material/Divider";
import NoRecentAppointmentVector from "assets/images/No data-rafiki.svg";
import AppointmentCreation from "assets/images/AppointmentCreation.svg";
//SoftButton
import SoftButton from "components/SoftButton";

import jsPDF from 'jspdf';
import swal from "sweetalert";

function CurrentScheduleCard({ RN, Date, Time, Modality, Link, NewAppointments, Status}) {
  const [isVisible, setVisible] = useState(true);
  const handleVisibility = () => {
    if (isVisible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect( () => {
    if(NewAppointments){
      setVisible(false)
    }
  }
  )

  const navigate = useNavigate();

  const AppointmentForm = () => {
    // navigate('/appointment-counseling/schedule-form');
    window.location.replace("/appointment-counseling/schedule-form");
  };

  const AppointmentSummary = () => {
    const doc = new jsPDF();

    // Set font size and style
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    // Set text color
    doc.setTextColor(50, 50, 50);

    // Add text to the PDF
    doc.text(`Status: ${Status}`, 10, 20);
    doc.text(`Date: ${Date}`, 10, 30);
    doc.text(`Time: ${Time}`, 10, 40);
    doc.text(`Modality: ${Modality}`, 10, 50);
    doc.text(`Reference Number: ${RN}`, 10, 60);

    // Save the PDF with a specific name
    doc.save('appointment_summary.pdf');

    // Show sweet alert after saving the PDF
    swal({
      title: "Appointment",
      text: "Appointment have been downloaded!",
      icon: "success",
    }).then(() => {
      window.location.replace("/appointment-counseling");
    });
  }

  return (
    <Card>
      <SoftBox p={2}>
        <SoftBox
          component="img"
          src={AppointmentCreation}
          alt="waves"
          left={0}
          width="100%"
          height="260px"
          py={2}
          pr={0.5}
        />
        <SoftBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <SoftButton variant="gradient" color="info" onClick={AppointmentForm}>
            Create Appointment
          </SoftButton>
        </SoftBox>
        <Divider />

        {isVisible ? (
          <SoftBox>
            <SoftBox
              component="img"
              src={NoRecentAppointmentVector}
              alt="waves"
              left={0}
              width="100%"
              height="380px"
              py={2}
              pr={0.5}
            />

            <SoftTypography
              variant="h6"
              color="info"
              fontWeight="bold"
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              "No Latest Appointment"
            </SoftTypography>
          </SoftBox>
        ) : (
          <SoftBox px={1}>
            <SoftBox
              component="img"
              src={AppointmentVector}
              alt="waves"
              left={0}
              width="100%"
              height="210px"
              py={2}
              pr={0.5}
            />

            <SoftBox>
              <SoftBox style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "5px"}}>
                <SoftTypography
                  color="info"
                  component="label"
                  variant="h6"
                  fontWeight="bold"

                  sx={{ borderBottom: "3px #FDB813 solid" }}

                >
                  Upcoming Appointment
                </SoftTypography>
              </SoftBox>
              <SoftTypography variant="h6" fontWeight="regular">
                Status:{Status}
              </SoftTypography>
              <SoftTypography variant="h6" fontWeight="regular">
                Date:{Date}
              </SoftTypography>
              <SoftTypography variant="h6" fontWeight="regular">
                Time:{Time}
              </SoftTypography>
              <SoftTypography variant="h6" fontWeight="regular">
                Modality: {Modality.toUpperCase()}
              </SoftTypography>
              {/* <SoftTypography variant="h6" fontWeight="regular">
                Link:{Link}
              </SoftTypography> */}
              <SoftTypography variant="h6" fontWeight="regular">
                Reference Number:{RN}
              </SoftTypography>
            </SoftBox>
            <Divider />
            {Status === "Approved" && (
              <SoftBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <SoftButton variant="gradient" color="info" onClick={AppointmentSummary}>
                  <Icon>
                    download
                  </Icon>
                  &nbsp; Download PDFDownloadLink
                </SoftButton>
              </SoftBox>
            )}
          </SoftBox>
        )}
      </SoftBox>
    </Card>
  );
}

export default CurrentScheduleCard;
