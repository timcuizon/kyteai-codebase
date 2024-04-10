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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import { Card, Container } from "@mui/material";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
// Soft UI Dashboard React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import PageLayout from "examples/LayoutContainers/PageLayout";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import SamWonContactUs2 from "assets/images/contactus2.svg";
import personIcon from "assets/images/person-icon.svg";
import emailIcon from "assets/images/email.svg";
import contactIcon from "assets/images/phone.svg";
import scheduleIcon from "assets/images/schedule.svg";
import locationIcon from "assets/images/location.svg";

// Authentication layout components
import Footer from "layouts/public/authentication/components/Footer";
import { Padding } from "@mui/icons-material";

function ContactInfoLayout({ title, description, image, children, date, author }) {
  return (
    <PageLayout background="#fff">
      <DefaultNavbar
        action={{
          type: "external",
          route: "https://creative-tim.com/product/soft-ui-dashboard-react",
          label: "free download",
          color: "white",
        }}
      />

      <SoftBox>
        <img
          src={SamWonContactUs2}
          alt="samWonContactUs"
          style={{
            width: "100vw",
            height: "90vh",
            objectFit: "cover",
          }}
        ></img>
      </SoftBox>
      
      <Container >
      <SoftBox mt={2} mb={2} display="flex" justifyContent="center" alignItems="center">
          <SoftTypography
            sx={{ borderBottom: "3px #FDB813 solid", textAlign: "center" }}
            color="colorISMgreen"
            variant="h1"
            fontWeight="bold"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            Contact Information
          </SoftTypography>
        </SoftBox>
      <SoftBox display="flex" justifyContent="center" alignItems="center">
      <Grid
          container
          lg={12}
          xs={12}
          sm={12}
          xl={12}
          md={12}
          m={2}
          style={{ justifyContent: "center" }}
        >
          <Grid item lg={2} xs={12} md={12} spacing={2}>
            <SoftBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SoftBox
                m={2}
                style={{
                  borderRadius: "50%", // Set to 50% for a full circle
                  backgroundColor: "#1E4C2B", // Green color
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px", // Set the width and height as needed
                  height: "100px", // Set the width and height as needed
                }}
              >
                <SoftBox
                  style={{
                    borderRadius: "50%", // Set to 50% for a circular image
                    overflow: "hidden", // Ensure content doesn't exceed the circle boundary
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={personIcon}
                    alt="personIcon"
                    style={{
                      width: "75%",
                      height: "75%",
                      objectFit: "cover", // Maintain aspect ratio within the circle
                      borderRadius: "50%", // Set to 50% for a circular image
                    }}
                  />
                </SoftBox>
              </SoftBox>
            </SoftBox>

            <SoftBox display="flex" justifyContent="center" alignItems="center">
              <SoftTypography variant="h4" color="colorISMgreen" fontWeight="bold">
                Contact Person
              </SoftTypography>
            </SoftBox>
            <SoftBox display="flex" justifyContent="center" alignItems="center">
              <SoftTypography variant="h6" color="colorISMgreen" fontWeight="medium">
                John Doe Smith
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item lg={2} xs={12} md={12}>
            <SoftBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SoftBox
                m={2}
                style={{
                  borderRadius: "50%", // Set to 50% for a full circle
                  backgroundColor: "#1E4C2B", // Green color
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px", // Set the width and height as needed
                  height: "100px", // Set the width and height as needed
                }}
              >
                <SoftBox
                  style={{
                    borderRadius: "50%", // Set to 50% for a circular image
                    overflow: "hidden", // Ensure content doesn't exceed the circle boundary
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={emailIcon}
                    alt="personIcon"
                    style={{
                      width: "75%",
                      height: "75%",
                      objectFit: "cover", // Maintain aspect ratio within the circle
                      borderRadius: "50%", // Set to 50% for a circular image
                    }}
                  />
                </SoftBox>
              </SoftBox>
            </SoftBox>

            <SoftBox display="flex" justifyContent="center" alignItems="center">
              <SoftTypography variant="h4" color="colorISMgreen" fontWeight="bold">
                Email
              </SoftTypography>
            </SoftBox>
            <SoftBox display="flex" justifyContent="center" alignItems="center" >
              <SoftTypography variant="h6" color="colorISMgreen" fontWeight="medium">
                counseling@samwon.com
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item lg={2} xs={12} md={12}>
            <SoftBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SoftBox
                m={2}
                style={{
                  borderRadius: "50%", // Set to 50% for a full circle
                  backgroundColor: "#1E4C2B", // Green color
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px", // Set the width and height as needed
                  height: "100px", // Set the width and height as needed
                }}
              >
                <SoftBox
                  style={{
                    borderRadius: "50%", // Set to 50% for a circular image
                    overflow: "hidden", // Ensure content doesn't exceed the circle boundary
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={contactIcon}
                    alt="personIcon"
                    style={{
                      width: "75%",
                      height: "75%",
                      objectFit: "cover", // Maintain aspect ratio within the circle
                      borderRadius: "50%", // Set to 50% for a circular image
                    }}
                  />
                </SoftBox>
              </SoftBox>
            </SoftBox>

            <SoftBox display="flex" justifyContent="center" alignItems="center">
              <SoftTypography variant="h4" color="colorISMgreen" fontWeight="bold">
                Contact No.
              </SoftTypography>
            </SoftBox>
            <SoftBox display="flex" justifyContent="center" alignItems="center">
              <SoftTypography variant="h6" color="colorISMgreen" fontWeight="medium">
                (09) 2034-1234
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item lg={2} xs={12} md={12} spacing={2}>
            <SoftBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SoftBox
                m={2}
                style={{
                  borderRadius: "50%", // Set to 50% for a full circle
                  backgroundColor: "#1E4C2B", // Green color
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px", // Set the width and height as needed
                  height: "100px", // Set the width and height as needed
                }}
              >
                <SoftBox
                  style={{
                    borderRadius: "50%", // Set to 50% for a circular image
                    overflow: "hidden", // Ensure content doesn't exceed the circle boundary
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={scheduleIcon}
                    alt="personIcon"
                    style={{
                      width: "75%",
                      height: "75%",
                      objectFit: "cover", // Maintain aspect ratio within the circle
                      borderRadius: "50%", // Set to 50% for a circular image
                    }}
                  />
                </SoftBox>
              </SoftBox>
            </SoftBox>

            <SoftBox display="flex" justifyContent="center" alignItems="center">
              <SoftTypography variant="h4" color="colorISMgreen" fontWeight="bold">
                Schedule
              </SoftTypography>
            </SoftBox>
            <SoftBox display="flex" justifyContent="center" alignItems="center">
              <SoftTypography
                variant="h6"
                color="colorISMgreen"
                fontWeight="medium"
                style={{ whiteSpace: "pre-line", textAlign: "center" }}
              >
                Moday-Friday{"\n"}
                7:00AM-4:00PM{"\n"}
                Saturday-Sunday{"\n"}
                CLOSED
              </SoftTypography>
            </SoftBox>
          </Grid>
          <Grid item lg={2} xs={12} md={12}>
            <SoftBox style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <SoftBox
                m={2}
                style={{
                  borderRadius: "50%", // Set to 50% for a full circle
                  backgroundColor: "#1E4C2B", // Green color
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100px", // Set the width and height as needed
                  height: "100px", // Set the width and height as needed
                }}
              >
                <SoftBox
                  style={{
                    borderRadius: "50%", // Set to 50% for a circular image
                    overflow: "hidden", // Ensure content doesn't exceed the circle boundary
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={locationIcon}
                    alt="personIcon"
                    style={{
                      width: "75%",
                      height: "75%",
                      objectFit: "cover", // Maintain aspect ratio within the circle
                      borderRadius: "50%", // Set to 50% for a circular image
                    }}
                  />
                </SoftBox>
              </SoftBox>
            </SoftBox>

            <SoftBox display="flex" justifyContent="center" alignItems="center">
              <SoftTypography variant="h4" color="colorISMgreen" fontWeight="bold">
                Find At Us
              </SoftTypography>
            </SoftBox>
            <SoftBox display="flex" justifyContent="center" alignItems="center">
              <SoftTypography
                variant="h6"
                color="colorISMgreen"
                fontWeight="medium"
                style={{ whiteSpace: "pre-line", textAlign: "center" }}
              >
                Dr Jose P. Rizal Ext, {"\n"}Taguig, {"\n"} 1644 Metro Manila
              </SoftTypography>
            </SoftBox>
          </Grid>
        </Grid>
      </SoftBox>

      
      <SoftBox mb={2} display="flex" justifyContent="center" alignItems="center">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1719.1486530738043!2d121.05484424461741!3d14.562600158452026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c860ad20d9e9%3A0xeeb71061020f655a!2sUniversity%20of%20Makati!5e1!3m2!1sen!2sph!4v1709222869329!5m2!1sen!2sph" 
            width="600" 
            height="450" 
            style={{border:"0" }}
            allowfullscreen="" 
            loading="lazy" 
            referrerpolicy="no-referrer-when-downgrade">
        
        </iframe>
        </SoftBox>

        {/* Accordion FAQS */}

        <SoftBox
          ml={2}
          mr={2}
          flex
          items-center
          mb={1}
          sx={{ textAlign: "center" }}
          bgColor="info"
          variant="gradient"
        >
          <SoftTypography
            sx={{
              padding: "20px",
              textJustify: true,
              fontSize: "20px",
              color: "white !important",
            }}
            variant="h3"
            fontWeight="bold"
          >
            FAQs About Our Guidance Counseling Service Tool
          </SoftTypography>
        </SoftBox>

        <SoftBox pl={2} pr={2} mb={2}>
          <Accordion
            disabledGutter="true"
            id="panel1a-header"
            sx={{
              "&:before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
              <SoftTypography fontWeight="bold" fontSize="1.25rem">
                How can I access counseling services through this web application?
              </SoftTypography>
            </AccordionSummary>
            <AccordionDetails>
              <SoftTypography fontSize="1rem">
                <li>
                  The tool will be accessible to enrolled families through our secure online portal.
                </li>
                <li>You will receive login information upon enrollment.</li>
              </SoftTypography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <SoftTypography fontWeight="bold" fontSize="1.25rem">
                Is my child required to undergo counseling sessions?
              </SoftTypography>
            </AccordionSummary>
            <AccordionDetails>
              <SoftTypography fontSize="1rem">
                <li>Counseling sessions are not mandatory.</li>
                <li>They are available to support your child's academic and personal growth.</li>
                <li>We encourage students to take advantage of this resource.</li>
              </SoftTypography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <SoftTypography fontWeight="bold" fontSize="1.25rem">
                Is my information and communication with counselors kept confidential?
              </SoftTypography>
            </AccordionSummary>
            <AccordionDetails>
              <SoftTypography fontSize="1rem">
                Assure users about the confidentiality and data security measures in place, and
                explain the legal and ethical obligations of the counseling service.
              </SoftTypography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <SoftTypography fontWeight="bold" fontSize="1.25rem">
                How can I schedule appointments with counselors?
              </SoftTypography>
            </AccordionSummary>
            <AccordionDetails>
              <SoftTypography fontSize="1rem">
                Detail the appointment booking process, including available time slots, cancellation
                policies, and any fees associated with counseling sessions.
              </SoftTypography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <SoftTypography fontWeight="bold" fontSize="1.25rem">
                What should I expect from my counseling sessions?
              </SoftTypography>
            </AccordionSummary>
            <AccordionDetails>
              <SoftTypography fontSize="1rem">
                Provide an overview of the counseling process, including the goals of each session,
                the expected duration of counseling, and the role of the user in their own progress.
              </SoftTypography>
            </AccordionDetails>
          </Accordion>
        </SoftBox>
    
      </Container>

      <Footer />
    </PageLayout>
  );
}

// Setting default values for the props of BasicLayout
ContactInfoLayout.defaultProps = {
  title: "",
  description: "",
  author: "",
  date: "",
};

// Typechecking props for the BasicLayout
ContactInfoLayout.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ContactInfoLayout;
