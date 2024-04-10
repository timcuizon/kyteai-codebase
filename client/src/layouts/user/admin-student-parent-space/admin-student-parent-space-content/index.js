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

// Dashboard layout components
import ReportContent from "layouts/user/admin-student-parent-space/component/ReportContent.js";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ReportContent
        typeReport="Bullying again"
        typeConcern=" Bullying "
        contactNumberUser="039203020123"
        contactPerson="Fund Doe"
        relationship="Father"
        emailAddressContact="john@example.com"
        // Personal Infor
        name="John Doe"
        dateOfBirth="November 2, 2011"
        contactPersonNumber="09297382923"
        userContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Fermentum posuere urna nec tincidunt praesent semper feugiat. Facilisis magna etiam tempor orci eu lobortis elementum nibh. Massa placerat duis ultricies lacus sed. Vitae nunc sed velit dignissim sodales. Nibh venenatis cras sed felis eget velit aliquet sagittis id. Convallis posuere morbi leo urna molestie at elementum. Sodales ut etiam sit amet. Bibendum arcu vitae elementum curabitur vitae nunc. Molestie at elementum eu facilisis sed odio morbi quis commodo. Ut tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Nulla facilisi nullam vehicula ipsum a arcu cursus vitae congue.
                   Elementum facilisis leo vel fringilla est ullamcorper. Mattis ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Aliquet lectus proin nibh nisl condimentum id venenatis. Diam ut venenatis tellus in metus. Pellentesque habitant morbi tristique senectus et netus et malesuada. Aliquam etiam erat velit scelerisque in. Ut faucibus pulvinar elementum integer enim neque volutpat ac. A iaculis at erat pellentesque adipiscing. Enim tortor at auctor urna nunc. Fringilla ut morbi tincidunt augue interdum velit. Pulvinar pellentesque habitant morbi tristique senectus et. Nunc eget lorem dolor sed viverra ipsum nunc. Tellus orci ac auctor augue mauris augue neque gravida. Sed sed risus pretium quam vulputate dignissim suspendisse in est."
        emailAddress="doe@example.com"
        address="B90 lot 34 BGC Taguig City"
        rfNumber="1234-3212-123"
        gender="Male"
      />
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
