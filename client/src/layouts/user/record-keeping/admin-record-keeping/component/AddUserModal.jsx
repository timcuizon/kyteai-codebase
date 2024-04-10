import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Information from "examples/Icons/Information.js";
import Icon from "@mui/material/Icon";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import Creatable, { useCreatable } from "react-select/creatable";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import AppointmentCreation from "assets/images/AppointmentCreation.svg";
import Upload from "assets/images/img_Upload.svg";
import Analysis from "assets/images/img_Analysis.svg";
import Output from "assets/images/img_Output.svg";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "helpers/CookieHelper";
import useDebounce from "hooks/useDebounce";
import checkbox from "assets/theme/components/form/checkbox";
import data from "layouts/user/appointment-counseling/Components/ScheduleList/data";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedUserType("");
    setUserId("");
    setEmail("");
    setPosition("");
    setIsEligible(false);
    setSelectedSex("");
    setGivenName("");
    setFamilyName("");
    setDob("");
    const updatedChildren = [];
    setChildren(updatedChildren);

    setOpen(false);
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [isEligible, setIsEligible] = useState(false);
  const [dob, setDob] = useState("");
  const [selectedUserType, setSelectedUserType] = useState({ value: "student", label: "Student" });
  const [selectedSex, setSelectedSex] = useState({ value: "Male", label: "Male" });

  //========== Search for student
  const [children, setChildren] = useState([]);
  const [allStudent, setAllStudent] = useState(null);
  //Search for student
  const [isSearch, setIsSearch] = useState(false);
  const [searchStudent, setSearchStudent] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debouncedSuggestions = useDebounce(suggestions);

  // Check if there's a user logged in &
  useEffect(() => {
    if (getCookie("role") == "Admin") {
      setIsAdmin(true);
    }
    // Call the fetchData function when the component mounts
    fetchStudents();
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
      setSuggestions([]);
      setIsSearch(false);
      setSearchStudent("");
    }
  };

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

  // Function to handle when a suggestion is selected
  const handleSuggestionClick = (suggestion) => {
    const isEmailExisting = children.some((child) => child["email"] === suggestion.email);

    if (!isEmailExisting) {
      const updatedChildren = [...children];

      updatedChildren.push({
        email: suggestion.email,
        fullName: suggestion.fullName,
        picture: suggestion.picture,
      });

      setChildren(updatedChildren);
      console.log(updatedChildren);
    }

    setSearchStudent("");

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
    setSuggestions([]); // Clear suggestions after selecting one.
    setIsSearch(false);
  };

  const handleRemoveOption = (index) => {
    const updatedChildren = [...children];
    updatedChildren.splice(index, 1);
    setChildren(updatedChildren);
  };

  //=========
  const handleUserTypeChange = (selectedOption) => {
    setSelectedUserType(selectedOption["value"]);
  };

  const handleSexChange = (selectedOption) => {
    setSelectedSex(selectedOption["value"]);
  };

  const handleSave = () => {
    if (
      userId != "" &&
      email != "" &&
      givenName != "" &&
      familyName != "" &&
      dob != "" &&
      selectedSex &&
      selectedUserType != ""
    ) {
      swal({
        title: "Confirmation of Report",
        text: "Have you inputted the correct information?",
        icon: "warning",
        buttons: true,
      }).then((willSubmit) => {
        if (willSubmit) {
          //===== save API
          handleSubmitSwal();
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

  const handleSubmitSwal = async () => {
    setIsLoading(true);

    var str_children = "";

    if (selectedUserType == "parent") {
      children.map((child, index) => {
        str_children += child["email"] + ",";
      });
      str_children = str_children.slice(0, -1);
    }

    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("email", email);
    formData.append("givenname", givenName);
    formData.append("familyname", familyName);
    formData.append("dob", dob);
    formData.append("sex", selectedSex);
    formData.append("role", selectedUserType);
    formData.append("createdByEmail", getCookie("email"));
    formData.append("children", str_children);
    formData.append("position", position);
    formData.append("isEligible", isEligible);
    await axios
      .post(localStorage.getItem("samwonAPI") + `/api/Records/saveNewUser`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        },
      })
      .then((response) => {
        if (response.data.success) {
          // Display the response data in the console
          setIsLoading(false);
          swal({
            title: "Success!",
            text: "New " + selectedUserType + " addded!",
            icon: "success",
          }).then(() => {
            setSelectedUserType("");
            setUserId("");
            setEmail("");
            setPosition("");
            setIsEligible(false);
            setSelectedSex("");
            setGivenName("");
            setFamilyName("");
            setDob("");
            const updatedChildren = [];
            setChildren(updatedChildren);
            location.reload();
            window.location.replace("/records");
          });
        } else {
          swal({
            title: "Error!",
            text: response.data.mess,
            icon: "error",
          }).then(() => {});
        }
      })
      .catch((err) => {
        console.log(err);
        swal({
          title: "There is an error!",
          text: err,
          icon: "error",
        }).then(() => {});
      });
  };

  return (
    <React.Fragment>
      <SoftTypography
        className="p-0 m-0 text-colorISMgreen"
        fontSize="small"
        onClick={handleClickOpen}
      >
        Add New User
      </SoftTypography>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true} //size
        maxWidth={"lg"}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, color: "#1E4C2B" }}
          id="customized-dialog-title"
          color="main"
        >
          <SoftTypography variant="h6" color="main">
            Add New User
          </SoftTypography>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <SoftBox>
            <Card>
              <SoftBox position="relative" height="100%" p={1} className={"mb-12"}>
                <SoftBox display="flex" flexDirection="column" height="100%" borderRadius="lg">
                  <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
                    <Grid item lg={4}>
                      <SoftBox mb={1}>
                        <SoftTypography
                          color="dark"
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          User Type <span className="text-red-600">*</span>
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
                          options={[
                            { value: "student", label: "Student" },
                            { value: "parent", label: "Parent" },
                            ...(isAdmin
                              ? [
                                  { value: "professional", label: "Professional" },
                                  { value: "admin", label: "Admin" },
                                ]
                              : []),
                          ]}
                          value={selectedUserType["value"]}
                          onChange={handleUserTypeChange}
                          placeholder="Choose User Type"
                          size="small"
                        />
                      </SoftBox>
                    </Grid>
                    <Grid item lg={4}>
                      <SoftBox mb={1}>
                        <SoftTypography
                          color="dark"
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          User Id <span className="text-red-600">*</span>
                        </SoftTypography>
                      </SoftBox>
                      <SoftBox mb={1} className="w-[90%]">
                        <SoftInput
                          type="text"
                          placeholder="0001"
                          onChange={(e) => setUserId(e.target.value)}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid item lg={4}>
                      <SoftBox mb={1}>
                        <SoftTypography
                          color="dark"
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Email Address <span className="text-red-600">*</span>
                        </SoftTypography>
                      </SoftBox>
                      <SoftBox mb={1} className="w-[90%]">
                        <SoftInput
                          type="email"
                          placeholder="eg. juandelacruz.k11840583@ism.edu.ph"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </SoftBox>
                    </Grid>
                  </Grid>
                  <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
                    <Grid item lg={6}>
                      <SoftBox mb={1}>
                        <SoftTypography
                          color="dark"
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Given Name <span className="text-red-600">*</span>
                        </SoftTypography>
                      </SoftBox>
                      <SoftBox mb={1} className="w-[90%]">
                        <SoftInput
                          type="name"
                          placeholder="Given Name"
                          onChange={(e) => setGivenName(e.target.value)}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid item lg={6}>
                      <SoftBox mb={1}>
                        <SoftTypography
                          color="dark"
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Family Name <span className="text-red-600">*</span>
                        </SoftTypography>
                      </SoftBox>
                      <SoftBox mb={1} className="w-[90%]">
                        <SoftInput
                          type="name"
                          placeholder="Family Name"
                          onChange={(e) => setFamilyName(e.target.value)}
                        />
                      </SoftBox>
                    </Grid>
                  </Grid>
                  <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
                    <Grid item lg={6}>
                      <SoftBox mb={1} ml={0.5}>
                        <SoftTypography
                          color="dark"
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Date of Birth <span className="text-red-600">*</span>
                        </SoftTypography>
                      </SoftBox>
                      <SoftBox mb={1} className="w-[90%]">
                        <SoftInput
                          type="date"
                          placeholder="Date"
                          onChange={(e) => setDob(e.target.value)}
                        />
                      </SoftBox>
                    </Grid>
                    <Grid item lg={6}>
                      <SoftBox mb={1}>
                        <SoftTypography
                          color="dark"
                          component="label"
                          variant="caption"
                          fontWeight="bold"
                        >
                          Sex <span className="text-red-600">*</span>
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
                          options={[
                            { value: "Male", label: "Male" },
                            { value: "Female", label: "Female" },
                          ]}
                          value={selectedSex["value"]}
                          onChange={handleSexChange}
                          placeholder="Select sex..."
                          size="small"
                        />
                      </SoftBox>
                    </Grid>
                  </Grid>

                  {/* Potential Parent Relationship */}
                  {selectedUserType == "parent" ? (
                    <>
                      <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
                        <Grid item lg={6}>
                          <SoftBox mb={1}>
                            <SoftBox mb={1} className="w-[90%]">
                              <SoftTypography
                                color="dark"
                                component="label"
                                variant="caption"
                                fontWeight="bold"
                              >
                                Search Student (Optional)
                              </SoftTypography>
                              <span className="mx-3 pr-5 ">
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
                                    width: "70px",
                                  }}
                                >
                                  {isSearch ? (
                                    debouncedSuggestions.length > 0 ? (
                                      <ul className="absolute bg-white border border-gray-300 mt-2 w-1/2 z-10 shadow-lg h-1/2 overflow-y-scroll">
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
                                            <span className="text-gray-600">
                                              Student does not exist
                                            </span>
                                          </div>
                                        </li>
                                      </ul>
                                    )
                                  ) : (
                                    <></>
                                  )}
                                </SoftBox>
                              </span>
                            </SoftBox>
                          </SoftBox>
                        </Grid>
                        <Grid item lg={6}>
                          <SoftBox mb={1}>
                            <SoftTypography
                              color="dark"
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                            >
                              Selected Child / Children
                            </SoftTypography>
                          </SoftBox>
                          <SoftBox mb={1} className="w-[90%]">
                            {/* Chosen Child/Children */}
                            {children.map((child, index) => (
                              <SoftBox key={index} className={"my-1"}>
                                <li
                                  key={index}
                                  className="py-1 cursor-pointer flex items-center group hover:bg-gray-100"
                                >
                                  <SoftButton
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleRemoveOption(index)}
                                    sx={{ padding: "0px" }}
                                  >
                                    <lord-icon
                                      src="https://cdn.lordicon.com/hpmrawdd.json"
                                      trigger="hover"
                                      colors="primary:#911710,secondary:#c71f16"
                                    ></lord-icon>
                                  </SoftButton>
                                  <img
                                    src={child["picture"]}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full mx-2"
                                  />
                                  <div className="flex flex-col">
                                    <span className="text-gray-800 font-semibold">
                                      {child["fullName"]}
                                    </span>
                                    <span className="text-gray-600 text-sm">{child["email"]}</span>
                                  </div>
                                </li>
                                {/* <SoftTypography color="dark" component="label" margin={2}>
                                  <img
                                    src={child["picture"]}
                                    alt="Profile"
                                    className="w-8 h-8 rounded-full mr-2"
                                  />
                                  {child["fullName"]}
                                </SoftTypography> */}
                              </SoftBox>
                            ))}
                          </SoftBox>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}

                  {/* Potential Parent Relationship */}
                  {selectedUserType == "professional" ? (
                    <>
                      <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
                        <Grid item lg={6}>
                          <SoftBox mb={1}>
                            <SoftTypography
                              color="dark"
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                            >
                              Position
                            </SoftTypography>
                          </SoftBox>
                          <SoftBox mb={1} className="w-[90%]">
                            <SoftInput
                              type="name"
                              placeholder="Guidance Counselor"
                              onChange={(e) => setPosition(e.target.value)}
                            />
                          </SoftBox>
                        </Grid>
                        <Grid item lg={6}>
                          <SoftBox mb={1}>
                            <SoftTypography
                              color="dark"
                              component="label"
                              variant="caption"
                              fontWeight="bold"
                            >
                              Is Eligible to Interpret?
                            </SoftTypography>
                          </SoftBox>
                          <SoftBox mb={1} className="w-[90%]">
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="form-checkbox h-5 w-5 text-primary focus:ring-primary border-gray-300 rounded"
                                checked={isEligible}
                                onChange={(e) => setIsEligible(e.target.checked)}
                              />
                              <span className="ml-2">Eligible to Interpret</span>
                            </label>
                          </SoftBox>
                        </Grid>
                      </Grid>
                    </>
                  ) : (
                    <></>
                  )}
                  <Grid item lg={12} display="flex" justifyContent="end" alignItems="center">
                    <SoftBox mr={1} className={"mt-5"}>
                      <SoftButton
                        variant="gradient"
                        color="error"
                        size="medium"
                        onClick={handleClose}
                      >
                        Cancel
                      </SoftButton>
                    </SoftBox>
                    <SoftBox mr={5} className={"mt-5"}>
                      <SoftButton
                        variant="gradient"
                        color="info"
                        size="medium"
                        onClick={() => handleSave()}
                      >
                        Save
                      </SoftButton>
                    </SoftBox>
                  </Grid>
                </SoftBox>
              </SoftBox>
            </Card>
          </SoftBox>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
