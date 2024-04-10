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

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Overview page components
import Header from "layouts/user/profile/components/user-profile-header";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { isLoggedIn } from "helpers/helpers";
import { useNavigate } from "react-router-dom";
import { getCookie } from "helpers/CookieHelper";
import axios from "axios";
import dayjs from "dayjs";
import NoRecentAppointmentVector from "assets/images/No data-rafiki.svg";
import SoftTypography from "components/SoftTypography";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function UserProfile() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      var formData = new FormData();

      formData.append("email", getCookie("email"));
      formData.append("role", getCookie("role"));

      axios
        .post(localStorage.getItem("samwonAPI") + `/api/Profile/GetUserActivityLogs`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getCookie("user_token"),
          },
        })
        .then((response) => {
          // console.log(response.data)

          var act = [];

          response.data.forEach((row, index) => {
            act.push({
              id: index,
              activity: row.activity,
              date: dayjs(row.createdAt, "DD/MM/YYYY").format("DD/MM/YYYY"),
              time: dayjs(row.createdAt, "hh:mm A").format("hh:mm A"),
            });
          });

          setRows(act);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <DashboardLayout>
      {/* Profile Pic, Name, Grade, Settings*/}
      <Header />
      {/* <SoftBox mt={5} mb={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} xl={4}>
            <ProfileInfoCard
              title="profile information"
              description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              info={{
                fullName: "Alec M. Thompson",
                mobile: "(44) 123 1234 123",
                email: "alecthompson@mail.com",
                location: "USA",
              }}
              social={[
                {
                  link: "https://www.facebook.com/CreativeTim/",
                  icon: <FacebookIcon />,
                  color: "facebook",
                },
                {
                  link: "https://twitter.com/creativetim",
                  icon: <TwitterIcon />,
                  color: "twitter",
                },
                {
                  link: "https://www.instagram.com/creativetimofficial/",
                  icon: <InstagramIcon />,
                  color: "instagram",
                },
              ]}
              action={{ route: "", tooltip: "Edit Profile" }}
            />
          </Grid>
        </Grid>
      </SoftBox>
      <SoftBox mb={3}>
      </SoftBox> */}
      <SoftBox mt={5} mb={3}>
        {rows.length != 0 ? (
          <DataGrid
            columns={[
              { field: "id", headerName: "ID", width: 60 },
              { field: "date", headerName: "Date", width: 200 },
              { field: "activity", headerName: "Activity Logs", width: 1000 },
              { field: "time", headerName: "Time", width: 200 },
            ]}
            rows={rows}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
              columns: {
                columnVisibilityModel: {
                  id: false,
                },
              },
            }}
            disableColumnMenu
            disableRowSelectionOnClick
            disableColumnFilter
            disableColumnSelector
            pageSizeOptions={[5, 10, 20]}
            sx={{
              "& .MuiTablePagination-input": {
                width: "70px !important",
              },
              "& .MuiTablePagination-menuItem": {
                width: "70px !important",
              },
            }}
          />
        ) : (
          <>
            <SoftBox>
              <SoftBox p={3}>
                <SoftBox
                  component="img"
                  src={NoRecentAppointmentVector}
                  alt="waves"
                  left={0}
                  width="100%"
                  height="300px"
                  py={2}
                  pr={0.5}
                  display="flex"
                  justifyContent="start"
                  alignItems="center"
                />
                <SoftBox
                  style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  <SoftTypography
                    variant="h6"
                    color="info"
                    display="flex"
                    justifyContent="start"
                    alignItems="center"
                  >
                    <b>No Activity Logs Found</b>
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            </SoftBox>
          </>
        )}
      </SoftBox>

      <Footer />
    </DashboardLayout>
  );
}

export default UserProfile;
