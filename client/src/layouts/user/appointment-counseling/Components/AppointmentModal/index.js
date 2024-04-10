import * as React from "react";

import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import SoftButton from "components/SoftButton";
import DialogContentText from "@mui/material/DialogContentText";
import { useState } from "react";
import SoftTypography from "components/SoftTypography";
import SoftBox from "components/SoftBox";
import Divider from "@mui/material/Divider";
import { getCookie } from "helpers/CookieHelper";
import SoftAvatar from "components/SoftAvatar";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

  
const personalInfo = [{ value: "personalInfo", label: "Select" }];

export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const [isAffiliateVisible, setIsAffiliateVisible] = React.useState(true);
  const [scroll, setScroll] = React.useState("paper");
  const [selectedPersonalInfo, setSelectedPersonalInfo] = useState(null);



  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const [currentUser, setCurrentUser] = useState(true);
    
  const handleSaveChanges= () => {
    setOpen(false);
    setIsAffiliateVisible(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <React.Fragment>
      <SoftButton variant="gradiant" color="info" onClick={handleClickOpen("paper")}>
        Affiliate Appointment
      </SoftButton>
      
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        scroll={scroll}
        fullWidth={true} //size
        maxWidth={"lg"}
      >
        <SoftTypography
          color="info"
          fontWeight="bold"
          sx={{ m: 0, p: 2, borderBottom: "3px #FDB813 solid" }}
          id="customized-dialog-title"
        >
          Affiliate Appointment
        </SoftTypography>
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
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <form action="" id="appointment-counseling-form" method="post">
              <SoftBox mb={2}>
                <Card sx={{ padding: "2rem" }}>
                  <SoftBox position="relative" height="100%">
                    <SoftBox display="flex" flexDirection="column" height="100%" borderRadius="lg">
                      <SoftBox mb={1}>
                        <SoftTypography variant="h5" color="info" fontWeight="bold">
                          Affiliate Information
                        </SoftTypography>
                        <Divider />
                      </SoftBox>

                      <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12} sm={12}>
                        <Grid
                          item
                          lg={1}
                          md={12}
                          sm={12}
                          xs={12}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          mr={3}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <SoftAvatar
                            src={currentUser ? getCookie("picture") : ""}
                            alt="profile-image"
                            variant="rounded-full"
                            size="xxl"
                            shadow="sm"
                          />
                        </Grid>
                        <Grid
                          item
                          lg={5}
                          md={12}
                          sm={12}
                          xs={12}
                          display="flex"
                          alignItems="center"
                          justifyContent="start"
                        >
                          <SoftBox>
                            <SoftTypography
                              color="dark"
                              component="label"
                              variant="h4"
                              fontWeight="bold"
                            >
                              {currentUser
                                ? getCookie("givenName") + " " + getCookie("familyName")
                                : ""}
                            </SoftTypography>
                            <br />
                            <SoftTypography color="dark" component="label" variant="body1">
                              {currentUser ? getCookie("email") : ""}
                            </SoftTypography>
                          </SoftBox>
                        </Grid>
                        {/* is Visible if parent account being used  */}
                        <Grid
                          item
                          lg={5}
                          md={12}
                          sm={12}
                          xs={12}
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          <SoftBox
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <RadioGroup
                              aria-label="modality"
                              name="modality"
                              value={selectedPersonalInfo}
                              onChange={(e) => setSelectedPersonalInfo(e.target.value)}
                              sx={{
                                flexDirection: "row", // Arrange radio buttons horizontally
                                justifyContent: "center", // Center the radio group horizontally
                                alignItems: "center", // Center the radio group vertically
                              }}
                            >
                              {personalInfo.map((option) => (
                                <FormControlLabel
                                  key={option.value}
                                  value={option.value}
                                  control={
                                    <Radio
                                      sx={{
                                        color: "#1E4C2B",
                                        "&.Mui-checked": { color: "#1E4C2B" },
                                      }}
                                    />
                                  }
                                  label={option.label}
                                  sx={{
                                    color: "#1E4C2B",
                                    "& .MuiSvgIcon-root": {
                                      fontSize: "1rem", // Adjust the radio button size
                                    },
                                  }}
                                />
                              ))}
                            </RadioGroup>
                          </SoftBox>
                        </Grid>
                      </Grid>
                    </SoftBox>
                  </SoftBox>
                </Card>
              </SoftBox>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <SoftButton
            color="info"
            fontWeight="bold"
            autoFocus
            onClick={handleSaveChanges}
            sx={{ m: 0, p: 1 }}
          >
            Save Changes
          </SoftButton>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
