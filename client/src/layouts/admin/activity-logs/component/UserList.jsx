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

import Footer from "examples/Footer";
import React, { useState, useEffect } from "react";

//Helpers
import { isLoggedIn } from "helpers/helpers";
import { getCookie } from "helpers/CookieHelper";

import axios from "axios";
import Preloader from "PreLoader";
import { Switch, Typography } from "@mui/material";
import dayjs from "dayjs";
import ReactDatePicker from "react-datepicker";
var weekOfYear = require('dayjs/plugin/weekOfYear');
dayjs.extend(weekOfYear);

function UserList() {
  const [isLoading, setIsLoading] = useState(true);

  const [rows, setRows] = useState([]);

  const [filteredRows, setFilteredRows] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchValue(searchTerm);
  };

  // Check if there's a user logged in &
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      //Fetch all students
      console.log("Fetching");
      // Fetch all users
      fetchUsers();
    }
  }, []);

  const cols = [
    { field: "id", headerName: "User ID", width: 300, headerAlign: "center", align: "center" },
    {
      field: "name",
      headerName: "Name",
      width: 400,
      height: 600,
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingLeft: 60,
            paddingRight: 20,
          }}
        >
          <img
            src={params.row.picture}
            alt="User"
            style={{ width: 80, height: 80, borderRadius: 10, marginRight: 10 }}
          />
          <span>{params.value}</span>
        </div>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
      headerAlign: "center",
      align: "center",
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    {
      field: "role",
      headerName: "Role",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    {
      field: "activity",
      headerName: "Activity",
      width: 400,
      headerAlign: "center",
      align: "center",
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
    {
      field: "created_At",
      headerName: "Created At",
      width: 150,
      headerAlign: "center",
      align: "center",
      headerClassName: "text-center",
      cellClassName: "text-center",
    },
  ];

  //Request to fetch all the active students
  async function fetchUsers() {
    try {
      setIsLoading(true);
      // Web service for getting the drawing details
      const url = localStorage.getItem("samwonAPI") + `/api/ManageActivityLogs/GetAllActivityLogs`;

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
            
            const arr = []
            
            response.data.users.forEach((row, ind) => {
              arr.push({
                id: ind,
                picture: row["picture"],
                activity: row["activity"],
                name: row["name"],
                email: row["email"],
                role: row["role"],
                created_At: row["created_At"],
                rawCreatedAt: parseInt(dayjs(row["created_At"], "DD/MM/YYYY hh:mm:ss a").format("YYYYMMDD")),
              });
            })

            setRows(arr);
            setIsLoading(false);
          });
      } catch (error) {
        console.log("Error: " + error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

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
            width: 200,
            padding: 20,
          },
        },
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <Grid container>
        <Grid item xs={12}>
          <Grid container
            direction="row"
          >
            <Grid item 
              xs={12}
              display="flex"
              alignItems="center"
            >
              Sort

            </Grid>
            <Grid item 
              xs={8}
              display="flex"
              alignItems="center"
              pl={2}
            >
              Professional
            </Grid>
            <Grid item
              xs={4}
              display="flex"
              justifyContent={"end"}
            >
              <Switch 
                name="filter1Check"
                //onChange={handleFilter1Change}
              />
            </Grid>
            <Grid item 
              xs={8}
              display="flex"
              alignItems="center"
              pl={2}
            >
              Parent
            </Grid>
            <Grid item
              xs={4}
              display="flex"
              justifyContent={"end"}
            >
              <Switch 
                name="filter1Check"
                //onChange={handleFilter1Change}
              />
            </Grid>

            <Grid item 
              xs={8}
              display="flex"
              alignItems="center"
              pl={2}
            >
              Student
            </Grid>
            <Grid item
              xs={4}
              display="flex"
              justifyContent={"end"}
            >
              <Switch
                defaultChecked
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Download */}
        {/* <Grid item xs={6}>
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
        </Grid> */}
      </Grid>
    </Menu>
  );

  const [dateFilter, setDateFilter] = useState("");

  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");

  useEffect(() => {
    var filteredData = rows.filter(
      (row) =>
        row.name.toLowerCase().includes(searchValue) ||
        row.email.toLowerCase().includes(searchValue) ||
        row.role.toLowerCase().includes(searchValue) ||
        row.created_At.toLowerCase().includes(searchValue)
    );

    if (dateFilter != ""){
      if(dateFilter == "day"){
        filteredData = filteredData.filter(
          (row) => parseInt(dayjs().format("YYYYMMDD")) == row.rawCreatedAt
        );
        console.log(filteredData)
      } else if (dateFilter == "week"){
        filteredData = filteredData.filter(
          (row) => parseInt(dayjs().week()) == parseInt(dayjs(row.created_At, "DD/MM/YYYY hh:mm:ss a").week())
        );
        console.log(filteredData)
      } else if (dateFilter == "month"){
        filteredData = filteredData.filter(
          (row) => parseInt(dayjs().format("MM")) == parseInt(dayjs(row.created_At, "DD/MM/YYYY hh:mm:ss a").format("MM"))
        );
        console.log(filteredData)
      } else if (dateFilter == "custom"){
        if(toTime != ""){
          const rawFrom = parseInt(dayjs(fromTime).format("YYYYMMDD"));
          const rawTo = parseInt(dayjs(toTime).format("YYYYMMDD"));
  
          filteredData = filteredData.filter(
            (row) => row.rawCreatedAt >= rawFrom && row.rawCreatedAt <= rawTo
          );
        }
      }
    }

    setFilteredRows(filteredData);

    console.log("Filtered")
  }, [searchValue, dateFilter, rows, fromTime, toTime])

  // Function to filter by date
  const handleFilterClick = (type) => {

    var data = [...rows];

    if(filteredRows.length > 0){
      data = [...filteredRows]
    }

    setFromTime("");
    setToTime("");

    if(type == dateFilter){
      setDateFilter("")
    } else if (type == "day") {
      setDateFilter(type);
    } else if (type == "week") {
      setDateFilter(type);
    } else if (type == "month") {
      setDateFilter(type);
    } else if (type == "custom") {
      setDateFilter(type);
    }
  }

  return (
    <>
      {!isLoading ? (
        <>
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
                          Activity Logs
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
                    <Grid
                      display="flex "
                      justify="center"
                      alignItems="center"
                      item
                      lg={1}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      <SoftBox color="text" px={2}>
                        <Icon
                          sx={{ cursor: "pointer", fontWeight: "bold" }}
                          fontSize="small"
                          onClick={openMenu}
                        >
                          more_vert
                        </Icon>
                      </SoftBox>
                      {renderMenu}
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
                  <SoftBox mb={3} px={3} display="flex" justifyContent="end" alignItems="center">
                    <Typography variant="body2" mr={2}>
                      Filter by: This
                    </Typography>
                    <SoftBox sx={{backgroundColor: "#1E4C2B", border:"black solid 1px"}} display="flex" className="select-none">
                      <SoftBox px={2} py={1} className="cursor-pointer"
                        onClick={() => handleFilterClick("day")}
                        sx={{
                          backgroundColor: dateFilter == "day" ? "#fff" : ""
                        }}
                      >
                        <Typography variant="body2" color={ dateFilter == "day" ? "#000" : "#fff"}>
                          Day
                        </Typography>
                      </SoftBox>
                      <SoftBox px={2} py={1} className="cursor-pointer"
                        onClick={() => handleFilterClick("week")}
                        sx={{
                          backgroundColor: dateFilter == "week" ? "#fff" : ""
                        }}
                      >
                        <Typography variant="body2" color={ dateFilter == "week" ? "#000" : "#fff"}>
                          Week
                        </Typography>
                      </SoftBox>
                      <SoftBox px={2} py={1} className="cursor-pointer"
                        onClick={() => handleFilterClick("month")}
                        sx={{
                          backgroundColor: dateFilter == "month" ? "#fff" : ""
                        }}
                      >
                        <Typography variant="body2" color={ dateFilter == "month" ? "#000" : "#fff"}>
                          Month
                        </Typography>
                      </SoftBox>
                      <SoftBox px={2} py={1} className="cursor-pointer"
                        onClick={() => handleFilterClick("custom")}
                        sx={{
                          backgroundColor: dateFilter == "custom" ? "#fff" : ""
                        }}
                      >
                        <Typography variant="body2" color={ dateFilter == "custom" ? "#000" : "#fff"}>
                          Custom
                        </Typography>
                      </SoftBox>
                    </SoftBox>
                    {
                      dateFilter == "custom" ?
                      (
                        <SoftBox display="flex" alignItems="center" ml={2}>
                          <Typography variant="body2" mr={1}>
                            From:
                          </Typography>
                          <SoftBox>
                            <ReactDatePicker
                              selected={fromTime}
                              maxDate={new Date(dayjs().format("YYYY-MM-DD"))}
                              onChange={(date) => {
                                setFromTime(date);
                                if(toTime != "" && parseInt(dayjs(fromTime).format("YYYYMMDD")) > parseInt(dayjs(toTime).format("YYYYMMDD"))){
                                  setToTime("")
                                }
                              }}
                              dateFormat="MMMM dd, yyyy"
                            />
                          </SoftBox>
                          <Typography variant="body2" mx={1}>
                            To:
                          </Typography>
                          <SoftBox>
                            <ReactDatePicker
                              disabled={fromTime == ""}
                              selected={toTime}
                              minDate={new Date(fromTime)}
                              maxDate={new Date(dayjs().format("YYYY-MM-DD"))}
                              onChange={(date) => setToTime(date)}
                              dateFormat="MMMM dd, yyyy"
                            />    
                          </SoftBox>
                        </SoftBox>
                      ) : null
                    }
                  </SoftBox>
                  <DataGrid
                    columns={cols}
                    rows={filteredRows}
                    rowHeight={120} // Adjust the height as needed
                    //filterModel={filterModel}
                    //onFilterModelChange={(model) => {setFilterModel(model)}}
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
                  />
                </SoftBox>
              </Card>
            </SoftBox>
          </SoftBox>
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default UserList;
