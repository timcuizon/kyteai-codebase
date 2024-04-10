// @mui material components
import { useEffect, useState } from "react";
import React from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import DialogActions from "@mui/material/DialogActions";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

//Cards
import Card from "@mui/material/Card";
import SoftButton from "../../../../components/SoftButton/index";
import ReactQuill from "react-quill";
import Creatable from "react-select/creatable";
import SoftAvatar from "components/SoftAvatar";
import swal from "sweetalert";
import { getCookie } from "helpers/CookieHelper";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog, Modal, Typography, useMediaQuery } from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import { isLoggedIn } from "helpers/helpers";
import AppointmentCalendarSVG from "assets/images/appointment-calendar.svg";
import OhNo from "assets/images/oh-no.svg";
import Preloader from "PreLoader";
import SoftInput from "components/SoftInput";
import useDebounce from "hooks/useDebounce";
import { useNavigate } from "react-router-dom";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const counselingConcerns = [
  { value: "2", label: "Facility" },
  { value: "1", label: "Academic" },
  { value: "3", label: "Service" },
  // Add more concerns as needed
];

const modality = [
  { value: "f2f", label: "Face to Face" },
  { value: "gmeet", label: "Google Meet" },
];

// Old Time Options
const amOption = [
  { value: "8", label: "8" },
  { value: "9", label: "9" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
];

const pmOption = [
  { value: "12", label: "12" },
  { value: "13", label: "1" },
  { value: "14", label: "2" },
  { value: "15", label: "3" },
  { value: "16", label: "4" },
  { value: "17", label: "5" },
  { value: "18", label: "6" },
];

const minuteOption = [
  { value: "00", label: "00" },
  { value: "30", label: "30" },
];

const AMPM = [
  { value: "AM", label: "AM" },
  { value: "PM", label: "PM" },
];

// New Option

const timeSlots = [
  { value: "0800", label: "8:00 am" },
  { value: "0830", label: "8:30 am" },
  { value: "0900", label: "9:00 am" },
  { value: "0930", label: "9:30 am" },
  { value: "1000", label: "10:00 am" },
  { value: "1030", label: "10:30 am" },
  { value: "1100", label: "11:00 am" },
  { value: "1130", label: "11:30 am" },
  { value: "1200", label: "12:00 pm" },
  { value: "1230", label: "12:30 pm" },
  { value: "1300", label: "1:00 pm" },
  { value: "1330", label: "1:30 pm" },
  { value: "1400", label: "2:00 pm" },
  { value: "1430", label: "2:30 pm" },
  { value: "1500", label: "3:00 pm" },
  { value: "1530", label: "3:30 pm" },
  { value: "1600", label: "4:00 pm" },
  { value: "1630", label: "4:30 pm" },
  { value: "1700", label: "5:00 pm" },
  { value: "1730", label: "5:30 pm" },
  { value: "1800", label: "6:00 pm" },
];

export default function AppointmentCounselingForm() {

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else if (getCookie("role") == "Parent" || getCookie("role") == "Student"){
      navigate("/appointments")
    }
  });

  useEffect(() => {
    setIsLoading(true);
    fetchAllAppointmentsTime();
  }, []);

  // Date Today
  const today = dayjs().format("YYYY-MM-DD");

  const [parentAffiliate, setParentAffiliate] = useState("");
  const [appDateList, setAppDateList] = useState("");

  const fetchStudentContact = async () => {
    const headers = {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + getCookie("user_token"),
    };

    const formData = new FormData();

    formData.append("email", getCookie("email"));

    await axios
      .post(localStorage.getItem("samwonAPI") + "/api/Appointment/GetStudentContact", formData, {
        headers: headers,
      })
      .then((response) => {
        setParentAffiliate(response.data);
        //console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllAppointmentsTime = async () => {
    await axios
      .get(localStorage.getItem("samwonAPI") + "/api/Appointment/GetAppointment")
      .then((response) => {
        const tempAppList = [];

        response.data.forEach((row) => {
          const rowDateRaw = dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD");

          if (
            rowDateRaw >= today &&
            row.status != "Cancelled" &&
            row.status != "Archived" &&
            row.status != "Completed"
          ) {
            tempAppList.push({
              date: dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format("YYYY-MM-DD"),
              start: dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format("YYYY-MM-DD"),
              start_time: dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format("HH:mm:ss"),
              end_time: dayjs(row["scheduleEnd"], "DD/MM/YYYY hh:mm:ss a").format("HH:mm:ss"),
              backgroundColor: "red",
            });
          }
        });

        setAppDateList(tempAppList);
        
        fetchStudents().then(() => {
          setIsLoading(false);
        })
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var formData = new FormData();

  // Send to database
  const email = getCookie("email");
  const [selectedModality, setSelectedModality] = useState("Face to Face");
  const [selectedConcern, setSelectedConcern] = useState({ value: "2", label: "Facility" });
  const [selectedDate, setSelectedDate] = useState("");
  const [noteValue, setNoteValue] = useState("");

  const [currentUser, setCurrentUser] = useState(true);

  const [clickedDateRaw, setclickedDateRaw] = useState("");
  const [clickedStartTime, setClickedStartTime] = useState("");
  const [clickedEndime, setClickedEndTime] = useState("");
  const [clickedDateStr, setclickedDateStr] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);

  const [selectedPersonalInfo, setSelectedPersonalInfo] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");

  const [previousDateClicked, setPreviousDateClicked] = useState();

  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const [notAvailableTime, setNotAvailableTime] = useState([...timeSlots]);

  const [startTimeOption, setStartTimeOption] = useState([...timeSlots]);
  const [endTimeOption, setEndTimeOption] = useState([...timeSlots]);

  const handleEventClickDate = (info) => {
    var currentDate = dayjs().format("YYYY-MM-DD");
    const strDay = dayjs(info.dateStr).format("dddd");
    if (info.dateStr > currentDate && strDay != "Saturday" && strDay != "Sunday") {
      const date = dayjs(info.dateStr);

      var currentDateApp = [];

      appDateList.forEach((row) => {
        if (row.date == info.dateStr) {
          currentDateApp.push({
            start: parseInt(dayjs(`2024-01-01 ${row.start_time}`).format("HHmm")),
            end: parseInt(dayjs(`2024-01-01 ${row.end_time}`).format("HHmm")),
          });
        }
      });

      currentDateApp.sort((a, b) => a["start"] - b["start"]);

      const startTimeSlots = [...timeSlots];
      var spliced = 0;

      currentDateApp.forEach((row) => {
        const currentTimeStartVal = row.start;
        const currentTimeEndVal = row.end;

        startTimeSlots.forEach((row, index) => {
          const timeVal = parseInt(dayjs(`2024-01-01 ${row.value}`).format("hhmm"));
          var currentVal = currentTimeStartVal;
          var count = 0;

          if (timeVal == currentTimeStartVal) {
            while (currentVal < currentTimeEndVal) {
              count += 1;

              if (currentVal % 100 == 0) {
                currentVal += 30;
              } else {
                currentVal += 70;
              }
            }
          }

          startTimeSlots.splice(index - spliced, count);
        });
      });

      if (startTimeSlots.length > 1) {
        var endTimeSlots = [...timeSlots];

        const optionTimeVal = parseInt(
          dayjs("2024-01-01 " + startTimeSlots[0].value).format("HHmm")
        );
        var spliced = 0;

        endTimeSlots = endTimeSlots.filter((filter) => {
          return parseInt(dayjs(`2024-01-01 ${filter.value}`).format("HHmm")) > optionTimeVal;
        });

        var earlyStop = false;
        var lastStop = 0;

        currentDateApp.forEach((row) => {
          if (row.start >= optionTimeVal && !earlyStop) {
            lastStop = row.start;
            earlyStop = true;
          }
        });

        if (earlyStop) {
          endTimeSlots = endTimeSlots.filter((filter) => {
            return parseInt(dayjs(`2024-01-01 ${filter.value}`).format("HHmm")) <= lastStop;
          });
        }

        if (previousDateClicked != null) {
          previousDateClicked.dayEl.style.backgroundColor = "white";
          previousDateClicked.dayEl.style.color = "black";
        }
        console.log(info);
        info.dayEl.style.backgroundColor = "#1E4C2B";
        info.dayEl.style.color = "white";

        setclickedDateRaw(info.dateStr);
        setclickedDateStr(date.format("dddd, MMMM DD, YYYY"));

        setNotAvailableTime(currentDateApp);

        setSelectedStartTime(startTimeSlots[0]);

        setSelectedEndTime("");

        setSelectedEndTime(endTimeSlots[0]);
        setEndTimeOption(endTimeSlots);

        setSelectedStartTime(startTimeSlots[0]);
        setStartTimeOption(startTimeSlots);

        setPreviousDateClicked(info);
      } else {
        setErrorModal(true);
      }
    } else {
      setErrorModal(true);
    }
  };

  const handleStartTimeChange = (option) => {
    setSelectedStartTime(option);

    setSelectedEndTime("");

    var endTimeSlots = [...timeSlots];

    const optionTimeVal = parseInt(dayjs("2024-01-01 " + option.value).format("HHmm"));
    var spliced = 0;

    endTimeSlots = endTimeSlots.filter((filter) => {
      return parseInt(dayjs(`2024-01-01 ${filter.value}`).format("HHmm")) > optionTimeVal;
    });

    var earlyStop = false;
    var lastStop = 0;
    notAvailableTime.forEach((row) => {
      if (row.start >= optionTimeVal && !earlyStop) {
        lastStop = row.start;
        earlyStop = true;
      }
    });

    if (earlyStop) {
      endTimeSlots = endTimeSlots.filter((filter) => {
        return parseInt(dayjs(`2024-01-01 ${filter.value}`).format("HHmm")) <= lastStop;
      });
    }

    setSelectedEndTime(endTimeSlots[0]);
    setEndTimeOption(endTimeSlots);
  };

  const handleSubmit = (e) => {
    if (
      selectedConcern != "" &&
      selectedModality != "" &&
      selectedStartTime != "" &&
      selectedEndTime != "" &&
      selectedChild != ""
    ) {
      swal({
        title: "Confirmation of Schedule",
        text: "Have you inputted the correct information?",
        icon: "warning",
        buttons: true,
      }).then((willDelete) => {
        if (willDelete) {
          setIsLoading(true)
          // alert("Saved");
          formData.append("email", selectedChild.email);
          formData.append("affiliateEmail", null);
          formData.append("profEmail", getCookie("email")); 
          formData.append(
            "schedule",
            clickedDateRaw + " " + dayjs("2024-01-01 " + selectedStartTime.value).format("HH:mm")
          );
          formData.append(
            "scheduleEnd",
            clickedDateRaw + " " + dayjs("2024-01-01 " + selectedEndTime.value).format("HH:mm")
          );
          formData.append("status", selectedScheduleType.value == "ms" ? "8" : "2");
          formData.append("modality", selectedScheduleType.value == "ms" ? "unavailable" : selectedModality);
          formData.append("concern", selectedConcern["value"]);
          formData.append("notes", noteValue);

          submitData();
        }
      });
    } else {
      swal({
        title: "Input not filled",
        text: "There are still inputs that need to be filled",
        icon: "warning",
        buttons: "confirm",
        dangerMode: true,
      });
    }
  };

  const submitData = async () => {

    axios
      .post(localStorage.getItem("samwonAPI") + `/api/Appointment/SubmitSchedule`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        },
      })
      .then((response) => {
        // Display the response data in the console
        //console.log(response.data);
        if (response.data != "") {

          if(personInvolved.length > 0){

            var error = false;

            for (let ind = 0; ind < personInvolved.length; ind++) {
              const row = personInvolved[ind];

              var noError = true;

              console.log(parseInt(response.data.slice(3, 10)).toString())
              
              formData = new FormData();

              formData.append("appointmentId", parseInt(response.data.slice(3, 10)).toString());
              formData.append("role", row.role);
              formData.append("userEmail", row.email);
              formData.append("profEmail", getCookie("email"));
              
              axios
                .post(localStorage.getItem("samwonAPI") + `/api/Appointment/SubmitPersonInvolved`, formData, {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + getCookie("user_token"),
                  },
                }).then((response) => {
                  if(response.data != "Succes"){
                    noError = false;
                  }
                })

              if(!noError){
                setIsLoading(false);
                swal({
                  title: "There is an error!",
                  text: "Form has not been submitted correctly!",
                  icon: "error",
                }).then(() => {
                  window.location.replace("/appointments");
                });
                break;
              }
            }
            
            setIsLoading(false);
            swal({
              title: response.data.toString(),
              text: "Form have been submitted!",
              icon: "success",
              timer: 3000,
            }).then(() => {
              window.location.replace("/appointments");
            });
          } else {

            setIsLoading(false);
            swal({
              title: response.data.toString(),
              text: "Form have been submitted!",
              icon: "success",
              timer: 3000,
            }).then(() => {
              //window.location.replace("/appointments");
            });
          }
          
        } else {
          setIsLoading(false);
          swal({
            title: "There is an error!",
            text: "Form has not been submitted!",
            icon: "error",
          }).then(() => {});
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        swal({
          title: "There is an error!",
          text: "Form has not been submitted!",
          icon: "error",
        }).then(() => {});
      });
  };

  //open modal for affiliate appointment
  const [open, setOpen] = React.useState(false);

  const [timeModal, setTimeModal] = React.useState(false);

  const [errorModal, setErrorModal] = React.useState(false);
  const handleSetErrorModalClose = () => setErrorModal(false);

  //exit modal for affiliate appointment
  const [isAffilliateSelected, setIsAffilliateSelected] = useState(false);
  const [affilliateModal, setAffilliateModal] = useState(false);

  const handleClickAffiliate = () => {
    setAffilliateModal(true);
  };

  const handleAffilliateOpen = () => {
    setIsAffilliateSelected(true);
    setAffilliateModal(false);
  };

  const handleCancelAffiliate = () => {
    setSelectedStudent("");
    setSelectedPersonalInfo("");
    setIsAffilliateSelected(false);
  };

  const handleAffiliateModal = () => {
    setAffilliateModal(false);
  };

  const isSmallScreen = useMediaQuery("(min-width:1400px)");

  const [isLoading, setIsLoading] = useState(true);

  const [studEmail, setStudEmail] = useState("");
  const [selectedChild, setselectedChild] = useState("");
  const [allStudent, setAllStudent] = useState([]);
  // Search Records
  const [isSearch, setIsSearch] = useState(false);
  const [isSearch2, setIsSearch2] = useState(false);
  const [searchStudent, setSearchStudent] = useState("");
  const [searchStudent2, setSearchStudent2] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const debouncedSuggestions = useDebounce(suggestions);
  const debouncedSuggestions2 = useDebounce(suggestions2);

  const [personInvolved, setPersonInvolved] = useState([]);

  const fetchStudents = async () => {
    console.log("response.data");
    try {
      // Define your headers here with JWT Claims
      const headers = {
        Authorization: "Bearer " + getCookie("user_token"),
        "Content-Type": "application/json",
      };

      // Make the POST request with the headers
      const response = await axios.post(
        localStorage.getItem("samwonAPI") + "/api/Appointment",
        {},
        {
          headers: headers,
        }
      );

      // Save all records of active students

      console.log("response.data");
      console.log(response.data);
      setAllStudent(response.data);
      
      setIsLoading(false);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
        role: student.role
      };
    });

    setSuggestions(suggestionData);
    setIsSearch(true);

    // Clear suggestions if the input field is empty
    if (value === "") {
      setSuggestions([]);
      setIsSearch(false);
      setSearchStudent("");
    }
  };


  const handleInputChange2 = (value) => {
    setSearchStudent2(value);

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
        role: student.role
      };
    });

    var suggestionA = suggestionData.filter((filter) => filter.email != selectedChild.email);

    if(personInvolved.length > 0) {
      personInvolved.forEach((row) => {
        suggestionA = suggestionA.filter((filter) => filter.email != row.email);
      })
    }

    setSuggestions2(suggestionA);
    setIsSearch2(true);

    // Clear suggestions if the input field is empty
    if (value === "") {
      setSuggestions2([]);
      setIsSearch2(false);
      setSearchStudent2("");
    }
  }
  // Function to handle when a suggestion is selected
  const handleSuggestionClick = (suggestion) => {
    setSearchStudent("");
    setselectedChild({
      picture: suggestion.picture,
      fullname: suggestion.fullName,
      email: suggestion.email,
      role: suggestion.role
    });
    console.log(studEmail);
    console.log(suggestion);
    setSuggestions2([]); // Clear suggestions after selecting one.
    setIsSearch(false);
  };
  
  // Function to handle when a suggestion is selected
  const handleSuggestionClick2 = (suggestion) => {
    setSearchStudent2("");
    setSuggestions2([]); // Clear suggestions after selecting one.
    setIsSearch2(false);
    const pInvolved = [...personInvolved];

    pInvolved.push({
      picture: suggestion.picture,
      fullname: suggestion.fullName,
      email: suggestion.email,
      role: suggestion.role
    })

    setPersonInvolved(pInvolved);
  };

  const [selectedScheduleType, setSelectedScheduleType] = useState({value: "st", label: "Student"});

  const activityType = [
    {value:"4", label:"I'm Unavailable"},
    {value:"5", label:"There's an Event"},
    {value:"6", label:"Holiday"},
  ]

  const removePersonInvolved = (ind) => {


    const pInvolved = [...personInvolved];
    pInvolved.splice(ind, 1)
    setPersonInvolved(pInvolved);
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <DashboardLayout>
      <DashboardNavbar />

      {/* Form Starts */}

      <form action="" id="appointment-counseling-form" method="post">
        <Grid container spacing={2} item xs={12}>
          <Grid item lg={7} xs={12} spacing={2} id={"testing"}>
            <Card
              sx={{ marginBottom: "20px", paddingLeft: "30px", overflow: "visible", zIndex: "100" }}
            >
              {clickedDateStr != "" ? (
                <>
                  <Grid container mt={3}>
                    <Grid container lg={12} item xs={12} xl={12} md={12} sm={12}>
                      <SoftTypography
                        color="info"
                        component="label"
                        variant="h6"
                        fontWeight="bold"
                        ml={1}
                        sx={{ borderBottom: "3px #FDB813 solid" }}
                      >
                        You selected the date of : 
                        <span
                          style={{
                            backgroundColor: "#1E4C2B",
                            margin: "0 5px 0 5px",
                            padding: "5px",
                            borderRadius: "5px",
                            border: "white 10px solid"
                          }}
                        >
                          <SoftTypography
                            color="colorISMyellow"
                            component="label"
                            variant={"h6"}
                            fontWeight="bold"
                          >
                            {clickedDateStr}
                          </SoftTypography>
                        </span>
                      </SoftTypography>
                    </Grid>

                    <Grid item xs={12}>
                      <div
                        style={{ width: "200px", display: "inline-block", margin: "0 10px 0 10px" }}
                      >
                        <SoftTypography
                          color="info"
                          component="label"
                          variant="h6"
                          fontWeight="bold"
                        >
                          Starting at:
                        </SoftTypography>
                        <Creatable
                          styles={{
                            control: (provided, state) => ({
                              ...provided,  
                              borderColor: state.isFocused ? "#296b3b" : "#296b3b",
                              boxShadow: state.isFocused ? "0 0 0 1px #296b3b" : " null",
                              minHeight: "32px", // Adjust the height to make it smaller
                              fontSize: "14px", // Adjust the font size"
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isFocused ? "#1E4C2B" : "#ffffff",
                              color: state.isFocused ? "#ffffff" : "#000000", // Corrected this line
                              minHeight: "32px", // Adjust the height to make it smaller
                              fontSize: "14px", // Adjust the font size
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              color: "#000000 !important", // Set text color when an option is selected
                            }),
                          }}
                          options={startTimeOption}
                          value={selectedStartTime}
                          isSearchable={false}
                          onChange={handleStartTimeChange}
                          placeholder="Start"
                          size="smaller"
                        />
                      </div>
                      <div
                        style={{ width: "200px", display: "inline-block", margin: "0 10px 0 10px" }}
                      >
                        <SoftTypography
                          color="info"
                          component="label"
                          variant="h6"
                          fontWeight="bold"
                        >
                          Until:
                        </SoftTypography>
                        <Creatable
                          styles={{
                            control: (provided, state) => ({
                              ...provided,
                              borderColor: state.isFocused ? "#296b3b" : "#296b3b",
                              boxShadow: state.isFocused ? "0 0 0 1px #296b3b" : " null",
                              minHeight: "32px", // Adjust the height to make it smaller
                              fontSize: "14px", // Adjust the font size
                            }),
                            option: (provided, state) => ({
                              ...provided,
                              backgroundColor: state.isFocused ? "#1E4C2B" : "#ffffff",
                              color: state.isFocused ? "#ffffff" : "#000000", // Corrected this line
                              minHeight: "32px", // Adjust the height to make it smaller
                              fontSize: "14px", // Adjust the font size
                            }),
                            singleValue: (provided) => ({
                              ...provided,
                              color: "#000000 !important", // Set text color when an option is selected
                            }),
                          }}
                          options={endTimeOption}
                          value={selectedEndTime}
                          isSearchable={false}
                          onChange={(option) => {
                            setSelectedEndTime(option);
                          }}
                          placeholder="End"
                          size="smaller"
                        />
                      </div>
                    </Grid>
                  </Grid>
                  <Divider />
                </>
              ) : (
                <>
                  <SoftBox mt={3}>
                    <SoftTypography
                      color="info"
                      component="label"
                      variant="h5"
                      fontWeight="bold"
                      sx={{ borderBottom: "3px #FDB813 solid" }}
                    >
                      Select your preferred date by clicking the calendar.
                    </SoftTypography>
                  </SoftBox>
                  <Divider />
                </>
              )}
            </Card>

            <Card sx={{ display: "relative" }}>
              <SoftBox
                className={`opacity-0`}
                sx={{
                  opacity: isDateSelected ? 0 : 1,
                  padding: "2rem",
                }}
              >
                <div id="userAppointment">
                  <FullCalendar
                    id={"testing"}
                    className={`${isDateSelected ? "opacity-0" : ""} z-0 mt-5`}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    editable="true"
                    selectable="false"
                    eventBorderColor="#1EAB89"
                    eventReceive="testing"
                    titleFormat={{ year: "numeric", month: "short", day: "2-digit" }}
                    dateClick={handleEventClickDate}
                    headerToolbar={{
                      left: "prev,next",
                      center: "title",
                      themeSystem: "#1EAB89",
                      right: "dayGridWeek,dayGridMonth,dayGridDay",
                    }}
                    aspectRatio="auto"
                    contentHeight="auto"
                    updateSize="true"
                    validRange={{
                      start: dayjs().add(1, "day").format("YYYY-MM-DD"),
                    }}
                  />
                </div>
              </SoftBox>
            </Card>
          </Grid>

          <Grid item lg={5} md={12} sm={12} xs={12} spacing={2}>
            <SoftBox mb={2}>
              <Card sx={{ padding: "2rem", overflow: "visible" }}>
                <SoftBox mb={2}>
                  <SoftTypography
                    color="info"
                    component="label"
                    variant="h5"
                    fontWeight="bold"
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                    mr={3}
                  >
                    Book for:
                  </SoftTypography>
                </SoftBox>
                <Creatable
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: state.isFocused ? "#296b3b" : "#296b3b",
                      boxShadow: state.isFocused ? "0 0 0 1px #296b3b" : " null",
                      minHeight: "32px", // Adjust the height to make it smaller
                      fontSize: "14px", // Adjust the font size
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#1E4C2B" : "#ffffff",
                      color: state.isFocused ? "#ffffff" : "#000000", // Corrected this line
                      minHeight: "32px", // Adjust the height to make it smaller
                      fontSize: "14px", // Adjust the font size
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#000000 !important", // Set text color when an option is selected
                    }),
                  }}
                  isClearable={false}
                  isSearchable={false}
                  options={[
                    {value: "ms", label: "Myself"},
                    {value: "st", label: "Student / Parent"}
                  ]}
                  value={selectedScheduleType}
                  onChange={(selectedOption) => {
                    setSelectedScheduleType(selectedOption);
                    if(selectedOption.value == "ms"){
                      setselectedChild({
                        email: getCookie("email")
                      })
                      setSelectedConcern(activityType[0])
                    } else {
                      setselectedChild("");
                      setSelectedConcern(counselingConcerns[0])
                    }
                  }}
                  placeholder="Select . . ."
                  size="small"
                />
              { selectedScheduleType.value == "st" ? selectedChild != "" ? (
                <>
                  <SoftBox position="relative" height="100%">
                    
                    <SoftBox my={2}>
                      <SoftTypography
                        color="info"
                        component="label"
                        variant="h5"
                        fontWeight="bold"
                        sx={{ borderBottom: "3px #FDB813 solid" }}
                      >
                        Student Information
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox
                      display="flex"
                      flexDirection="column"
                      height="100%"
                      borderRadius="lg"
                      marginLeft="1rem"
                    >
                      <Grid
                        container
                        lg={12}
                        item
                        xs={12}
                        xl={12}
                        md={12}
                        sm={12}
                        justifyContent="center"
                      >
                        <Grid
                          item
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                          display="flex"
                          alignItems="center"
                          justifyContent={isSmallScreen ? "start" : "center"}
                          flexDirection={isSmallScreen ? "row" : "column"}
                        >
                          <SoftAvatar
                            src={selectedChild.picture}
                            alt="profile-image"
                            variant="rounded"
                            size="lg"
                            shadow="sm"
                          />
                          <SoftBox
                            display="flex"
                            flexDirection="column"
                            alignItems={isSmallScreen ? "start" : "center"}
                            justifyContent="center"
                            p={2}
                          >
                            <SoftTypography
                              color="dark"
                              component="label"
                              variant="body2"
                              fontWeight="bold"
                            >
                              {selectedChild.fullname} ({selectedChild.role})
                            </SoftTypography>
                            <SoftTypography color="dark" component="label" variant="body2" noWrap>
                              {selectedChild.email}
                            </SoftTypography>
                          </SoftBox>
                        </Grid>
                      </Grid>
                      <SoftBox mt={2}>
                        <SoftButton
                          variant="contained"
                          color="info"
                          sx={{ width: "100%" }}
                          onClick={() => {
                            setselectedChild("");
                            setSearchStudent("");
                            setSearchStudent2("");
                            setPersonInvolved([]);
                          }}
                        >
                          Reselect User
                        </SoftButton>
                      </SoftBox>
                    </SoftBox>
                  </SoftBox>
                  
                  <SoftBox my={2}>
                    <SoftTypography
                      color="info"
                      component="label"
                      variant="h5"
                      fontWeight="bold"
                      sx={{ borderBottom: "3px #FDB813 solid" }}
                      mr={3}
                    >
                      Add a Person Involved
                    </SoftTypography>
                  </SoftBox>

                  <span className=" mx-3 pr-5 ">
                    <SoftInput
                      placeholder="Type here..."
                      className="w-full"
                      value={searchStudent2}
                      onChange={(e) => handleInputChange2(e.target.value)}
                      icon={{
                        component: "search ",
                        direction: "left",
                      }}
                    />
                    <SoftBox
                      sx={{
                        marginTop: "-8px",
                      }}
                    >
                      {isSearch2 ? (
                        debouncedSuggestions2.length > 0 ? (
                          <ul className="absolute bg-white border border-gray-300 mt-2 w-full z-10 shadow-lg">
                            {debouncedSuggestions2.map((suggestion, index) => (
                              <li
                                key={index}
                                onClick={() => handleSuggestionClick2(suggestion)}
                                className="px-4 py-2 cursor-pointer flex items-center group hover:bg-gray-100"
                              >
                                <img
                                  src={suggestion.picture}
                                  alt="Profile"
                                  className="w-8 h-8 rounded-full mr-2"
                                />
                                <div className="flex flex-col">
                                  <span className="text-gray-800 font-semibold">
                                    {suggestion.fullName} ({suggestion.role})
                                  </span>
                                  <span className="text-gray-600 text-sm">{suggestion.email}</span>
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
                                <span className="text-gray-600">User does not exist</span>
                              </div>
                            </li>
                          </ul>
                        )
                      ) : (
                        <></>
                      )}
                    </SoftBox>
                  </span>

                  {personInvolved.length > 0 ? (
                    <>
                      <SoftBox my={2}>
                        <SoftTypography
                          color="info"
                          component="label"
                          variant="h5"
                          fontWeight="bold"
                          sx={{ borderBottom: "3px #FDB813 solid" }}
                          mr={3}
                        >
                          Person Involved
                        </SoftTypography>
                      </SoftBox>
                      
                      {personInvolved.map((row, ind) => (
                        <Grid
                          container
                          lg={12}
                          item
                          xs={12}
                          xl={12}
                          md={12}
                          sm={12}
                          justifyContent="center"
                        >
                          <Grid
                            item
                            lg={12}
                            md={12}
                            sm={12}
                            xs={12}
                            display="flex"
                            alignItems="center"
                            justifyContent={isSmallScreen ? "start" : "center"}
                            flexDirection={isSmallScreen ? "row" : "column"}
                          >
                            <SoftAvatar
                              src={row.picture}
                              alt="profile-image"
                              variant="rounded"
                              size="lg"
                              shadow="sm"
                            />
                            <SoftBox
                              display="flex"
                              flexDirection="column"
                              alignItems={isSmallScreen ? "start" : "center"}
                              justifyContent="center"
                              p={2}
                            >
                              <SoftTypography
                                color="dark"
                                component="label"
                                variant="body2"
                                fontWeight="bold"
                              >
                                {row.fullname} ({row.role})
                              </SoftTypography>
                              <SoftTypography color="dark" component="label" variant="body2" noWrap>
                                {row.email}
                              </SoftTypography>
                            </SoftBox>
                            <SoftButton
                              className="inline-block"
                              color={"colorISMgreen"}
                              onClick={() => removePersonInvolved(ind)}
                            >
                              Remove
                            </SoftButton>
                          </Grid>
                        </Grid>
                      ))}
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  <SoftBox my={2}>
                    <SoftTypography
                      color="info"
                      component="label"
                      variant="h5"
                      fontWeight="bold"
                      sx={{ borderBottom: "3px #FDB813 solid" }}
                      mr={3}
                    >
                      Search Student & Parent
                    </SoftTypography>
                  </SoftBox>

                  <span className=" mx-3 pr-5 ">
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
                                    {suggestion.fullName} ({suggestion.role})
                                  </span>
                                  <span className="text-gray-600 text-sm">{suggestion.email}</span>
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
                                <span className="text-gray-600">User does not exist</span>
                              </div>
                            </li>
                          </ul>
                        )
                      ) : (
                        <></>
                      )}
                    </SoftBox>
                  </span>
                </>
              ) : null}
            </Card>
            </SoftBox>

            <Card sx={{ paddingX: "2rem", paddingBottom: "2rem" }}>
              <SoftBox mt={2}>
                <SoftTypography
                  color="info"
                  component="label"
                  variant="h5"
                  fontWeight="bold"
                  sx={{ borderBottom: "3px #FDB813 solid" }}
                >
                  Appointment Information
                </SoftTypography>
              </SoftBox>
              <Divider />
              
              <SoftBox>
                <SoftTypography color="dark" component="label" variant="caption" fontWeight="bold">
                  {selectedScheduleType.value != "ms" ? "Type of Concern" : "Schedule reason: "}
                </SoftTypography>
                <Creatable
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      borderColor: state.isFocused ? "#296b3b" : "#296b3b",
                      boxShadow: state.isFocused ? "0 0 0 1px #296b3b" : " null",
                      minHeight: "32px", // Adjust the height to make it smaller
                      fontSize: "14px", // Adjust the font size
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#1E4C2B" : "#ffffff",
                      color: state.isFocused ? "#ffffff" : "#000000", // Corrected this line
                      minHeight: "32px", // Adjust the height to make it smaller
                      fontSize: "14px", // Adjust the font size
                    }),
                    singleValue: (provided) => ({
                      ...provided,
                      color: "#000000 !important", // Set text color when an option is selected
                    }),
                  }}
                  isClearable={false}
                  isSearchable={false}
                  options={selectedScheduleType.value != "ms" ? counselingConcerns : activityType}
                  value={selectedConcern}
                  onChange={(selectedOption) => {
                    setSelectedConcern(selectedOption);
                  }}
                  placeholder="Type of Concern"
                  size="small"
                />
              </SoftBox>
              {
                selectedScheduleType.value != "ms" ? 
                (
                  <>
    
                  {/* Radio group */}
    
                  <SoftBox>
                    <SoftTypography color="dark" component="label" variant="caption" fontWeight="bold">
                      Type of Modality
                    </SoftTypography>
                    <RadioGroup
                      aria-label="modality"
                      name="modality"
                      value={selectedModality}
                      onChange={(e) => setSelectedModality(e.target.value)}
                      sx={{
                        flexDirection: "row", // Arrange radio buttons horizontally
                        justifyContent: "center", // Center the radio group horizontally
                        alignItems: "center", // Center the radio group vertically
                      }}
                    >
                      <FormControlLabel
                        value={"Face to Face"}
                        control={<Radio />}
                        label={"Face to Face"}
                        sx={{
                          color: "#1E4C2B",
                          "& .MuiSvgIcon-root": {
                            fontSize: "1rem", // Adjust the radio button size
                          },
                        }}
                      />
                      <FormControlLabel
                        value={"Online"}
                        control={<Radio />}
                        label={"Online"}
                        sx={{
                          color: "#1E4C2B",
                          "& .MuiSvgIcon-root": {
                            fontSize: "1rem", // Adjust the radio button size
                          },
                        }}
                      />
                    </RadioGroup>
                  </SoftBox>
                  </>
                ) : null
              }

              {/* Other Information */}
              <SoftBox mb={1} mt={2}>
                <SoftTypography
                  color="info"
                  component="label"
                  variant="h5"
                  fontWeight="bold"
                  sx={{ borderBottom: "3px #FDB813 solid" }}
                >
                  Other Information
                </SoftTypography>
              </SoftBox>

              <SoftBox mb={1}>
                <SoftTypography
                  color="gray"
                  component="label"
                  variant="caption"
                  fontWeight="normal"
                >
                  Your opinion helps the guidance counselor understand the situation better.
                </SoftTypography>

                <ReactQuill h={200} theme="snow" value={noteValue} onChange={setNoteValue} />
              </SoftBox>

              <SoftBox justifyContent="center" display="flex" alignItems="center" m={3}>
                <SoftButton
                  variant="gradient"
                  color="info"
                  size="medium"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </SoftButton>
              </SoftBox>
            </Card>
          </Grid>
        </Grid>
      </form>

      {/* Form Ends */}

      {/* Form Modals Start */}

      <Dialog
        open={affilliateModal}
        onClose={handleAffiliateModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth={true} //size
        maxWidth={"lg"}
      >
        <SoftBox p={3}>
          <form action="" id="appointment-counseling-form" method="post">
            <SoftBox mb={2}>
              <Card sx={{ padding: "2rem" }}>
                <SoftBox position="relative" height="100%">
                  <SoftBox display="flex" flexDirection="column" height="100%" borderRadius="lg">
                    <SoftBox mb={1}>
                      <SoftTypography
                        color="info"
                        component="label"
                        variant="h5"
                        fontWeight="bold"
                        sx={{ borderBottom: "3px #FDB813 solid" }}
                      >
                        Affiliate Information
                      </SoftTypography>
                      <Divider />
                    </SoftBox>

                    <RadioGroup
                      aria-label="modality"
                      name="modality"
                      value={selectedPersonalInfo}
                      onChange={(e) => {
                        setSelectedPersonalInfo(e.target.value);
                        setSelectedStudent(parentAffiliate[e.target.value]);
                      }}
                      sx={{
                        flexDirection: "row", // Arrange radio buttons horizontally
                        justifyContent: "center", // Center the radio group horizontally
                        alignItems: "center", // Center the radio group vertically
                      }}
                    >
                      {/* is Visible if parent account being used  */}
                      {parentAffiliate.length != 0
                        ? parentAffiliate.map((data, index) => (
                            <Grid
                              container
                              lg={12}
                              spacing={2}
                              item
                              xs={12}
                              xl={12}
                              md={12}
                              sm={12}
                              mb={3}
                            >
                              <Grid
                                item
                                lg={1}
                                md={12}
                                sm={12}
                                xs={12}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                mr={3}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <SoftAvatar
                                  src={data.picture}
                                  alt="profile-image"
                                  variant="rounded-full"
                                  size="xxl"
                                  shadow="sm"
                                />
                              </Grid>
                              <Grid
                                item
                                lg={5}
                                md={12}
                                sm={12}
                                xs={12}
                                display="flex"
                                alignItems="center"
                                justifyContent="start"
                              >
                                <SoftBox>
                                  <SoftTypography
                                    color="dark"
                                    component="label"
                                    variant="h4"
                                    fontWeight="bold"
                                  >
                                    {data.studentName}
                                  </SoftTypography>
                                  <br />
                                  <SoftTypography color="dark" component="label" variant="body1">
                                    {data.email}
                                  </SoftTypography>
                                </SoftBox>
                              </Grid>
                              <Grid
                                item
                                lg={5}
                                md={12}
                                sm={12}
                                xs={12}
                                key={index}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <SoftBox
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <FormControlLabel
                                    key={index}
                                    value={index}
                                    control={
                                      <Radio
                                        sx={{
                                          color: "#1E4C2B",
                                          "&.Mui-checked": { color: "#1E4C2B" },
                                        }}
                                      />
                                    }
                                    label={"Select"}
                                    sx={{
                                      color: "#1E4C2B",
                                      "& .MuiSvgIcon-root": {
                                        fontSize: "1rem", // Adjust the radio button size
                                      },
                                    }}
                                  />
                                </SoftBox>
                              </Grid>
                            </Grid>
                          ))
                        : null}
                    </RadioGroup>
                  </SoftBox>
                </SoftBox>
              </Card>
            </SoftBox>
          </form>

          <SoftBox
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            {/* <SoftBox
            component="img"
            src={OhNo}
            alt="waves"
            left={0}
            width="100%"
            height="260px"
            py={2}
            pr={0.5}
          /> */}
            <SoftBox mr={1}>
              <SoftButton
                variant="gradient"
                style={{ backgroundColor: "#DC3545", color: "white" }}
                onClick={handleAffiliateModal}
              >
                Cancel
              </SoftButton>
            </SoftBox>
            <SoftBox>
              <SoftButton variant="gradient" color="info" onClick={handleAffilliateOpen}>
                Save Changes
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Dialog>

      <Dialog
        open={errorModal}
        onClose={handleSetErrorModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth={true} //size
        maxWidth={"lg"}
      >
        <SoftBox padding={3}>
          <SoftBox
            component="img"
            src={OhNo}
            alt="waves"
            left={0}
            width="100%"
            height="260px"
            py={2}
            pr={0.5}
          />
          <SoftBox justifyContent="center" display="flex" alignItems="center">
            <SoftTypography variant="h5" color="info" fontWeight="bold">
              You can't set an appointment within this day
            </SoftTypography>
          </SoftBox>
        </SoftBox>
      </Dialog>

      <Footer />
    </DashboardLayout>
  );
}
