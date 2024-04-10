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
import React from 'react';
import { useNavigate } from 'react-router-dom';

// @mui material components
import Card from "@mui/material/Card";
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";
import tree from "assets/images/illustrations/tree.png";
import house from "assets/images/illustrations/house.png";
import person from "assets/images/illustrations/person.png";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import authorsTableDataAppointment from "layouts/user/profile/user-profile/data/authorsUserProfile.js";
import projectsTableDataAppointment from "layouts/user/profile/user-profile/data/projectUserProfile.js";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Modal from "@mui/material/Modal";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import Icon from "@mui/material/Icon";



function UserProfileList() {
  const { columns, rows } = authorsTableDataAppointment;
  const { columns: prCols, rows: prRows } = projectsTableDataAppointment;

  const navigate = useNavigate();
  const handleScheduleManagementClick = () => {
    navigate('/appointment/schedule-management');
  };

  const [openFollowUp, setOpenFollowUp] = React.useState(false);
  const handleOpenFollowUp = () => setOpenFollowUp(true);
  const handleCloseFollowUp = () => setOpenFollowUp(false);

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


  return (
    <>
    
        <SoftBox py={0}>
          <SoftBox mb={3}>
            <Card>
              <SoftBox display="flex" justifyContent="start" alignItems="center" p={.5}>
                {/* <SoftTypography 
                variant="h5"
                className='w-auto' >Search Student</SoftTypography> */}
                    {/* <span className="w-3/5 mx-3 ">
                <SoftInput
                  placeholder="Type here..."
                  icon={{
                    component: "search ",
                    direction: "left",
                  }}
                />
              </span> */}
                {/* <SoftButton variant="gradient" color="info" size="medium">
                  Search
                </SoftButton> */}
                {/* <SoftBox mt={3} ml={{ xs: -1.5, sm: 0 }}>
                  <SoftButton variant="text" color="warning" onClick={handleOpenFollowUp}>
                    <Icon>add</Icon>&nbsp;Create Schedule
                  </SoftButton>
                </SoftBox> */}
                {/* <SoftBox mt={3} ml={{ xs: -1.5, sm: 0 }}>
                  <SoftButton variant="text" color="warning">
                    <Icon>download</Icon>&nbsp;Export to PDF
                  </SoftButton>
                </SoftBox> */}
                {/* Follow Up Modal */}
                  {/* <Modal
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
                  </Modal> */}
              </SoftBox>
              <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <SoftTypography variant="h5">Activity Log</SoftTypography>
              </SoftBox>
              <SoftBox
                className="p-5"
                sx={{
                  "& .MuiTableRow-root:not(:last-child)": {
                    "& td": {
                      borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                        `${borderWidth[1]} solid ${borderColor}`,
                    },
                  },
                }}
              >
                <Table columns={prCols} rows={prRows} />
              </SoftBox>
            </Card>
          </SoftBox>
        </SoftBox>
    </>
  );
}

export default UserProfileList;
