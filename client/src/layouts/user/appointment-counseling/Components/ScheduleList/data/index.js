// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftProgress from "components/SoftProgress";

// Images
import logoXD from "assets/images/small-logos/logo-xd.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import councilor1 from "assets/images/team-1.jpg";
import councilor2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import councilor4 from "assets/images/team-4.jpg";

export default function data() {
  const avatars = (schedule) =>
    schedule.map(([image, name]) => (
      <Tooltip key={name} title={name} placeholder="bottom">
        <SoftAvatar
          src={image}
          alt="name"
          size="xs"
          sx={{
            border: ({ borders: { borderWidth }, palette: { white } }) =>
              `${borderWidth[2]} solid ${white.main}`,
            cursor: "pointer",
            position: "relative",

            "&:not(:first-of-type)": {
              ml: -1.25,
            },

            "&:hover, &:focus": {
              zIndex: "10",
            },
          }}
        />
      </Tooltip>
    ));

  return {
    columns: [
      { name: "councilors", align: "left" },
      { name: "schedule", align: "center" },
      { name: "reference", align: "center" },
      { name: "completion", align: "center" },
    ],

    rows: [
      {
        councilors: [councilor1, "Justin Barcos Ph.D"], 
        schedule: (
          <SoftBox display="flex" py={1}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              10/4/2023, 1:00 pm
            </SoftTypography>
          </SoftBox>
        ),
        reference: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            12345678
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={10} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        councilors: [councilor2, "Andre Garcia Ph.D"],
        schedule: (
          <SoftBox display="flex" py={1}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              4/23/2022, 1:30 pm
            </SoftTypography>
          </SoftBox>
        ),
        reference: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            23456789
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        councilors: [councilor1, "Justin Barcos Ph.D"],
        schedule: (
          <SoftBox display="flex" py={1}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              4/23/2022, 1:30 pm
            </SoftTypography>
          </SoftBox>
        ),
        reference: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            11233456
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        councilors: [councilor4, "Hayley Williams Ph.D"],
        schedule: (
          <SoftBox display="flex" py={1}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              4/23/2022, 1:30 pm
            </SoftTypography>
          </SoftBox>
        ),
        reference: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            22345678
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="success" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        councilors: [councilor4, "Hayley Williams Ph.D"],
        schedule: (
          <SoftBox display="flex" py={1}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              4/23/2022, 1:30 pm
            </SoftTypography>
          </SoftBox>
        ),
        reference: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            32314567
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
      {
        councilors: [councilor1, "Justin Barcos Ph.D"],
        schedule: (
          <SoftBox display="flex" py={1}>
            <SoftTypography variant="caption" color="text" fontWeight="medium">
              4/23/2022, 1:30 pm
            </SoftTypography>
          </SoftBox>
        ),
        reference: (
          <SoftTypography variant="caption" color="text" fontWeight="medium">
            442312132
          </SoftTypography>
        ),
        completion: (
          <SoftBox width="8rem" textAlign="left">
            <SoftProgress value={100} color="info" variant="gradient" label={false} />
          </SoftBox>
        ),
      },
    ],
  };
}
