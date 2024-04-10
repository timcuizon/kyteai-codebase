// @mui material components
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

//Cards
import Card from "@mui/material/Card";
import SoftButton from "../../../../components/SoftButton/index";
import ReactQuill from "react-quill";
import Creatable, { useCreatable } from 'react-select/creatable';
import Select from "react-select";

import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import { TextField } from "@mui/material";
import { WidthFull } from "@mui/icons-material";
import { getCookie } from "helpers/CookieHelper";
import axios from "axios";
import { isLoggedIn } from "helpers/helpers";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const gender = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "LGBTQ", label: "LGBTQ" },
];

function Dashboard() {
  const [selectedGender, setSelectedGender] = useState("");

  const givenNameRef = useRef(null);
  const familyNameRef = useRef(null);
  const genderRef = useRef(null);

  const profileInfoResponse = useCallback( async () => {
    const formData = new FormData();

    formData.append("email", getCookie("email"))

    await axios.post(
      localStorage.getItem("samwonAPI") + "/api/Profile/GetProfile",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    ).then((response) => {
      var data = response.data[0];
      setSelectedGender({value: data.sex, label: data.sex})

      givenNameRef.current.value = getCookie("givenName")
      familyNameRef.current.value = getCookie("familyName")
    }).catch((error) => {
      console.log(error)
    })
  })
  var genderS;

  useEffect(() => {

    if (!isLoggedIn()) {
      window.location.replace("/authentication/sign-out");
    } else {
      profileInfoResponse()
    }
  }, [])
  
  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    swal({
      title: "Are you sure?",
      text: "you can still update your profile info later",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((submit) => {
      if (submit) {
        const formData = new FormData();

        formData.append("email", getCookie("email"));
        formData.append("role",  getCookie("role"));
        formData.append("sex", selectedGender.value)

        axios.post(
          localStorage.getItem("samwonAPI") + "/api/Profile/EditProfile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ).then((response) => {
          console.log(response);

          if(response.data === "Succes"){
            swal("Succesfully edited your profile!", {
              icon: "success",
              title: "Success"
            }).then(
              navigate("/profile")
            )
          } else {
            swal({
              title: "an Error has occured!",
              text: "Failed to edit your profile",
              icon: "error",
            });
          }
        }).catch(() => {
          swal({
            title: "an Error has occured!",
            text: "Failed to edit your profile",
            icon: "error",
          });
        })
      } 
    });
  }, [selectedGender, getCookie, givenNameRef, familyNameRef])

  return (
    <SoftBox>
      <Card>
        <form action="" id="edit-profile" method="post">
          <SoftBox position="relative" height="100%" p={2}>
            <SoftBox display="flex" flexDirection="column" height="100%" py={2} borderRadius="lg">
              <SoftBox mb={1}>
                <SoftTypography color="dark" component="label" variant="h5" fontWeight="bold">
                  Personal Information
                </SoftTypography>
              </SoftBox>
              <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <SoftBox mb={1}>
                    <SoftTypography
                      color="dark"
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      User Type
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={1} className="w-[90%]">
                    <SoftInput type="name" placeholder="Name" value={getCookie("role")} readonly="readonly" disabled />
                  </SoftBox>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <SoftBox mb={1}>
                    <SoftTypography
                      color="dark"
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Email Address
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={1} className="w-[90%]">
                    <SoftInput
                      type="email"
                      placeholder="email"
                      value={getCookie("email")}
                      readonly="readonly"
                      disabled
                    />
                  </SoftBox>
                </Grid>
              </Grid>
              <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <SoftBox mb={1}>
                    <SoftTypography
                      color="dark"
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Given Name
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={1} className="w-[90%]">
                    <SoftInput type="name" inputRef={givenNameRef} disabled/>
                  </SoftBox>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <SoftBox mb={1}>
                    <SoftTypography
                      color="dark"
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Family Name
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={1} className="w-[90%]">
                    <SoftInput type="name" inputRef={familyNameRef} disabled />
                  </SoftBox>
                </Grid>
              </Grid>
              <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <SoftBox mb={1}>
                    <SoftTypography
                      color="dark"
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      Sex
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={1} className="w-[90%]">
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
                      options={gender}
                      value={selectedGender}
                      onChange={(selectedOption) => {
                        setSelectedGender(selectedOption)
                      }}
                      inputRef={genderRef}
                      placeholder="Select a gender..."
                      size="small"
                    />
                  </SoftBox>
                </Grid>
              </Grid>
            </SoftBox>

            <SoftBox
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                my: "30px"
              }}
            >
              <SoftButton 
                variant="gradient"
                color="info"
                onClick={handleSubmit}
              >
                Submit Changes
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </form>
      </Card>
    </SoftBox>
  );
}

export default Dashboard;
