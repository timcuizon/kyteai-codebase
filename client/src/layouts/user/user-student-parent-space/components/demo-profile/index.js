/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import Creatable, { useCreatable } from "react-select/creatable";
import ReactQuill from "react-quill";
import { isLoggedIn } from "helpers/helpers.js";

// @mui material components
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton/index";
import swal from "sweetalert";

// Images
import SoftInput from "components/SoftInput";
import { getCookie } from "helpers/CookieHelper";
import axios from "axios";

//Checkbox
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Preloader from "PreLoader";

function DemoProfile() {
  const [selectedReport, setSelectedReport] = useState("");
  const [selectedConcern, setSelectedConcern] = useState("");

  const [reportCategories, setReportCategories] = useState([]);
  const [reportConcerns, setReportConcerns] = useState([]);

  const [selectedRelationship, setSelectedRelationship] = useState("");
  const [otherReport, setOtherReport] = useState("");
  const [otherConcern, setOtherConcern] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [Email, setEmail] = useState("");
  const [OtherInformation, setOtherInformation] = useState("");
  const [isFeedbackChecked, setIsFeedbackChecked] = useState(false);
  const formData = new FormData();

  const [isLoading, setIsLoading] = useState(true);
  //
  const relationship = [
    { value: "Mother", label: "Mother" },
    { value: "Father", label: "Father" },
    { value: "Guardian", label: "Guardian" },
    { value: "Brother", label: "Brother" },
    { value: "Sister", label: "Sister" },
    { value: "Friend", label: "Friend" },
    { value: "Myself", label: "Myself" },
  ];

  //Report choices
  const reportChoices = [
    { value: "Bullying", label: "Report a case of Bullying" },
    { value: "Absent", label: "Report of a student not attending classes" },
    { value: "Harrasment", label: "Report of Harrasment" },
    { value: "others", label: "Other Report" },
  ];

  // Concern types
  const concernChoices = [
    { value: "Academic", label: "Concern about academic studies" },
    { value: "Bullying", label: "Concern about Bullying" },
    { value: "Grades", label: "Concern about Grades" },
    { value: "others", label: "Other Concern" },
  ];

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      // Fetch the student record
      initializedReportCatCon();
      setIsLoading(false);
    }
  }, []);

  async function initializedReportCatCon() {
    // Web service for getting the drawing details
    const url =
      localStorage.getItem("samwonAPI") + `/api/User_StudentParent_Space/GetAllReportRecordsCatCon`;

    try {
      await axios
        .get(url, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + getCookie("user_token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          const uniqueCategories = [...new Set(response.data.map((data) => data.category))];
          uniqueCategories.push("others");

          setReportCategories(uniqueCategories);

          var temp = response.data;
          temp.push({ category: "others", concern: "" });
          setReportConcerns(temp);
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
        });
    } catch (error) {
      console.log("Error: " + error);
    }
  }

  const handleSubmitSwal = async () => {
    setIsLoading(true)
    // console.log(formData);
    // var report = selectedReport === "others" ? otherConcern : selectedReport;
    // var concern = selectedReport === "others" ? otherConcern : selectedConcern["value"];
    // alert(report + " | " + concern);
    // alert(isFeedbackChecked);
    formData.append("user_email", getCookie("email"));
    formData.append("report_detail", OtherInformation);
    formData.append("Type_of_Report", selectedReport === "others" ? otherReport : selectedReport);
    formData.append(
      "Type_of_Concern",
      selectedReport === "others" ? otherConcern : selectedConcern["value"]
    );
    formData.append("Contact_Person", contactPerson);
    formData.append("Relationship", selectedRelationship["value"]);
    formData.append("Email", Email);
    formData.append("IsFeedbackChecked", isFeedbackChecked);
    formData.append("Role", getCookie("role"));
    axios
      .post(
        localStorage.getItem("samwonAPI") + `/api/User_StudentParent_Space/SaveReport`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        // Display the response data in the console
        console.log(response.data.id);
        
        setIsLoading(false)
        swal({
          title: "Great!",
          text: "Form have been submitted!",
          icon: "success",
        }).then(() => {
          window.location.replace("/user-student-parent-space");
        });
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "There is an error!",
          text: "Form have not been submitted!",
          icon: "error",
        }).then(() => {});
      });
  };

  const handleSubmit = (e) => {
    if (
      selectedReport != "" &&
      (selectedConcern != "" || otherConcern != "") &&
      contactPerson != "" &&
      selectedRelationship != ""
    ) {
      swal({
        title: "Confirmation of Concern",
        text: "Have you inputted the correct information?",
        icon: "warning",
        buttons: true,
      }).then((willSubmit) => {
        if (willSubmit) {
          handleSubmitSwal();

          setSelectedReport("");
          setSelectedConcern("");
          setOtherInformation("");
          // setNoteValue("");
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

  const handleCategoryChange = (selectedOption) => {
    setSelectedReport(selectedOption["value"]);

    reportConcerns.forEach((data, index) => {
      if (data.category === selectedOption["value"]) {
        setSelectedConcern({ value: data.concern, label: data.concern });
        return;
      }
    });
  };

  return isLoading ? (
    <Preloader/>
  ) : (
    <SoftBox position="relative" height="100%" p={2}>
      {/* Form */}
      <form action="" id="user-student-parent-form" method="post">
        <SoftBox display="flex" flexDirection="column" height="100%" py={2} borderRadius="lg">
          <SoftBox mb={1}>
            <SoftTypography
              color="info"
              component="label"
              variant="h5"
              fontWeight="bold"
              sx={{ borderBottom: "3px #FDB813 solid" }}
            >
              Concern Information
            </SoftTypography>
          </SoftBox>
          {/* ==================================Report and Concern================================== */}
          {/* =========Type of Report=========*/}
          <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography color="dark" component="label" variant="caption" fontWeight="bold">
                  Category
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={1} className="w-full">
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
                  isClearable
                  options={reportCategories.map((category) => ({
                    value: category,
                    label: category,
                  }))}
                  value={selectedReport["value"]}
                  onChange={handleCategoryChange}
                  placeholder="Select a report..."
                  size="small"
                />
              </SoftBox>
              {/* =========Other Report=========*/}
              {selectedReport !== null && selectedReport == "others" && (
                <div>
                  <SoftBox mb={1}>
                    <SoftTypography
                      color="dark"
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Other Report
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={1} className="w-full">
                    <SoftInput
                      type="otherReport"
                      placeholder="Other Report"
                      onChange={(temp) => {
                        setOtherReport(temp.target.value);
                        console.log(otherReport);
                      }}
                    />
                  </SoftBox>
                </div>
              )}
            </Grid>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography color="dark" component="label" variant="caption" fontWeight="bold">
                  Concern
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={1} className="w-full">
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
                  isClearable
                  options={reportConcerns
                    .filter((data) => data.category === selectedReport)
                    .map((data) => ({ value: data.concern, label: data.concern }))}
                  value={selectedConcern}
                  onChange={(selectedOption) => {
                    setSelectedConcern(selectedOption);
                  }}
                  placeholder="Select a concern..."
                  size="small"
                  isDisabled={selectedReport !== null && selectedReport == "others" ? true : false}
                />
              </SoftBox>
              {/* =========Other Concern=========*/}
              {selectedReport !== null && selectedReport == "others" && (
                <div>
                  <SoftBox mb={1}>
                    <SoftTypography
                      color="dark"
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Other Concern
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={1} className="w-full">
                    <SoftInput
                      type="otherConcern"
                      placeholder="Other Concern"
                      onChange={(temp) => {
                        setOtherConcern(temp.target.value);
                      }}
                    />
                  </SoftBox>
                </div>
              )}
            </Grid>
          </Grid>
          {/* =============================Contact Person and Relationship==================================== */}
          {/* =========Contact Person=========*/}
          <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <SoftBox mb={1} ml={0.5}>
                <SoftTypography color="dark" component="label" variant="caption" fontWeight="bold">
                  Person Involved
                </SoftTypography>
              </SoftBox>
              <SoftBox className="person-involved-wrapper w-full" mb={1}>
                <SoftInput
                  type="name"
                  placeholder="Name"
                  onChange={(temp) => setContactPerson(temp.target.value)}
                  className="person-involved-input"
                  info
                />
              </SoftBox>
            </Grid>
            {/* ==========================Relationship============================== */}
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <SoftBox mb={1}>
                <SoftTypography color="dark" component="label" variant="caption" fontWeight="bold">
                  Relationship
                </SoftTypography>
              </SoftBox>
              <SoftBox mb={1} className="w-full">
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
                  isClearable
                  options={relationship}
                  value={selectedRelationship}
                  onChange={(selectedOption) => setSelectedRelationship(selectedOption)}
                  placeholder="Select a relationship..."
                  size="small"
                />
              </SoftBox>
            </Grid>
          </Grid>
          {/* =================Feedback and EMail======================= */}
          <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
            {/* =========Feedback Check Box=========*/}
            <Grid item lg={6} md={12} sm={12} xs={12}>
              <SoftBox mb={1}>
                {/* <SoftTypography
                  color="dark"
                  component="label"
                    variant="caption"
                  fontWeight="bold"
                >
                  Feedback
                </SoftTypography> */}
              </SoftBox>
              <SoftBox mb={1}>
                <FormControlLabel
                  control={
                    <Checkbox
                      color="primary"
                      style={{ fontSize: "22px", zoom: 1 }}
                      checked={isFeedbackChecked}
                      onChange={() => setIsFeedbackChecked(!isFeedbackChecked)}
                    />
                  }
                  label={<span style={{ fontSize: "16px" }}>I want a feedback</span>}
                  style={{ marginLeft: "auto" }}
                />
              </SoftBox>
            </Grid>
            {/* ===============Email==================== */}
            {isFeedbackChecked && (
              <Grid item lg={6} md={12} sm={12} xs={12}>
                <SoftBox mb={1}>
                  <SoftTypography
                    color="dark"
                    component="label"
                    variant="caption"
                    fontWeight="bold"
                  >
                    Email/Contact Number
                  </SoftTypography>
                </SoftBox>
                <SoftBox mb={1} className="w-full">
                  <SoftInput
                    type="email"
                    placeholder="Email/Contact Number"
                    onChange={(temp) => setEmail(temp.target.value)}
                  />
                </SoftBox>
              </Grid>
            )}
          </Grid>
        </SoftBox>
        <Divider />
        {/* =========Other Information=========*/}
        <SoftBox mb={1}>
          <SoftTypography
            color="info"
            component="label"
            variant="h5"
            fontWeight="bold"
            sx={{ borderBottom: "3px #FDB813 solid" }}
          >
            Other Information
          </SoftTypography>
          <SoftBox>
            <SoftTypography
              color="dark"
              component="label"
              variant="caption"
              fontWeight="normal"
              fontStyle= 'italic'
              type="otherInformation"
              placeholder="Other Information"
              fontSize="15px"
            >
              In this section, additional significant events may be included for incorporation into
              the report. Please feel free to provide specific details or topics you would like to
              be addressed in this section.
            </SoftTypography>
          </SoftBox>
        </SoftBox>
        <ReactQuill h={200} theme="snow" value={OtherInformation} onChange={setOtherInformation}/>

        {/* =========Button=========*/}
        <SoftBox justifyContent="center" display="flex" alignItems="center" m={3}>
          <SoftButton variant="gradient" color="info" size="medium" onClick={handleSubmit}>
            Submit
          </SoftButton>
        </SoftBox>
      </form>
    </SoftBox>
  );
}

export default DemoProfile;
