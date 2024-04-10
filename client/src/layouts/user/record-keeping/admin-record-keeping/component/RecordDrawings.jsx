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

import Footer from "examples/Footer";
import React, { useState, useEffect } from "react";

//Helpers
import { isLoggedIn } from "helpers/helpers";
import { getCookie } from "helpers/CookieHelper";

import axios from "axios";
import Preloader from "PreLoader";
import dayjs from "dayjs";

function RecordDrawings({ email, drawings }) {
  const [isLoading, setIsLoading] = useState(true);

  const [rows, setRows] = useState([]);

  const [filteredRows, setFilteredRows] = useState([]);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = rows.filter(
      (row) =>
        // row.id.toLowerCase().includes(searchTerm) ||
        row.drawingType.toLowerCase().includes(searchTerm) ||
        row.professional.toLowerCase().includes(searchTerm) ||
        row.status.toLowerCase().includes(searchTerm) ||
        row.created_at.toLowerCase().includes(searchTerm) ||
        row.updated_at.toLowerCase().includes(searchTerm)
    );
    setFilteredRows(filteredData);
  };

  // Check if there's a user logged in &
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      //Fetch all students
      console.log("Fetching");
      // Fetch all users
      setRows(drawings);
    }
  }, []);

  const cols = [
    {
      field: "test",
      headerName: "View",
      width: 100,
      headerAlign: "center",
      align: "center",
      headerClassName: "text-center",
      cellClassName: "text-center",
      renderCell: (params) => (
        <Link
          to={{
            pathname: "/pre-vset/vset",
            search: `?email=${email}&object=${params.row.drawingType}&id=${params.row.id}`,
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
    { field: "id", headerName: "Drawing ID", width: 100, headerAlign: "center", align: "center" },
    {
      field: "drawingType",
      headerName: "Type",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "professional",
      headerName: "Professional",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "created_at",
      headerName: "Created At",
      width: 170,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <span>{dayjs(params.row.created_at, "DD/MM/YYYY hh:mm:ss a").format("MMM D YYYY - hh:mm a")}</span>,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 170,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <span>{dayjs(params.row.updated_at, "DD/MM/YYYY hh:mm:ss a").format("MMM D YYYY - hh:mm a")}</span>,
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

  return (
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
                      VSET Records
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
              {rows != 0 ? (
                <>
                  <DataGrid
                    columns={cols}
                    rows={filteredRows.length > 0 ? filteredRows : rows}
                    rowHeight={60} // Adjust the height as needed
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
                  />
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
                      style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
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
    </>
  );
}

export default RecordDrawings;
