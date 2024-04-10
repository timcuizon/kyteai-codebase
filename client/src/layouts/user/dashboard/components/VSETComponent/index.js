import wavesWhite from "assets/images/shapes/waves-white.svg";
import tree from "assets/images/illustrations/tree.png";
import house from "assets/images/illustrations/house.png";
import person from "assets/images/illustrations/person.png";
import { Link } from "react-router-dom";
import { Card, Grid } from "@mui/material";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { Player } from "@lottiefiles/react-lottie-player";

function vsetComponent() {
  function handleRedirect() {
    window.location.replace("/pre-vset");
  }

  return (
    <Card sx={{ padding: "2rem" }}>
      <Grid container spacing={4} lg={12} item sm={12} xl={12} md={12} xs={12}>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <SoftButton variant="gradient" color="info" onClick={handleRedirect} style={{width: "100%" }}>
            <SoftBox color="colorISMgreen">
              <Player
                autoplay
                loop
                src="https://lottie.host/9c494771-52d5-40a1-8483-d2ccc6fad7eb/0lhKv4auih.json"
                style={{ height: "240px", width: "100%" }}
              />
            </SoftBox>
          </SoftButton>
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <SoftButton variant="gradient" color="info" onClick={handleRedirect} style={{width: "100%" }}>
            <SoftBox color="colorISMgreen">
              <Player
                autoplay
                loop
                src="https://lottie.host/a5cc7c8a-4893-4a02-9c86-2f94a883c74b/7ljSvbyZII.json"
                style={{ height: "240px", width: "100%" }}
              />
            </SoftBox>
          </SoftButton>
        </Grid>
        <Grid item lg={4} sm={12} md={12} xs={12}>
          <SoftButton variant="gradient" color="info" onClick={handleRedirect} style={{width: "100%" }}>
            <SoftBox color="colorISMgreen">
              <Player
                autoplay
                loop
                src="https://lottie.host/ea459919-abd0-41c8-8170-438a1b4f9eb6/8hg2FcbBNs.json"
                style={{ height: "240px", width: "100%" }}
              />
            </SoftBox>
          </SoftButton>
        </Grid>
      </Grid>
    </Card>
  );
}

export default vsetComponent;
