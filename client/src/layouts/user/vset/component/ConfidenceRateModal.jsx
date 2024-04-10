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
import { Medium } from "react-bootstrap-icons";
import Confidence from "assets/images/img_ConfidenceRate.svg";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function CustomizedDialogs({
  HighestRate,
  HighRate,
  MediumRate,
  LowRate,
  LowestRate,
  title,
}) {
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
              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                spacing={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <SoftBox>
                  <SoftBox
                    component="img"
                    src={Confidence}
                    alt="waves"
                    left={0}
                    width="100%"
                    height="10%"
                    py={2}
                    pr={0.5}
                  ></SoftBox>
                </SoftBox>
              </Grid>

              <Grid
                item
                lg={12}
                md={12}
                sm={12}
                xs={12}
                spacing={2}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <SoftBox
                  p={1}
                  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <SoftTypography
                    variant="h6"
                    color="info"
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                    fontWeight={"bold"}
                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                  >
                    Confidence Rate
                  </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>

            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12} sm={12}>
              <Grid
                item
                lg={5}
                md={12}
                sm={12}
                xs={12}
                display="flex"
                justifyContent="end"
                alignItems="center"
              >
                <SoftBox p={1}>
                  <SoftTypography
                    variant="h6"
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                    style={{ color: "#1EAB89" }}
                    fontWeight={"bold"}
                  >
                    Highest Rate (100% - 95%)
                  </SoftTypography>
                </SoftBox>
              </Grid>

              <Grid item lg={5} md={12} sm={12} xs={12}>
                <SoftBox p={1}>
                  <SoftTypography variant="h6" color="info" className="text-themeGreen4">
                    {HighestRate}
                  </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>

            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12} sm={12}>
              <Grid
                item
                lg={5}
                md={12}
                sm={12}
                xs={12}
                display="flex"
                justifyContent="end"
                alignItems="center"
              >
                <SoftBox p={1}>
                  <SoftTypography
                    variant="h6"
                    color="info"
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                    style={{ color: "#1EAB89" }}
                    fontWeight={"bold"}
                  >
                    High Rate (81% - 94%)
                  </SoftTypography>
                </SoftBox>
              </Grid>

              <Grid item lg={5} md={12} sm={12} xs={12}>
                <SoftBox p={1}>
                  <SoftTypography variant="h6" color="info">
                    {HighRate}
                  </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>

            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12} sm={12}>
              <Grid
                item
                lg={5}
                md={12}
                sm={12}
                xs={12}
                display="flex"
                justifyContent="end"
                alignItems="center"
              >
                <SoftBox p={1}>
                  <SoftTypography
                    variant="h6"
                    color="info"
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                    style={{ color: "#FDB813" }}
                    fontWeight={"bold"}
                  >
                    Moderate Rate (75% - 80%)
                  </SoftTypography>
                </SoftBox>
              </Grid>

              <Grid item lg={5} md={12} sm={12} xs={12}>
                <SoftBox p={1}>
                  <SoftTypography variant="h6" color="info">
                    {MediumRate}
                  </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>

            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12} sm={12}>
              <Grid
                item
                lg={5}
                md={12}
                sm={12}
                xs={12}
                display="flex"
                justifyContent="end"
                alignItems="center"
              >
                <SoftBox p={1}>
                  <SoftTypography
                    variant="h6"
                    color="info"
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                    style={{ color: "#DC3545" }}
                    fontWeight={"bold"}
                  >
                    Low Rate (1% - 75%)
                  </SoftTypography>
                </SoftBox>
              </Grid>

              <Grid item lg={5} md={12} sm={12} xs={12}>
                <SoftBox p={1}>
                  <SoftTypography variant="h6" color="info">
                    {LowRate}
                  </SoftTypography>
                </SoftBox>
              </Grid>
            </Grid>

            <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12} sm={12}>
              <Grid
                item
                lg={5}
                md={12}
                sm={12}
                xs={12}
                display="flex"
                justifyContent="end"
                alignItems="center"
              >
                <SoftBox p={1}>
                  <SoftTypography
                    variant="h6"
                    color="info"
                    sx={{ borderBottom: "3px #FDB813 solid" }}
                    style={{ color: "#DC3545" }}
                    fontWeight={"bold"}
                  >
                    Lowest Rate (0%)
                  </SoftTypography>
                </SoftBox>
              </Grid>

              <Grid item lg={5} md={12} sm={12} xs={12}>
                <SoftBox p={1}>
                  <SoftTypography variant="h6" color="info">
                    {LowestRate}
                  </SoftTypography>
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
