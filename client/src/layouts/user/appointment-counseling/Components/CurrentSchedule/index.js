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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/Sam-Won-Standing.png";
import samwonlogo from "assets/images/logos/samwon-logo.png";

//SoftButton
import SoftButton from "components/SoftButton";

function CurrentScheduleCard() {

  
  const [appointmentList, setAppointmentList] = useState('');
  const [appArray, setAppArray] = useState([]);
  const [activeAppointment, setActiveAppointment] = useState(false);

  const [refNum, setRefNum] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [modality, setModality] = useState('');
  const [concern, setConcern] = useState('');
  const [otherInfo, setInfo] = useState('');

  const fetchStudentRecord = async () => {
    try {
      const response = await axios.get(localStorage.getItem("samwonAPI") + '/api/Appointment/GetSchedules');

      if (response.data !== "") {
        // Success return
        setAppointmentList(response.data);
        console.log("Fetched Data")
      } else {
        console.log("No Records")
      }
    } catch (error) {
      // Handle the error response
      if (error.response) {
        // The server responded with an error status code (e.g., 400, 404, 500, etc.)
        console.error("Error fetching data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something else went wrong
        console.error("Error fetching data:", error.message);
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      fetchStudentRecord();
    }
  }, []);

  useEffect(() => {
    console.log(appointmentList.length)
    var app = appointmentList[appointmentList.length-1];

    if(appointmentList.length > 0){
      setRefNum(app["referenceNumber"])
      setEmail(app["email"])
      setName(app["givenName"])
      setDob(dayjs(app["dob"]).format("MMMM DD, YYYY"))
      setGender(app["gender"])
      setContactNo(app["contactNumber"])
      setAppointmentDate(dayjs(app["appointmentDate"]).format("MMMM DD, YYYY"))
      console.log(app["appointmentTime"].toString());
      setAppointmentTime(dayjs('1/1/1 ' + app["appointmentTime"].toString()).format("hh:mm a"))
      switch(app["modalityTypeId"]){
        case 1:
          setModality("Face-to-Face")
          break;
        case 2:
          setModality("Google Meet")
          break;
      }
      switch(app["concernTypeId"]){
        case 2:
          setConcern("Facility")
          break;
        case 5:
          setConcern("Academic")
          break;
        case 6:
          setConcern("Service")
          break;
      }
      setInfo(app["otherInfo"])
      //setActiveAppointment(true);
    }
  }, [appointmentList])

  function handleFormSwitch(){
    if(!activeAppointment){
      window.location.replace("/appointment-counseling/schedule-form");
    }
  }

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Card>
      <SoftBox p={2}>
        <Grid container spacing={2} p={2}>
          <SoftBox
            display="flex"
            flexDirection="row"
            height="100%"
            bgColor="info"
            variant="contained"
            p={2}
            borderRadius="lg"
            color="white"
          >
            <Grid container item xs={12} lg={12} flexDirection="column">
              {/* Refference Number */}
              <SoftBox pt={1} mb={0.5}>
                <SoftTypography variant="h5" fontWeight="bold" color="white">
                  Ref#: AP1234585
                </SoftTypography>
              </SoftBox>
              {/* Councilor's Name */}
              <SoftTypography variant="body2" color="white" fontWeight="regular">
                Councilor: Dr. John Quintal
              </SoftTypography>

              {/* Date and Time */}
              <SoftBox>
                <SoftTypography variant="body2" color="white">
                  Date: October 4, 2023
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={6}>
                <SoftTypography variant="body2" color="white">
                  Session Time: 1:00 pm - 2:30 pm
                </SoftTypography>
              </SoftBox>

              {/* Modality */}
              <SoftBox display="flex" alignItems="center" sx={{ mb: "5px" }}>
                <Icon sx={{ mr: "5px" }} color="white">
                  videocam
                </Icon>

                <a className="meet-link" href="https://meet.google.com/sbd-fqbg-ooy">
                  meet.google.com/sbd-fqbg-ooy
                </a>
              </SoftBox>
              <SoftBox bgColor="info" variant="contained" p={2} borderRadius="lg">
                <Grid container direction="row" justifyContent="flex-start" alignItems="center">
                  <Grid item p={0.5}>
                    <Link to="/appointment-counseling/schedule-form">
                      <SoftButton variant="contained" color="colorISMyellow" size="small">
                        Create Appointment
                      </SoftButton>
                    </Link>
                  </Grid>
                  <Grid item p={0.5}>
                    <SoftButton
                      variant="contained"
                      color="colorISMyellow"
                      size="small"
                      onClick={handleClickOpen}
                    >
                      View Appointment
                    </SoftButton>
                  </Grid>
                </Grid>
              </SoftBox>
            </Grid>

            <Grid item lg={4}>
              <SoftBox
                component="img"
                src={rocketWhite}
                alt="rocket"
                width="100%"
              />
            </Grid>
          </SoftBox>
          {/* <Grid item xs={12} lg={5} sx={{ position: "relative", ml: "auto" }}>
            <SoftBox
              height="100%"
              display="grid"
              justifyContent="center"
              alignItems="center"
              bgColor="info"
              borderRadius="lg"
              variant="gradient"
            >
              <SoftBox
                component="img"
                src={wavesWhite}
                alt="waves"
                display="block"
                position="absolute"
                left={0}
                width="100%"
                height="100%"
              />
              <SoftBox
                component="img"
                src={rocketWhite}
                alt="rocket"
                width="100%"
                sx={{ width: "200px" }}
              />
            </SoftBox>
          </Grid> */}
        </Grid>
      </SoftBox>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth={"lg"}
      >
        <DialogContent>
          <SoftBox
            variant="contained"
            bgColor="info"
            size=""
            height="10rem"
            p={3}
            alignItems="center"
            display="flex"
          >
            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12} alignItems="center">
              <Grid item lg={4} md={12} sm={12} xs={12}>
                <SoftBox display="flex" justifyContent="flex-end">
                  <img src={samwonlogo} alt="samwonlogo" width="30%" />
                </SoftBox>
              </Grid>
              <Grid item lg={8} md={12} sm={12} xs={12}>
                <SoftBox>
                  <SoftTypography color="white" component="label" variant="h4" fontWeight="bold">
                    Sam Won Guidance Counceling Tool
                  </SoftTypography>
                </SoftBox>
                <hr width="100%" color="white" size="50px" />
                <SoftBox>
                  <SoftTypography color="white" component="label" variant="h5" fontWeight="bold">
                    Appointment Summary
                  </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
          <SoftBox>
            {/* FORM  */}
            <form action="" id="set-up-profile-form" method="post">
              <Card>
                <SoftBox position="relative" height="100%" p={2}>
                  <SoftBox
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    py={2}
                    borderRadius="lg"
                  >
                    <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <SoftBox mb={1}>
                          <SoftTypography
                            color="info"
                            component="label"
                            variant="h5"
                            fontWeight="bold"
                          >
                            Reference: AP1234585
                          </SoftTypography>
                        </SoftBox>
                      </Grid>

                      <Grid item lg={6} md={12} sm={12} xs={12}>
                        <SoftBox mb={1} display="flex" justifyContent="flex-end">
                          <SoftTypography variant="button">
                            <Icon>download</Icon>&nbsp;
                          </SoftTypography>
                        </SoftBox>
                      </Grid>
                    </Grid>
                    <hr width="100%" color="green" size="50px" />

                    <SoftBox>
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        User Type
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox mb={1} className="w-[90%]">
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        Student
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox>
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Email Address
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox mb={1} className="w-[90%]">
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        johnsmithdoe@gmail.com
                      </SoftTypography>
                    </SoftBox>

                    <SoftBox>
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="caption"
                        fontWeight="normal"
                      >
                        Name
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox mb={1} className="w-[90%]">
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        John Smith Doe
                      </SoftTypography>
                    </SoftBox>

                    <SoftBox>
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Date of Birth
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox mb={1} className="w-[90%]">
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        November 2, 2002
                      </SoftTypography>
                    </SoftBox>

                    <SoftBox>
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Gender
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox mb={1} className="w-[90%]">
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        Male
                      </SoftTypography>
                    </SoftBox>

                    <SoftBox className="w-[90%]">
                      <SoftBox>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Contact Number
                        </SoftTypography>
                      </SoftBox>
                    </SoftBox>
                    <SoftBox mb={1} className="w-[90%]">
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        093232112423
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox className="w-[90%]">
                      <SoftBox>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Date of Appointment
                        </SoftTypography>
                      </SoftBox>
                    </SoftBox>
                    <SoftBox mb={1} className="w-[90%]">
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        November 23, 2023
                      </SoftTypography>
                    </SoftBox>

                    <SoftBox className="w-[90%]">
                      <SoftBox>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Appointment Time
                        </SoftTypography>
                      </SoftBox>
                    </SoftBox>
                    <SoftBox mb={1} className="w-[90%]">
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        3:05pm
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox className="w-[90%]">
                      <SoftBox>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Date of Appointment
                        </SoftTypography>
                      </SoftBox>
                    </SoftBox>
                    <SoftBox className="w-[90%]">
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        November 23, 2023
                      </SoftTypography>
                    </SoftBox>

                    <SoftBox className="w-[90%]">
                      <SoftBox>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Type of Modality
                        </SoftTypography>
                      </SoftBox>
                    </SoftBox>
                    <SoftBox mb={1} className="w-[90%]">
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        Face to Face
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox className="w-[90%]">
                      <SoftBox>
                        <SoftTypography component="label" variant="caption" fontWeight="bold">
                          Type of concern
                        </SoftTypography>
                      </SoftBox>
                    </SoftBox>
                    <SoftBox mb={1} className="w-[90%]">
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        Academic
                      </SoftTypography>
                    </SoftBox>

                    <SoftBox mb={1}>
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="caption"
                        fontWeight="bold"
                      >
                        Other Information
                      </SoftTypography>
                    </SoftBox>

                    <SoftBox mb={1}>
                      <SoftTypography
                        color="dark"
                        component="label"
                        variant="h5"
                        fontWeight="normal"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </SoftTypography>
                    </SoftBox>
                  </SoftBox>
                </SoftBox>
              </Card>
            </form>
          </SoftBox>
        </DialogContent>
        <DialogActions>
          <SoftBox mr={4}>
            <SoftButton color="info" onClick={handleClose}>
              Close
            </SoftButton>
          </SoftBox>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

export default CurrentScheduleCard;
