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
import { useState } from "react";
import Grid from "@mui/material/Grid";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton/index";
import dayjs from "dayjs";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function ReportRecords({ date, category, concern, noGutter, onViewReportRecord }) {
  const handleViewReportRecord = (id) => {
    window.location.replace(`/user-student-parent-space/report-records-view?id=${id}`);
  };

  return (
    <SoftBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      py={1}
      pr={1}
      mb={noGutter ? 0 : 1}
    >
      <SoftBox lineHeight={1}>
        {/* <SoftTypography display="block" variant="button" fontWeight="medium">
          {dayjs(date, "DD/MM/YYYY hh:mm:ss a").format("dddd, DD-MM-YYYY")}
        </SoftTypography> */}
        <SoftTypography fontWeight="bold" color="text">
          {category}
        </SoftTypography>
        <SoftTypography fontWeight="regular" color="text" variant="caption">
          {concern}
        </SoftTypography>
        <SoftTypography display="block" fontWeight="regular" color="text" variant="caption">
          {date}
        </SoftTypography>
      </SoftBox>

      <SoftBox display="flex" alignItems="center" lineHeight={0} ml={3} sx={{ cursor: "poiner" }}>
        <SoftBox mr={1}>
          <SoftButton
            variant="text"
            color="info"
            onClick={() => handleViewReportRecord(reportNumber)}
          >
            <lord-icon
              src="https://cdn.lordicon.com/vfczflna.json"
              trigger="hover"
              state="hover-look-around"
              colors="primary:#1e4c2b,secondary:#1e4c2b"
            ></lord-icon>
            &nbsp; View
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </SoftBox>
  );
}

// Setting default values for the props of ReportRecords
ReportRecords.defaultProps = {
  noGutter: false,
};

// Typechecking props for the ReportRecords
ReportRecords.propTypes = {
  date: PropTypes.string.isRequired,
  reportNumber: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default ReportRecords;
