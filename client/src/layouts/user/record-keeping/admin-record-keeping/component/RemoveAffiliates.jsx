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
    const updatedAffiliate = [];
    setDeleteAffiliate(updatedAffiliate);
    GetAffiliate();
  };

  const handleClose = () => {
    setOpen(false);
  };

  //========== Search for student
  const [affiliate, setAffiliate] = useState([]);
  const [deleteAffiliate, setDeleteAffiliate] = useState([]);

  // Check if there's a user logged in &
  useEffect(() => {
    // Call the fetchData function when the component mounts
    GetAffiliate();
  }, []);

  //Request to fetch all the active students
  async function GetAffiliate() {
    setIsLoading(false);
    const formData = new FormData();
    // const email = "justinbarcos2001@gmail.com";
    const email = props.email;

    formData.append("email", email);

    await axios
      .post(localStorage.getItem("samwonAPI") + "/api/Profile/AffiliateGet", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("This is response: ", response.data);
        // Check if response data is an array
        if (Array.isArray(response.data)) {
          // Map over the response data array and create an array of objects
          const affiliatesData = response.data.map((item) => ({
            fullname: item["fullname"],
            picture: item["picture"],
            email: item["email"],
            relationship: item["relationship"],
          }));
          // Save the array of objects in state
          setAffiliate(affiliatesData);
          console.log("This is affiliatesData length:", affiliatesData.length);
          setIsLoading(false);
        } else {
          // If response data is not an array, set affiliatesData to an empty array
          setAffiliate([]);
          console.log("Response data is not an array");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleRemoveOption = (index) => {
    //Add to the delete list
    const updated_deletedAffiliate = [...deleteAffiliate];

    updated_deletedAffiliate.push({
      email: affiliate[index].email,
      fullName: affiliate[index].fullName,
      picture: affiliate[index].picture,
    });
    setDeleteAffiliate(updated_deletedAffiliate);

    //Remove to the displayed list
    const updatedAffiliate = [...affiliate];
    updatedAffiliate.splice(index, 1);
    setAffiliate(updatedAffiliate);
  };

  const handleSave = () => {
    if (deleteAffiliate.length != 0) {
      console.log(deleteAffiliate);
      swal({
        title: "Warning",
        text: "You are about to delete affiliates?",
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
        title: "No Changes",
        text: "There is no changes at all.",
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

    deleteAffiliate.map((child, index) => {
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
      .post(localStorage.getItem("samwonAPI") + `/api/Records/removeAffiliates`, formData, {
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
          text: "Affiliates updated!",
          icon: "success",
        }).then(() => {
          const updatedAffiliate = [];
          setAffiliate(updatedAffiliate);
          setDeleteAffiliate(updatedAffiliate);
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
        Remove Affiliates
      </SoftTypography>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={false} //size
        maxWidth={"lg"}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, color: "#1E4C2B" }}
          id="customized-dialog-title"
          color="main"
        >
          <SoftTypography variant="h6" color="main">
            Remove Affiliates
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
              <SoftBox className={"mx-2"}>
                <Card className="p-5">
                  <SoftBox mb={1}>
                    <SoftTypography
                      color="dark"
                      component="label"
                      variant="caption"
                      fontWeight="bold"
                    >
                      {props.role == "Parent"
                        ? "Current Child / Children"
                        : "Current Parent/Guardian"}
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox mb={1} className="w-[90%]">
                    {/* Chosen Child/Children */}
                    {affiliate.map((child, index) => (
                      <SoftBox key={index} className={"my-1"}>
                        <li key={index} className="py-1 cursor-pointer flex items-center group ">
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
                            <span className="text-gray-800 font-semibold">{child["fullName"]}</span>
                            <span className="text-gray-600 text-sm">{child["email"]}</span>
                          </div>
                        </li>
                      </SoftBox>
                    ))}
                  </SoftBox>
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
