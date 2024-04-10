// @mui material components
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import swal from "sweetalert";
import Preloader from "PreLoader";

import { isLoggedIn } from "helpers/helpers";
import { getCookie } from "helpers/CookieHelper";
import { Button, Card, Modal, Typography, useMediaQuery } from "@mui/material";
import Calendar from "./calendar";
import SoftButton from "components/SoftButton";
import AppointmentCard from "./components/AppointmentCard";
import PreRecordKeeping from "../record-keeping/admin-record-keeping/PreRecordKeeping";
// import HistoryRecordKeeping from "../record-keeping/historyListLayout/historyList";
import VsetComponent from "./components/VSETComponent";
import DashboardReportRecords from "./components/DashboardReportRecords";
import SamWonGreat from "assets/images/logos/Artboard 5.png";
import axios from "axios";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import UserList from "../record-keeping/admin-record-keeping/component/UserList";
import noAppointment from "assets/images/Date picker-bro.svg";
import IncomingAdminAppointments from "../appointment-admin/component/IncomingAdminAppointments";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);



function Dashboard() {
  const [isAdmin, setIsAdmin] = useState();
  const [incomingApp, setIncomingApp] = useState([]);
  const [userAppList, setUserAppList] = useState([]);
  const [open, setShowUpcomingEvents] = useState(false);
  const handleOpen = () => setShowUpcomingEvents(true);
  const handleClose = () => setShowUpcomingEvents(false);
  const [openPending, setShowPendingEvents] = useState(false);
  const handleOpenPending = () => setShowPendingEvents(true);
  const handleClosePending = () => setShowPendingEvents(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [approvedCount, setApprovedCount] = useState(0);

  const isSmallScreen = useMediaQuery("(min-width:1280px)");

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };
  


  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    }
  });
  
  //Preloader
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate some asynchronous data loading
    const fetchData = async () => {
      console.log(getCookie("role"));

      if (getCookie("role") == "Admin" || getCookie("role") == "Professional") {
        setIsAdmin(true);
        const formData = new FormData();

        await axios
          .get(localStorage.getItem("samwonAPI") + `/api/Appointment/GetAppointment`)
          .then((response) => {
            // Display the response data in the console

            const app = [];
            const event = [];
            const approvedEvent = [];
            const pendingEvent = [];

            if (response.data != "") {
              //console.log(response.data)

              response.data.forEach((row) => {
                const rowDate = dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format(
                  "MMMM DD, YYYY"
                );
                const rowDateRaw = dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format(
                  "YYYY-MM-DD"
                );
                const rowTimeStart = dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format(
                  "hh:mm a"
                );
                const rowTimeEnd = dayjs(row["scheduleEnd"], "DD/MM/YYYY hh:mm:ss a").format(
                  "hh:mm a"
                );
                var color = "";

                switch (row["status"]) {
                  case "Pending":
                    color = "#0d6efd";
                    break;
                }

                if (
                  (row["status"] == "Approved" ||
                    row["status"] == "Rescheduled" ||
                    row["status"] == "Pending") &&
                  rowDateRaw > dayjs().format("YYYY-MM-DD") + 1
                ) {
                  app.push({
                    id: row["id"],
                    pic: row["picture"],
                    email: row["email"],
                    role: row["role"],
                    refNum: "RF#" + row["id"].toString(),
                    appDate: rowDate,
                    appTime: rowTimeStart + "-" + rowTimeEnd,
                    status: row["status"],
                  });
                }

                var textColor = "";
                var bgColor = "";

                if (row["status"] == "Pending" || row["status"] == "Rescheduled") {
                  textColor = "white";
                  bgColor = "#0d6efd";
                } else if (row["status"] == "Approved") {
                  textColor = "white";
                  bgColor = "#198754";
                } else if (row["status"] == "Activity") {
                  textColor = "white";
                  bgColor = "#ffa31a";
                } else {
                  textColor = "white";
                  bgColor = "black";
                }

                if (
                    row["status"] == "Approved" ||
                    row["status"] == "Rescheduled" ||
                    row["status"] == "Pending" ||
                    row["status"] == "Activity"
                  )
                {
                  event.push({
                    refNum: row["id"],
                    start: rowDateRaw,
                    backgroundColor: bgColor,
                  });
                }

                if(
                  parseInt(dayjs().format("YYYYMMDD")) < parseInt(dayjs(rowDateRaw).format("YYYYMMDD"))
                ){
                  if(row["status"] == "Approved"){
                    approvedEvent.push(row);
                  } else if (row["status"] == "Pending") {
                    pendingEvent.push(row);
                  }
                }

              });

              //console.log(event);

              app.reverse();
              app.splice(4, 100);

              setUserAppList(event);
              setIncomingApp(app);
              //setAppointments(app);

              console.log(pendingEvent);
              console.log(approvedEvent)
              setPendingCount(pendingEvent.length);
              setApprovedCount(approvedEvent.length);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setIsAdmin(false);

        const formData = new FormData();

        formData.append("email", getCookie("email"));

        await axios
          .post(
            localStorage.getItem("samwonAPI") + `/api/Appointment/GetUserAppointment`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + getCookie("user_token"),
              },
            }
          )
          .then((response) => {
            // Display the response data in the console

            const app = [];
            const event = [];

            if (response.data != "") {
              //console.log(response.data)

              response.data.forEach((row) => {
                const rowDate = dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format(
                  "MMMM DD, YYYY"
                );
                const rowDateRaw = dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format(
                  "YYYY-MM-DD"
                );
                const rowTimeStart = dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format(
                  "hh:mm a"
                );
                const rowTimeEnd = dayjs(row["scheduleEnd"], "DD/MM/YYYY hh:mm:ss a").format(
                  "hh:mm a"
                );
                var color = "";

                switch (row["status"]) {
                  case "Pending":
                    color = "#0d6efd";
                    break;
                }

                if (
                  (row["status"] == "Approved" ||
                    row["status"] == "Rescheduled" ||
                    row["status"] == "Pending") &&
                  rowDateRaw > dayjs().format("YYYY-MM-DD") + 1
                ) {
                  app.push({
                    id: row["id"],  
                    refNum: row["referenceNumber"].toString(),
                    appDate: rowDate,
                    appTime: rowTimeStart + "-" + rowTimeEnd,
                    status: row["status"],
                  });
                }

                var textColor = "";
                var bgColor = "";

                if (row["status"] == "Pending" || row["status"] == "Rescheduled") {
                  textColor = "white";
                  bgColor = "#0d6efd";
                } else if (row["status"] == "Approved") {
                  textColor = "white";
                  bgColor = "#198754";
                } else {
                  textColor = "white";
                  bgColor = "black";
                }

                if (row["status"] != "Cancelled" && row["status"] != "Archived"){  
                  event.push({
                    refNum: row["id"],
                    start: rowDateRaw,
                    backgroundColor: bgColor,
                  });
                }
              });

              //console.log(event);

              app.reverse();
              app.splice(4, 100);

              setUserAppList(event);
              setIncomingApp(app);
              //setAppointments(app);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    fetchData().then(() => {
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Preloader />
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      {isAdmin ? (
        <SoftBox>
          <SoftBox>
            <Grid container mb={3} spacing={3}>
              <Grid item xs={12}>
                <SoftBox
                  sx={{
                    padding: "15px",
                    height: "100%",
                    display: "flex",
                    width: "100%",
                    justifyContent: "start",
                  }}
                  className="inline-block"
                >
                  <SoftBox>
                    <b>Good Day, {getCookie("givenName")}!</b>
                    <img src={SamWonGreat} className="w-8 rounded-md inline-flex ml-2" />
                  </SoftBox>
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
          <SoftBox>
            <SoftBox mb={3}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} xl={3}> 
                 {!isSmallScreen ? (
                    <Link to="/appointments">
                      <MiniStatisticsCard
                        title={{ text: "pending" }}
                        count={approvedCount}
                        icon={{ color: "info", component: "calendar_month" }}
                      />
                    </Link>
                  ) : (
                    <SoftBox onClick={handleOpen}>
                      <MiniStatisticsCard
                        title={{ text: "pending" }}
                        count={pendingCount}
                        // percentage={{ color: "success", text: "+55%" }}
                        icon={{ color: "info", component: "event_repeat" }}
                      />
                    </SoftBox>
                  )}
                </Grid>
                <Grid item xs={12} sm={6} xl={3}>
                  {!isSmallScreen ? (
                    <Link to="/appointments">
                      <MiniStatisticsCard
                        title={{ text: "Upcoming" }}
                        count={approvedCount}
                        icon={{ color: "info", component: "calendar_month" }}
                      />
                    </Link>
                  ) : (
                    <SoftBox onClick={handleOpenPending}>
                      <MiniStatisticsCard
                        title={{ text: "Upcoming" }}
                        count={approvedCount}
                        icon={{ color: "info", component: "calendar_month" }}
                      />
                    </SoftBox>
                  )}
                </Grid>
              </Grid>
            </SoftBox>
          </SoftBox>
          
          <Grid container spacing={4} lg={12} item xs={12} xl={12} md={12}>
            <Grid item lg={12} xs={12} md={12} mb={3}>
              <Card>
                <Card sx={{ paddingX: "2rem", paddingBottom: "2rem" }}>
                  <Calendar events={userAppList} />
                </Card>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={4} lg={12} item xs={12} xl={12} md={12} mb={3}>
            <Grid item lg={8} xs={12} md={12}>
              {/* <HistoryRecordKeeping /> */}
              <Card>
                <SoftBox
                  pt={2}
                  px={2}
                  mb={3}
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
                    VSET
                  </SoftTypography>
                </SoftBox>
                <VsetComponent />
              </Card>
            </Grid>
            <Grid item lg={4} xs={12} md={12} mb={3}>
              <DashboardReportRecords />
            </Grid>
          </Grid>
        </SoftBox>
      ) : (
        // User Side

        <>
          <SoftBox>
            <SoftBox>
              <Grid container mb={3} spacing={3}>
                <Grid item xs={12}>
                  <Card
                    sx={{
                      padding: "15px",
                      height: "100%",
                      display: "flex",
                      width: "100%",
                      justifyContent: "center",
                    }}
                    className="inline-block"
                  >
                    <SoftBox>
                      <b>Good Day, {getCookie("givenName")}!</b>
                      <img src={SamWonGreat} className="w-12 rounded-md inline-flex ml-2" />
                    </SoftBox>
                  </Card>
                </Grid>
              </Grid>
            </SoftBox>
            <Grid container spacing={4} lg={12} item xs={12} xl={12} md={12}>
              <Grid item lg={8} spacing={2} xs={12} md={12}>
                <Card sx={{ height: "96.5%" }}>
                  <SoftBox
                    pt={2}
                    px={2}
                    mb={3}
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
                      Upcoming Appointment
                    </SoftTypography>
                  </SoftBox>

                  {incomingApp.length != 0 ? (
                    incomingApp.map((data, i) => (
                      <AppointmentCard
                        key={i}
                        Role="Appointment"
                        Title={data.refNum}
                        Email={getCookie("email")}
                        Date={data.appDate}
                        Time={data.appTime}
                        Status={data.status}
                        Image={getCookie("picture")}
                        redirectId={data.id}
                        userRole={getCookie("role")}
                      />
                    ))
                  ) : (
                    <SoftBox p={3}>
                      <SoftBox
                        component="img"
                        src={noAppointment}
                        alt="waves"
                        left={0}
                        width="100%"
                        height="20rem"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      />
                      <SoftTypography
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        color="info"
                        component="label"
                        variant="h6"
                      >
                        No upcoming appointment.
                      </SoftTypography>
                    </SoftBox>
                  )}
                </Card>
              </Grid>

              <Grid item lg={4} xs={12} md={12} mb={3}>
                <Card>
                  <Card sx={{ paddingX: "2rem", paddingBottom: "2rem" }}>
                    <Calendar events={userAppList} />
                  </Card>
                </Card>
              </Grid>
            </Grid>
          </SoftBox>
        </>
      )}
      {/* Modals */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SoftBox sx={style}>
          <IncomingAdminAppointments isDashboard={true} filter={"Pending"}/>
        </SoftBox>
      </Modal>
      <Modal
        open={openPending}
        onClose={handleClosePending}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SoftBox sx={style}>
          <IncomingAdminAppointments isDashboard={true} filter={"Approved"}/>
        </SoftBox>
      </Modal>
      
      

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
