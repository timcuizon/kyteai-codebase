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

import { useState, useEffect, useMemo } from "react";

// react-router components
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";

// Soft UI Dashboard React examples
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Soft UI Dashboard React themes
import theme from "assets/theme";

// Soft UI Dashboard React routes
import RoutesComponent from "routes";

// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";

// Images
import brand from "assets/images/logos/logo_SamwonLogo.png";

//Preloader
import Preloader from "./PreLoader";

import { getCookie } from "helpers/CookieHelper";

export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();
  const routes = RoutesComponent();

  //Preloader
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ("service-worker.js" in navigator) {
      const wb = new Workbox("/service-worker.js");

      wb.addEventListener("installed", (event) => {
        if (event.isUpdate) {
          console.log("Service worker updated");
        } else {
          console.log("Service worker installed");
        }
      });

      wb.register()
        .then((registration) => {
          console.log("Service worker registered:", registration);
        })
        .catch((error) => {
          console.error("Service worker registration failed:", error);
        });
    }
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const [userRole, setUserRole] = useState(null); // Set an initial state value, e.g., null

  // Setting the dir attribute for the body element
  useEffect(() => {
    setUserRole(getCookie("role"));

    // API Links
    const samwonAPI_Live = "https://api.samwon.online";
    const samwonAPI_Local = "https://localhost:7206";
    const samwonServices = "http://127.0.0.1:5000";
    const samwonAPI = samwonAPI_Local;

    // Check if local storage is supported
    if (typeof Storage !== "undefined") {
      // Save the API link to local storage
      localStorage.setItem("samwonAPI", samwonAPI);
      localStorage.setItem("samwonServices", samwonServices);

      // Retrieve the API link from local storage
      //  const storedApiLink = localStorage.getItem("apiLink");
      //  console.log("API Link from Local Storage:", storedApiLink);
    } else {
      console.error("Local storage is not supported by this browser.");
    }
  }, []);

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        // If it's a collapse route, render nested routes using Routes
        return (
          <Route
            key={route.key}
            path={route.route}
            element={<Routes>{getRoutes(route.collapse)}</Routes>}
          />
        );
      }

      if (route.route) {
        // If it's a regular route, render a Route component
        return <Route key={route.key} path={route.route} element={route.component} />;
      }
      return null;
    });

  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );

  return (
    // loading ? (
    //   <Preloader />
    // ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={brand}
            brandName="Sam Won"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          {/* <Configurator />
          {configsButton} */}
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </ThemeProvider>
    //     )
  );
}
