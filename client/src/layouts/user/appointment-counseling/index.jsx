//link
import { useLocation, Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import Stack from "@mui/material/Stack";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/user/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/user/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/user/dashboard/components/Projects";
import OrderOverview from "layouts/user/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/user/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/user/dashboard/data/gradientLineChartData";
import styled from "./../../../examples/Sidenav/SidenavRoot";

//Cards
import Card from "@mui/material/Card";
import SoftButton from "../../../components/SoftButton/index";
import CurrentScheduleCard from "./Components/CurrentSchedule";
import BlogCard from "./Components/BlogCard";
import ScheduleList from "./Components/appointment-list/appointmentList";
import Calendar from "./calendar.jsx";
import CreateAppointmentLayout from "./Components/CreateAppointmentLayout";

import { Row } from "jspdf-autotable";
import { useEffect, useState } from "react";
import { isLoggedIn } from "helpers/helpers";
import axios from "axios";
import { getCookie } from "helpers/CookieHelper";
import dayjs from "dayjs";
import Preloader from "PreLoader";

var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)

function Dashboard() {
  var formData = new FormData();

  const [appointments, setAppointments] = useState([]);

  const [latestAppointment, setLatestAppointment] = useState("");
  const [latestAppointmentRefNum, setLatestAppointmentRefNum] = useState("");
  const [latestAppointmentDate, setLatestAppointmentDate] = useState("");
  const [latestAppointmentTime, setLatestAppointmentTime] = useState("");
  const [appointmentAvailable, setappointmentAvailable] = useState(false);
  const [appEvents, setAppEvents] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    }
  });

  useEffect(() => {
    formData.append("email", getCookie("email"));

    axios
      .post(localStorage.getItem("samwonAPI") + `/api/Appointment/GetUserAppointment`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        },
      })
      .then((response) => {
        // Display the response data in the console

        const app = [];
        const event = [];

        var ax = 0;
        if (response.data != "") {
          for (let x = 0; x < response.data.length; x++) {
            const element = dayjs(response.data[x]["schedule"], "DD/MM/YYYY hh:mm:ss a").format(
              "YYYY-MM-DD"
            );

            if (
              element >= dayjs().format("YYYY-MM-DD") &&
              latestAppointmentDate == "" &&
              response.data[x]["status"] != "Cancelled" &&
              response.data[x]["Status"] != "Archived"
            ) {
              setLatestAppointmentRefNum(response.data[x]["referenceNumber"] + "");
              setLatestAppointment(response.data[x]);
              setLatestAppointmentDate(dayjs(response.data[x]["schedule"], "DD/MM/YYYY hh:mm:ss a").format("MMMM DD, YYYY"))
              setLatestAppointmentTime(dayjs(response.data[x]["schedule"], "DD/MM/YYYY hh:mm:ss a").format("hh:mm a") + "-" + dayjs(response.data[x]["scheduleEnd"], "DD/MM/YYYY hh:mm:ss a").format("hh:mm a"))
              setappointmentAvailable(true);
              ax = x;
            }
          }
          console.log("Appointments")
          console.log(response.data)

          response.data.forEach((row) => {
            const rowDate = dayjs(row["schedule"], "D/MM/YYYY hh:mm:ss a").format("MMMM DD, YYYY");
            const rowDateRaw = dayjs(row["schedule"], "D/MM/YYYY hh:mm:ss a").format("YYYY-MM-DD");
            const rowTimeStart= dayjs(row["schedule"], "D/MM/YYYY hh:mm:ss a").format("hh:mm a");
            const rowTimeEnd = dayjs(row["scheduleEnd"], "D/MM/YYYY hh:mm:ss a").format("hh:mm a");

            app.push({
              id: row["id"],
              refNum: row["referenceNumber"].toString(),
              appointmentScheduleDate: rowDate,
              appointmentScheduleTime: rowTimeStart + "-" + rowTimeEnd,
              status: row["status"],
            });

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

            if(row["status"] != "Cancelled" && row["status"] != "Archived"){
              event.push({
                refNum: row["id"],
                start: rowDateRaw,
                textColor: textColor,
                backgroundColor: bgColor,
              });
            }
          });

          setAppEvents(event);
          setAppointments(app);

          setisLoading(false);
        } else {
          setisLoading(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return  isLoading ? (
    <Preloader />
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12} sm={12}>
            <Grid item lg={3} md={12} sm={12} xs={12} spacing={2}>
              <CreateAppointmentLayout
                RN={" " + latestAppointmentRefNum}
                Date={" " + latestAppointmentDate}
                Time={" " + latestAppointmentTime}
                Modality={" " + latestAppointment["modality"]}
                Status={" " + latestAppointment["status"]}
                NewAppointments={appointmentAvailable}
                Link={latestAppointmentRefNum}
              />
            </Grid>
            <Grid item lg={9} md={12} sm={12} xs={12} spacing={2}>
              <Card sx={{ paddingX: "2rem", paddingBottom: "2rem" }} id="userAppointment">
                <Calendar Events={appEvents} />
              </Card>
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12} sm={12}>
          <Grid item lg={12} md={12} sm={12} xs={12} spacing={2} >
            <ScheduleList SchedList={appointments} IsLoading={isLoading} />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
