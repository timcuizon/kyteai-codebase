import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftBox from "components/SoftBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "helpers/CookieHelper";
import useDebounce from "hooks/useDebounce";
import Preloader from "PreLoader";
import swal from "sweetalert";
import { isLoggedIn, replaceLastCharacter } from "helpers/helpers";

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
    fetchCatCon();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //==========
  const [allCategory, setAllCategory] = useState([]);
  const [allConcern, setAllConcern] = useState([]);
  const [activeCat, setActiveCat] = useState();

  // Check if there's a user logged in &
  useEffect(() => {
    // Call the fetchData function when the component mounts
    fetchCatCon();
  }, []);

  //Request to fetch all the active students
  const fetchCatCon = async () => {
    try {
      setIsLoading(true);
      // Define your headers here with JWT Claims
      const headers = {
        Authorization: "Bearer " + getCookie("user_token"),
        "Content-Type": "application/json",
      };

      // Make the POST request with the headers
      const response = await axios.post(
        localStorage.getItem("samwonAPI") + "/api/User_StudentParent_Space/GetRecordsCatCon",
        {},
        {
          headers: headers,
        }
      );
      // Save all results
      setAllCategory(response.data.categories);
      // alert(response.data.categories[0].id);
      setActiveCat(response.data.categories[0].id);
      setAllConcern(response.data.concerns);
      // console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  function handleViewConcern(index) {
    setActiveCat(index);
  }

  //Function upon removing the category
  function handleRemoveCategory(catId) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this category.",
      dangerMode: true,
      buttons: ["Cancel", "Delete"],
    }).then((response) => {
      // alert(catId);
      if (response) {
        //Removing the category to the array
        const newArray_categories = allCategory.filter((data) => data.id != catId);
        // console.log(newArray_categories);
        setAllCategory(newArray_categories);

        //Removing its associated concerns
        const newArray_concerns = allConcern.filter((data) => data.catId != catId);
        // console.log(newArray_concerns);
        setAllConcern(newArray_concerns);
        // alert(allCategory[0].id);
        setActiveCat(allCategory[0].id);
        swal({
          icon: "success",
          title: "Success",
          text: "Category removed.",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }

  // function that will update the category upon editting
  function editCategory(id, category) {
    // Checking the initial value of options
    console.log(allCategory[id].category);
    // saving the new edited value
    allCategory[id].category = category;
    // Checking the new values
    console.log("The Updated Category is: " + allCategory[id].category);
  }

  //Function upon removing the concerns
  function handleRemoveConcern(concernId) {
    swal({
      title: "Are you sure?",
      text: "You won't be able to revert this concern.",
      dangerMode: true,
      buttons: ["Cancel", "Delete"],
    }).then((response) => {
      // alert(catId);
      if (response) {
        //Removing its associated concerns
        const newArray_concerns = allConcern.filter((data) => data.id != concernId);
        // console.log(newArray_concerns);
        setAllConcern(newArray_concerns);

        swal({
          icon: "success",
          title: "Success",
          text: "Concern removed.",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    });
  }

  // function that will update the concern upon editting
  function editConcern(id, concern) {
    // saving the new edited value
    const index = allConcern.findIndex((item) => item.id === id);
    if (index !== -1) {
      // Updating the concern property
      allConcern[index].concern = concern;
      // Checking the new values
      console.log("The Updated Concern is: " + allConcern[index].concern);
    } else {
      console.log("Item with id " + id + " not found.");
    }
  }

  // Function that will add new Category and concern
  function handleNewCategory() {
    //======= Category =======
    // Clone the original array
    const newArray_categories = [...allCategory];

    // Get the last ID and increment it
    let category_lastId = 0;
    if (newArray_categories.length > 0) {
      category_lastId = parseInt(newArray_categories[newArray_categories.length - 1].id) + 1;
    }
    // Create a new element with default values
    const newCategory = {
      id: category_lastId.toString(),
      category: "New Category",
    };

    // Push the new element into the array
    newArray_categories.push(newCategory);

    console.log(newArray_categories);
    // Update the state with the new array
    setAllCategory(newArray_categories);

    //======= concerns =======
    // Clone the original array
    const newArray_concerns = [...allConcern];

    // Get the last ID and increment it
    let concern_lastId = 0;
    if (newArray_concerns.length > 0) {
      concern_lastId = parseInt(newArray_concerns[newArray_concerns.length - 1].id) + 1;
    }
    // Create a new element with default values
    const newConcern = {
      id: concern_lastId.toString(),
      catId: category_lastId.toString(),
      concern: "New Concern",
    };

    // Push the new element into the array
    newArray_concerns.push(newConcern);

    console.log(newArray_concerns);
    // Update the state with the new array
    setAllConcern(newArray_concerns);
  }

  // Function that will add new Concern
  function handleNewConcern() {
    //======= concerns =======
    // Clone the original array
    const newArray_concerns = [...allConcern];

    // Get the last ID and increment it
    let concern_lastId = 0;
    if (newArray_concerns.length > 0) {
      concern_lastId = parseInt(newArray_concerns[newArray_concerns.length - 1].id) + 1;
    }
    // Create a new element with default values
    const newConcern = {
      id: concern_lastId.toString(),
      catId: activeCat,
      concern: "New Concern",
    };

    // Push the new element into the array
    newArray_concerns.push(newConcern);

    console.log(newArray_concerns);
    // Update the state with the new array
    setAllConcern(newArray_concerns);
  }

  // Function that will save and update all the changes to the database
  async function handleSave() {
    // console.log(allCategory);
    // console.log(allConcern);
    var category_ids = "'";
    var category_str = "'";
    var concern_ids = "'";
    var concern_categoryId_str = "'";
    var concern_str = "'";

    allCategory.forEach((data) => {
      category_ids += data.id + "|";
      category_str += data.category + "|";
    });

    allConcern.forEach((data) => {
      concern_ids += data.id + "|";
      concern_categoryId_str += data.catId + "|";
      concern_str += data.concern + "|";
    });

    category_ids = replaceLastCharacter(category_ids);
    category_str = replaceLastCharacter(category_str);
    concern_ids = replaceLastCharacter(concern_ids);
    concern_categoryId_str = replaceLastCharacter(concern_categoryId_str);
    concern_str = replaceLastCharacter(concern_str);

    // console.log(concern_ids);
    // console.log(category_str);
    // console.log(concern_ids);
    // console.log(concern_categoryId_str);
    // console.log(concern_str);

    // // Web service for saving the questionnaires
    const url =
      localStorage.getItem("samwonAPI") + `/api/User_StudentParent_Space/UpdateRecordsCatCon`;

    const formData = new FormData();
    // Append the fields to the FormData object
    formData.append("category_ids", category_ids);
    formData.append("category_str", category_str);
    formData.append("concern_ids", concern_ids);
    formData.append("concern_categoryId_str", concern_categoryId_str);
    formData.append("concern_str", concern_str);
    formData.append("prof_userId", getCookie("email"));

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
          if (response.data.success) {
            swal({
              icon: "success",
              title: "Success",
              text: "Saved successfully",
              showConfirmButton: false,
              timer: 3000,
            }).then(() => {
              location.reload();
            });
          }
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

  return (
    <React.Fragment>
      {/* <SoftTypography
        className="p-0 m-0 text-colorISMgreen"
        fontSize="small"
        onClick={handleClickOpen}
      >
        Add Affiliates
      </SoftTypography> */}

      <button type="button" className="ml-3" onClick={handleClickOpen}>
        <lord-icon
          src="https://cdn.lordicon.com/wuvorxbv.json"
          trigger="hover"
          color="info"
          stroke="100"
        ></lord-icon>
      </button>
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
            Customize Categories & Concerns
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
                        {/* First Half */}
                        <Grid item lg={6}>
                          <SoftBox mb={1}>
                            <SoftTypography color="dark" component="label" fontWeight="bold">
                              Categories
                            </SoftTypography>
                          </SoftBox>
                          <SoftBox mb={1} className="w-[90%]">
                            {allCategory.map((data, index) => (
                              <SoftBox
                                key={data.id}
                                className={"my-1"}
                                onClick={() => handleViewConcern(data.id)}
                              >
                                <li
                                  key={data.id}
                                  // className="py-1 cursor-pointer flex items-center group hover:bg-gray-100"
                                  className={`py-1 cursor-pointer flex items-center group hover:bg-gray-100 ${
                                    activeCat === data.id ? "bg-gray-200" : ""
                                  }`}
                                >
                                  <SoftButton
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleRemoveCategory(data.id)}
                                    sx={{ padding: "0px" }}
                                  >
                                    <lord-icon
                                      src="https://cdn.lordicon.com/drxwpfop.json"
                                      trigger="hover"
                                      colors="primary:#911710,secondary:#c71f16"
                                    ></lord-icon>
                                  </SoftButton>
                                  <div className="flex flex-col ml-2">
                                    <span
                                      className="text-gray-800"
                                      contentEditable={true}
                                      onBlur={(e) => editCategory(index, e.target.textContent)}
                                    >
                                      {data["category"]}
                                    </span>
                                  </div>
                                </li>
                              </SoftBox>
                            ))}
                            <SoftBox className={"flex justify-center mt-2"}>
                              <SoftButton
                                variant="outlined"
                                color="info"
                                size="small"
                                onClick={() => handleNewCategory()}
                                sx={{ marginLeft: "20px" }}
                              >
                                Add Category
                                <lord-icon
                                  src="https://cdn.lordicon.com/zrkkrrpl.json"
                                  trigger="hover"
                                ></lord-icon>
                              </SoftButton>
                            </SoftBox>
                          </SoftBox>
                        </Grid>
                        {/* Second Half */}
                        <Grid item lg={6}>
                          <SoftBox mb={1}>
                            <SoftTypography color="dark" component="label" fontWeight="bold">
                              Concerns
                            </SoftTypography>
                          </SoftBox>
                          <SoftBox mb={1} className="w-[90%]">
                            {allConcern
                              .filter((data) => data.catId === activeCat)
                              .map((data, index) => (
                                <SoftBox key={index} className={"my-1"}>
                                  <li
                                    key={index}
                                    className="py-1 cursor-pointer flex items-center group hover:bg-gray-100"
                                  >
                                    <SoftButton
                                      variant="outlined"
                                      color="error"
                                      size="small"
                                      onClick={() => handleRemoveConcern(data.id)}
                                      sx={{ padding: "0px" }}
                                    >
                                      <lord-icon
                                        src="https://cdn.lordicon.com/drxwpfop.json"
                                        trigger="hover"
                                        colors="primary:#911710,secondary:#c71f16"
                                      ></lord-icon>
                                    </SoftButton>
                                    <div className="flex flex-col ml-2">
                                      <span
                                        className="text-gray-800"
                                        contentEditable={true}
                                        onBlur={(e) => editConcern(data.id, e.target.textContent)}
                                      >
                                        {data["concern"]}
                                      </span>
                                    </div>
                                  </li>
                                </SoftBox>
                              ))}
                            <SoftBox className={"flex justify-center mt-2"}>
                              <SoftButton
                                variant="outlined"
                                color="info"
                                size="small"
                                onClick={() => handleNewConcern()}
                                sx={{ marginLeft: "20px" }}
                              >
                                Add Concern
                                <lord-icon
                                  src="https://cdn.lordicon.com/zrkkrrpl.json"
                                  trigger="hover"
                                ></lord-icon>
                              </SoftButton>
                            </SoftBox>
                          </SoftBox>
                        </Grid>
                      </Grid>
                      {/* Action Buttons */}
                      <Grid item lg={12} display="flex" justifyContent="center" alignItems="center">
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
          </>
        ) : (
          <Preloader />
        )}
      </BootstrapDialog>
    </React.Fragment>
  );
}
