// @mui material components
import Grid from "@mui/material/Grid";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Preloader from "PreLoader";

import { isLoggedIn } from "helpers/helpers";
import { getCookie } from "helpers/CookieHelper";
import { Card, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Soft UI Dashboard React components
import "jspdf-autotable";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { json, useLocation } from "react-router-dom";

import ProfileHeader from "./component/ProfileHeader";
import RecordDrawings from "./component/RecordDrawings";
import RecordReport from "./component/RecordReport";
import RecordAppointments from "./component/RecordDrawingsAppointment";

function RecordKeeping() {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [sex, setSex] = useState("");
  const [role, setRole] = useState("");
  const [userId, setUserId] = useState("");
  const [recordDrawings, setRecordDrawings] = useState([]);
  const [recordAppointments, setRecordAppointments] = useState([]);
  const [recordReports, setRecordReports] = useState([]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userEmail = searchParams.get("email");

  // Check if there's a user logged in &
  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      //Fetch all students
      console.log("Fetching");
      // Fetch all users
      fetchUserDetails();
    }
  }, []);

  async function fetchUserDetails() {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("email", userEmail);
    // console.log("test andre")
    axios
      .post(localStorage.getItem("samwonAPI") + "/api/Profile/GetProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // console.log(response.data)
        setEmail(response.data[0]["email"]);
        setDob(response.data[0]["dob"]);
        setSex(response.data[0]["sex"]);
        setRole(response.data[0]["role"]);
        setPicture(response.data[0]["picture"]);
        setName(response.data[0]["name"]);
        setUserId(response.data[0]["userId"]);
        fetchRecords(response.data[0]["userId"]);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Request to fetch all the active students
  async function fetchRecords(userId) {
    try {
      setIsLoading(true);
      // Web service for getting the drawing details
      const url = localStorage.getItem("samwonAPI") + `/api/Records/getUserRecord`;

      const formData = new FormData();
      formData.append("email", userEmail);
      formData.append("userId", userId);

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
            setRecordDrawings(response.data.drawings);
            setRecordAppointments(response.data.appointments);
            setRecordReports(response.data.reports);
            setIsLoading(false);
          });
      } catch (error) {
        console.log("Error: " + error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!isLoading ? (
        <>
          <ProfileHeader
            name={name}
            userId={userId}
            role={role}
            email={email}
            dob={dob}
            sex={sex}
            pictureProfile={picture}
          />
          <Grid container spacing={4} lg={12} item xs={12} xl={12} md={12} mt={1}>
            <Grid item lg={8} spacing={2} xs={12} md={12}>
              {/* Drawings */}
              <RecordDrawings drawings={recordDrawings} email={email} />
              {/* Appointments */}
              <RecordAppointments appointments={recordAppointments} email={email} mt={5} />
            </Grid>
            {/* report */}
            <Grid item lg={4} xs={12} md={12} mb={3}>
              <RecordReport report={recordReports} email={email} />
            </Grid>
          </Grid>
        </>
      ) : (
        <Preloader />
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default RecordKeeping;
