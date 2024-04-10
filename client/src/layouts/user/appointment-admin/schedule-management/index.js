// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// component pages
import SoftTypography from "components/SoftTypography";
import UserInformation from "layouts/user/appointment-admin/appointment-list/component/information.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { isLoggedIn } from "helpers/helpers";
import axios from "axios";
import dayjs from "dayjs";
import { getCookie } from "helpers/CookieHelper";
import SoftButton from "components/SoftButton";
import { Dialog, Divider, Icon, Typography, useMediaQuery } from "@mui/material";
import swal from "sweetalert";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Creatable, { useCreatable } from "react-select/creatable";
import TimeSelectModal from "layouts/user/appointment-counseling/Components/TimeSelectModal";
import Preloader from "PreLoader";
import SoftAvatar from "components/SoftAvatar";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function ScheduleManagement() {
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

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  //handle for ie of Not
  const [ie, setIE] = useState(0);
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessionals, setSelectedProfessionals] = useState("");
  // For Appointment Data
  const [data, setData] = useState("");
  const [appDate, setDate] = useState("");
  const [appTime, setTime] = useState("");
  const [event, setEvent] = useState("");
  const [appEvent, setAppEvent] = useState("");
  const [appDateList, setAppDateList] = useState("");
  // Reschedule Boolean
  const [isRescheduling, setIsRescheduling] = useState(false);
  // Date Today
  const today = dayjs().format("YYYY-MM-D");

  const navigate = useNavigate();

  const calendarRef = useRef(null);
  const [currentApp, setCurrentApp] = useState();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    }
  });

  useEffect(() => {
    if (searchParams.get("id") != "") {
      updateRecords(searchParams.get("id"));
      setIE(getCookie("ie"));
      fetchAllProfessionals();
      fetchAllAppointmentsTime();
    }
  }, [searchParams.get("id")]);

  const [personInvolved, setPersonInvolved] = useState([]);

  const fetchAllAppointmentsTime = () => {
    axios
      .get(localStorage.getItem("samwonAPI") + "/api/Appointment/GetAppointment")
      .then((response) => {
        const tempAppList = [];

        response.data.forEach((row) => {
          const rowDateRaw = dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD");

          if (rowDateRaw >= today) {
            tempAppList.push({
              date: dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format("YYYY-MM-DD"),
              start: dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format("YYYY-MM-DD"),
              start_time: dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format("HH:mm:ss"),
              end_time: dayjs(row["scheduleEnd"], "DD/MM/YYYY hh:mm:ss a").format("HH:mm:ss"),
              backgroundColor: "red",
            });
          }
        });

        setIsLoading(false);
        setAppDateList(tempAppList);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchAllProfessionals = () => {
    axios
      .get(localStorage.getItem("samwonAPI") + `/api/Appointment/GetProfessionals`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        },
      })
      .then((response) => {
        var professionals_arr = [];
        //console.log(response.data);
        //response.data.map((data, index) => console.log(professionals_arr.push(data["email"])));
        //console.log(professionals_arr);

        if (typeof(response.data) != "string"){
          response.data.forEach((data) => {
            professionals_arr.push({
              value: data.email,
              label: data.name
            })
          })
        }

        console.log(professionals_arr)
        setProfessionals(professionals_arr);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateRecords = (referNum) => {
    if (searchParams.get("id") == null) {
      if (getCookie("role") == "Admin" || getCookie("role") == "Professional") {
        window.location.replace("/appointment");
      } else {
        window.location.replace("/appointment-counseling");
      }
    } else {
      var formData = new FormData();

      formData.append("referenceNumber", referNum);

      // Get Appointment Details
      
      axios
        .post(
          localStorage.getItem("samwonAPI") + `/api/Appointment/GetPersonInvolved`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + getCookie("user_token"),
            },
          }
        )
        .then((response) => {
          // console.log("person Involved");
          // console.log(response.data);
          setPersonInvolved(response.data)
        }).catch((err) => {
          console.log(err);
        });
        
      axios
        .post(
          localStorage.getItem("samwonAPI") + `/api/Appointment/GetAppointmentDetails`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + getCookie("user_token"),
            },
          }
        )
        .then((response) => {

          setData(response.data[0]);

          console.log("Details")
          console.log(response.data)

          setDate(
            dayjs(response.data[0]["schedule"], "DD/MM/YYYY hh:mm a").format("MMMM DD, YYYY")
          );

          if(response.data[0]["professional_email"] != ""){
            setSelectedProfessionals({
              value: response.data[0]["professional_email"],
              label: response.data[0]["professional_name"]
            })
          } else {
            setSelectedProfessionals("");
          }

          setTime(
            dayjs(response.data[0]["schedule"], "DD/MM/YYYY hh:mm a").format("hh:mm a") +
              " - " +
              dayjs(response.data[0]["scheduleEnd"], "DD/MM/YYYY hh:mm a").format("hh:mm a")
          );
        })
        .catch((err) => {
          console.log(err);
        });

      const appEvents = [];

      formData = new FormData();

      formData.append("email", getCookie("email"));

      axios
        .get(localStorage.getItem("samwonAPI") + `/api/Appointment/GetAppointment`)
        .then((response) => {
          response.data.forEach((row) => {
            const rowDateRaw = dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss a").format("YYYY-MM-DD");

            var textColor = "";
            var bgColor = "";

            if (row["status"] == "Pending" || row["status"] == "Rescheduled") {
              textColor = "white";
              bgColor = "#0d6efd";
            } else if (row["status"] == "Approved") {
              textColor = "white";
              bgColor = "#198754";
            } else if (row["status"] == "Activity") {
              textColor = "white";
              bgColor = "#ffa31a";
            }  else {
              textColor = "white";
              bgColor = "black";
            }

            if (row.status != "Archived" && row.status != "Cancelled") {
              appEvents.push({
                refNum: row["id"],
                start: rowDateRaw,
                textColor: textColor,
                backgroundColor: bgColor,
              });
            }
          });

          setEvent(appEvents);
          setAppEvent(appEvents);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleAssignProfessional = () => {
    if(data.professional_email != selectedProfessionals.value && selectedProfessionals != ""){
      swal({
        title: "Are you sure?",
        // Barcos papalitan
        text: "You are assigning this professional to this appointment",
        icon: "warning",
        buttons: true,
      }).then((e) => {
        if(e){
          const formData = new FormData();
          
          formData.append("profEmail", selectedProfessionals.value);
          formData.append("id", data.id);
          formData.append("email", getCookie("email"));

          setIsLoading(true);
          axios.post(
            localStorage.getItem("samwonAPI") + "/api/appointment/AssignProfessional",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + getCookie("user_token"),
              },
            }
          ).then((response) => {
            setIsLoading(false);
            if(response.data == "Succes"){
              swal({
                title: "Success",
                // Barcos papalitan
                text: "You assigned a professional to an appointment",
                icon: "success",
                buttons: true,
              })
              setSelectedProfessionals("");
              updateRecords(data.id);
            }
          }).catch((err) => {
            setIsLoading(false);
            swal({
              title: "Error",
              // Barcos papalitan
              text: "Assignment failed",
              icon: "error",
              buttons: true,
              dangerMode: true
            })
          })
        }
      })
    }
  }

  const handleApproveSwal = (e) => {
    swal({
      title: "Are you sure?",
      // Edit Barcos : FInd the right words for this
      text: "Once Approved, This can't be reverted back",
      icon: "warning",
      buttons: true,
    }).then((willDelete) => {
      if (willDelete) {
        setIsLoading(true)
        const formData = new FormData();

        formData.append("referenceNumber", searchParams.get("id"));
        formData.append("status_id", "2");

        axios
          .post(
            localStorage.getItem("samwonAPI") + `/api/Appointment/UpdateAppointmentStatus`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + getCookie("user_token"),
              },
            }
          )
          .then((response) => {
            if ((response.data[0]["referenceNumber"] = searchParams.get("id"))) {
              setIsLoading(false)
              swal({
                title: "Success",
                text: "Appointment have been approved!",
                icon: "success",
                buttons: "confirm",
              });
            }

            navigate(`/appointment/schedule-management?id=${searchParams.get("id")}`);
            updateRecords(searchParams.get("id"));
          })
          .catch((err) => {
            setIsLoading(false)
            console.log(err);
          });
      }
    });
  };

  const handleCancelSwal = (e) => {
    swal({
      title: "Are you sure?",
      text: "Once cancelled, you will need to book another appointment for this day again!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((cancelled) => {
      if (cancelled) {
        const formData = new FormData();

        formData.append("referenceNumber", data.id);
        formData.append("status_id", "6");

        axios
          .post(
            localStorage.getItem("samwonAPI") + `/api/Appointment/UpdateAppointmentStatus`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + getCookie("user_token"),
              },
            }
          )
          .then((response) => {
            console.log(data.id + " | " + response.data[0]["referenceNumber"]);

            if (response.data[0]["referenceNumber"] == data.id) {
              swal({
                title: "Success",
                text: "Your appointment have been cancelled!",
                icon: "success",
                buttons: "confirm",
              }).then(() => {
                updateRecords(data.id);
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  const handleEventClick = (yeah) => {
    const refNum = yeah.event._def.extendedProps.refNum;

    if (!isRescheduling) {
      navigate(`/appointment/schedule-management?id=${refNum}`, { state: refNum });
    } else if (isRescheduling) {
      const tempVar = {
        dateStr: yeah.event.startStr,
      };

      console.log(tempVar.dateStr);
      handleDateClick(tempVar);
    }
  };

  const handleDateClick = (info) => {
    var currentDate = dayjs().format("YYYY-MM-DD");
    const strDay = dayjs(info.dateStr).format("dddd");
    if (isRescheduling) {
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

        console.log("startTimeSlots");
        console.log(startTimeSlots);

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
          setDateErrorModal(true);
        }
      } else {
        setDateErrorModal(true);
      }
    }
  };

  const handleRescheduleModalClose = () => {
    setRescheduleModal(false);
    //reset start time
    setSelectedStartHour("");
    setSelectedStartMinute("");
    setSelectedStartAM({ value: "AM", label: "AM" });
    setStartHourOption(amOption);
    //reset end time
    setSelectedEndHour("");
    setSelectedEndMinute("");
    setSelectedEndAM({ value: "AM", label: "AM" });
    setEndAMPMOption(AMPM);
    setStartAMPMOption(AMPM);
    setEndHourOption(amOption);
    // Reset Options
    setVarStartAMoption(amOption);
    setVarStartPMoption(pmOption);
    // Reset Min Options
    setVarStartMinOption(minuteOption);
    setVarEndMinOption(minuteOption);
    // Rest What Minute Available
    setwhatStartMinuteAvailaible([]);
    setwhatEndMinuteAvailaible([]);
  };

  const [inputErrorModal, setInputErrorModal] = useState(false);

  const handleInputErrorModalClose = () => {
    setInputErrorModal(false);
  };

  const [dateErrorModal, setDateErrorModal] = useState(false);

  const handleDatetErrorModalClose = () => {
    setDateErrorModal(false);
  };

  const handleSubmitReschedule = () => {
    swal({
      title: "Are you sure?",
      text: "Have you selected the correct time and date to reschedule?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((reschedule) => {
      if (reschedule) {
        const formData = new FormData();

        formData.append("referenceNumber", data.referenceNumber);
        formData.append(
          "newSched",
          clickedDateRaw + " " + dayjs("2024-01-01 " + selectedStartTime.value).format("HH:mm")
        );
        formData.append(
          "newSchedEnd",
          clickedDateRaw + " " + dayjs("2024-01-01 " + selectedEndTime.value).format("HH:mm")
        );

        axios
          .post(
            localStorage.getItem("samwonAPI") + `/api/Appointment/UpdateAppointmentSchedule`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: "Bearer " + getCookie("user_token"),
              },
            }
          )
          .then((response) => {
            if (response.data[0]["referenceNumber"] == data.id) {
              swal({
                title: "Success",
                text: "Your appointment have been Rescheduled!",
                icon: "success",
                buttons: "confirm",
              });

              previousDateClicked.dayEl.style.backgroundColor = "white";
              previousDateClicked.dayEl.style.color = "black";
              updateRecords(response.data[0]["referenceNumber"]);
              fetchAllAppointmentsTime();
              setIsRescheduling(false);
              setEvent(appEvent);
              handleRescheduleModalClose();
            } else {
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

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

  const [clickedDateRaw, setclickedDateRaw] = useState("");
  const [clickedDateStr, setclickedDateStr] = useState("");

  const [previousDateClicked, setPreviousDateClicked] = useState();
  const [currentDateClicked, setCurrentDateClicked] = useState();

  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");

  const [notAvailableTime, setNotAvailableTime] = useState([...timeSlots]);

  const [startTimeOption, setStartTimeOption] = useState([...timeSlots]);
  const [endTimeOption, setEndTimeOption] = useState([...timeSlots]);

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

  const calculateDuration = () => {
    if (selectedStartTime && selectedEndTime) {
      const start = dayjs(`2024-01-01 ${selectedStartTime.value}`);
      const end = dayjs(`2024-01-01 ${selectedEndTime.value}`);
      const duration = end.diff(start, "minute"); // Calculate the duration in minutes
      const hours = Math.floor(duration / 60); // Calculate the hours
      const minutes = duration % 60; // Calculate the remaining minutes

      if (hours === 1 && minutes === 1) {
        return `${hours} hour ${minutes} minute`;
      } else if (hours === 1 && minutes > 1) {
        return `${hours} hour ${minutes} minutes`;
      } else if (hours > 1 && minutes === 1) {
        return `${hours} hours ${minutes} minute`;
      } else if (hours > 1 && minutes > 1) {
        return `${hours} hours ${minutes} minutes`;
      } else if (hours === 1 && minutes === 0) {
        return `${hours} hour`;
      } else if (hours > 1 && minutes === 0) {
        return `${hours} hours`;
      } else if (hours === 0 && minutes === 1) {
        return `${minutes} minute`;
      } else {
        return `${minutes} minutes`;
      }
    }
    return "";
  };

  const isSmallScreen = useMediaQuery("(max-width:1280px)");

  const [showCalendar, setShowCalendar] = useState(false);

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };


  return isLoading ? (
    <Preloader />
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <div id="userAppointment" class="relative">
        {!isRescheduling ? 
        (
          <SoftButton
              onClick={toggleCalendar}
              variant={"contained"}
              color={"info"}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem', // Adjust the spacing between icon and text as needed
                textAlign: 'center',
                marginBottom: '1.5rem',
                marginRight: isSmallScreen ? 'auto' : '1.5rem',
                marginLeft: isSmallScreen ? 'auto' : '1rem',
                position: "absolute",
                right: 0,
                top: 50,
                zIndex: "100"
              }}
            >
            <Icon>calendar_month</Icon>
            {showCalendar ? 'Hide' : 'Show'}
          </SoftButton>
        ) : null
        }
        <SoftBox>
          <Grid container spacing={4} lg={12} item xs={12} xl={12} md={12}>
          {showCalendar && (
            <Grid item lg={6} xs={12} md={12}>
              <Card
                sx={{
                  marginBottom: "20px",
                  paddingLeft: "30px",
                  overflow: "visible",
                  zIndex: "100",
                }}
              >
                {isRescheduling ? (
                  clickedDateStr != "" ? (
                    <>
                      <Grid container mt={3}>
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={12} mb={2}>
                              <SoftTypography
                                color="info"
                                component="label"
                                variant="h6"
                                fontWeight="bold"
                                sx={{ borderBottom: "3px #FDB813 solid" }}
                              >
                                You selected the date of :
                              </SoftTypography>
                            </Grid>
                            <Grid item xs={12} mb={2}>
                              <span
                                style={{
                                  backgroundColor: "#1E4C2B",
                                  margin: "0 5px 0 5px",
                                  padding: "5px",
                                  borderRadius: "5px",
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
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <div
                            style={{
                              width: "200px",
                              display: "inline-block",
                              margin: "0 10px 0 10px",
                            }}
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
                            style={{
                              width: "200px",
                              display: "inline-block",
                              margin: "0 10px 0 10px",
                            }}
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
                        <div
                          style={{
                            width: "100%",
                            display: "inline-block",
                            margin: "0 10px 0 10px",
                          }}
                        >
                          <SoftTypography
                            color="info"
                            component="label"
                            variant="body2"
                            fontWeight="bold"
                          >
                            Duration: {calculateDuration()}
                          </SoftTypography>
                        </div>
                      </Grid>
                      <Divider />
                    </>
                  ) : (
                    <>
                      <SoftBox mt={3} display={"flex"} alignItems={"center"}>
                        <div style={{ display: "inline-block" }}>
                          <SoftBox
                            bgColor="info"
                            style={{ borderRadius: "10px", overflow: "hidden" }}
                            justifyContent="center"
                            alignItems="center"
                          >
                            <lord-icon
                              src="https://cdn.lordicon.com/mwafmccw.json"
                              trigger="loop"
                              delay="2000"
                              style={{ width: "50px", height: "50px", color: "white" }}
                            ></lord-icon>
                          </SoftBox>
                        </div>
                        <SoftTypography
                          color="info"
                          component="label"
                          variant="h5"
                          fontWeight="bold"
                          ml={2}
                          sx={{ borderBottom: "3px #FDB813 solid" }}
                        >
                          Select your preferred date by clicking the calendar.
                        </SoftTypography>
                      </SoftBox>
                      <Divider />
                    </>
                  )
                ) : (
                  <SoftBox
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    paddingY={3}
                  >
                    <SoftTypography
                      color="info"
                      component="label"
                      variant="h5"
                      fontWeight="bold"
                      sx={{ borderBottom: "3px #FDB813 solid" }}
                    >
                      Calendar
                    </SoftTypography>
                  </SoftBox>
                )}
              </Card>
              <Card id="delete-account" sx={{ padding: "2rem" }} style={{ marginBottom: "20px" }}>
                <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                  <SoftTypography
                    color="info"
                    component="label"
                    variant="h6"
                    fontWeight="bold"
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                  >
                    Calendar
                  </SoftTypography>
                </SoftBox>

                <SoftBox>
                  <SoftBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    p={0}
                    m={0}
                    id="schedule_management"
                  >
                    <FullCalendar
                      dayMaxEventRows={2}
                      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                      initialView="dayGridMonth"
                      height={650}
                      selectable="true"
                      eventClick={handleEventClick}
                      dateClick={handleDateClick}
                      eventBorderColor="#1EAB89"
                      titleFormat={{ year: "numeric", month: "short", day: "2-digit" }}
                      eventReceive="testing"
                      headerToolbar={{
                        left: "prev,next",
                        center: "title",
                        themeSystem: "#1EAB89",
                        right: "dayGridWeek,dayGridMonth,dayGridDay",
                      }}
                      validRange={
                        isRescheduling
                          ? { start: dayjs().add(1, "day").format("YYYY-MM-DD") }
                          : null
                      }
                      initialDate={dayjs(currentApp).format("YYYY-MM-DD")}
                      events={isRescheduling ? null : event}
                      aspectRatio="auto"
                      contentHeight="auto"
                      updateSize="true"
                    />
                  </SoftBox>
                </SoftBox>
              </Card>
            </Grid>
            )}
            <Grid item lg={showCalendar ? 6 : 12} xs={12} md={12}>
              <Card sx={{ padding: "2rem", overflow:"visible"}}>
                {data.status != "Activity" ? (
                  <>
                  <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <SoftTypography
                      color="info"
                      component="label"
                      variant="h6"
                      fontWeight="bold"
                      sx={{ borderBottom: "3px #FDB813 solid" }}
                    >
                      Personal Information
                    </SoftTypography>
                  </SoftBox>
                </>
                ) : null}
                <UserInformation
                  refNum={data.referenceNumber}
                  Name={data.name}
                  Image={data.picture}
                  Email={data.email}
                  DateOfBirth={dayjs(data.dob, "DD/MM/YYYY hh:mm a").format("MMMM DD, YYYY")}
                  Gender={data.sex}
                  UserType={data.role}
                  //Affiliate
                  isAffiliateAvailable={data.isThereAnAffiliate}
                  affiliatePic={data.affiliatePicture}
                  affiliateName={data.affiliateName}
                  affiliateDob={dayjs(data.affiliateDOB, "YYYY/MM/DD hh:mm a").format(
                    "MMMM DD, YYYY"
                  )}
                  affiliateSex={data.affiliateSex}
                  affiliateEmail={data.affiliateEmail}
                  Status={data.status}
                  AppointmentDate={appDate}
                  AppointmentTime={appTime}
                  TypeOfConcern={data.concern}
                  TypeOfModality={data.modality}
                  UserFeedback={data.clientNotes}
                  AssignedProf={data.professional_email}
                  ProfessinalName={data.professional_name}
                />
                {personInvolved.length != 0 ? (
                  <>
                  
                    <SoftBox className={{ marginBottom: 10 }}>
                        <SoftTypography
                          color="info"
                          component="label"
                          variant="h6"
                          fontWeight="bold"
                          sx={{ borderBottom: "3px #FDB813 solid" }}
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
                              justifyContent={"start"}
                              flexDirection={"row"}
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
                                alignItems={"start"}
                                justifyContent="center"
                                p={2}
                              >
                                <SoftTypography
                                  color="dark"
                                  component="label"
                                  variant="body2"
                                  fontWeight="bold"
                                >
                                  {row.name} ({row.role})
                                </SoftTypography>
                                <SoftTypography color="dark" component="label" variant="body2" noWrap>
                                  {row.email}
                                </SoftTypography>
                              </SoftBox>
                            </Grid>
                        </Grid>
                    ))}
                  </>
                ) : null}

                {ie == "1" ? (
                  <>
                    {/* Assigning a professional. 
                  Only for Admin Professional
                */}
                    <SoftBox className={{ marginBottom: 10 }}>
                      <SoftTypography
                        color="info"
                        component="label"
                        variant="h6"
                        fontWeight="bold"
                        sx={{ borderBottom: "3px #FDB813 solid" }}
                      >
                        Assign to a Professional
                      </SoftTypography>
                      <div className="d-flex align-items-center">
                        {" "}
                        {/* Added align-items-center to align items vertically */}
                        <SoftTypography variant="body2" fontWeight="normal" mt={2} mb={1}>
                          <b>Professional: </b>
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
                            options={professionals}
                            value={selectedProfessionals}
                            isSearchable={false}
                            onChange={(option) => {setSelectedProfessionals(option)}}
                            placeholder="Select a Professional"
                            size="smaller"
                          />
                          <SoftBox mt={2} display={"flex"} justifyContent={"left"}>
                            <SoftButton
                              color="colorISMgreen"
                              onClick={handleAssignProfessional}
                              size='small'
                            >
                              Assign
                            </SoftButton> 
                          </SoftBox>
                      </div>

                      <Divider />
                    </SoftBox>
                  </>
                ) : null}
                <Grid container>
                  <Grid item lg={3} md={12} sm={12} xs={12}></Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Grid container spacing={2} lg={12} item xs={12} xl={12} md={12} sm={12}>
                    {(data.status == "Pending" || data.status == "Rescheduled") && !isRescheduling ? (
                      <Grid item lg={4} md={12} sm={12} xs={12}>
                        <SoftBox>
                          <SoftButton 
                            size='small'
                            sx={{ 
                              width: isSmallScreen ? "100%" : "auto", 
                            }}
                            variant="contained" 
                            color="info" 
                            onClick={handleApproveSwal}
                          >
                            <Icon>checkcircle</Icon>&nbsp;approve
                          </SoftButton>
                        </SoftBox>
                      </Grid>
                      ) : null}
                      {data.status == "Cancelled" || data.status == "Archived" ? null : (
                        <>
                          <Grid item lg={isRescheduling ? 6 : 4} md={12} sm={12} xs={12}>
                            <SoftBox>
                              <SoftButton
                                size='small'
                                sx={{ 
                                  width: isSmallScreen ? "100%" : "auto", 
                                }}
                                variant="contained"
                                color="info" 
                                onClick={
                                  isRescheduling
                                    ? () => {
                                        if (clickedDateStr != "") {
                                          handleSubmitReschedule();
                                        } else {
                                          swal({
                                            title: "Missing inputs",
                                            text: "Please select a date and time to reschedule",
                                            icon: "warning",
                                          });
                                        }
                                      }
                                    : () => {
                                        setShowCalendar(true);
                                        setIsRescheduling(true);
                                      }
                                }
                              >
                                <Icon>restore</Icon>&nbsp;
                                {isRescheduling ? "save reschedule" : "reschedule"}
                              </SoftButton>
                            </SoftBox>
                          </Grid>
                          <Grid item lg={4} md={12} sm={12} xs={12} >
                            <SoftButton
                              size='small'
                              sx={{ 
                                width: isSmallScreen ? "100%" : "auto", 
                              }}
                              variant="contained"
                              color="error" 
                              onClick={
                                isRescheduling
                                  ? () => {
                                      setIsRescheduling(false);
                                      setEvent(appEvent);
                                      setclickedDateStr("");
                                      if (previousDateClicked != null) {
                                        previousDateClicked.dayEl.style.backgroundColor = "white";
                                        previousDateClicked.dayEl.style.color = "black";
                                      }
                                    }
                                  : handleCancelSwal
                              }
                            >
                              <Icon>delete</Icon>&nbsp;cancel
                            </SoftButton>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </SoftBox>
      </div>

      {/* Error Modal */}

      <Dialog
        open={inputErrorModal}
        onClose={handleInputErrorModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth={true} //size
        maxWidth={"md"}
      >
        <SoftBox
          padding={3}
          height="300px"
          sx={{
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          There are missing inputs
        </SoftBox>
      </Dialog>

      <Dialog
        open={dateErrorModal}
        onClose={handleDatetErrorModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth={true} //size
        maxWidth={"md"}
      >
        <SoftBox
          padding={3}
          height="300px"
          sx={{
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          You cant reschedule at this date
        </SoftBox>
      </Dialog>
    </DashboardLayout>
  );
}

export default ScheduleManagement;
