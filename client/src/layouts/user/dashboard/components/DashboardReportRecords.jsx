// @mui material components
import Card from "@mui/material/Card";
import Pagination from "@mui/material/Pagination";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Billing page components
import ReportRecords from "./ReportRecords";
import { useEffect, useState } from "react";
import { getCookie } from "helpers/CookieHelper";
import axios from "axios";
//Helpers
import { isLoggedIn } from "helpers/helpers";
import Preloader from "PreLoader";

const RECORDS_PER_PAGE = 5;

function DashboardReportRecords() {
  const [isLoading, setIsLoading] = useState(true);
  const [reportRecords, setReportRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      //Fetch all students
      console.log("Fetching");
      // Fetch all reports
      fetchAllReports();
    }
  }, []);

  //Request to fetch all the active students
  async function fetchAllReports() {
    try {
      setIsLoading(true);
      // Web service for getting the drawing details
      const url =
        localStorage.getItem("samwonAPI") + `/api/User_StudentParent_Space/GetAllReportRecords`;

      const formData = new FormData();

      // Define your headers here with JWT Claims
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        },
      };
      try {
        await axios
          .post(url, formData, {
            ...config, // Include other configuration options if needed
          })
          .then((response) => {
            // Assuming the response data structure is an array of users
            console.log(response.data);
            setReportRecords(response.data.users);
            setIsLoading(false);
          });
      } catch (error) {
        console.log("Error: " + error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const renderReportRecords = () => {
    if (!Array.isArray(reportRecords) || reportRecords.length === 0) {
      return (
        <SoftBox mt={0.25} mr={1} mb={0.25} borderRadius="lg">
          <SoftTypography variant="body2" color="textSecondary">
            All clear! No records for you at this time.
          </SoftTypography>
        </SoftBox>
      );
    }

    // Get current page records
    const startIndex = (currentPage - 1) * RECORDS_PER_PAGE;
    const currentRecords = reportRecords.slice(startIndex, startIndex + RECORDS_PER_PAGE);

    return currentRecords.map((reportRecord) => (
      <ReportRecords
        key={reportRecord.id}
        date={reportRecord.created_at}
        category={reportRecord.type_of_Concern}
        concern={reportRecord.type_of_Report}
      />
    ));
  };

  // Calculate total pages
  const totalPages = Math.ceil(
    (Array.isArray(reportRecords) ? reportRecords.length : 0) / RECORDS_PER_PAGE
  );

  return isLoading ? (
    <Preloader />
  ) : (
    <Card id="delete-account" sx={{ paddingBottom: "1rem" }}>
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography
          color="info"
          component="label"
          variant="h6"
          fontWeight="bold"
          sx={{ borderBottom: "3px #FDB813 solid" }}
        >
          Concerns
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {renderReportRecords()}
        </SoftBox>
      </SoftBox>
      <SoftBox justifyContent="center" display="flex" alignItems="center" m={2}>
        <SoftTypography variant="body2" color="textSecondary">
          Page {currentPage} of {totalPages}
        </SoftTypography>
      </SoftBox>
      <SoftBox justifyContent="center" display="flex" alignItems="center">
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
      </SoftBox>
    </Card>
  );
}

export default DashboardReportRecords;
