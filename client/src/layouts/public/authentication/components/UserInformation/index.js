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
import 'react-quill/dist/quill.snow.css';
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
import { useState } from 'react';
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

function UserInformation({
  name,
  ticket,
  age,
  gender,
  email,
  appointmentDate,
  appointmentTime,
  status,
  noGutter,
}) {
  const [openApproval, setOpenApproval] = React.useState(false);
  const handleOpenApproval = () => setOpenApproval(true);
  const handleCloseApproval = () => setOpenApproval(false);

  const [openReschedule, setOpenReschedule] = React.useState(false);
  const handleOpenReschedule = () => setOpenReschedule(true);
  const handleCloseReschedule = () => setOpenReschedule(false);

  const [openDecline, setOpenDecline] = React.useState(false);
  const handleOpenDecline = () => setOpenDecline(true);
  const handleCloseDecline = () => setOpenDecline(false);

  const [openCancel, setOpenCancel] = React.useState(false);
  const handleOpenCancel = () => setOpenCancel(true);
  const handleCloseCancel = () => setOpenCancel(false);

  const [openFollowUp, setOpenFollowUp] = React.useState(false);
  const handleOpenFollowUp = () => setOpenFollowUp(true);
  const handleCloseFollowUp = () => setOpenFollowUp(false);

  const [noteValue, setNoteValue] = useState('');

  return (
    <>
      {/* <SoftBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor="grey-100"
        borderRadius="lg"
        p={3}
        mb={noGutter ? 0 : 1}
        mt={2}
      > */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
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
                    <Grid item lg={3} xs={4} sm={4} md={3}>
                      <SoftTypography variant="body2" color="text" fontWeight="normal">
                        <b>Referenced Number: </b> 2646165161
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Name: </b>
                        Timothy
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Age: </b>
                        31
                      </SoftTypography>
                    </Grid>
                    <Grid item lg={3} xs={4} sm={4} md={4}>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Gender: </b>
                        Male
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Contact Number: </b>
                        6816468489
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Email: </b>
                        email@email.com
                      </SoftTypography>
                    </Grid>
                    <Grid item lg={4} xs={4} sm={4} md={4}>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Date: </b>
                        10/13/2023
                      </SoftTypography>
                      <SoftTypography variant="body2" fontWeight="normal" color="text">
                        <b>Time: </b>
                        5:11AM
                      </SoftTypography>
                    </Grid>
                  </Grid>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </Card>
          {/* <Card width="100%" display="flex" flexDirection="column">
            <SoftBox
              width="100%"
              display="grid"
              justifyContent="space-between"
              flexDirection={{ sm: "column" }}
              sx={{ mb: "10px", pl:"10px"}}
              alignItems="left"
            
            >
              <Grid container spacing={3}>
                <Grid item flexDirection={{lg:"column"}}>
                  <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
                    {name}
                  </SoftTypography>
                  <SoftTypography variant="button" fontWeight="light" textTransform="capitalize">
                    Ticket: {ticket} - {status}
                  </SoftTypography>
                  <SoftTypography variant="caption" color="text">
                    Age:&nbsp;&nbsp;&nbsp;
                    <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                      {age}
                    </SoftTypography>
                  </SoftTypography>
                </Grid>
              </Grid>
              <SoftTypography variant="caption" color="text">
                Gender:&nbsp;&nbsp;&nbsp;
                <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                  {gender}
                </SoftTypography>
              </SoftTypography>
              <SoftTypography variant="caption" color="text">
                Email Address:&nbsp;&nbsp;&nbsp;
                <SoftTypography variant="caption" fontWeight="medium">
                  {email}
                </SoftTypography>
              </SoftTypography>
              <SoftTypography variant="caption" color="text" fontWeight="bold" sx={{mt:"5px"}}>
                Appointment Details
              </SoftTypography>
              <SoftTypography variant="caption" color="text">
                Date:&nbsp;&nbsp;&nbsp;
                <SoftTypography variant="caption" fontWeight="medium">
                  {appointmentDate}
                </SoftTypography>
              </SoftTypography>
              <SoftTypography variant="caption" color="text">
                Time:&nbsp;&nbsp;&nbsp;
                <SoftTypography variant="caption" fontWeight="medium">
                  {appointmentTime}
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </Card> */}
        </Grid>
        <Grid item lg={12}>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row", lg: "row-reverse" }}
            mb={2}
          >
            <SoftBox
              display="flex"
              alignItems="center"
              py={{ xs: 1 }}
              // style={{ border: "1px solid #d3d3d3" }}
              borderRadius={10}
              // mt={{ xs: 2, sm: 0 }}
              // ml={{ xs: -3, sm: 0 }}
            >
              <SoftBox>
                <SoftButton variant="text" color="action" onClick={handleOpenApproval}>
                  <Icon>checkcircle</Icon>&nbsp;approve
                </SoftButton>
              </SoftBox>
              <SoftBox>
                <SoftButton variant="text" color="dark" onClick={handleOpenReschedule}>
                  <Icon>restore</Icon>&nbsp;reschedule
                </SoftButton>
              </SoftBox>
              <SoftButton variant="text" color="dark" onClick={handleOpenDecline}>
                <Icon>block</Icon>&nbsp;decline
              </SoftButton>
              <SoftButton variant="text" color="error" onClick={handleOpenCancel}>
                <Icon>delete</Icon>&nbsp;cancel
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </Grid>

        {/* </SoftBox> */}
        <Grid item xs={12} lg={12} sx={{ position: "relative", ml: "auto"}} >
  
          {/* <SoftInput
            placeholder="Add notes about this appointment...
            "
            multiline
            rows={15}
            style={{ border: "1px solid #d3d3d3" }}
            sx={{ my: "10px" }}
          /> */}
          <Card boxShadow="inset" sx={{ p:"10px"}}>
            <ReactQuill 
              theme="snow" 
              value={noteValue} 
              onChange={setNoteValue}
              className="block p-2.5 w-full h-[90%]"
              sx={{rows:"15"}}
              multiline
              rows={15}
              
            />
          </Card>
          {/* <SoftInput
            placeholder="Add key notes about this appointment...
            "
            multiline
            rows={5}
            style={{ border: "1px solid #d3d3d3" }}
            sx={{ my: "10px" }}
          />
          <SoftInput
            placeholder="Conclusion about this appointment...
            "
            multiline
            rows={5}
            style={{ border: "1px solid #d3d3d3" }}
            sx={{ my: "10px" }}
          /> */}
          <SoftBox mt={3} ml={{ xs: -1.5, sm: 0 }}>
            <SoftButton variant="text" color="warning" onClick={handleOpenFollowUp}>
              <Icon>add</Icon>&nbsp;Create a Follow-Up Appointment
            </SoftButton>
          </SoftBox>
        </Grid>
      </Grid>
      {/* Approved Modal */}
      <Modal
        open={openApproval}
        onClose={handleCloseApproval}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SoftBox sx={style} borderRadius="lg" alignItems="center">
          <SoftTypography id="modal-modal-title" variant="h6" component="h2">
            APPOINTMENT {ticket} APPROVED
          </SoftTypography>
          <SoftTypography id="modal-modal-description" sx={{ mt: 2 }}>
            {name} will recieve a notification
          </SoftTypography>
          <SoftButton variant="text" color="error" onClick={handleCloseApproval}>
            Close
          </SoftButton>
        </SoftBox>
      </Modal>
      {/* Reschedule Modal */}
      <Modal
        open={openReschedule}
        onClose={handleCloseReschedule}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SoftBox sx={style} borderRadius="lg" alignItems="center">
          <SoftTypography id="modal-modal-title" variant="h6" component="h2">
            Select reschedule date and time
          </SoftTypography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              orientation="landscape"
              slotProps={{
                actionBar: {
                  actions: ["today", "accept"],
                },
              }}
            />
          </LocalizationProvider>
          <SoftButton variant="text" color="error" onClick={handleCloseReschedule}>
            Close
          </SoftButton>
        </SoftBox>
      </Modal>
      {/* Approved Modal */}
      <Modal
        open={openDecline}
        onClose={handleCloseDecline}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SoftBox sx={style} borderRadius="lg" alignItems="center">
          <SoftTypography id="modal-modal-title" variant="h6" component="h2">
            APPOINTMENT {ticket} DECLINED
          </SoftTypography>
          <SoftTypography id="modal-modal-description" sx={{ mt: 2 }}>
            {name} will recieve a notification
          </SoftTypography>
          <SoftButton variant="text" color="error" onClick={handleCloseDecline}>
            Close
          </SoftButton>
        </SoftBox>
      </Modal>
      {/* Approved Modal */}
      <Modal
        open={openCancel}
        onClose={handleCloseCancel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SoftBox sx={style} borderRadius="lg" alignItems="center">
          <SoftTypography id="modal-modal-title" variant="h6" component="h2">
            APPOINTMENT {ticket} CANCELLED
          </SoftTypography>
          <SoftTypography id="modal-modal-description" sx={{ mt: 2 }}>
            {name} will recieve a notification
          </SoftTypography>
          <SoftButton variant="text" color="error" onClick={handleCloseCancel}>
            Close
          </SoftButton>
        </SoftBox>
      </Modal>
      {/* Follow Up Modal */}
      <Modal
        open={openFollowUp}
        onClose={handleCloseFollowUp}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SoftBox sx={style} borderRadius="lg" alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDateTimePicker
              orientation="landscape"
              slotProps={{
                actionBar: {
                  actions: ["today", "accept"],
                },
              }}
            />
          </LocalizationProvider>
          <SoftButton variant="text" color="error" onClick={handleCloseFollowUp}>
            Close
          </SoftButton>
        </SoftBox>
      </Modal>
    </>
  );
}

// Setting default values for the props of Bill
UserInformation.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
UserInformation.propTypes = {
  ticket: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  appointmentDate: PropTypes.string.isRequired,
  appointmentTime: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default UserInformation;
