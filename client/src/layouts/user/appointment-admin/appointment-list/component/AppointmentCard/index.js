import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import SoftBadge from "components/SoftBadge";

const { Grid, Card, Typography, useMediaQuery } = require("@mui/material");
const { default: SoftBox } = require("components/SoftBox");

function appointmentCard({ Title, Date, Time, Image, Role, Status,Email, refNum}) {
  
  const navigate = useNavigate();

  function handleClick() {

    //alert(refNum)
  navigate(`/appointment/schedule-management?id=${refNum}`, {state: refNum})
  }
  const isSmallScreen = useMediaQuery("(min-width:1280px)");
  


  return (
    <SoftBox>
      <Grid container pl={1} spacing={2} lg={12} item xs={12} xl={12} md={12}>
        <Grid
          item
          lg={isSmallScreen ? 2 : 12}
          spacing={2}
          xs={12}
          md={12}
          alignItems="center"
          justifyContent="center"
          display="flex"
        >
          <div style={{ position: 'relative', display: 'inline-block' }}>
          <SoftAvatar src={Image} alt="profile-image" variant="rounded" size={isSmallScreen ? "xl" : "md"} shadow="sm" />
            <SoftBadge
              badgeContent={Role}
              container
              style={{ position: 'absolute', bottom: -10, left: '50%', transform: 'translateX(-50%)' }}
              size={isSmallScreen ? "sm" : "xs"}
            />
          </div>
        </Grid>

        <Grid item lg={isSmallScreen ? 7 : 12} spacing={2} xs={12} md={12}>
          <SoftBox>
            <SoftBox>
              <SoftTypography color="info" component="label" variant="subtitle2" fontWeight="bold">
                {Title}
              </SoftTypography>
            </SoftBox>
            {/* <SoftTypography variant="caption" sx={{fontStyle: "italic"}}>{Email}</SoftTypography> */}
            <SoftBox>
              <SoftBadge sx={{marginX: '3px'}} container circular size='xs' badgeContent={Date}/>
              <SoftBadge sx={{marginX: '3px'}} container circular size='xs' badgeContent={Time}/>
            </SoftBox>
          </SoftBox>
        </Grid>

        <Grid
          item
          lg={isSmallScreen ? 3 : 12}
          spacing={2}
          xs={12}
          md={12}
          sx={{ textAlign: "center" }}
          alignItems="center"
          display="flex"
        >
          <SoftBox sx={{ width: "100%" }}>
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              Status: {Status}
            </Typography>
            <SoftButton color="colorISMgreen" sx={{ width: "100%" }} onClick={handleClick}>
              View
            </SoftButton>
          </SoftBox>
        </Grid>
      </Grid>
      <Divider />
    </SoftBox>
  );
}

export default appointmentCard;
