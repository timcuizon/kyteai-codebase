// @mui material components
import Card from "@mui/material/Card";
import wavesWhite from "assets/images/shapes/waves-white.svg";
import tree from "assets/images/illustrations/tree.png";
import house from "assets/images/illustrations/house.png";
import person from "assets/images/illustrations/person.png";
import NoRecentAppointmentVector from "assets/images/No data-rafiki.svg";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
import SoftInput from "components/SoftInput";
import SoftButton from "../../../components/SoftButton/index";

import Grid from "@mui/material/Grid";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useDebounce from "hooks/useDebounce";

//Helpers
import { isLoggedIn } from "helpers/helpers";
import { getCookie } from "helpers/CookieHelper";

import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Icon } from "@mui/material";
import { Player } from "@lottiefiles/react-lottie-player";
import { Controls } from "@dotlottie/react-player";
import Preloader from "PreLoader";
import dayjs from "dayjs";

function PreVSET() {
  let navigate = useNavigate();

  // All Student Records
  const [studEmail, setStudEmail] = useState("");
  const [allStudent, setAllStudent] = useState(null);
  //If there's selected student
  const [isSelectedStudent, setIsSelectedStudent] = useState(false);

  // Search Records
  const [isSearch, setIsSearch] = useState(false);
  const [searchStudent, setSearchStudent] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debouncedSuggestions = useDebounce(suggestions);

  //VSET Records
  const [isResult, setIsResult] = useState(false);
  const [isVSETRecords, setIsVSETRecords] = useState(false);

  const cols = [
    {
      field: "test",
      headerName: "Action",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <SoftBox
          display="flex"
          justifyContent="start"
          alignItems="center"
          onClick={isSelectedStudent ? () => handleVSET(params.row.type, params.row.id) : null}
        >
          <script src="https://cdn.lordicon.com/lordicon.js"></script>
          <lord-icon
            src="https://cdn.lordicon.com/vfczflna.json"
            trigger="hover"
            state="hover-look-around"
            colors="primary:#1e4c2b,secondary:#1e4c2b"
          ></lord-icon>
          &nbsp;
        </SoftBox>
      ),
    },
    {
      field: "id",
      headerName: "Assessment ID",
      width: 150,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "date",
      headerName: "Date",
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => <span>{dayjs(params.row.date).format("MMMM DD, YYYY")}</span>,
    },
    { field: "type", headerName: "Type", width: 100, headerAlign: "center", align: "center" },
    {
      field: "prof",
      headerName: "Professional",
      width: 300,
      headerAlign: "center",
      align: "center",
    },
    { field: "status", headerName: "Status", width: 150, headerAlign: "center", align: "center" },
  ];

  const [rowData, setRowData] = useState([]);
  const prRow = [];

  //Request to fetch all the active students
  const fetchStudents = async () => {
    try {
      // Define your headers here with JWT Claims
      const headers = {
        Authorization: "Bearer " + getCookie("user_token"),
        "Content-Type": "application/json",
      };

      // Make the POST request with the headers
      const response = await axios.post(
        localStorage.getItem("samwonAPI") + "/api/VSET",
        {},
        {
          headers: headers,
        }
      );

      // Save all records of active students
      setAllStudent(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Check if there's a user logged in &
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      //Fetch all students
      console.log("Fetching");
      // Call the fetchData function when the component mounts
      fetchStudents();
    }
  }, []);

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

  // Function to filter and update suggestions
  const handleInputChange = (value) => {
    setSearchStudent(value);

    // Filter the students based on the input
    const filteredSuggestions = allStudent.filter((student) => {
      const fullName = `${student.givenname} ${student.familyname}`;
      const email = student.email;
      return (
        fullName.toLowerCase().includes(value.toLowerCase()) ||
        email.toLowerCase().includes(value.toLowerCase())
      );
    });

    // Extract the full names of the filtered students
    const suggestionData = filteredSuggestions.map((student) => {
      return {
        fullName: `${student.givenname} ${student.familyname}`,
        email: student.email,
        picture: student.picture,
      };
    });

    setSuggestions(suggestionData);
    setIsSearch(true);

    // Clear suggestions if the input field is empty
    if (value === "") {
      setStudEmail("");
      setSuggestions([]);
      setIsSelectedStudent(false);
      setIsSearch(false);
      setSearchStudent("");
      setRowData([]);
      setIsResult(false);
      setIsVSETRecords(false);
    }
  };

  // Function to handle when a suggestion is selected
  const handleSuggestionClick = (suggestion) => {
    setSearchStudent(suggestion.fullName);
    setStudEmail(suggestion.email);
    console.log(studEmail);
    setIsSelectedStudent(true);

    setFilterModel((prevModel) => ({
      items: [
        {
          id: 1,
          field: "test",
          operator: "isAnyOf",
          value: [...prevModel.items[0].value, "Completed"],
        },
      ],
    }));
    // console.log(studEmail);
    // console.log(suggestion);
    setSuggestions([]); // Clear suggestions after selecting one.
    setIsSearch(false);
    console.log();
  };

  var formData = "";

  // fetch records
  const fetchVSETRecords = async () => {
    try {
      console.log("fetching VSET Records");
      const response = await axios.post(
        localStorage.getItem("samwonAPI") + `/api/VSET/Records`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getCookie("user_token"),
          },
        }
      );

      if (response.data !== "") {
        setIsVSETRecords(true);
        //Supply the row data
        response.data.forEach((row) => {
          prRow.push({
            id: row.id,
            date: row.updated_at,
            type: row.drawing_object,
            prof: row.professional,
            status: row.status,
            test: "test",
          });
        });

        console.log(prRow);

        setRowData(prRow);
        setIsResult(true);
      } else {
        console.log("No Records");
        setRowData([]);
        setIsResult(true);
        setIsVSETRecords(false);
      }
    } catch (error) {
      // Handle the error response
      if (error.response) {
        // The server responded with an error status code (e.g., 400, 404, 500, etc.)
        console.error("Error fetching data:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received:", error.request);
      } else {
        // Something else went wrong
        console.error("Error fetching data:", error.message);
      }
    }
  };

  //Request to fetch the VSET Records
  useEffect(() => {
    if (studEmail !== "") {
      // Create a new FormData object
      formData = new FormData();
      // Append the fields to the FormData object
      formData.append("Email", studEmail); // Replace with the actual email

      // Make a POST request to the API endpoint with FormData as the request body

      console.log("calling VSET Records function");
      fetchVSETRecords();
    }
  }, [studEmail]);

  const handleVSET = (objectToDrawn, mode) => {
    console.log(studEmail + " " + objectToDrawn);
    navigate(`/pre-vset/vset?email=${studEmail}&object=${objectToDrawn}&id=${mode}`);
  };

  // Function to toggle the "Statistics Section"
  const goToVSETQuestions = () => {
    window.location.replace("/pre-vset/questions");
  };

  return (
    <>
      <DashboardLayout>
        <DashboardNavbar />
        {allStudent ? (
          <SoftBox py={3}>
            <SoftBox mb={3}>
              <Card>
                <SoftBox display="flex" justifyContent="start" alignItems="center" p={3}>
                  <Grid container lg={12} item xs={12} xl={12} md={12} sm={12}>
                    <Grid
                      display="flex "
                      justify="center"
                      alignItems="center"
                      item
                      lg={4}
                      md={12}
                      sm={12}
                      xs={12}
                    >
                      <SoftBox p={2}>
                        <SoftTypography
                          variant="h6"
                          color="info"
                          sx={{ borderBottom: "3px #FDB813 solid" }}
                          className={"text-center"}
                        >
                          <b>Visual Self-Expression Tool (VSET) Objects</b>
                          <button type="button" onClick={goToVSETQuestions} className="ml-3">
                            <lord-icon
                              src="https://cdn.lordicon.com/wuvorxbv.json"
                              trigger="hover"
                              color="info"
                              stroke="100"
                            ></lord-icon>
                          </button>
                        </SoftTypography>
                      </SoftBox>
                    </Grid>
                    <Grid item lg={8} md={12} sm={12} xs={12}>
                      <span className="w-3/5 mx-3 pr-5 ">
                        <SoftInput
                          placeholder="Type here..."
                          className="w-full"
                          value={searchStudent}
                          onChange={(e) => handleInputChange(e.target.value)}
                          icon={{
                            component: "search ",
                            direction: "left",
                          }}
                        />
                        <SoftBox
                          sx={{
                            marginTop: "-8px",
                            width: "200px",
                          }}
                        >
                          {isSearch ? (
                            debouncedSuggestions.length > 0 ? (
                              <ul className="absolute bg-white border border-gray-300 mt-2 w-full z-10 shadow-lg">
                                {debouncedSuggestions.map((suggestion, index) => (
                                  <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="px-4 py-2 cursor-pointer flex items-center group hover:bg-gray-100"
                                  >
                                    <img
                                      src={suggestion.picture}
                                      alt="Profile"
                                      className="w-8 h-8 rounded-full mr-2"
                                    />
                                    <div className="flex flex-col">
                                      <span className="text-gray-800 font-semibold">
                                        {suggestion.fullName}
                                      </span>
                                      <span className="text-gray-600 text-sm">
                                        {suggestion.email}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <ul className="absolute bg-white border border-gray-300 mt-2 w-full z-10 shadow-lg">
                                <li className="px-4 py-2 justify-start cursor-pointer flex items-center group hover:bg-gray-100">
                                  <div className="flex flex-row items-center">
                                    <lord-icon
                                      src="https://cdn.lordicon.com/kkiecexg.json"
                                      trigger="morph"
                                      stroke="bold"
                                      state="morph-cross"
                                      colors="primary:#0a5c15,secondary:#0a5c15"
                                    ></lord-icon>
                                    <span className="text-gray-600">Student does not exist</span>
                                  </div>
                                </li>
                              </ul>
                            )
                          ) : (
                            <></>
                          )}
                        </SoftBox>
                      </span>
                    </Grid>
                  </Grid>
                </SoftBox>

                {/* Drawing Options */}
                {isSelectedStudent ? (
                  <>
                    <SoftBox p={2}>
                      <Grid
                        container
                        spacing={3}
                        className="w-full flex justify-center items-center"
                      >
                        {/* Draw-A-Tree */}
                        <Grid item xs={12} lg={3} sx={{ position: "relative" }}>
                          <SoftButton
                            variant="gradient"
                            color="info"
                            sx={{
                              width: "100%",
                              height: "100% !important",
                              paddingY: "30px",
                            }}
                            onClick={isSelectedStudent ? () => handleVSET("Tree", "new") : null}
                          >
                            <SoftBox>
                              <SoftBox
                                component="img"
                                src={wavesWhite}
                                alt="waves"
                                display="block"
                                position="absolute"
                                left={0}
                                width="100%"
                                height="100%"
                              />
                              <SoftBox alt="tree" width="100%" pt={3}>
                                <Player
                                  autoplay
                                  loop
                                  src="https://lottie.host/9c494771-52d5-40a1-8483-d2ccc6fad7eb/0lhKv4auih.json"
                                  style={{ height: "160px", width: "100%" }}
                                />
                              </SoftBox>
                              {isSelectedStudent ? (
                                <SoftTypography
                                  className="antialiased hover:subpixel-antialiased"
                                  component="label"
                                  variant="body2"
                                  fontWeight="bold"
                                  fontSize="base"
                                  color="white"
                                  m={1.5}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Add Draw-A-Tree
                                </SoftTypography>
                              ) : null}
                            </SoftBox>
                          </SoftButton>
                        </Grid>
                        {/* Draw-A-House */}
                        <Grid item xs={12} lg={3} sx={{ position: "relative", m: "5" }}>
                          <SoftButton
                            variant="gradient"
                            color="info"
                            sx={{
                              width: "100%",
                              height: "100% !important",
                              paddingY: "30px",
                            }}
                            onClick={isSelectedStudent ? () => handleVSET("House", "new") : null}
                          >
                            <SoftBox>
                              <SoftBox
                                component="img"
                                src={wavesWhite}
                                alt="waves"
                                display="block"
                                position="absolute"
                                left={0}
                                width="100%"
                                height="100%"
                              />
                              <SoftBox alt="house" width="100%" pt={3}>
                                <Player
                                  autoplay
                                  loop
                                  src="https://lottie.host/a5cc7c8a-4893-4a02-9c86-2f94a883c74b/7ljSvbyZII.json"
                                  style={{ height: "160px", width: "100%" }}
                                />
                              </SoftBox>
                              {isSelectedStudent ? (
                                <SoftTypography
                                  className="antialiased hover:subpixel-antialiased"
                                  component="label"
                                  variant="body2"
                                  fontWeight="bold"
                                  fontSize="base"
                                  color="white"
                                  m={1.5}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Add Draw-A-House
                                </SoftTypography>
                              ) : null}
                            </SoftBox>
                          </SoftButton>
                        </Grid>
                        {/* Draw-A-Person */}
                        <Grid item xs={12} lg={3} sx={{ position: "relative", m: "5" }}>
                          <SoftButton
                            variant="gradient"
                            color="info"
                            sx={{
                              width: "100%",
                              height: "100% !important",
                              paddingY: "30px",
                            }}
                            onClick={isSelectedStudent ? () => handleVSET("Person", "new") : null}
                          >
                            <SoftBox>
                              <SoftBox
                                component="img"
                                src={wavesWhite}
                                alt="waves"
                                display="block"
                                position="absolute"
                                left={0}
                                width="100%"
                                height="100%"
                              />
                              <SoftBox alt="person" width="100%" pt={3}>
                                <Player
                                  autoplay
                                  loop
                                  src="https://lottie.host/ea459919-abd0-41c8-8170-438a1b4f9eb6/8hg2FcbBNs.json"
                                  style={{ height: "160px", width: "100%" }}
                                />
                              </SoftBox>
                              {isSelectedStudent ? (
                                <SoftTypography
                                  className="antialiased hover:subpixel-antialiased"
                                  component="label"
                                  variant="body2"
                                  fontWeight="bold"
                                  fontSize="base"
                                  color="white"
                                  m={1.5}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Add Draw-A-Person
                                </SoftTypography>
                              ) : null}
                            </SoftBox>
                          </SoftButton>
                        </Grid>
                      </Grid>
                    </SoftBox>
                  </>
                ) : (
                  <div className={"text-center"}>
                    <h1>Search Student.</h1>
                  </div>
                )}

                {/* ==  VSET Records ==*/}

                <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                  <SoftBox p={2}>
                    <SoftTypography
                      variant="h6"
                      color="info"
                      sx={{ borderBottom: "3px #FDB813 solid" }}
                    >
                      <b>VSET Records</b>
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
                {rowData != 0 ? (
                  <>
                    <DataGrid
                      columns={cols}
                      rows={rowData}
                      //filterModel={filterModel}
                      //onFilterModelChange={(model) => {setFilterModel(model)}}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                        columns: {
                          columnVisibilityModel: {
                            id: true,
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
              </Card>
            </SoftBox>
          </SoftBox>
        ) : (
          <Preloader />
        )}
        <Footer />
      </DashboardLayout>
    </>
  );
}

export default PreVSET;
