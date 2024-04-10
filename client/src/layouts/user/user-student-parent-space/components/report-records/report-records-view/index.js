import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Images
import wavesWhite from "assets/images/shapes/waves-white.svg";
import rocketWhite from "assets/images/illustrations/rocket-white.png";

import ParentStudentSpace from "layouts/user/user-student-parent-space/components/report-contents-layout/index.js";
import { useEffect, useState } from "react";
import { getCookie } from "helpers/CookieHelper";
import axios from "axios";
import { json, useLocation } from "react-router-dom";
import { isLoggedIn, formatDate } from "helpers/helpers.js";
import Preloader from "PreLoader";

function stripHtmlTags(html) {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
}

function ParentStudentSpaceContent() {
  const [isLoading, setIsLoading] = useState(true);

  const [student_name, setStudentName] = useState("");
  const [student_email, setStudentEmail] = useState("");
  const [student_dob, setStudentDob] = useState("");
  const [sex, setSex] = useState("");
  const [picture, setPicture] = useState("");
  const [ReferenceNumber, setReferenceNumber] = useState("");
  const [report_detail, setReportDetail] = useState("");
  const [Type_of_Report, setTypeOfReport] = useState("");
  const [Type_of_Concern, setTypeOfConcern] = useState("");
  const [Contact_Person, setContactPerson] = useState("");
  const [Relationship, setRelationship] = useState("");
  const [Email, setEmail] = useState("");
  const [isFeedbackChecked, setIsFeedbackChecked] = useState("false");

  const [parentStudentSpaces, setParentStudentSpaces] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      const num = searchParams.get("id");
      setId(num);
      fetchAllRecords(num);
    }
  }, [id]);

  async function fetchAllRecords(num) {
    setIsLoading(true);
    // Web service for getting the drawing details
    const url =
      localStorage.getItem("samwonAPI") + `/api/User_StudentParent_Space/GetReportDetails`;

    var formData = new FormData();
    formData.append("id", num);

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
          setStudentName(response.data[0]["student_name"]);
          setReferenceNumber(response.data[0]["referenceNumber"]);
          setStudentEmail(response.data[0]["student_email"]);
          setStudentDob(formatDate(response.data[0]["student_dob"]));
          setPicture(response.data[0]["picture"]);
          setSex(response.data[0]["sex"]);
          setReportDetail(stripHtmlTags(response.data[0]["report_detail"]));
          setTypeOfReport(response.data[0]["type_of_Report"]);
          setTypeOfConcern(response.data[0]["type_of_Concern"]);
          setContactPerson(response.data[0]["contact_Person"]);
          setRelationship(response.data[0]["relationship"]);
          setEmail(response.data[0]["email"]);
          setIsFeedbackChecked(response.data[0]["isFeedbackChecked"]);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("Catch Error: " + error);
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
          alert("No existing record.");
          window.location.replace(`/user-student-parent-space`);
        });
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      {!isLoading ? (
        <>
          <SoftBox p={2}>
            <SoftBox>
              <SoftBox pt={1} mb={0.5}>
                <ParentStudentSpace
                  // Personal Infor
                  name={student_name}
                  picture={picture}
                  dateOfBirth={student_dob}
                  emailAddress={student_email}
                  gender={sex}
                  rfNumber={ReferenceNumber}
                  typeReport={Type_of_Report}
                  typeConcern={Type_of_Concern}
                  contactPerson={Contact_Person}
                  relationship={Relationship}
                  emailAddressContact={Email}
                  userContent={report_detail}
                  isFeedbackChecked={isFeedbackChecked}
                />
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </>
      ) : (
        <>
          <Preloader />
        </>
      )}
      <Footer />
    </DashboardLayout>
  );
}

export default ParentStudentSpaceContent;
