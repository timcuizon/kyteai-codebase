import { useState, useEffect } from "react";
import axios from "axios";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";
import Footer from "layouts/public/authentication/components/Footer";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/public/authentication/components/CoverLayout";

// Images
import SamWonInSchool from "assets/images/Sam-Won-in-School.jpg";
import GoogleIcon from "assets/images/google-logo.png";
import { GoogleLogin } from "@react-oauth/google";
import PageLayout from "examples/LayoutContainers/PageLayout";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import { Grid } from "@mui/material";
import SamWonSignIn from "assets/images/Sam-Won-Sign-In.svg";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  const customHeaders = {
    Origin: "http://net-otaku.com", // Replace with your frontend origin
    "Content-Type": "application/json",
    // Add any other custom headers you need
  };

  const handleSignIn = () => {
    // You can perform validation here if needed
    fetch(localStorage.getItem("samwonAPI") + `/api/UserAuthentication/google-login`, {
      method: "POST",
      redirect: "follow",
      headers: customHeaders,
    })
      .then((response) => {
        // Display the response data in the console
        console.log(response.data);
      })
      .then((redirectUrl) => {
        // Redirect the user to the Google authentication page
        window.location = redirectUrl;
      })
      .catch((error) => console.error(error));
  };

  //Test API
  const [items, setItems] = useState([]);
  const itemType = 11;
  const firstName = "Nandekure";

  useEffect(() => {
    // Create a new FormData object
    const formData = new FormData();

    // Append the fields to the FormData object
    formData.append("userEmail", "tcuizon.k11829344@umak.edu.ph"); // Replace with the actual email

    // Make a POST request to the API endpoint with FormData as the request body
    axios
      .post(localStorage.getItem("samwonAPI") + `/api/UserType/User`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Display the response data in the console
        console.log(response.data);
        console.log(response.data[0].email);
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [itemType]);

  return (
    <>
      {/* <PageLayout
        title="Welcome back"
        description="Happy to be with you again!"
        image={SamWonInSchool}
      > */}
      <CoverLayout
        title="Welcome back"
        description="Enter your email and password to sign in"
        image={SamWonInSchool}
      >
        {/* <DefaultNavbar
          action={{
            type: "external",
            route: "https://creative-tim.com/product/soft-ui-dashboard-react",
            label: "free download",
            color: "dark",
          }}
        />
        <Grid
          container
          justifyContent="center"
          alignContent="center"
          sx={{
            minHeight: "100vh",
            margin: 0,
          }}
        > */}
        <SoftBox component="form" role="form">
          {/* <SoftBox>
              <img className="scale-125" src={SamWonSignIn}></img>
            </SoftBox> */}
          <SoftBox
            component="form"
            role="form"
            action={localStorage.getItem("samwonAPI") + "/api/Auth/google-login"}
            method="post"
          >
            {/* <SoftBox
                mt={2}
                mb={1}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              > */}
            <SoftBox mt={4} mb={1}>
              <SoftButton
                type="submit"
                variant="contained"
                color="white"
                fullWidth
                style={{ textAlign: "center" }}
              >
                <img src={GoogleIcon} className="w-[40px] mr-5" alt="Google Icon" />
                Log in with Google Account
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
        {/* </SoftBox> */}
        {/* </Grid> */}
        {/* </PageLayout> */}
      </CoverLayout>
      <Footer />
    </>
  );
}
export default SignIn;
