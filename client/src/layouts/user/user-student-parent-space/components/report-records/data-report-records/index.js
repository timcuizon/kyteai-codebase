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

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Billing page components
import ReportRecords from "layouts/user/user-student-parent-space/components/report-records/index.js";
import { useEffect, useState } from "react";
import { getCookie } from "helpers/CookieHelper";
import axios from "axios";

const RECORDS_PER_PAGE = 5;

function dataReportRecords({ email }) {
  const [reportRecords, setReportRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

// function dataReportRecords({ email }) {
//   const [created_at, setCreated_At] = useState("");
//   const [id, setId] = useState("");

//   const [reportRecords, setReportRecords] = useState([]);

  useEffect(() => {
    var formData = new FormData();
    formData.append("email", email);

    const fetchData = async () => {
      try {
        const reportRecordsResponse = await axios.post(
          localStorage.getItem("samwonAPI") + "/api/User_StudentParent_Space/GetReportRecords",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        const reportRecordData = reportRecordsResponse.data;
        setReportRecords(reportRecordData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    const totalPages = reportRecords.length > RECORDS_PER_PAGE ? Math.ceil(reportRecords.length / RECORDS_PER_PAGE) : 1;
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
        <ReportRecords date={reportRecord.created_at} reportNumber={reportRecord.id} />
      ));
    };

    // Calculate total pages inside the render function
  const totalPages = reportRecords.length > RECORDS_PER_PAGE ? Math.ceil(reportRecords.length / RECORDS_PER_PAGE) : 1;


  return (
    <Card id="delete-account" sx={{ height: "100%" }}>
      <SoftBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <SoftTypography
          color="info"
          component="label"
          variant="h6"
          fontWeight="bold"
          sx={{ borderBottom: "3px #FDB813 solid" }}
        >
          Previous Concern
        </SoftTypography>
      </SoftBox>
      <SoftBox p={2}>
        {Array.isArray(reportRecords) && reportRecords.length > 0 ? (
          <>
            <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
              {renderReportRecords()}
            </SoftBox>
            <SoftBox justifyContent="center" display="flex" alignItems="center" m={2}>
              <SoftTypography variant="body2" color="textSecondary">
                Page {currentPage} of {totalPages}
              </SoftTypography>
            </SoftBox>
            <SoftBox className="space-x-2" justifyContent="center" display="flex" alignItems="center" mb={2}>
              <SoftButton variant="gradient" color="info" size="small" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Prev
              </SoftButton>
              <SoftButton variant="gradient" color="info" size="small" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </SoftButton>
            </SoftBox>
          </>
        ) : (
          <SoftBox mt={0.25} mr={1} mb={0.25} borderRadius="lg">
            <SoftTypography variant="body2" color="textSecondary">
              All clear! No records for you at this time.
            </SoftTypography>
          </SoftBox>
        )}
      </SoftBox>
    </Card>
  );
  }

export default dataReportRecords;
