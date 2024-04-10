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
import SoftBox from "components/SoftBox";
import Grid from "@mui/material/Grid";
import AppointmentCreation from "assets/images/AppointmentCreation.svg";
import Upload from "assets/images/img_Upload.svg";
import Analysis from "assets/images/img_Analysis.svg";
import Output from "assets/images/img_Output.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({ title, content }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Icon className="p-0 m-0" fontSize="small" onClick={handleClickOpen}>
        <Information />
      </Icon>
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
            {title}
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
            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12} sm={12}>
              <Grid item lg={6} md={12} sm={12} xs={12} spacing={2}>
                <SoftBox>
                  <SoftBox
                    component="img"
                    src={Upload}
                    alt="waves"
                    left={0}
                    width="100%"
                    height="10%"
                    py={2}
                    pr={0.5}
                  />
                </SoftBox>
              </Grid>
              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                spacing={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <SoftBox>
                  <SoftBox p={1}>
                    <SoftTypography
                      variant="h6"
                      color="info"
                      sx={{ borderBottom: "3px #FDB813 solid" }}
                    >
                      Upload Image
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox p={1}>
                    <SoftTypography variant="h6" color="info">
                      Upload drawn image corresponding to the chosen object for detection analysis.
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12} spacing={2}>
                <SoftBox>
                  <SoftBox
                    component="img"
                    src={Analysis}
                    alt="waves"
                    left={0}
                    width="100%"
                    height="10%"
                    py={2}
                    pr={0.5}
                  />
                </SoftBox>
              </Grid>
              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                spacing={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <SoftBox>
                  <SoftBox p={1}>
                    <SoftTypography
                      variant="h6"
                      color="info"
                      sx={{ borderBottom: "3px #FDB813 solid" }}
                    >
                      Analysis Options
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox p={1}>
                    <SoftTypography variant="h6" color="info">
                      After uploading, you have two main options:
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox p={1} ml={1}>
                    <SoftTypography variant="h6" color="info">
                      <p style={{ color: "#FDB813" }}>Change Image</p> You still have a chance to
                      replace the current image with a new one.
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox p={1} ml={1}>
                    <SoftTypography variant="h6" color="info">
                      <p style={{ color: "#FDB813" }}> Analyze Image</p>Sam Won analyzes the image
                      and provides you four different versions of your image.
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
              </Grid>
              <Grid item lg={6} md={12} sm={12} xs={12} spacing={2}>
                <SoftBox>
                  <SoftBox
                    component="img"
                    src={Output}
                    alt="waves"
                    left={0}
                    width="100%"
                    height="10%"
                    py={2}
                    pr={0.5}
                  />
                </SoftBox>
              </Grid>
              <Grid
                item
                lg={6}
                md={12}
                sm={12}
                xs={12}
                spacing={2}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <SoftBox>
                  <SoftBox p={1}>
                    <SoftTypography
                      variant="h6"
                      color="info"
                      sx={{ borderBottom: "3px #FDB813 solid" }}
                    >
                      Output Versions
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox p={1}>
                    <SoftTypography variant="h6" color="info">
                      The system generates four versions of the image:
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox p={1} ml={1}>
                    <SoftTypography variant="h6" color="info">
                      <p style={{ color: "#FDB813" }}> Detected Version</p> Shows how Sam Won
                      analyzed your uploaded image.
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox p={1} ml={1}>
                    <SoftTypography variant="h6" color="info">
                      <p style={{ color: "#FDB813" }}>Detected Filtered Version</p> Shows how Sam
                      Won analyzed your enhanced uploaded image.
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox p={1} ml={1}>
                    <SoftTypography variant="h6" color="info">
                      <p style={{ color: "#FDB813" }}>Filtered Version</p>Sam Won did some
                      enhancement to your image based on his knowledge.
                    </SoftTypography>
                  </SoftBox>
                  <SoftBox p={1} ml={1}>
                    <SoftTypography variant="h6" color="info">
                      <p style={{ color: "#FDB813" }}>Original Image</p>This is your uploaded image.
                    </SoftTypography>
                  </SoftBox>
                </SoftBox>
              </Grid>
            </Grid>
          </SoftBox>
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  );
}
