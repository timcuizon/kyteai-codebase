/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import { Grid } from "@mui/material";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Billing page components
import ParentStudentSpace from "layouts/public/authentication/components/ParentStudent";

function ParentStudentCard() {
  return (
    <Card id="delete-account">
      <SoftBox p={3}>
        <Grid container lg={12} item xs={12} xl={12} md={12} sm={12}>
          <Grid
            display="flex "
            justify="center"
            alignItems="center"
            item
            lg={4}
            md={12}
            sm={12}
            xs={12}
          >
            <SoftBox p={2}>
              <SoftTypography variant="h6" color="info" sx={{ borderBottom: "3px #FDB813 solid" }}>
                Report List
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item lg={8} md={12} sm={12} xs={12}>
            <span className="w-3/5 mx-3">
              <SoftInput
                placeholder="Type here..."
                icon={{
                  component: "search ",
                  direction: "left",
                }}
              />
            </span>
          </Grid>
        </Grid>
      </SoftBox>

      <SoftBox pt={1} pb={2} px={2}>
        <SoftBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          <Grid container lg={12} spacing={2} item xs={12} xl={12} md={12}>
            <Grid item lg={4} xs={12} sm={12} md={4}>
              <ParentStudentSpace
                name="oliver liam"
                reportContent="Bullying"
                email="oliver@burrito.com"
                date="October 10, 2023"
              />
            </Grid>
            <Grid item lg={4} xs={12} sm={12} md={4}>
              <ParentStudentSpace
                name="lucas harper"
                reportContent="Bullying"
                email="lucas@stone-tech.com"
                date="October 10, 2023"
              />
            </Grid>
            <Grid item lg={4} xs={12} sm={12} md={4}>
              <ParentStudentSpace
                name="ethan james"
                reportContent="Bullying"
                email="ethan@fiber.com"
                date="October 10, 2023"
                noGutter
              />
            </Grid>
          </Grid>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

export default ParentStudentCard;
