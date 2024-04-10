// @mui material components
import React, { useState, useEffect } from "react";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Grid from "@mui/material/Grid";
// Soft UI Dashboard React examples
import PageLayout from "examples/LayoutContainers/PageLayout";
import { styled } from "@mui/material/styles";
import { getCookie, setCookie } from "helpers/CookieHelper";
import SoftButton from "components/SoftButton";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { json } from "react-router-dom";
import samWonStudent from "assets/images/samwon-student.svg";
import samWonParent from "assets/images/samwon-parent.svg";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { TypeAnimation } from "react-type-animation";
import SoftInput from "components/SoftInput";

// import NoRecentAppointmentVector from "assets/images/No data-rafiki.svg";

function WelcomeTester() {
  const [givenName, setGivenName] = useState(getCookie("givenName"));
  const [typeOfUser, setTypeOfUser] = useState("Parent");
  const [gender, setGender] = useState("Male");
  const [selectedDate, setSelectedDate] = useState(null);
  const [age, setAge] = useState(9);

  // Modal
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  // end of modal

  const handleTypeOfUser = (e) => {
    setOpen(true);
    setTypeOfUser(e);
  };

  const handleRadioChange = (event) => {
    setGender(event.target.value);
  };

  const handleAge = (value) => {
    // Update the age state with the value from the event object
    setAge(value);
  };

  const handleDateChange = (date) => {
    // console.log(date.toJSON());
    // Format the date to "yyyy-mm-dd"
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setSelectedDate(formattedDate);
  };

  const handleEnter = () => {
    const formData = new FormData();

    const currentDate = new Date();
    const dobYear = currentDate.getFullYear() - age;
    const dobMonth = currentDate.getMonth() + 1; // Months are zero-based
    const dobDay = currentDate.getDate();

    // Construct the dob string in the format yyyy-mm-dd
    const dobString = `${dobYear}-${dobMonth < 10 ? "0" + dobMonth : dobMonth}-${
      dobDay < 10 ? "0" + dobDay : dobDay
    }`;

    console.log(dobString);

    // Append the fields to the FormData object
    formData.append("Email", getCookie("email"));
    formData.append("GivenName", getCookie("givenName"));
    formData.append("familyName", getCookie("familyName"));
    formData.append("Picture", getCookie("picture"));
    formData.append("Age", age);
    formData.append("Dob", dobString);
    formData.append("Sex", gender);
    formData.append("Role", typeOfUser);

    // Make a POST request to the API endpoint with FormData as the request body
    axios
      .post(localStorage.getItem("samwonAPI") + `/api/UserType/createAccount`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        },
      })
      .then((response) => {
        // Display the response data in the console
        console.log(response.data);

        if (response.data.success) {
          setCookie("role", typeOfUser, 60);
          window.location.replace("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    setGivenName("Tim");
  }, []);

  
  return (
    <PageLayout background="white">
      <>
        {/*  */}
        <SoftBox p={2} style={{ backgroundColor: "#1E4C2B" }} className={"text-center"}>
          <SoftTypography color="white">
            Hello, <b style={{ color: "#FDB813" }}>{givenName}!</b>
          </SoftTypography>
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "We are happy that you are part of our journey.",
              1000, // wait 1s before replacing "Mice" with "Hamsters"
              "This project is currently in development feel free to rate the project.",
              1000,
              "Sam Won is a Guidance Counseling Management Tool that would be useful for counseling.",
              1000,
              "All of your information is secured and protected.",
              1000,
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "1em", display: "inline-block", color: "white" }}
            repeat={Infinity}
          />
        </SoftBox>
        <SoftBox>
          <Grid container lg={12} item xs={12} xl={12} md={12} sm={12}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <SoftBox style={{ position: "relative" }}>
                <img
                  src={samWonParent}
                  alt="samWonParent"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: 0.8,
                    background: "rgba(0, 0, 0, 0.4)",
                  }}
                />
                <SoftButton
                  variant="gradient"
                  color="info"
                  onClick={() => handleTypeOfUser("Parent")}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)", // Center the button
                    "&:hover": {
                      transform: "translate(-50%, -50%)", // Maintain the same position on hover
                    },
                  }}
                >
                  <SoftTypography color="colorISMyellow" component="label" fontWeight="bold">
                    Sign in as Parent
                  </SoftTypography>
                </SoftButton>
              </SoftBox>
            </Grid>
            {/* Student */}
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <SoftBox component="div" style={{ position: "relative" }}>
                <img
                  src={samWonStudent}
                  alt="waves"
                  style={{
                    width: "100%",
                    height: "75%",
                    objectFit: "cover",
                    opacity: 0.8,
                    background: "rgba(0, 0, 0, 0.4)",
                  }}
                />
                <SoftButton
                  variant="gradient"
                  color="info"
                  onClick={() => handleTypeOfUser("Student")}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    height: "auto",
                    transform: "translate(-50%, -50%)", // Center the button
                    "&:hover": {
                      transform: "translate(-50%, -50%)", // Maintain the same position on hover
                    },
                  }}
                >
                  <SoftTypography color="colorISMyellow" component="label" fontWeight="bold">
                    Sign in as Student
                  </SoftTypography>
                </SoftButton>
              </SoftBox>
            </Grid>
          </Grid>
        </SoftBox>

        {/* MODAL FOR  */}
        <SoftBox>
          <React.Fragment>
            <Dialog
              onClose={handleClose}
              aria-labelledby="customized-dialog-title"
              open={open}
              fullWidth={true} //size
              maxWidth={"md"}
            >
              <DialogTitle
                sx={{ m: 0, p: 2, pr:3, color: "#1E4C2B", borderBottom: "3px #FDB813 solid" }}
                id="customized-dialog-title"
              >
                Sam Won needs to know some of your Information
              </DialogTitle>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  color: "colorISMgreen",


                }}
              >
                <CloseIcon />
              </IconButton>
              <DialogContent dividers>
                <Grid container lg={12} item xs={12} xl={12} md={12} sm={12}>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <SoftBox display="flex" justifyContent="center" alignItems="center">
                      <SoftBox>
                        <SoftTypography
                          variant="h6"
                          color="info"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          Enter Age
                        </SoftTypography>
                        {/* <DatePicker
                        onChange={handleDateChange}
                        peekNextMonth
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="Select a date"
                      /> */}
                        <SoftInput
                          placeholder="Type here..."
                          onChange={(e) => handleAge(e.target.value)}
                          value={age}
                          type="number"
                        />
                      </SoftBox>
                    </SoftBox>
                  </Grid>
                  <Grid item lg={6} md={6} sm={12} xs={12}>
                    <SoftBox display="flex" justifyContent="center" alignItems="center">
                      <SoftTypography variant="h6" color="info">
                        Enter Sex
                      </SoftTypography>
                    </SoftBox>
                    <SoftBox
                      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                      <SoftBox
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                      >
                        <input
                          id="default-radio-1"
                          type="radio"
                          value="Male"
                          name="default-radio"
                          checked={gender === "Male"}
                          onChange={handleRadioChange}
                          className="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          style={{
                            color: "#1E4C2B",
                            borderColor: "#1E4C2B",
                            "&:focus": { ring: "#1E4C2B" },
                          }}
                        />
                        <label
                          htmlFor="default-radio-1"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          style={{
                            color: "#1E4C2B",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Male
                        </label>
                      </SoftBox>

                      <SoftBox
                        m={2}
                        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                      >
                        <input
                          id="default-radio-2"
                          type="radio"
                          value="Female"
                          checked={gender === "Female"}
                          onChange={handleRadioChange}
                          name="default-radio"
                          className="w-4 h-4 bg-gray-100 border-gray-300 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          style={{
                            color: "#1E4C2B",
                            borderColor: "#1E4C2B",
                            "&:focus": { ring: "#1E4C2B" },
                          }}
                        />
                        <label
                          htmlFor="default-radio-2"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          style={{
                            color: "#1E4C2B",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          Female
                        </label>
                      </SoftBox>
                    </SoftBox>
                  </Grid>
                </Grid>

                <SoftBox>
                  <SoftTypography
                    color="colorISMgreen"
                    variant="caption"
                    component="label"
                    fontWeight="bold"
                    gutterBottom
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    Please check if all of your inputted information is correct
                  </SoftTypography>
                </SoftBox>

                <SoftBox display="flex" justifyContent="center" alignItems="center">
                  <SoftTypography color="colorISMgreen" gutterBottom fontWeight="bold">
                    You are <span style={{ color: "#FDB813" }}>{age} years old</span>{" "}
                    <span style={{ color: "#FDB813" }}>{gender}</span>{" "}
                    <span style={{ color: "#FDB813" }}>{typeOfUser} </span> ?
                  </SoftTypography>
                </SoftBox>
              </DialogContent>
              <DialogActions
                style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
              >
                <SoftBox>
                  <SoftButton variant="gradient" color="info" onClick={() => handleEnter()}>
                    <SoftTypography
                      variant="caption"
                      color="white"
                      component="label"
                      fontWeight="bold"
                    >
                      Proceed
                    </SoftTypography>
                  </SoftButton>
                </SoftBox>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </SoftBox>

        {/* <SoftBox>
          <SoftTypography>Choose type of account.</SoftTypography>
          <div class="flex items-center mb-4">
            <input
              id="default-radio-1"
              type="radio"
              value="Male"
              name="default-radio"
              checked={gender === "Male"}
              onChange={handleRadioChange}
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            ></input>
            <label
              for="default-radio-1"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Male
            </label>
          </div>
          <SoftBox class="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={handleRadioChange}
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            ></input>
            <label
              for="default-radio-2"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Female
            </label>
          </SoftBox>
          <div>
            <label>Date of Birth:</label>
            <DatePicker
              onChange={handleDateChange}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="Select a date"
            />
          </div>
          <SoftTypography>
            You chose {typeOfUser} and you are a {gender} and you are born at {selectedDate}
          </SoftTypography>
          <SoftButton onClick={() => handleEnter()}>Enter Sam Won</SoftButton>
        </SoftBox> */}
      </>
    </PageLayout>
  );
}

export default WelcomeTester;
