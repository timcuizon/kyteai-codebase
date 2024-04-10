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
import Preloader from "PreLoader";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs(props) {
  const [open, setOpen] = React.useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //========== Search for student
  const [affiliate, setAffiliate] = useState([]);
  const [allStudent, setAllStudent] = useState(null);
  //Search for student
  const [isSearch, setIsSearch] = useState(false);
  const [searchStudent, setSearchStudent] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const debouncedSuggestions = useDebounce(suggestions);

  // Check if there's a user logged in &
  useEffect(() => {
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
      const fullName = student.name;
      const email = student.email;
      return (
        student.role != props.role &&
        (fullName.toLowerCase().includes(value.toLowerCase()) ||
          email.toLowerCase().includes(value.toLowerCase()))
      );
    });

    // Extract the full names of the filtered students
    const suggestionData = filteredSuggestions.map((student) => {
      return {
        fullName: student.name,
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
      setIsLoading(true);
      const formData = new FormData();
      formData.append("email", getCookie("email"));
      formData.append("userId", getCookie("email"));

      // Define your headers here with JWT Claims
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        },
      };

      // Make the POST request with the headers
      const response = await axios.post(
        localStorage.getItem("samwonAPI") + "/api/Records/getUsers",
        formData,
        {
          ...config, // Include other configuration options if needed
        }
      );
      // Save all records of active students
      setAllStudent(response.data.users);
      // console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to handle when a suggestion is selected
  const handleSuggestionClick = (suggestion) => {
    const isEmailExisting = affiliate.some((child) => child["email"] === suggestion.email);

    if (!isEmailExisting) {
      const updatedAffiliate = [...affiliate];

      updatedAffiliate.push({
        email: suggestion.email,
        fullName: suggestion.fullName,
        picture: suggestion.picture,
      });

      setAffiliate(updatedAffiliate);
      console.log(updatedAffiliate);
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
    const updatedAffiliate = [...affiliate];
    updatedAffiliate.splice(index, 1);
    setAffiliate(updatedAffiliate);
  };

  const handleSave = () => {
    if (affiliate.length != 0) {
      swal({
        title: "Confirmation",
        text: "Have you inputted the correct affiliates?",
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
        title: "No selected affiliates",
        text: "Search and add affiliates to proceed.",
        icon: "warning",
        buttons: "Close",
        dangerMode: true,
      });
    }
  };

  const handleSubmitSwal = async () => {
    // alert(role);
    setIsLoading(true);

    var str_affiliates = "";

    affiliate.map((child, index) => {
      str_affiliates += child["email"] + ",";
    });
    str_affiliates = str_affiliates.slice(0, -1);

    const formData = new FormData();
    formData.append("userId", props.userId);
    formData.append("role", props.role);
    formData.append("affiliates", str_affiliates);
    formData.append("created_by", getCookie("email"));
    formData.append("created_by_role", getCookie("role"));
    await axios
      .post(localStorage.getItem("samwonAPI") + `/api/Records/saveNewAffiliates`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        },
      })
      .then((response) => {
        // Display the response data in the console
        setIsLoading(false);
        swal({
          title: "Success!",
          text: "New affiliates addded!",
          icon: "success",
        }).then(() => {
          const updatedAffiliate = [];
          setAffiliate(updatedAffiliate);
          location.reload();
        });
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
        Add Affiliates
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
            Add Affiliates
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
        {!isLoading ? (
          <>
            <DialogContent dividers>
              <SoftBox>
                <Card>
                  <SoftBox position="relative" height="100%" p={1} className={"mb-12"}>
                    <SoftBox display="flex" flexDirection="column" height="100%" borderRadius="lg">
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
                                Search {props.role == "Parent" ? "Student" : "Parent/Guardian"}
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
                                              {props.role == "Parent"
                                                ? "Student"
                                                : "Parent/Guardian"}{" "}
                                              does not exist
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
                              {props.role == "Parent"
                                ? "Selected Child / Children"
                                : "Selected Parent/Guardian"}
                            </SoftTypography>
                          </SoftBox>
                          <SoftBox mb={1} className="w-[90%]">
                            {/* Chosen Child/Children */}
                            {affiliate.map((child, index) => (
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
                            Add
                          </SoftButton>
                        </SoftBox>
                      </Grid>
                    </SoftBox>
                  </SoftBox>
                </Card>
              </SoftBox>
            </DialogContent>
          </>
        ) : (
          <Preloader />
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
}
