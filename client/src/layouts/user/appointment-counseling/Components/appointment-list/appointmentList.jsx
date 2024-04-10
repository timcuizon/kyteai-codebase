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
import NoRecentAppointmentVector from "assets/images/No data-rafiki.svg";

// import AddStudentForm from '../admin-record-keeping/add-student-form';
import SoftAlert from "components/SoftAlert";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { dataValues } from "./data/dataValues";
import { Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { dRows } from "./data/rows";

var rows = {};

function HistorySchedule({SchedList, IsLoading}) {
  
const navigate = useNavigate();

const cols = [
  {
    field: "Status",
    headerName: "",
    width: 150,
    renderCell: (params) => (
        <SoftBox
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => navigate(`/appointment-counseling/appointment-summary?id=${params.id}`)}
        >
          <lord-icon
            src="https://cdn.lordicon.com/vfczflna.json"
            trigger="hover"
            state="hover-look-around"
            colors="primary:#1e4c2b,secondary:#1e4c2b"
            className="mr-2 cursor-pointer"
            >
          </lord-icon>
          <span className="ml-3 cursor-pointer">
            View
          </span>
        </SoftBox>
    ),
  },
  { field: "id", headerName: "ID", width: 60 },
  { field: "refNum", headerName: "Reference Number", width: 400 },
  { field: "appointmentScheduleDate", headerName: "Schedule Date", width: 400 },
  { field: "appointmentScheduleTime", headerName: "Schedule Time", width: 250 },
  { field: "status", headerName: "Status", width: 150 },
];

  const handleScheduleManagementClick = () => {
    navigate("/appointment-counseling/summary");
  };

  const [isThereData, setIsThereData] = useState(false);

  useEffect(() => {
    if(SchedList != ""){
      setIsThereData(true);
      rows = SchedList;
    }
  }
  )

  useEffect(() => {
    
    setSavedFilter(filterModel)
  }, [])

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [["Name", "refNum", "Grade", "Section", "Email"]],
      body: dataValues.map((student) => [
        student.name,
        student.refNum,
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
        value: ["Completed", "Pending", "Approved", "Rescheduled"],
      }
    ],
    logicOperator: "and",
  });

  const [savedFilter, setSavedFilter] = useState(""); 

  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = (event) => {
    const searchValue = event.target.value;
    console.log(savedFilter);
    if (searchValue != ""){
      setIsSearching(true)
      setFilterModel({
        items: [
          {
            id: 1,
            field: "refNum",
            operator: "contains",
            value: searchValue,
          }
        ],
        logicOperator: "and",
      })
    } else {
      setIsSearching(false)
      setFilterModel(savedFilter)
    }
  }

  const [completedChecked, setCompletedChecked] = useState(true);

  const handleCompletedFilter = (event) => {
    if (completedChecked) {
      setFilterModel((prevModel) => ({
        items: [
          {
            id: 1,
            field: "status",
            operator: "isAnyOf",
            value: [...prevModel.items[0].value, "Completed"],
          }
        ],
      }));
      setCompletedChecked(false);
    } else {
      setFilterModel((prevModel) => ({
        items: [
          {
            ...prevModel.items[0],
            value: prevModel.items[0].value.filter((v) => v !== "Completed"),
          },
        ],
      }));
      setCompletedChecked(true);
    }
  };

  const [pendingChecked, setPendingChecked] = useState(true);

  const handlePendingFilter = () => {
    if (pendingChecked) {
      setFilterModel((prevModel) => ({
        items: [
          {
            ...prevModel.items[0],
            value: prevModel.items[0].value.filter((v) => v !== "Pending"),
          },
        ],
      }));
      setPendingChecked(false);
    } else {
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
    }
  };

  const [approvedChecked, setApprovedChecked] = useState(true);

  const handleApprovedilter = () => {
    if (approvedChecked) {
      setFilterModel((prevModel) => ({
        items: [
          {
            ...prevModel.items[0],
            value: prevModel.items[0].value.filter((v) => v !== "Approved"),
          },
        ],
      }));
      setApprovedChecked(false);
    } else {
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

  const [cancelledChecked, setCancelledChecked] = useState(false);

  const handleCancelledFilter = () => {
    if (!cancelledChecked) {
      setFilterModel((prevModel) => ({
        items: [
          {
            id: 1,
            field: "status",
            operator: "isAnyOf",
            value: [...prevModel.items[0].value, "Cancelled"],
          },
        ],
      }));
      setCancelledChecked(true);
    } else {
      setFilterModel((prevModel) => ({
        items: [
          {
            ...prevModel.items[0],
            value: prevModel.items[0].value.filter((v) => v !== "Cancelled"),
          },
        ],
      }));
      setCancelledChecked(false);
    }
  };

  const [rescheduledCheck, setRescheduledChecked] = useState(true);

  const handleRescheduledFilter = () => {
    if (rescheduledCheck) {
      setFilterModel((prevModel) => ({
        items: [
          {
            ...prevModel.items[0],
            value: prevModel.items[0].value.filter((v) => v !== "Rescheduled"),
          },
        ],
      }));
      setRescheduledChecked(false);
    } else {
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
            width: 250,
            padding: 20,
          },
        },
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
      
    >
      <Grid container>
        {
          isSearching ? (
            <Grid item xs={12}>
              Not available while searching
            </Grid>
          ) : (
            <Grid item xs={12}>
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
                  Pending
                </Grid>
                <Grid item xs={2} display="flex" alignContent="flex-end">
                  <Switch checked={pendingChecked} name="pendingCheck" onChange={handlePendingFilter} />
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
                  Cancelled
                </Grid>
                <Grid item xs={2} display="flex" alignContent="flex-end">
                  <Switch
                    checked={cancelledChecked}
                    name="cancelledCheck"
                    onChange={handleCancelledFilter}
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
          )
        }
      </Grid>
    </Menu>
  );

  return (
    <SoftBox py={0}>
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
                    onChange={handleSearch}
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
            
            { isThereData ? 
              (
                <DataGrid
                  loading={IsLoading}
                  rows={rows}
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
                  disableColumnFilter
                  sx={{
                    "& .MuiTablePagination-input": {
                      width: "70px !important",
                    },
                    "& .MuiTablePagination-menuItem": {
                      width: "70px !important",
                    },
                  }}
                />
              ) :
              (
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
                      <SoftBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
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
                </SoftBox>
              )
          
            }

            {/* <Table columns={prCols} rows={prRows} /> */}
          </SoftBox>
        </Card>
      </SoftBox>
    </SoftBox>
  );
}

export default HistorySchedule;
