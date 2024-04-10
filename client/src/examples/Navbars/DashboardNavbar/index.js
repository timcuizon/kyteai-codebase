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

import { useState, useEffect } from "react";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

// Soft UI Dashboard React examples
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";
import { getCookie } from "helpers/CookieHelper";
import axios from "axios";
import SamWonGreat from "assets/images/logos/Artboard 5.png";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Soft UI Dashboard React context
import {
  useSoftUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

// Images
import team2 from "assets/images/team-2.jpg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import { Notifications, NotificationsActiveOutlined } from "@mui/icons-material";

function DashboardNavbar({ absolute, light, isMini }) {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);
  const [name, setName] = useState("");
  const [picture, setPicture] = useState("");
  const [profileInfo, setProfileInfo] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [notificationsStatusId, setNotificationStatusId] = useState([]);
  const [notificationsLink, setNotificationLink] = useState([""]);
  const [email, setEmail] = useState("");
  const [isUnread, setIsUnread] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    const fetchData = async () => {
      try {
        const formData = new FormData();
        const email = getCookie("email");
        // const email = "johnmichaelgoyenavargas@gmail.com"

        formData.append("email", email);

        // Step 1: Call GetProfileInfo to get userId and userType
        const profileInfoResponse = await axios.post(
          localStorage.getItem("samwonAPI") + "/api/Profile/GetProfileInfo",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        formData.append("UserId", profileInfoResponse.data.userId);
        formData.append("UserType", profileInfoResponse.data.userType);
        setProfileInfo(profileInfoResponse.data);

        // Step 2: Use userId and userType to call NotificationGet
        const notificationsResponse = await axios.post(
          localStorage.getItem("samwonAPI") + "/api/Profile/NotificationGet",
          formData, // Pass UserId and UserType in the request body
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const notificationsData = notificationsResponse.data;
        console.log(notificationsData);
        // Step 3: Update state with the retrieved notifications
        setNotificationStatusId(notificationsResponse.data[0]["id"]);
        setNotifications(notificationsData);

        // Check if any notification has a status of 3
        const unreadNotificationsCount = notificationsData.filter(
          (notification) => notification.notificationStatus === 3
        ).length;
        setUnreadCount(unreadNotificationsCount);
        setIsUnread(unreadNotificationsCount > 0);
      } catch (error) {
        //console.error("Error fetching data:", error);
        // Handle errors here
      }
    };

    const handleTransparentNavbar = () => {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    };

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();

    setName(getCookie("givenName"));
    setPicture(getCookie("picture"));

    fetchData(); // Call fetchData when the component mounts

    return () => {
      window.removeEventListener("scroll", handleTransparentNavbar);
    };

    //console.log("notificationsLink:", notificationsLink);
  }, [dispatch, fixedNavbar]);

  //console.log(profileInfo.userType);
  //console.log(notifications.id);
  //console.log("notificationsLink:", notificationsLink);
  const handleNotificationClick = async (notificationId, action, link) => {
    try {
      const formData = new FormData();
      formData.append("userType", profileInfo.userType);
      formData.append("notifId", notificationId);
      formData.append("status", action === "delete" ? 5 : 4);

      if (action === "update") {
        window.location.replace(link);
      }

      console.log("Link: ",link)

      const notificationStatusResponse = await axios.post(
        localStorage.getItem("samwonAPI") + "/api/Profile/NotificationUpdateStatus",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      //console.log(notificationStatusResponse.data);

      if (action === "delete") {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== notificationId)
        );
      }
    } catch (error) {
      //console.log("Error updating notification status:", error);
      // Handle any errors that occur during the status update
    }
  };

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);

  const hasNotifications = notifications.length > 0;

  const renderNotifications = () => {

    
    if (!Array.isArray(notifications) || notifications.length === 0) {
      return (
        <SoftBox mt={0.25} mr={1} mb={0.25} borderRadius="lg">
          <SoftTypography variant="body2" color="textSecondary">
            All clear! No notifications for you at this time.
          </SoftTypography>
        </SoftBox>
      );
    }

    const renderNotif = notifications.filter(
      (row) => row.notificationStatus === 3 || row.notificationStatus === 4
    );
    //console.log("This is renderNotif: ", renderNotif);

    if (renderNotif.length === 0) {
      return (
        <SoftBox mt={0.25} mr={1} mb={0.25} borderRadius="lg">
          <SoftTypography variant="body2" color="textSecondary">
            All clear! No notifications for you at this time.
          </SoftTypography>
        </SoftBox>
      );
    }

    return renderNotif.map((notification) => (
      <div key={notification.id} style={{ display: "flex", alignItems: "center" }}>
        {notification.notificationStatus === 3 && (
          <div
            style={{
              position: "relative",
              top: 0,
              left: 0,
              width: 10,
              height: 10,
              backgroundColor: "red",
              borderRadius: "50%",
              padding: 5,
            }}
          />
        )}

        
        <NotificationItem
          image={<img src={SamWonGreat} alt="person" />}
          title={notification.title}
          details={notification.description}
          date={notification.createdAt}
          onClick={() => handleNotificationClick(notification.id, "update", notification.link)}
          className="notification-item"
        />
        <IconButton
          aria-label="Delete"
          onClick={() => handleNotificationClick(notification.id, "delete", notification.link)}
          style={{ color: "red", backgroundColor: "#f2f2f2" }}
        >
          <Icon>delete</Icon>
        </IconButton>
      </div>
    ));
  };

  const renderMenu = () => {
    return (
      <Menu
        anchorEl={openMenu}
        anchorReference={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(openMenu)}
        onClose={handleCloseMenu}
        sx={{ mt: 2 }}
      >
        {renderNotifications()}
      </Menu>
    );
  };

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light })}
      id="navbar-custom"
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <SoftBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
        </SoftBox>
        {isMini ? null : (
          <SoftBox sx={(theme) => navbarRow(theme, { isMini })}>
            <SoftBox
              color={light ? "white" : "inherit"}
              sx={{
                marginTop: "8px",
              }}
            >
              <IconButton
                size="small"
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                {isUnread && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      backgroundColor: "red",
                      padding: "3px 6px",
                      borderRadius: "50%",
                      color: "white",
                      fontSize: ".5rem", // Adjust font size based on unreadCount
                      minWidth: "18px", // Ensure the circle is large enough for two-digit numbers
                      textAlign: "center",
                      zIndex: 1000,
                    }}
                  >
                    {unreadCount > 9 ? "10+" : unreadCount}
                  </div>
                )}
                  {isUnread ? 
                    <lord-icon
                    src="https://cdn.lordicon.com/gnexwmmr.json"
                    trigger="hover"
                    colors="primary:#fdb813,secondary:#292627,tertiary:#fdb813"
                    >
                    </lord-icon>
                  : 
                  <lord-icon
                  src="https://cdn.lordicon.com/gnexwmmr.json"
                  trigger="hover"
                  colors="primary:#fdb813,secondary:#292627,tertiary:#fdb813"
                  >
                  </lord-icon>}
              </IconButton>
              <Link to="/profile">
                <IconButton sx={navbarIconButton} size="small">
                  <img src={picture} className="w-10 border rounded-full"></img>
                  <SoftTypography
                    variant="button"
                    fontWeight="medium"
                    color={light ? "white" : "dark"}
                  >
                    {name}
                  </SoftTypography>
                </IconButton>
              </Link>
              <IconButton
                size="regular"
                color="inherit"
                style={{backgroundColor: '#1E4C2B'}}
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon className={light ? "text-white" : "text-dark"}>
                  {miniSidenav 
                    ? 
                      <lord-icon
                          src="https://cdn.lordicon.com/zqhifbyw.json"
                          trigger="click"
                          colors="primary:#fdb813"
                          style={{width:"25px", height:"25px"}}>
                      </lord-icon> 
                    : 
                      <lord-icon
                          src="https://cdn.lordicon.com/zqhifbyw.json"
                          trigger="click"
                          colors="primary:#fdb813"
                          style={{width:"25px", height:"25px"}}>
                      </lord-icon>
                    }
                </Icon>
              </IconButton>
              {renderMenu()}
            </SoftBox>
          </SoftBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
