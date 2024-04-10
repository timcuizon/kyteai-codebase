import { useEffect } from "react";
import jwtDecode from "jwt-decode";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import { getCookie, setCookie, removeCookie } from "helpers/CookieHelper";

function Auth() {
  const url = new URL(window.location.href);
  // Function to extract the access token from the URL
  function GenerateCookie() {
    var user_token = url.searchParams.get("user_token");
    var gaccess_token = url.searchParams.get("gaccess_token");
    var token_type = url.searchParams.get("token_type");
    var givenName = url.searchParams.get("givenName");
    var familyName = url.searchParams.get("familyName");
    var email = url.searchParams.get("email");
    var role = url.searchParams.get("role");
    var picture = url.searchParams.get("picture");
    var ie = url.searchParams.get("ie");

    // Set each variable as a cookie with a 1-day expiration
    setCookie("isLoggedIn", "True", 60);
    setCookie("user_token", user_token, 60);
    setCookie("gaccess_token", gaccess_token, 60);
    setCookie("token_type", token_type, 60);
    setCookie("givenName", givenName, 60);
    setCookie("familyName", familyName, 60);
    setCookie("email", email, 60);
    setCookie("role", role, 60);
    setCookie("picture", picture, 60);
    setCookie("ie", ie, 60);

    return 1;
  }

  useEffect(() => {
    console.log("running useEffect in auth");
    var user_token = url.searchParams.get("user_token");
    const allowedAPI = localStorage.getItem("samwonAPI");
    // console.log(user_token);
    if (user_token) {
      try {
        //Get the User Token for User Details
        // 'decoded' now contains the claims in the JWT (e.g., user information)
        const decoded = jwtDecode(user_token);
        // console.log("Decoded JWT Text:", decoded);

        // console.log("The allowed API is: " + allowedAPI);
        // console.log("The decoded ISS is: " + decoded.iss);
        //Check if the request is from allowedAPI
        if (allowedAPI == decoded.iss) {
          //======================================== Set Cookie
          var success = GenerateCookie();
          if (success == 1) {
            //Go to dashboard
            console.log("True");

            // Update for public testing
            // alert(url.searchParams.get("role"));
            if (url.searchParams.get("role") != "Tester") {
              window.location.replace("/dashboard");
            } else {
              // For testers
              window.location.replace("/welcome-testers");
            }
          }
        } else {
          console.log("Invalid Source");
        }
      } catch (error) {
        // Handle errors, e.g., token expired, invalid, etc.
        console.error("JWT verification failed:", error);
      }
    } else {
      console.error("Access token not found in the URL.");
    }
  }, []);

  return <SoftBox></SoftBox>;
}

export default Auth;
