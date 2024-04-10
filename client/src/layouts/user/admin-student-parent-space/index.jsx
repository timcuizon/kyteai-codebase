// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import SoftInput from "components/SoftInput";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DataGrid } from "@mui/x-data-grid";
import NoRecentAppointmentVector from "assets/images/No data-rafiki.svg";
import EditCatCon from "./component/EditCatCon";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Preloader from "PreLoader";
import React, { useState, useEffect } from "react";

//Helpers
import { isLoggedIn } from "helpers/helpers";
import { getCookie } from "helpers/CookieHelper";

import axios from "axios";
import SamWonDataTable from "./component/SamWonDataTable";

function ParentStudentSpace() {
  const [isLoading, setIsLoading] = useState(true);

  const [rows, setRows] = useState([]);

  const [filteredRows, setFilteredRows] = useState([]);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = rows.filter(
      (row) =>
        row.id.toLowerCase().includes(searchTerm) ||
        row.user_id.toLowerCase().includes(searchTerm) ||
        row.user_email.toLowerCase().includes(searchTerm) ||
        row.name.toLowerCase().includes(searchTerm) ||
        row.role.toLowerCase().includes(searchTerm) ||
        row.status.toLowerCase().includes(searchTerm) ||
        row.type_of_Report.toLowerCase().includes(searchTerm) ||
        row.type_of_Concern.toLowerCase().includes(searchTerm)
      // row.contact_Number.toLowerCase().includes(searchTerm) ||
      // row.created_at.toLowerCase().includes(searchTerm)
    );
    setFilteredRows(filteredData);
  };

  // Check if there's a user logged in &
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      //Fetch all students
      // console.log("Fetching");
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
            setRows(response.data.users);
            setIsLoading(false);
          });
      } catch (error) {
        setIsLoading(false);
        console.log("Error: " + error);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  }

  const cols = [
    {
      field: "view",
      headerName: "",
      width: 150,
      size: 250,  
      headerAlign: "center",
      align: "center",
      headerClassName: "text-center",
      cellClassName: "text-center",
      renderCell: (params) => (
        <Link
          to={{
            pathname: "/user-student-parent-space/report-records-view",
            search: `?id=${params.row.id}`,
          }}
          id={`${params.row.id}`} //id in view link
          style={{
            textDecoration: "none", // Remove underline
            // color: '#2196F3', // Set link color
            display: "flex", // Align icon and text horizontally
            alignItems: "center", // Align icon and text vertically
          }}
        >
          <lord-icon
            src="https://cdn.lordicon.com/vfczflna.json"
            trigger="hover"
            state="hover-look-around"
            colors="primary:#1e4c2b,secondary:#1e4c2b"
          ></lord-icon>
          {/* &nbsp;View */}
        </Link>
      ),
    },
    {
      field: "user_id",
      headerName: "User Id",
      width: 100,
      topRow: true,
      size: 350,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      headerName: "Name",
      width: 400,
      size: 600,
      height: 600,
      headerAlign: "center",
      topRow: true,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: 20,
          }}
        >
          <img
            src={params.row.picture}
            alt="User"
            style={{ width: 80, height: 80, borderRadius: 10, marginRight: 10 }}
          />
          <div
            style={{
              display: "block",
            }}
          >
            <div>
              <span>
                <b>{params.value}</b>
              </span>
            </div>
            <div>
              <span>[{params.row.user_email}]</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      field: "role",
      headerName: "Role",
      width: 100,
      size: 225,
      headerAlign: "center",
      align: "center",
      topRow: true
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      size: 225,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "type_of_Report",
      headerName: "Category",
      width: 150,
      size: 275,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "type_of_Concern",
      headerName: "Concern",
      width: 150,
      size: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 170,
      size: 350,
      headerAlign: "center",
      align: "center",
    },
  ];

  const exportToPDF = () => {
    const doc = new jsPDF();
    const tableHead = cols.map((col) => col.headerName);

    doc.autoTable({
      head: [["Name", "ID", "Grade", "Section", "Email"]],
      body: rows.map((student) => cols.map((col) => student[col.field])),
    });
    doc.save("student_list.pdf");
  };

  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const [filterCheck1, setChecked] = useState(false);

  const [filterModel, setFilterModel] = useState({
    items: [],
    logicOperator: "or",
  });

  const handleFilter1Change = (event) => {
    if (!filterCheck1) {
      const filterA = {
        id: 1,
        field: "givenName",
        operator: "equals",
        value: "Airso Doe",
      };
      setFilterModel((prevModel) => ({
        ...prevModel,
        items: [...prevModel.items, filterA],
      }));
      setChecked(true);
    } else {
      setFilterModel((prevModel) => ({
        ...prevModel,
        items: prevModel.items.filter((item) => item.id !== 1),
      }));
      setChecked(false);
    }
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          style: {
            width: 150,
            padding: 20,
          },
        },
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <Grid container>
        {/* Download */}
        <Grid item xs={6}>
          <Grid container>
            <Grid item>Download</Grid>
            <Grid item>
              <MenuItem onClick={exportToPDF}>
                <SoftTypography variant="button" fontWeight="regular" color="info">
                  <Icon>download</Icon>&nbsp;PDF
                </SoftTypography>
              </MenuItem>
              <MenuItem onClick={exportToPDF}>
                <SoftTypography variant="button" fontWeight="regular" color="info">
                  <Icon>download</Icon>&nbsp;CSV
                </SoftTypography>
              </MenuItem>
              <MenuItem onClick={exportToPDF}>
                <SoftTypography variant="button" fontWeight="regular" color="info">
                  <Icon>download</Icon>&nbsp;EXCEL
                </SoftTypography>
              </MenuItem>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Menu>
  );

  return isLoading ? (
    <Preloader/>
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
          <SoftBox py={0}>
            <SoftBox mb={3}>
              <Card p={2}>
                <SoftBox p={2}>
                  <Grid container lg={12} item xs={12} xl={12} md={12} sm={12}>
                    <Grid
                      display="flex "
                      justify="center"
                      alignItems="center"
                      item
                      lg={3}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      <SoftBox p={3}>
                        <SoftTypography
                          variant="h6"
                          color="info"
                          sx={{ borderBottom: "3px #FDB813 solid" }}
                        >
                          Report List
                          <EditCatCon />
                        </SoftTypography>
                      </SoftBox>
                    </Grid>
                    <Grid item lg={8} md={12} sm={12} xs={12}>
                      <span className="w-3/5 mx-3">
                        <SoftInput
                          placeholder="Type here..."
                          onChange={handleSearchInputChange}
                          icon={{
                            component: "search ",
                            direction: "left",
                          }}
                        />
                      </span>
                    </Grid>
                  </Grid>
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
                  {rows != 0 ? (
                    <>
                      <SamWonDataTable
                        Columns={cols}
                        Rows={filteredRows.length > 0 ? filteredRows : rows}
                      />
{/* 
                      <DataGrid
                        columns={cols}
                        rows={filteredRows.length > 0 ? filteredRows : rows}
                        rowHeight={120} // Adjust the height as needed
                        //filterModel={filterModel}
                        //onFilterModelChange={(model) => {setFilterModel(model)}}
                        initialState={{
                          pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                          },
                          columns: {
                            columnVisibilityModel: {},
                          },
                        }}
                        disableColumnMenu
                        disableRowSelectionOnClick
                        pageSizeOptions={[5, 10, 20]}
                        sx={{
                          "& .MuiTablePagination-input": {
                            width: "70px !important",
                          },
                          "& .MuiTablePagination-menuItem": {
                            width: "70px !important",
                          },
                          paddingX: "20px",
                          border: "none",
                        }}
                      /> */}
                    </>
                  ) : (
                    // No Data Prompt
                    <>
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
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <SoftTypography
                            variant="h6"
                            color="info"
                            display="flex"
                            justifyContent="start"
                            alignItems="center"
                          >
                            <b>No Data Found</b>
                          </SoftTypography>
                        </SoftBox>
                      </SoftBox>
                    </>
                  )}
                </SoftBox>
              </Card>
            </SoftBox>
          </SoftBox>
    </DashboardLayout>
  );
}

export default ParentStudentSpace;
