//link
import { useLocation, Link } from "react-router-dom";

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

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
import styled from "../../../examples/Sidenav/SidenavRoot";

//Cards
import Card from "@mui/material/Card";
import SoftButton from "components/SoftButton/index";
import CurrentScheduleCard from "layouts/user/appointment-counseling/Components/CurrentSchedule";
import BlogCard from "layouts/user/appointment-counseling/Components/BlogCard";
import ScheduleList from "layouts/user/appointment-counseling/Components/ScheduleList";
import DemoProfile from "layouts/user/user-student-parent-space/components/demo-profile";
import ReportRecords from "layouts/user/user-student-parent-space/components/report-records/data-report-records";
import { ForkRight } from "@mui/icons-material";
import { getCookie } from "helpers/CookieHelper";
// import Invoices from "layouts/user/user-student-parent-space/components/report-records/data-report-records";

function UserStudentParentSpace() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Grid container spacing={2}>
        <Grid item lg={9}>
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <Card>
                <DemoProfile />
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={3} md={12} sm={12} xs={12}>
          <SoftBox>
            <SoftTypography>
              <ReportRecords email={getCookie("email")} />
            </SoftTypography>
          </SoftBox>
        </Grid>
      </Grid>
      <Footer />
    </DashboardLayout>
  );
}

export default UserStudentParentSpace;
