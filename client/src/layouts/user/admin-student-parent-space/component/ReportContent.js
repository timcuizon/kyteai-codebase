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
import ChildImage from "assets/images/child_pic.jpg";

//Sam Won
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import MaleGender from "examples/Icons/MaleGender";
import FemaleGender from "examples/Icons/FemaleGender";
import Divider from "@mui/material/Divider";
import ReportRecords from "layouts/user/user-student-parent-space/components/report-records/data-report-records";


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
 typeReport, typeConcern, contactNumberUser, contactPerson, emailAddress, relationship, emailAddressContact,name, dateOfBirth, userContent, rfNumber, gender
}) {
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
                <Grid item lg={6} xs={12} md={12}>
                    <SoftBox
                pt={2}
                px={2}
                mb={1}
                display="flex"
                justifyContent="end"
                alignItems="end"
                >
                <SoftTypography
                    color="info"
                    component="label"
                    variant="h6"
                    fontWeight="bold"
                    
                >
                    {rfNumber}
                </SoftTypography>
                </SoftBox>
                
                </Grid>
            </Grid>
           
            <SoftBox>
              <Card>
                <Grid container spacing={4} lg={12} item sm={12} xl={12} md={12} xs={12}>
                  <Grid item lg={4} sm={12} md={12} xs={12}>
                    <SoftBox p={2}>
                      <SoftTypography variant="body2" fontWeight="normal">
                        <b>Type of Report: </b> {typeReport}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal">
                        <b>Person Involved: </b>
                        {contactPerson}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal">
                        <b>Relationship: </b>
                        {relationship}
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                  <Grid item lg={4} sm={12} md={12} xs={12}>
                    <SoftBox p={2}>
                      <SoftTypography variant="body2" fontWeight="normal">
                        <b>Type of Concern: </b> {typeConcern}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal">
                        <b>Email: </b>
                        {emailAddressContact}
                      </SoftTypography>
                    </SoftBox>
                  </Grid>
                </Grid>
                <Divider/>
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
                    <SoftBox
                    mb={2}
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
                            Personal Information
                        </SoftTypography>
                    </SoftBox>
                    <Grid container spacing={4} lg={12} item sm={12} xl={12} md={12} xs={12}>
                        <Grid item lg={3} sm={12} md={12} xs={12} display="flex"
                            justifyContent="center"
                            alignItems="center">
                            <SoftBox >     
                                <SoftAvatar
                                src={ChildImage}
                                alt="profile-image"
                                variant="rounded"
                                size="xxl"
                                shadow="sm"
                                />
                            </SoftBox>
                        </Grid>
                        <Grid item lg={5} sm={12} md={12} xs={12}
                            display="flex"
                            justifyContent="start"
                            alignItems="start">
                            <SoftBox>
                                <SoftTypography
                                
                                    color="info"
                                    component="label"
                                    variant="h6"
                                    fontWeight="bold"
                                >
                                    {name}
                                </SoftTypography>
                                <SoftTypography variant="body2" fontWeight="normal">
                                    <b>Email Address: </b> {emailAddress}
                                </SoftTypography>
                                <SoftTypography variant="body2" fontWeight="normal">
                                    <b>Contact Number: </b> {contactNumberUser}
                                </SoftTypography>
                            </SoftBox>
                        </Grid>
                        <Grid item lg={4} sm={12} md={12} xs={12}
                            display="flex"
                            justifyContent="start"
                            alignItems="start">
                            <SoftBox>
                                <SoftTypography variant="body2" fontWeight="normal">
                                    <b>Date of Birth </b>November 3, 2001
                                </SoftTypography>
                                <SoftTypography variant="body2" fontWeight="normal">
                                    <b>Gender: </b> {gender}
                                </SoftTypography>
                            </SoftBox>
                        </Grid>
                    </Grid>
                        
                    
                </SoftBox>
            </Card>
            <SoftBox mt={2}>
                <ReportRecords></ReportRecords>

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
