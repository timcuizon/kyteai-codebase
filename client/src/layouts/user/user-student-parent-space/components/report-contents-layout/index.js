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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";

//Sam Won
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid, useMediaQuery } from "@mui/material";
import MaleGender from "examples/Icons/MaleGender";
import FemaleGender from "examples/Icons/FemaleGender";
import Divider from "@mui/material/Divider";
import ReportRecords from "layouts/user/user-student-parent-space/components/report-records/data-report-records";
import { getCookie } from "helpers/CookieHelper";

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

function ParentStudentSpaceContent({
  typeReport,
  typeConcern,
  contactNumberUser,
  picture,
  contactPerson,
  emailAddress,
  address,
  relationship,
  emailAddressContact,
  name,
  dateOfBirth,
  contactPersonNumber,
  userContent,
  rfNumber,
  gender,
  isFeedbackChecked,
}) {
  const isSmallScreen = useMediaQuery("(min-width:1400px)");

  return (
    <>
      <Grid container spacing={4} lg={12} item xs={12} xl={12} md={12} mb={3}>
        <Grid item lg={7} xs={12} md={12}>
          <Card>
            <Grid container spacing={4} lg={12} item xs={12} xl={12} md={12} mb={3}>
              <Grid item lg={6} xs={12} md={12}>
                <SoftBox
                  pt={2}
                  px={2}
                  mb={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <SoftTypography
                    color="info"
                    component="label"
                    variant="h6"
                    fontWeight="bold"
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                  >
                    Concern Information
                  </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>

            <SoftBox>
              <Card>
                <Grid container lg={12} item sm={12} xl={12} md={12} xs={12}>
                  <Grid item lg={4} sm={12} md={12} xs={12}>
                    <SoftBox px={2}>
                      <SoftTypography variant="body2" fontWeight="normal">
                        <b>Category: </b> {typeReport}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal">
                        <b>Concern: </b> {typeConcern}
                      </SoftTypography>
                    </SoftBox>
                    {!isSmallScreen && <Divider />}
                  </Grid>
                  <Grid item lg={4} sm={12} md={12} xs={12}>
                    <SoftBox px={2}>
                      <SoftTypography variant="body2" fontWeight="normal">
                        <b>Person Involved: </b>
                        {contactPerson}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal">
                        <b>Relationship: </b>
                        {relationship}
                      </SoftTypography>
                    </SoftBox>
                    {!isSmallScreen && <Divider />}
                  </Grid>
                  {isFeedbackChecked == "true" ? (
                    <Grid item lg={7} sm={12} md={12} xs={12}>
                      <SoftBox px={2}>
                        {/* <SoftTypography variant="body2" fontWeight="normal">
                        <b>Address: </b>
                        {address}
                      </SoftTypography> */}
                        <SoftTypography noWrap variant="body2" fontWeight="normal">
                          <b>Send a feedback to: </b>
                          {emailAddressContact}
                        </SoftTypography>
                        {/* <SoftTypography variant="body2" fontWeight="normal">
                        <b>Contact Number: </b> {contactPersonNumber}
                      </SoftTypography> */}
                      </SoftBox>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
                <Divider />
                <SoftBox
                  pt={2}
                  px={2}
                  mb={1}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
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
                <SoftBox p={2} mb={1}>
                  <SoftTypography color="info" component="label" variant="h6">
                    {userContent}
                  </SoftTypography>
                </SoftBox>
              </Card>
            </SoftBox>
          </Card>
        </Grid>
        <Grid item lg={5} xs={12} md={12} mb={3}>
          <Card>
            <SoftBox p={2}>
              <SoftBox mb={2} display="flex" justifyContent="space-between" alignItems="center">
                <SoftTypography
                  color="info"
                  component="label"
                  variant="h6"
                  fontWeight="bold"
                  sx={{ borderBottom: "3px #FDB813 solid" }}
                >
                  Personal Information
                </SoftTypography>
              </SoftBox>
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
                  sm={12}
                  md={12}
                  xs={12}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <SoftAvatar
                    src={picture}
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
                  <SoftTypography color="info" component="label" variant="h6" fontWeight="bold">
                    {name}
                  </SoftTypography>
                  <SoftTypography noWrap variant="body2" fontWeight="normal">
                    <Icon>email</Icon> : {emailAddress}
                  </SoftTypography>
                  {/* <SoftTypography variant="body2" fontWeight="normal">
                      <Icon>call</Icon> : {contactNumberUser}
                    </SoftTypography> */}
                  <SoftTypography variant="body2" fontWeight="normal">
                    <Icon>calendar_month</Icon> : {dateOfBirth}
                  </SoftTypography>
                  <SoftTypography variant="body2" fontWeight="normal">
                    <Icon>male</Icon>
                    <Icon>female</Icon> : {gender}
                  </SoftTypography>
                </Grid>
              </Grid>
            </SoftBox>
          </Card>
          <SoftBox>
            <SoftTypography mt={3}>
              <ReportRecords email={emailAddress} />
            </SoftTypography>
          </SoftBox>
        </Grid>
      </Grid>
    </>
  );
}

// Setting default values for the props of Bill
ParentStudentSpaceContent.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
ParentStudentSpaceContent.propTypes = {
  age: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  referencedNumber: PropTypes.string.isRequired,
  contactNumber: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};

export default ParentStudentSpaceContent;
