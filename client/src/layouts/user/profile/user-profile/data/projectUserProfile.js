/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftProgress from "components/SoftProgress";

// Images
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";
import logoJira from "assets/images/small-logos/logo-jira.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoWebDev from "assets/images/small-logos/logo-webdev.svg";
import logoXD from "assets/images/small-logos/logo-xd.svg";

function Completion({ value, color }) {
  return (
    <SoftBox display="flex" alignItems="center">
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {value}%&nbsp;
      </SoftTypography>
      <SoftBox width="50rem">
        <SoftProgress value={value} color={color} variant="gradient" label={false} />
      </SoftBox>
    </SoftBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

const projectUserProfile = {
  columns: [
    { name: "Date", align: "left" },
    { name: "Type", align: "left" },
    { name: "UploadedBy", align: "left" },
    { name: "Status", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      Date: <SoftTypography variant="button" color="text" fontWeight="medium">
          August 31, 2023
        </SoftTypography>,
      Type: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          House
        </SoftTypography>
      ),
      UploadedBy: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          Dr. Jane Doe
        </SoftTypography>
      ),
      Status: <SoftTypography variant="caption" color="text" fontWeight="medium">
            Done
          </SoftTypography>,
      action,
    },
    {
      Date: <SoftTypography variant="button" color="text" fontWeight="medium">
          August 30, 2023
        </SoftTypography>,
      Type: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          Person
        </SoftTypography>
      ),
      UploadedBy: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          Dr. Jane Doe
        </SoftTypography>
      ),
      Status: <SoftTypography variant="caption" color="text" fontWeight="medium">
      Uploaded
    </SoftTypography>,
      action,
    },
    {
      Date: <SoftTypography variant="button" color="text" fontWeight="medium">
          August 29, 2023
        </SoftTypography>,
      Type: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          Tree
        </SoftTypography>
      ),
      UploadedBy: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          Dr. Jane Doe
        </SoftTypography>
      ),
      Status: <SoftTypography variant="caption" color="text" fontWeight="medium">
      Uploading
    </SoftTypography>,
      action,
    },
    {
      Date: <SoftTypography variant="button" color="text" fontWeight="medium">
          July 31, 2023
        </SoftTypography>,
      Type: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          House
        </SoftTypography>
      ),
      UploadedBy: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          Dr. Jane Deez
        </SoftTypography>
      ),
      Status: <SoftTypography variant="caption" color="text" fontWeight="medium">
      Done
    </SoftTypography>,
      action,
    },
    {
      Date: <SoftTypography variant="button" color="text" fontWeight="medium">
          July 30, 2023
        </SoftTypography>,
      Type: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          Person
        </SoftTypography>
      ),
      UploadedBy: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          Dr. Jane Doe
        </SoftTypography>
      ),
      Status: <SoftTypography variant="caption" color="text" fontWeight="medium">
      Done
    </SoftTypography>,
      action,
    },
    {
      Date: <SoftTypography variant="button" color="text" fontWeight="medium">
          July 29, 2023
        </SoftTypography>,
      Type: (
        <SoftTypography variant="button" color="text" fontWeight="medium">
          Tree
        </SoftTypography>
      ),
      UploadedBy: (
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          Dr. Jane Doe
        </SoftTypography>
      ),
      Status: <SoftTypography variant="caption" color="text" fontWeight="medium">
      Done
    </SoftTypography>,
      action,
    },
  ],
};

export default projectUserProfile;
