// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftBadge from "components/SoftBadge";

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
import TimeSelectModal from "../TimeSelectModal";
import { PDFDownloadLink, Page, Text, Image, Document, StyleSheet } from "@react-pdf/renderer";
import PDFFile from "components/PDF/pdfIndex.js";
import Preloader from "PreLoader";
import OhNo from "assets/images/oh-no.svg";
import SoftAvatar from "components/SoftAvatar";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

function ScheduleManagement() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const timeSlots = [
    {value: "0800", label: "8:00 am"},
    {value: "0830", label: "8:30 am"},
    {value: "0900", label: "9:00 am"},
    {value: "0930", label: "9:30 am"},
    {value: "1000", label: "10:00 am"},
    {value: "1030", label: "10:30 am"},
    {value: "1100", label: "11:00 am"},
    {value: "1130", label: "11:30 am"},
    {value: "1200", label: "12:00 pm"},
    {value: "1230", label: "12:30 pm"},
    {value: "1300", label: "1:00 pm"},
    {value: "1330", label: "1:30 pm"},
    {value: "1400", label: "2:00 pm"},
    {value: "1430", label: "2:30 pm"},
    {value: "1500", label: "3:00 pm"},
    {value: "1530", label: "3:30 pm"},
    {value: "1600", label: "4:00 pm"},
    {value: "1630", label: "4:30 pm"},
    {value: "1700", label: "5:00 pm"},
    {value: "1730", label: "5:30 pm"},
    {value: "1800", label: "6:00 pm"},
  ]
  
  //Loading
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(true);

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
  const today = dayjs().format("YYYY-MM-DD");

  const isSmallScreen = useMediaQuery("(max-width:1280px)");

  const navigate = useNavigate();

  var customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)
  
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    }
  });

  useEffect(() => {
    updateRecords(searchParams.get("id"));
    fetchAllAppointmentsTime()
    setIsLoading(false)
  }, [searchParams.get("id")]);

  const fetchAllAppointmentsTime = () => {
    axios
      .get(localStorage.getItem("samwonAPI") + "/api/Appointment/GetAppointment")
      .then((response) => {
        const tempAppList = [];

        response.data.forEach((row) => {
          const rowDateRaw = dayjs(row["schedule"], "DD/MM/YYYY hh:mm:ss").format("YYYY-MM-DD");

          if (rowDateRaw >= today && row.status) {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [personInvolved, setPersonInvolved] = useState([]);

  const updateRecords = (referNum) => {
    setIsLoadingDetails(true)
    if (searchParams.get("id") == null) {
      window.location.replace("/appointment-counseling");
    } else {
      const headers = {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + getCookie("user_token"),
      };
      var formData = new FormData();

      formData.append("referenceNumber", referNum);

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

      // Get Appointment Details
      axios
        .post(
          localStorage.getItem("samwonAPI") + `/api/Appointment/GetAppointmentDetails`,
          formData,
          {
            headers: headers,
          }
        )
        .then((response) => {
          console.log(response.data[0])
          setData(response.data[0]);

          setDate(
            dayjs(response.data[0]["schedule"], "DD/MM/YYYY hh:mm a").format("MMMM DD, YYYY")
          );
          setTime(
            dayjs(response.data[0]["schedule"], "DD/MM/YYYY hh:mm a").format("hh:mm a") +
              " - " +
              dayjs(response.data[0]["scheduleEnd"], "DD/MM/YYYY hh:mm a").format("hh:mm a")
          );
        })
        .catch((err) => {
          navigate('/appointment-counseling/schedule-form')
        });

      const appEvents = [];

      formData = new FormData();

      formData.append("email", getCookie("email"));

      axios
        .post(localStorage.getItem("samwonAPI") + `/api/Appointment/GetUserAppointment`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getCookie("user_token"),
          },
        })
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
            } else {
              textColor = "white";
              bgColor = "black";
            }

            if (row["status"] != "Cancelled" && row["status"] != "Archived"){  
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
          setIsLoadingDetails(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            if (response.data[0]["referenceNumber"] == data.id) {
              swal({
                title: "Success",
                text: "Your appointment have been cancelled!",
                icon: "success",
                buttons: "confirm",
              }).then(() => {
                updateRecords(data.id)
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
      navigate(`/appointment-counseling/appointment-summary?id=${refNum}`, { state: refNum });
    } else if (isRescheduling) {
      const tempVar = {
        dateStr: yeah.event.startStr,
      };
    }
  };

  const handleDateClick = (info) => {
    
    var currentDate = dayjs().format("YYYY-MM-DD");
    const strDay = dayjs(info.dateStr).format("dddd");
    if (isRescheduling){
      if (info.dateStr > currentDate && strDay != "Saturday" && strDay != "Sunday") {
  
        const date = dayjs(info.dateStr);
  
        var currentDateApp = [];
  
        appDateList.forEach((row) => {
          if(row.date == info.dateStr){
            currentDateApp.push({
              start: parseInt(dayjs(`2024-01-01 ${row.start_time}`).format("HHmm")),
              end: parseInt(dayjs(`2024-01-01 ${row.end_time}`).format("HHmm"))
            })
          }
        })
  
        currentDateApp.sort((a,b) => a["start"] - b["start"])
  
        const startTimeSlots = [...timeSlots]
        var spliced = 0;
  
        currentDateApp.forEach((row) => {
          const currentTimeStartVal = row.start;
          const currentTimeEndVal = row.end;
  
          startTimeSlots.forEach((row, index) => {
            const timeVal = parseInt(dayjs(`2024-01-01 ${row.value}`).format("hhmm"));
            var currentVal = currentTimeStartVal;
            var count = 0;
  
            if(timeVal == currentTimeStartVal){
              while (currentVal < currentTimeEndVal){
                count += 1;
  
                if(currentVal % 100 == 0){
                  currentVal += 30;
                } else {
                  currentVal += 70;
                }
              }
            }
  
            startTimeSlots.splice(index - spliced, count) 
          })
        })
  
        if(startTimeSlots.length > 1) {
    
          var endTimeSlots = [...timeSlots];
      
          const optionTimeVal = parseInt(dayjs("2024-01-01 " + startTimeSlots[0].value).format("HHmm"))
          var spliced = 0;
      
          endTimeSlots = endTimeSlots.filter((filter) => {
            return parseInt(dayjs(`2024-01-01 ${filter.value}`).format("HHmm")) > optionTimeVal
          })
      
          var earlyStop = false;
          var lastStop = 0; 
    
          currentDateApp.forEach((row) => {
            if(row.start >= optionTimeVal && !earlyStop){
              lastStop = row.start;
              earlyStop = true; 
            }
          })
      
          if(earlyStop){
            endTimeSlots = endTimeSlots.filter((filter) => {
              return parseInt(dayjs(`2024-01-01 ${filter.value}`).format("HHmm")) <= lastStop
            })
          }
  
          if (previousDateClicked != null){
            previousDateClicked.dayEl.style.backgroundColor = 'white';
            previousDateClicked.dayEl.style.color = 'black';
          }
          console.log(info)
          info.dayEl.style.backgroundColor = '#1E4C2B';
          info.dayEl.style.color = 'white';
  
          setclickedDateRaw(info.dateStr);
          setclickedDateStr(date.format("dddd, MMMM DD, YYYY"));
  
          setNotAvailableTime(currentDateApp)
  
          setSelectedStartTime(startTimeSlots[0]);
  
          setSelectedEndTime("")
  
          setSelectedEndTime(endTimeSlots[0])
          setEndTimeOption(endTimeSlots)
    
          setSelectedStartTime(startTimeSlots[0]);
          setStartTimeOption(startTimeSlots);  
    
          setPreviousDateClicked(info)
        } else {
          setDateErrorModal(true)
        }
      } else {
        setDateErrorModal(true);
      }
    }
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
        setIsLoading(true)

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
            console.log("Test")
            console.log(response)

            if (response.data[0]["referenceNumber"] == data.id) {
              swal({
                title: "Success",
                text: "Your appointment have been Rescheduled!",
                icon: "success",
                buttons: "confirm",
              });

              updateRecords(response.data[0]["referenceNumber"]);
              fetchAllAppointmentsTime();
              setIsRescheduling(false);
              setEvent(appEvent);
              previousDateClicked.dayEl.style.backgroundColor = 'white';
              previousDateClicked.dayEl.style.color = 'black';
              setIsLoading(false);
            } else {
              setIsLoading(false);
              swal({
                title: "This is not an error",
                text: "An error has occured",
                icon: "error",
                buttons: "confirm",
              });
            }
          })
          .catch((err) => {
            setIsLoading(false);
            swal({
              title: "Something went wrong",
              text: "An error has occured",
              icon: "error",
              buttons: "confirm",
            });
            console.log(err);
          });
      }
    });
  };

  const [clickedDateRaw, setclickedDateRaw] = useState("");
  const [clickedDateStr, setclickedDateStr] = useState("");

  const [previousDateClicked, setPreviousDateClicked] = useState();
  const [currentDateClicked, setCurrentDateClicked] = useState()

  const [selectedStartTime, setSelectedStartTime] = useState("");
  const [selectedEndTime, setSelectedEndTime] = useState("");
  
  const [notAvailableTime, setNotAvailableTime] = useState([...timeSlots])

  const [startTimeOption, setStartTimeOption] = useState([...timeSlots])
  const [endTimeOption, setEndTimeOption] = useState([...timeSlots])

  const handleStartTimeChange = (option) => {
    setSelectedStartTime(option);

    setSelectedEndTime("")

    var endTimeSlots = [...timeSlots];

    const optionTimeVal = parseInt(dayjs("2024-01-01 " + option.value).format("HHmm"))
    var spliced = 0;

    endTimeSlots = endTimeSlots.filter((filter) => {
      return parseInt(dayjs(`2024-01-01 ${filter.value}`).format("HHmm")) > optionTimeVal
    })

    var earlyStop = false;
    var lastStop = 0; 
    notAvailableTime.forEach((row) => {
      if(row.start >= optionTimeVal && !earlyStop){
        lastStop = row.start;
        earlyStop = true; 
      }
    })

    if(earlyStop){
      endTimeSlots = endTimeSlots.filter((filter) => {
        return parseInt(dayjs(`2024-01-01 ${filter.value}`).format("HHmm")) <= lastStop
      })
    }

    setSelectedEndTime(endTimeSlots[0])
    setEndTimeOption(endTimeSlots)
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <DashboardLayout>
      <DashboardNavbar />
      <div id="userAppointment">
        <SoftBox>
          <Grid container spacing={4} lg={12} item xs={12} xl={12} md={12}>
            <Grid item lg={6} xs={12} md={12}>
              
              <Card sx={{marginBottom:"20px", paddingLeft: "30px", overflow: "visible", zIndex: "100"}}>
                
                { isRescheduling ? 
                  clickedDateStr != "" ? (
                    <>
                      <Grid container mt={3} >
                        <Grid item xs={12}>
                          <Grid container>
                            <Grid item xs={12} mb={2}>
                              <SoftTypography
                                color="info"
                                component="label"
                                variant="h6"
                                fontWeight="bold"
                                sx={{ borderBottom: "3px #FDB813 solid"}}
                              >
                                You selected the date of : 
                              </SoftTypography>
                            </Grid>
                            <Grid item xs={12} mb={2}>
                              <span style={{backgroundColor: "#1E4C2B", margin:"0 5px 0 5px", padding:"5px", borderRadius: "5px"}}>
                                <SoftTypography
                                  color="colorISMyellow"
                                  component="label"
                                  variant={"h6"}
                                  fontWeight="bold"
                                >
                                  { clickedDateStr } 
                                </SoftTypography>
                              </span>
                            </Grid>
                          </Grid>
                        </Grid>
                        
                        <Grid item xs={12}>
                          <div style={{width:"200px", display: "inline-block", margin: "0 10px 0 10px"}}>
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
                          <div style={{width:"200px", display: "inline-block", margin: "0 10px 0 10px"}}>
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
                                setSelectedEndTime(option)
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
                      <SoftBox mt={3} display={"flex"} alignItems={"center"}>
                        <div style={{display: "inline-block"}}>
                          <SoftBox bgColor="info" style={{borderRadius: "10px",overflow: "hidden"}} justifyContent = "center" alignItems="center">
                            <lord-icon
                                src="https://cdn.lordicon.com/mwafmccw.json"
                                trigger="loop"
                                delay="2000"
                                style={{width: "50px", height: "50px", color: "white"}}>
                            </lord-icon>
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
                  ) :
                  (
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" paddingY={3}>
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
                  )
                }

              </Card>

              <Card id="delete-account" sx={{ padding: "2rem" }}>
                <SoftBox>
                  <SoftBox
                    component="ul"
                    display="flex"
                    flexDirection="column"
                    id="schedule_management"
                  >
                    <SoftBox mb={2}  >
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="left"
                      >
                        <Grid item>
                          <SoftTypography variant="h6" fontWeight="text" color="info">Tags</SoftTypography>
                        </Grid>
                          <Grid item m={1} >
                            <SoftBadge badgeContent="Approved" color="approvedTag"container circular  />
                          </Grid>
                          <Grid item m={1}>
                            <SoftBadge badgeContent="Pending"  color='pendingTag'container circular />
                          </Grid>
                        </Grid>
                    </SoftBox>
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
                      validRange={isRescheduling ? {start: dayjs().add(1,'day').format("YYYY-MM-DD"),
                      end: dayjs().add(1, 'year').format("YYYY-MM-DD")} : null}
                      events={isRescheduling ? null : event}
                      aspectRatio="auto"
                      contentHeight="auto"
                      updateSize="true"
                    />
                  </SoftBox>
                </SoftBox>
              </Card>
            </Grid>
            <Grid item lg={6} xs={12} md={12}>
              <Card sx={{ padding: "2rem" }}>
                {isLoadingDetails ? (
                  <Preloader/>
                ) : (
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
                      AssignedProf={data.professional_name}
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
                          my={2}
                          ml={3}
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
                    <Grid container>
                      {/* <Grid item lg={3} md={12} sm={12} xs={12}></Grid> */}
                      <Grid item lg={12} md={12} sm={12} xs={12} sx={{alignItems: 'center'}}>
                        <Grid container spacing={2} lg={12} item xs={12} xl={12} md={12} sm={12} sx={{alignItems: 'center'}}>
                          <Grid item lg={isRescheduling ? 2 : 3} md={12} sm={12} xs={12}></Grid>
                          <Grid item lg={3} md={12} sm={12} xs={12} sx={{alignItems: 'center'}}>
                            {data.status == "Approved" && !isRescheduling ? (
                              <>
                                <SoftBox>
                                  <SoftButton 
                                    variant="contained"
                                    color="info"
                                  >
                                    <Icon>download</Icon>&nbsp;
                                    <PDFDownloadLink document={<PDFFile data={data} />} fileName="Form"  onClick={() => console.log("SoftButton clicked")}>
                                      {({ loading }) => (loading ? "Loading document..." : "Download")}
                                    </PDFDownloadLink>
                                  </SoftButton>
                                </SoftBox>
                              </>
                            ) : null}
                          </Grid>
                          {data.status == "Cancelled" || data.status == "Archived" ? null : (
                            <>
                              <Grid item lg={isRescheduling ? 4 : 3} md={12} sm={12} xs={12}>
                                <SoftBox>
                                  <SoftButton
                                    variant="contained"
                                    color="info"
                                    onClick={isRescheduling ? () => {
                                      if(clickedDateStr != ""){
                                        handleSubmitReschedule()
                                      } else {
                                        swal({
                                          title: "Missing inputs",
                                          text: "Please select a date and time to reschedule",
                                          icon: "warning"
                                        })
                                      }
                                    } : () => {
                                      setIsRescheduling(true);
                                    }}
                                  >
                                    <Icon>restore</Icon>&nbsp;{isRescheduling ? "save reschedule" : "reschedule"}
                                  </SoftButton>
                                </SoftBox>
                              </Grid>
                              <Grid item lg={3} md={12} sm={12} xs={12}>
                                <SoftButton
                                  variant="contained"
                                  color="error"
                                  onClick={
                                    isRescheduling
                                      ? () => {
                                          setIsRescheduling(false);
                                          setEvent(appEvent);
                                          setclickedDateStr("")
                                          if (previousDateClicked != null){
                                            previousDateClicked.dayEl.style.backgroundColor = 'white';
                                            previousDateClicked.dayEl.style.color = 'black';
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
                  </>
                )}
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
    </DashboardLayout>
  );
}

export default ScheduleManagement;
