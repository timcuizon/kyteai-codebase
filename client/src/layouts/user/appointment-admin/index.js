// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React components
import Card from "@mui/material/Card";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Appointment page components
import Calendar from "layouts/user/appointment-admin/calendar.jsx";
// import HistoryListSchedule from "layouts/user/appointment-admin/history-list/historyList.jsx"
import AppointmentList from "layouts/user/appointment-admin/appointment-list/appointmentList.jsx";
import { useEffect, useState } from "react";
import { isLoggedIn } from "helpers/helpers";
import axios from "axios";
import { getCookie } from "helpers/CookieHelper";
import dayjs from "dayjs";
import Preloader from "PreLoader";
import IncomingAdminAppointments from "./component/IncomingAdminAppointments";
import { Icon, useMediaQuery } from "@mui/material";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const dateToday = new Date();

function AppoimentScheduleAdmin() {
  const [appointments, setAppointments] = useState([]);
  const [appoinmentEvents, setAppoinmentEvents] = useState([]);

  const [isRan, setIsRan] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width:900px)");

  useEffect(() => {
    //setIsRan(false)
    console.log("test");

    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else{
      console.log("Running");
      const formData = new FormData();

      formData.append("email", getCookie("email"));

      const headers = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        },
      };

      var appointmentFetch;

      console.log(getCookie("ie"))

      if(getCookie("ie") == "1"){
        axios.get(localStorage.getItem("samwonAPI") + `/api/Appointment/GetAppointment`)
          .then((response) => {
  
            console.log(getCookie("email"))
            console.log("getting Appointment")
            const appArray = [];
            const appEvents = [];
  
            if(typeof(response.data) != "string"){
              console.log(response.data)
              response.data.forEach((row) => {
                const rawRowDate = dayjs(row["schedule"], "DD/MM/YYYY hh:mm a").format("YYYY-MM-DD");
  
                const rowDate = dayjs(row["schedule"], "DD/MM/YYYY hh:mm a").format("MMMM DD, YYYY");
                const rowTimeStart = dayjs(row["schedule"], "DD/MM/YYYY hh:mm a").format("hh:mm a");
                const rowTimeEnd = dayjs(row["schedule"], "DD/MM/YYYY hh:mm a").format("hh:mm a");
                
                const referenceNum = row["referenceNumber"] + "";
  
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
                  (row["status"] == "Approved" ||
                    row["status"] == "Rescheduled" ||
                    row["status"] == "Pending" ||
                    row["status"] == "Activity")
                ) {
                  appEvents.push({
                    refNum: row["id"],
                    start: rawRowDate,
                    textColor: textColor,
                    backgroundColor: bgColor,
                  });
                }
                
                if(row["status"] != "Activity"){
                  appArray.push({
                    id: row["id"],
                    refNum: referenceNum,
                    picture: row["picture"],
                    role: row["role"],
                    name: row["name"],
                    email: row["email"],
                    scheduleDate: rowDate,
                    scheduleTime: rowTimeStart + "-" + rowTimeEnd,
                    status: row["status"],
                  });
                }
              });
            }
  
            setAppointments(appArray);
            setAppoinmentEvents(appEvents);
  
            setIsRan(true);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios.post(localStorage.getItem("samwonAPI") + `/api/Appointment/GetProfessionalAppointment`, formData, headers)
        .then((response) => {

          console.log(getCookie("email"))
          console.log("getting Appointment")
          const appArray = [];
          const appEvents = [];

          if(typeof(response.data) != "string"){
            console.log(response.data)
            response.data.forEach((row) => {
              const rawRowDate = dayjs(row["schedule"], "DD/MM/YYYY hh:mm a").format("YYYY-MM-DD");

              const rowDate = dayjs(row["schedule"], "DD/MM/YYYY hh:mm a").format("MMMM DD, YYYY");
              const rowTimeStart = dayjs(row["schedule"], "DD/MM/YYYY hh:mm a").format("hh:mm a");
              const rowTimeEnd = dayjs(row["schedule"], "DD/MM/YYYY hh:mm a").format("hh:mm a");
              
              const referenceNum = row["referenceNumber"] + "";

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

              if (
                (row["status"] == "Approved" ||
                  row["status"] == "Rescheduled" ||
                  row["status"] == "Pending")
              ) {
                appEvents.push({
                  refNum: row["id"],
                  start: rawRowDate,
                  textColor: textColor,
                  backgroundColor: bgColor,
                });
              }
              
              appArray.push({
                id: row["id"],
                refNum: referenceNum,
                picture: row["picture"],
                role: row["role"],
                name: row["name"],
                email: row["email"],
                scheduleDate: rowDate,
                scheduleTime: rowTimeStart + "-" + rowTimeEnd,
                status: row["status"],
              });
            });
          }

          setAppointments(appArray);
          setAppoinmentEvents(appEvents);

          setIsRan(true);
        })
        .catch((err) => {
          console.log(err);
        });
      }
          
    }
  },[]);

  return !isRan ? (
    <Preloader />
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox>
        <SoftBox>
          <Grid container spacing={4} lg={12} item xs={12} xl={12} md={12}>
            <Grid item lg={7} xs={12} md={12}>
              <Card id="delete-account" sx={{ padding: "2rem" }} style={{ marginBottom: "20px" }}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <SoftTypography
                    color="info"
                    component="label"
                    variant="h6"
                    fontWeight="bold"
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                  >
                    Calendar
                  </SoftTypography>
                </SoftBox>

                <SoftBox>
                  <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
                    <Calendar Events={appoinmentEvents}/>
                  </SoftBox>
                </SoftBox>
              </Card>
            </Grid>
            
            <Grid item lg={5} xs={12} md={12}>
              <IncomingAdminAppointments/>
            </Grid>
          </Grid>

          <AppointmentList Appointments={appointments} />
        </SoftBox>
        
      </SoftBox>
    </DashboardLayout>
  );
}

export default AppoimentScheduleAdmin;
