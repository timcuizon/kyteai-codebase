import {useEffect } from "react";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import {removeCookie } from "helpers/CookieHelper";

function SignOut() {
  useEffect(() => {
    removeCookie('isLoggedIn'); 
    removeCookie('user_token'); 
    removeCookie('gaccess_token');
    removeCookie('token_type');
    removeCookie('givenName');
    removeCookie('familyName');
    removeCookie('email');
    removeCookie('role');
    removeCookie('picture');

    window.location.replace('/authentication/sign-in');
  },[]);

  return (
    <SoftBox></SoftBox>
  );
}

export default SignOut;
