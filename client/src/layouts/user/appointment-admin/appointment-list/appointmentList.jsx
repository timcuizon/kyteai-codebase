import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Table from "examples/Tables/Table";
import projectsTableDataHistory from "layouts/user/appointment-admin/appointment-list/data/projectAppointment.js";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";

// import AddStudentForm from '../admin-record-keeping/add-student-form';
import SoftAlert from "components/SoftAlert";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { dataValues } from "./data/dataValues";
import { Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { dRows } from "./data/rows";
import dayjs from "dayjs";
import { formatDate } from "helpers/helpers";
import SamWonDataTable from "../component/SamWonDataTable";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function HistorySchedule({ Appointments }) {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    const filteredData = rows.filter(
      (row) =>
        // row.id.toLowerCase().includes(searchTerm) ||
        row.refNum.toLowerCase().includes(searchTerm) ||
        row.role.toLowerCase().includes(searchTerm) ||
        row.name.toLowerCase().includes(searchTerm) ||
        row.email.toLowerCase().includes(searchTerm) ||
        row.scheduleDate.toLowerCase().includes(searchTerm) ||
        row.scheduleTime.toLowerCase().includes(searchTerm) ||
        row.status.toLowerCase().includes(searchTerm)
    );
    setFilteredRows(filteredData);
  };

  const cols = [
    { field: "id", headerName: "ID" },
    {
      field: "action",
      headerName: "",
      headerAlign: "center",
        align: "center",
        size: 150,
      renderCell: (params) => {return(
        <>
          <SoftBox
            onClick={() => navigate(`/appointment/schedule-management?id=${params.id}`, { state: params.id })}
          >
            <SoftBox display="flex" alignItems="center" justifyContent="center">
              <lord-icon
                src="https://cdn.lordicon.com/vfczflna.json"
                trigger="hover"
                state="hover-look-around"
                colors="primary:#1e4c2b,secondary:#1e4c2b"
                className="mr-2 cursor-pointer"
              ></lord-icon>
              <span className="ml-3 cursor-pointer">View</span>
            </SoftBox>
          </SoftBox>  
        </>
      )},
    },
    {
      field: "refNum",
      headerName: "Reference #",
      size: 200,
      headerAlign: "center",
      align: "center",
    },
    { field: "name", headerName: "Name", size: 540, headerAlign: "center", align: "center", topRow: true},
    { field: "role", headerName: "Role", size: 280, headerAlign: "center", align: "center" , topRow: true},
    { field: "email", headerName: "Email", size: 500, headerAlign: "center", align: "center", topRow: true},
    {
      field: "scheduleDate",
      headerName: "Date",
      size: 400,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "scheduleTime",
      headerName: "Time",
      size: 300,
      headerAlign: "center",
      align: "center",
    },
    { field: "status", headerName: "Status", size: 280, headerAlign: "center", align: "center" },
  ];

  //   <SoftButton
  //   onClick={() => navigate('/appointment/schedule-management', {state: params.id})}
  // >
  //   <lord-icon
  //     src="https://cdn.lordicon.com/vfczflna.json"
  //     trigger="hover"
  //     state="hover-look-around"
  //     colors="primary:#1e4c2b,secondary:#1e4c2b"
  //     className="mr-2 cursor-pointer"
  //     >
  //   </lord-icon>
  //   <span className="ml-2 cursor-pointer">
  //     View
  //   </span>
  // <SoftButton/>
  useEffect(() => { 
    if (Appointments != "") {
      setRows(Appointments);
    }
  });

  const handleScheduleManagementClick = () => {
    navigate("/appointment/schedule-management");
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Name", "ID", "Grade", "Section", "Email"]],
      body: dataValues.map((student) => [
        student.name,
        student.ID,
        student.grade,
        student.section,
        student.email,
      ]),
    });
    doc.save("student_list.pdf");
  };

  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const [filterModel, setFilterModel] = useState({
    items: [
      {
        id: 1,
        field: "status",
        operator: "isAnyOf",
        value: "",
      },
    ],
    logicOperator: "or",
  });

  const [completedChecked, setCompletedChecked] = useState(false);

  const handleCompletedFilter = (event) => {
    if (!completedChecked) {
      setFilterModel((prevModel) => ({
        items: [
          {
            id: 1,
            field: "status",
            operator: "isAnyOf",
            value: [...prevModel.items[0].value, "Completed"],
          },
        ],
      }));
      setCompletedChecked(true);
    } else {
      setFilterModel((prevModel) => ({
        items: [
          {
            ...prevModel.items[0],
            value: prevModel.items[0].value.filter((v) => v !== "Completed"),
          },
        ],
      }));
      setCompletedChecked(false);
    }
  };

  const [pendingChecked, setPendingChecked] = useState(false);

  const handlePendingFilter = () => {
    if (!pendingChecked) {
      setFilterModel((prevModel) => ({
        items: [
          {
            id: 1,
            field: "status",
            operator: "isAnyOf",
            value: [...prevModel.items[0].value, "Pending"],
          },
        ],
      }));
      setPendingChecked(true);
    } else {
      setFilterModel((prevModel) => ({
        items: [
          {
            ...prevModel.items[0],
            value: prevModel.items[0].value.filter((v) => v !== "Pending"),
          },
        ],
      }));
      setPendingChecked(false);
    }
  };

  const [approvedChecked, setApprovedChecked] = useState(false);

  const handleApprovedilter = () => {
    if (!approvedChecked) {
      setFilterModel((prevModel) => ({
        items: [
          {
            id: 1,
            field: "status",
            operator: "isAnyOf",
            value: [...prevModel.items[0].value, "Approved"],
          },
        ],
      }));
      setApprovedChecked(true);
    } else {
      setFilterModel((prevModel) => ({
        items: [
          {
            ...prevModel.items[0],
            value: prevModel.items[0].value.filter((v) => v !== "Approved"),
          },
        ],
      }));
      setApprovedChecked(false);
    }
  };

  const [archivedChecked, setArchivedChecked] = useState(false);

  const handleArchivedFilter = () => {
    if (!archivedChecked) {
      setFilterModel((prevModel) => ({
        items: [
          {
            id: 1,
            field: "status",
            operator: "isAnyOf",
            value: [...prevModel.items[0].value, "Archived"],
          },
        ],
      }));
      setArchivedChecked(true);
    } else {
      setFilterModel((prevModel) => ({
        items: [
          {
            ...prevModel.items[0],
            value: prevModel.items[0].value.filter((v) => v !== "Archived"),
          },
        ],
      }));
      setArchivedChecked(false);
    }
  };

  const [rescheduledCheck, setRescheduledChecked] = useState(false);

  const handleRescheduledFilter = () => {
    if (!rescheduledCheck) {
      setFilterModel((prevModel) => ({
        items: [
          {
            id: 1,
            field: "status",
            operator: "isAnyOf",
            value: [...prevModel.items[0].value, "Rescheduled"],
          },
        ],
      }));
      setRescheduledChecked(true);
    } else {
      setFilterModel((prevModel) => ({
        items: [
          {
            ...prevModel.items[0],
            value: prevModel.items[0].value.filter((v) => v !== "Rescheduled"),
          },
        ],
      }));
      setRescheduledChecked(false);
    }
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      slotProps={{
        paper: {
          style: {
            width: 400,
            padding: 20,
          },
        },
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <Grid container>
        <Grid item xs={8}>
          <Grid container direction="row">
            <Grid item xs={12} display="flex" alignItems="center">
              Sort
            </Grid>

            {/* Completed */}
            <Grid item xs={8} display="flex" alignItems="center" pl={2}>
              Completed
            </Grid>
            <Grid item xs={2} display="flex" alignContent="flex-end">
              <Switch
                checked={completedChecked}
                name="completedCheck"
                onChange={handleCompletedFilter}
              />
            </Grid>

            <Grid item xs={8} display="flex" alignItems="center" pl={2}>
              Pending
            </Grid>
            <Grid item xs={2} display="flex" alignContent="flex-end">
              <Switch checked={pendingChecked} name="pendingCheck" onChange={handlePendingFilter} />
            </Grid>

            <Grid item xs={8} display="flex" alignItems="center" pl={2}>
              Approved
            </Grid>
            <Grid item xs={2} display="flex" alignContent="flex-end">
              <Switch
                checked={approvedChecked}
                name="approvedCheck"
                onChange={handleApprovedilter}
              />
            </Grid>

            <Grid item xs={8} display="flex" alignItems="center" pl={2}>
              Rescheduled
            </Grid>
            <Grid item xs={2} display="flex" alignContent="flex-end">
              <Switch
                checked={rescheduledCheck}
                name="rescheduledCheck"
                onChange={handleRescheduledFilter}
              />
            </Grid>

            <Grid item xs={8} display="flex" alignItems="center" pl={2}>
              Archived
            </Grid>
            <Grid item xs={2} display="flex" alignContent="flex-end">
              <Switch
                checked={archivedChecked}
                name="archivedCheck"
                onChange={handleArchivedFilter}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Download */}
        <Grid item xs={4}>
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
    <SoftBox py={0} mb={24}>
      <SoftBox mb={3}>
        <Card>
          <SoftBox>
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
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                    gutterBottom
                  >
                    Appointment List
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
            className="p-5 "
            sx={{
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                    `${borderWidth[1]} solid ${borderColor}`,
                },
              },
            }}
          >

            <SamWonDataTable Columns={cols} Rows={filteredRows.length > 0 ? filteredRows : rows.filter((filter) => filter.status != "Cancelled" && filter.status != "Archived")}/>

            {/* <Table columns={prCols} rows={prRows} /> */}
            {/* <DataGrid
              rows={filteredRows.length > 0 ? filteredRows : rows}
              columns={cols}
              filterModel={filterModel}
              onFilterModelChange={(model) => {
                setFilterModel(model);
              }}
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
                marginBottom: 3,
              }}
            /> */}
          </SoftBox>
        </Card>
      </SoftBox>
    </SoftBox>
  );
}

export default HistorySchedule;
