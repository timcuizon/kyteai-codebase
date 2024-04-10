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

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import './styles/css/index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
    <BrowserRouter>
    <GoogleOAuthProvider>
      <SoftUIControllerProvider clientId="272540390782-pg3hdrutn72bga06f4q60nr0igkbns0v.apps.googleusercontent.com">
        <App />
      </SoftUIControllerProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  
);
