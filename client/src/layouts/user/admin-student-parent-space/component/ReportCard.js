// prop-types is a library for typechecking of props
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Card from "@mui/material/Card";
import SoftButton from "components/SoftButton";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

function ParentStudentSpace({ name, typeContent, typeConcern, date }) {
  const navigate = useNavigate();

  const handleReportContent = () => {
    navigate("/admin-student-parent-space/admin-student-parent-space-content");
  };
  return (
    <SoftBox sx={{ padding: "1rem" }}>
      <Card sx={{ padding: "2rem" }}>
        <Grid container spacing={2} lg={12} item sm={12} xl={12} md={12} xs={12}>
          <Grid item lg={8} sm={12} md={12} xs={12}>
            <SoftBox>
              <SoftTypography color="info" component="label" variant="h6" fontWeight="bold">
                {name}
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography component="label" variant="h6" fontWeight="bold">
                Type of Report: {typeContent}
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography component="label" variant="h6" fontWeight="bold">
                Type of Concern: {typeConcern}
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <SoftTypography component="label" variant="h6" fontWeight="bold">
                Report Date: {date}
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Divider />
          <Grid item lg={4} sm={12} md={12} xs={12}>
            <SoftBox p={1}  onClick={handleReportContent}>
              <SoftTypography
                color="colorISMyellow"
                component="label"
                variant="h6"
                fontWeight="bold"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textTransform: "uppercase",
                }}
              >
                <lord-icon
                  src="https://cdn.lordicon.com/vfczflna.json"
                  trigger="hover"
                  state="hover-look-around"
                  colors="primary:#FDB813,secondary:#FDB813"
                ></lord-icon>
                &nbsp; View
              </SoftTypography>
            </SoftBox>
          </Grid>
        </Grid>
      </Card>
    </SoftBox>
  );
}

// Setting default values for the props of Bill
ParentStudentSpace.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
ParentStudentSpace.propTypes = {
  name: PropTypes.string.isRequired,
  reportContent: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default ParentStudentSpace;
