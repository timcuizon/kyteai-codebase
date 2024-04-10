import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import burceMars from "assets/images/bruce-mars.jpg";
import SoftAvatar from "components/SoftAvatar";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const { Grid, Card, Typography } = require("@mui/material");
const { default: SoftBox } = require("components/SoftBox");

function appointmentCard({ Title, Date, Time, Image, Role, Status,Email, refNum, userRole, redirectId}) {
  
  const navigate = useNavigate();

  function handleClick() {

    //alert(refNum)
    if (userRole == "Admin" || userRole == "Professional"){
      navigate(`/appointment/schedule-management?id=${redirectId}`, {state: redirectId})
    } else {
      navigate(`/appointment-counseling/appointment-summary?id=${redirectId}`)
    }
  }

  return (
    <SoftBox>
      <Grid container spacing={2} lg={12} item xs={12} xl={12} md={12} px={5}>
        <Grid
          item
          lg={2}
          spacing={2}
          xs={12}
          md={12}
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <SoftAvatar src={Image} alt="profile-image" variant="rounded" size="lg" shadow="sm" />
        </Grid>

        <Grid item lg={7} spacing={2} xs={12} md={12}>
          <SoftBox>
            <SoftBox>
              <SoftTypography color="info" component="label" variant="h6" fontWeight="bold">
                {Title}
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography variant="body2">
                {userRole == "Admin" || userRole == "Professional" ? (
                  <>
                      User Type: {Role}
                  </>
                ) : null}   
              </SoftTypography>
            </SoftBox>
            <SoftTypography variant="body2" noWrap={true}>Email: {Email}</SoftTypography>
            <SoftTypography variant="body2">Schedule Date: {Date}</SoftTypography>
            <SoftTypography variant="body2">Schedule Time: {Time}</SoftTypography>
          </SoftBox>
        </Grid>

        <Grid
          item
          lg={3}
          spacing={2}
          xs={12}
          md={12}
          sx={{ textAlign: "center" }}
          alignItems="center"
          display="flex"
        >
          <SoftBox sx={{ width: "100%" }}>
            <Typography variant="body2" mb={1}>
              Status:
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {Status}
              </Typography>
            </Typography>
            <SoftButton color="colorISMgreen" sx={{ width: "100%" }} onClick={handleClick}>
                &nbsp; View
            </SoftButton>
          </SoftBox>
        </Grid>
      </Grid>
      <Divider />
    </SoftBox>
  );
}

export default appointmentCard;
