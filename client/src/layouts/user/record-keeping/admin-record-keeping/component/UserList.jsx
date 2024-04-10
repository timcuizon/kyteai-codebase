// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import SoftInput from "components/SoftInput";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "./AddUserModal";

import Footer from "examples/Footer";
import React, { useState, useEffect } from "react";

//Helpers
import { isLoggedIn } from "helpers/helpers";
import { getCookie } from "helpers/CookieHelper";

import axios from "axios";
import Preloader from "PreLoader";
import SoftBadge from "components/SoftBadge";

function UserList() {
  const [isLoading, setIsLoading] = useState(true);

  const [rows, setRows] = useState([]);

  const [filteredRows, setFilteredRows] = useState([]);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = rows.filter(
      (row) =>
        row.name.toLowerCase().includes(searchTerm) ||
        row.email.toLowerCase().includes(searchTerm) ||
        row.sex.toLowerCase().includes(searchTerm) ||
        row.role.toLowerCase().includes(searchTerm)
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
      fetchUsers();
    }
  }, []);

  // const rows = [
  //   {
  //     id: 1,
  //     picture:
  //       "https://lh3.googleusercontent.com/a/ACg8ocIkBwAqbGRjuhLQn3n_ng578YcHEYJrDndof-2Kn6rDdQ=s96-c",
  //     email: "khiragashi@email.com",
  //     name: "Kitoma Hiragashi",
  //     sex: "Male",
  //     role: "Student",
  //   },
  //   {
  //     id: 2,
  //     picture:
  //       "https://lh3.googleusercontent.com/a/ACg8ocIkBwAqbGRjuhLQn3n_ng578YcHEYJrDndof-2Kn6rDdQ=s96-c",
  //     email: "hkirisaki@email.com",
  //     name: "Himiko Kirisaki",
  //     sex: "Female",
  //     role: "Parent",
  //   },
  //   {
  //     id: 3,
  //     picture:
  //       "https://lh3.googleusercontent.com/a/ACg8ocIkBwAqbGRjuhLQn3n_ng578YcHEYJrDndof-2Kn6rDdQ=s96-c",
  //     email: "mnagasaki@email.com",
  //     name: "Miyu Nagasaki",
  //     sex: "Female",
  //     role: "Student",
  //   },
  // ];

  const cols = [
    { field: "id", headerName: "User ID", width: 300, headerAlign: "center", align: "center" },
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
          to={"/records/list?email=" + `${params.row.email}`}
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
          <div style={{ position: "relative", display: "inline-block" }}>
            <img
              src={params.row.picture}
              alt="User"
              style={{ width: 80, height: 80, borderRadius: 10, marginRight: 10 }}
            />
            <SoftBadge
              badgeContent={params.row.role}
              container
              style={{
                position: "absolute",
                bottom: -10,
                left: "44.8%",
                transform: "translateX(-50%)",
              }}
            />
          </div>
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
      field: "sex",
      headerName: "Sex",
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
      const url = localStorage.getItem("samwonAPI") + `/api/Records/getUsers`;

      const formData = new FormData();
      formData.append("email", getCookie("email"));
      formData.append("userId", getCookie("email"));

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
        {/* Testing
        <Grid item xs={6}>
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
              Active
            </Grid>
            <Grid item
              xs={2}
              display="flex"
              alignContent="flex-end"
            >
              <Switch 
                name="filter1Check"
                onChange={handleFilter1Change}
              />
            </Grid>

            <Grid item 
              xs={8}
              display="flex"
              alignItems="center"
              pl={2}
            >
              test2
            </Grid>
            <Grid item
              xs={2}
              display="flex"
              alignContent="flex-end"
            >
              <Switch
                defaultChecked
              />
            </Grid>
          </Grid>
        </Grid> */}

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

  //open icon upload image
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                          color="info"
                          component="label"
                          variant="h6"
                          fontWeight="bold"
                          sx={{ borderBottom: "3px #FDB813 solid", marginRight: "10px" }}
                        >
                          Record Keeping
                        </SoftTypography>
                        <SoftButton
                          variant="outlined"
                          color="info"
                          size="small"
                          type="button"
                          onClick={handleClickOpen}
                        >
                          <Modal open={open} handleClose={handleClose} />
                        </SoftButton>
                      </SoftBox>
                    </Grid>
                    <Grid item lg={8} md={12} sm={12} xs={12}>
                      <span className="w-3/5 mx-3">
                        <SoftInput
                          placeholder="Search here..."
                          onChange={handleSearchInputChange}
                          icon={{
                            component: "search ",
                            direction: "left",
                          }}
                        />
                      </span>
                    </Grid>
                    {/* <Grid
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
                    </Grid> */}
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
