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
import "react-quill/dist/quill.snow.css";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

//Sam Won
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Card, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import ReactQuill from "react-quill";
import ChildImage from "assets/images/child_pic.jpg";
import SoftAvatar from "components/SoftAvatar";
import Divider from "@mui/material/Divider";
import FollowUp from "layouts/user/appointment-admin/appointment-list/component/Modals/FollowUp.js";
import { isLoggedIn } from "helpers/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getCookie } from "helpers/CookieHelper";
import { useMediaQuery } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function stripHtmlTags(html) {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}

function UserInformation({
  refNum,
  Name,
  Email,
  DateOfBirth,
  Gender,
  Image,
  UserType,
  Status,
  AppointmentDate,
  AppointmentTime,
  TypeOfConcern,
  TypeOfModality,
  UserFeedback,
  isAffiliateAvailable,
  affiliatePic,
  affiliateName,
  affiliateSex,
  affiliateDob,
  affiliateEmail,
  AssignedProf,
  ProfessinalName,
}) {
  const [appStatus, setAppStatus] = useState();
  const isSmallScreen = useMediaQuery("(min-width:1400px)");

  React.useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    }

    setAppStatus(Status);
  });

  return (
    <>
      {/* Personal Information */}
      {Status != "Activity" ? (
        <>
          <SoftBox mt={2}>
            <Grid
              container
              spacing={2}
              item
              xs={12}
              xl={12}
              md={12}
              sm={12}
              display={"flex"}
              alignItems={"center"}
            >
              <Grid
                item
                lg={isSmallScreen ? 2 : 12}
                md={12}
                sm={12}
                xs={12}
                alignItems="center"
                justifyContent="center"
                display="flex"
              >
                <SoftAvatar src={Image} alt="profile-image" variant="rounded" size="lg" shadow="sm" />
              </Grid>
              <Grid
                item
                lg={isSmallScreen ? 5 : 12}
                xs={12}
                md={12}
                sm={12}
                className="whitespace-nowrap"
              >
                <SoftTypography variant="body2" fontWeight="normal">
                  <b>Name: </b>
                  {Name}
                </SoftTypography>
                <SoftTypography variant="body2" fontWeight="normal">
                  <b>User Type: </b>
                  {UserType}
                </SoftTypography>
                <SoftTypography variant="body2" fontWeight="normal">
                  <b>Email: </b>
                  {Email}
                </SoftTypography>
              </Grid>
              <Grid item lg={isSmallScreen ? 5 : 12} xs={12} md={12} sm={12}>
                <SoftTypography variant="body2" fontWeight="normal">
                  <b>Date of Birth: </b> {DateOfBirth}
                </SoftTypography>
                <SoftTypography variant="body2" fontWeight="normal">
                  <b>Gender: </b> {Gender}
                </SoftTypography>
                <SoftTypography variant="body2" fontWeight="normal">
                  &nbsp;
                </SoftTypography>
              </Grid>
            </Grid>
          </SoftBox>

          <Divider />
        </>
      ) : null}

      {isAffiliateAvailable ? (
        <>
          <SoftBox display="flex" alignItems="center" mb={1}>
            <SoftTypography
              color="info"
              component="label"
              variant="h6"
              fontWeight="bold"
              sx={{ borderBottom: "3px #FDB813 solid" }}
            >
              Affiliate Information
            </SoftTypography>
          </SoftBox>
          <SoftBox mt={2}>
            <Grid
              container
              spacing={2}
              item
              xs={12}
              xl={12}
              md={12}
              sm={12}
              display={"flex"}
              alignItems={"center"}
            >
              <Grid
                item
                lg={isSmallScreen ? 2 : 12}
                md={12}
                sm={12}
                xs={12}
                alignItems="center"
                justifyContent="center"
                display="flex"
              >
                <SoftAvatar
                  src={affiliatePic}
                  alt="profile-image"
                  variant="rounded"
                  size="lg"
                  shadow="sm"
                />
              </Grid>
              <Grid
                item
                lg={isSmallScreen ? 5 : 12}
                xs={12}
                md={12}
                sm={12}
                className="whitespace-nowrap"
              >
                <SoftTypography variant="body2" fontWeight="normal">
                  <b>Name: </b>
                  {affiliateName}
                </SoftTypography>
                <SoftTypography variant="body2" fontWeight="normal">
                  <b>User Type: </b>
                  Student
                </SoftTypography>
                <SoftTypography variant="body2" fontWeight="normal">
                  <b>Email: </b>
                  {affiliateEmail}
                </SoftTypography>
              </Grid>
              <Grid item lg={isSmallScreen ? 5 : 12} xs={12} md={12} sm={12}>
                <SoftTypography variant="body2" fontWeight="normal">
                  <b>Date of Birth: </b> {affiliateDob}
                </SoftTypography>
                <SoftTypography variant="body2" fontWeight="normal">
                  <b>Gender: </b> {affiliateSex}
                </SoftTypography>
                <SoftTypography variant="body2" fontWeight="normal">
                  &nbsp;
                </SoftTypography>
              </Grid>
            </Grid>
          </SoftBox>
          <Divider />
        </>
      ) : null}
      <SoftBox display="flex" alignItems="center" mb={1}>
        <SoftTypography
          color="info"
          component="label"
          variant="h6"
          fontWeight="bold"
          sx={{ borderBottom: "3px #FDB813 solid" }}
        >
          Appointment Information
        </SoftTypography>
      </SoftBox>
      <SoftBox mt={2}>
        <Grid container spacing={2} item xs={12} lg={12} xl={12} md={12} sm={12}>
          <Grid item lg={isSmallScreen ? 5 : 12} xs={12} md={12} sm={12}>
            <SoftTypography variant="body2" fontWeight="normal">
              <b>Reference Number: </b> {refNum}
            </SoftTypography>
            <SoftTypography variant="body2" fontWeight="normal">
              <b>Status: </b> {appStatus}
            </SoftTypography>
          </Grid>
          <Grid item lg={isSmallScreen ? 5 : 12} xs={12} md={12} sm={12}>
            <SoftTypography variant="body2" fontWeight="normal">
              <b>{Status != "Activity" ? "Type of Concern:" : "Reason for Schedule:"}</b> {TypeOfConcern} {Status == "Activity" ? "(" + ProfessinalName + ")" : ""}
            </SoftTypography>
            {Status != "Activity" ? (
              <SoftTypography variant="body2" fontWeight="normal">
                <b>Type of Modality:</b> {TypeOfModality}
              </SoftTypography>
            ) : null}
          </Grid>
          <Grid item lg={isSmallScreen ? 5 : 12} xs={12} md={12} sm={12}>
            <SoftTypography variant="body2" fontWeight="normal">
              <b>Appointment Date: </b> {AppointmentDate}
            </SoftTypography>
            <SoftTypography variant="body2" fontWeight="normal">
              <b>Appointment Time: </b> {AppointmentTime}
            </SoftTypography>
          </Grid>
        </Grid>
        {/* Other Information */}

        {UserFeedback != "" ? (
          <SoftBox>
            <Divider />
            <SoftBox>
              <SoftTypography
                color="info"
                component="label"
                variant="h6"
                fontWeight="bold"
                sx={{ borderBottom: "3px #FDB813 solid" }}
              >
                Other Information
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography color="info" component="label" variant="h6">
                {stripHtmlTags(UserFeedback)}
                {/* <ReactQuill value={UserFeedback}
                  readOnly={true}
                  theme={"bubble"}
                /> */}
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        ) : null}
        {AssignedProf != " " && getCookie("role") != "Admin" && getCookie("role") != "Professional" ? (
          <SoftBox>
            <SoftTypography variant="body2" fontWeight="normal">
              <b>Assigned Professional: </b> {AssignedProf}
            </SoftTypography>
          </SoftBox>
        ) : null}
      </SoftBox>
      <Divider />
    </>
  );
}

export default UserInformation;
