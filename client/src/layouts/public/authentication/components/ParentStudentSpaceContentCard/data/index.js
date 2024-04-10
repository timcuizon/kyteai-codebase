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
import { Grid } from "@mui/material";
import ChildImage from "assets/images/child_pic.jpg";
import MaleGender from "examples/Icons/MaleGender";
import FemaleGender from "examples/Icons/FemaleGender";

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
  name,
  referencedNumber,
  age,
  gender,
  email,
  contactNumber,
  details,
  pgName,
  pgContactNumber,
  pgAddress,
  relationship,
  pgEmail
}) {
  return (
    <>
      <Grid container lg={12} spacing={2} item xs={12} sm={12} xl={12} md={12} mb={2}>
        <Grid item lg={6}>
          <Card>
            <SoftBox p={2}>
              <SoftBox display="flex" flexDirection="column" height="100%">
                <SoftBox pt={1} mb={0.5}>
                  <SoftTypography variant="h5" color="text" fontWeight="normal">
                    <b>Personal Information </b>
                  </SoftTypography>
                  <Grid container mt={2} spacing={2} item xs={12} sm={12} xl={12} w-full>
                    <Grid item lg={2} xs={4} sm={4} md={3}>
                      <SoftAvatar
                        src={ChildImage}
                        alt="profile-image"
                        variant="rounded"
                        size="xl"
                        shadow="sm"
                      />
                    </Grid>
                    <Grid item lg={5} xs={4} sm={4} md={3}>
                      <SoftTypography variant="body2" color="text" fontWeight="normal">
                        <b>Referenced Number: </b> {referencedNumber}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Name: </b>
                        {name}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Age: </b>
                        {age}
                      </SoftTypography>
                    </Grid>
                    <Grid item lg={5} xs={4} sm={4} md={4}>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Gender: </b>
                        {gender}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Contact Number: </b>
                        {contactNumber}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Email: </b>
                        {email}
                      </SoftTypography>
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>
        </Grid>
        <Grid item lg={6}>
          <Card>
            <SoftBox p={2}>
              <SoftBox display="flex" flexDirection="column" height="100%">
                <SoftBox pt={1} mb={0.5}>
                  <SoftTypography variant="h5" color="text" fontWeight="normal">
                    <b>Other Information </b>
                  </SoftTypography>
                  <Grid container mt={2} spacing={2} item xs={12} sm={12} xl={12} w-full>
                    <Grid item lg={6} xs={12} sm={12}>
                      <SoftTypography variant="body2" color="text" fontWeight="normal">
                        <b>Person to Contact: </b> {pgName}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Contact Number: </b>
                        {pgContactNumber}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Address: </b>
                        {pgAddress}
                      </SoftTypography>
                    </Grid>
                    <Grid item lg={6} xs={12} sm={12}>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Relationship </b>
                        {relationship}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Contact Number: </b>
                        {pgContactNumber}
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Email: </b>
                        {pgEmail}
                      </SoftTypography>
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>
        </Grid>
      </Grid>
      <Card mt={6}>
        <SoftBox>
          <SoftBox p={2} >
            <SoftBox display="flex" flexDirection="column" height="100%">
              <SoftTypography variant="body2" fontWeight="normal" color="text">
                <b>Report Content</b>
              </SoftTypography>
              <SoftBox display="flex" flexDirection="column" variant="body2" fontWeight="normal" color="text" p={3}>
                {details}
              </SoftBox>
              </SoftBox>
            </SoftBox>
        </SoftBox>
      </Card>
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
