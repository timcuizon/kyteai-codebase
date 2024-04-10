import Dashboard from "layouts/user/dashboard";
import Billing from "layouts/user/billing";
import Profile from "layouts/user/profile";
import SignIn from "layouts/public/authentication/sign-in";
import SignOut from "layouts/public/authentication/sign-out";
import Auth from "layouts/public/authentication/auth";
import SignUp from "layouts/public/authentication/sign-up";
import Welcome from "layouts/public/welcome";
import PreVSET from "layouts/user/vset/PreVSET";
import VSET from "layouts/user/vset/VSET";
import VSETQuestions from "layouts/user/vset/VSETQuestions";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";

// Public Pages
import ContactInformation from "layouts/public/contact-information";
import PartneredOganization from "layouts/public/partnered-organization";
//Blog Page
import Blog from "layouts/public/blog";
import BlogInformation from "layouts/public/blog-information";
import BlogInformation2 from "layouts/public/blog-information/Blogs/index2.js";
import BlogInformation3 from "layouts/public/blog-information/Blogs/index3.js";
import BlogInformation4 from "layouts/public/blog-information/Blogs/index4.js";
import BlogInformation5 from "layouts/public/blog-information/Blogs/index5.js";

//Appointment Schedule Page Admin
import ScheduleManagement from "layouts/user/appointment-admin/schedule-management";
import AppointmentSchedule from "layouts/user/appointment-admin";
// Appointment Page
import AppointmentCounseling from "layouts/user/appointment-counseling";
import AppointmentForm from "layouts/user/appointment-counseling/form";
import AdminAppointmentForm from "layouts/user/appointment-admin/form";
import AppointmentSummary from "layouts/user/appointment-counseling/Components/schedule-management";

// Parent Student Page
import AdminParentStudentSpace from "layouts/user/admin-student-parent-space";
import AdminParentStudentSpaceContent from "layouts/user/admin-student-parent-space/admin-student-parent-space-content";

import PreRecordKeeping from "layouts/user/record-keeping/admin-record-keeping/PreRecordKeeping";
import RecordKeeping from "layouts/user/record-keeping/admin-record-keeping/RecordKeeping";

//=== Admin Pages
import ActivityLogs from "layouts/admin/activity-logs/ActivityLogs";
import ManageModules from "layouts/admin/manage-modules/ManageModules";
import ManageUsers from "layouts/admin/manage-users/ManageUsers";
import PreManageUsers from "layouts/admin/manage-users/PreManageUsers";

// Profile Page
import UserStudentParentSpace from "layouts/user/user-student-parent-space";
import UserStudentParentRecordView from "layouts/user/user-student-parent-space/components/report-records/report-records-view";
import UserProfile from "layouts/user/profile/user-profile";
import EditProfile from "layouts/user/edit-profile";
import ForgotPassword from "layouts/public/authentication/forgot-password";
import axios from "axios";

import {
  AccountTree,
  EventNote,
  Logout,
  ManageAccounts,
  Memory,
  Person,
  ReceiptLong,
  RecordVoiceOver,
  SpaceDashboard,
  Workspaces,
} from "@mui/icons-material";

import { getCookie } from "helpers/CookieHelper";
import WelcomeTester from "layouts/user/welcome-tester";
import { useEffect, useState } from "react";

const Routes = () => {
  //check if module is still active
  const [modules, setModules] = useState();

  var role = getCookie("role");
  var spaceName = role === "Student" ? "Student Space" : "Parent Space";

  const accessType_Admin = ["Admin"];
  const accessType_Professional = ["Professional"];
  const accessType_Users = ["Student", "Parent"];

  // Check if there's a user logged in &
  useEffect(() => {
    async function fetchData() {
      // alert("accessing route");
      await fetchModules();
    }
    fetchData();
  }, []);

  //Request to fetch all the active students
  async function fetchModules() {
    try {
      // Web service for getting the drawing details
      const url = localStorage.getItem("samwonAPI") + `/api/Module/GetModules`;

      const formData = new FormData();

      // Define your headers here with JWT Claims
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + getCookie("user_token"),
        },
      };
      try {
        await axios
          .post(url, formData, {
            ...config,
          })
          .then((response) => {
            setModules(response.data);
            //Save to localstorage the module accessibilities
            response.data.map((module, index) => {
              localStorage.setItem(module.modKey, module.isActive);
            });
            // alert("saved");
          });
      } catch (error) {
        console.log("Error: " + error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const routes = [
    //======= Dashboard ==========
    {
      type: "collapse",
      name: "Dashboard",
      key: "dashboard",
      route: "/dashboard",
      icon: <SpaceDashboard size="12px" />,
      component: <Dashboard />,
      noCollapse: true,
      user_type: ["Professional", "Student", "Parent"],
    },
    //======= Appointments ==========
    //----- Admin
    {
      type: accessType_Professional.includes(role) ? "collapse" : "",
      name: "Appointments",
      key: "appointments",
      route: "/appointments",
      checkActive: "true",
      icon: <EventNote size="12px" />,
      component: <AppointmentSchedule />,
      noCollapse: true,
      user_type: ["Admin", "Professional"],
    },
    {
      // name: "Appointments",
      key: "appointments-schedule-management",
      route: "/appointment/schedule-management",
      // icon: <Cube size="12px" />,
      component: <ScheduleManagement />,
      noCollapse: true,
    },
    //----- User
    {
      type: accessType_Users.includes(role) ? "collapse" : "",
      name: "Appointment",
      key: "appointment-counseling",
      route: "/appointment-counseling",
      checkActive: "true",
      icon: <RecordVoiceOver size="12px" />,
      component: <AppointmentCounseling />,
      noCollapse: true,
      user_type: ["Student", "Parent"],
    },
    {
      type: "form",
      name: "Appointment Counseling Form",
      key: "appointment-counseling-form",
      route: "/appointment-counseling/schedule-form",
      icon: <CreditCard size="12px" />,
      component: <AppointmentForm />,
      noCollapse: true,
    },
    {
      type: "form",
      name: "Appointment Form",
      key: "appointment-form",
      route: "/appointments/schedule-form",
      icon: <CreditCard size="12px" />,
      component: <AdminAppointmentForm />,
      noCollapse: true,
    },
    //======== Appointment Summary ========
    {
      type: "form",
      name: "Appointment Summary",
      key: "appointment-summary",
      route: "/appointment-counseling/appointment-summary",
      icon: <CreditCard size="12px" />,
      component: <AppointmentSummary />,
      noCollapse: true,
    },
    //======= Record Keeping ==========
    {
      type: accessType_Professional.includes(role) ? "collapse" : "",
      name: "Record Keeping",
      key: "records",
      checkActive: "true",
      route: "/records",
      icon: <ReceiptLong size="12px" />,
      component: <PreRecordKeeping />,
      noCollapse: true,
      user_type: ["Admin", "Professional"],
    },
    {
      name: "Record Keeping",
      key: "records",
      route: "/records/list",
      icon: <ReceiptLong size="12px" />,
      component: <RecordKeeping />,
      noCollapse: true,
      user_type: ["Admin", "Professional"],
    },
    //======= VSET ==========
    {
      type: accessType_Professional.includes(role) ? "collapse" : "",
      name: "VSET",
      key: "pre-vset",
      checkActive: "true",
      icon: <Memory size="12px" />,
      route: "/pre-vset",
      component: <PreVSET />,
      noCollapse: true,
      user_type: ["Admin", "Professional"],
    },
    {
      name: "VSET",
      key: "pre-vset",
      icon: <Shop size="12px" />,
      route: "/pre-vset/vset",
      component: <VSET />,
      noCollapse: true,
    },
    {
      name: "VSET",
      key: "pre-vset",
      icon: <Shop size="12px" />,
      route: "/pre-vset/questions",
      component: <VSETQuestions />,
      noCollapse: true,
    },
    //======= Student/Parent Space ==========
    //------ Admin
    {
      type: accessType_Professional.includes(role) ? "collapse" : "",
      name: "Student/Parent Space",
      key: "admin-student-parent-space",
      route: "/admin-student-parent-space",
      checkActive: "true",
      icon: <Workspaces size="12px" />,
      component: <AdminParentStudentSpace />,
      noCollapse: true,
      user_type: ["Admin", "Professional"],
    },
    {
      // type: "collapse",
      type: "",
      name: "Student/Parent Space Content",
      key: "admin-student-parent-space-content",
      route: "/admin-student-parent-space/admin-student-parent-space-content",
      icon: <CreditCard size="12px" />,
      component: <AdminParentStudentSpaceContent />,
      noCollapse: true,
      user_type: ["Admin", "Professional", "Student", "Parent"],
    },
    //------ User
    {
      type: accessType_Users.includes(role) ? "collapse" : "",
      name: spaceName,
      key: "user-student-parent-space",
      route: "/user-student-parent-space",
      checkActive: "true",
      icon: <Workspaces size="12px" />,
      component: <UserStudentParentSpace />,
      noCollapse: true,
      user_type: ["Student", "Parent"],
    },
    {
      type: "form",
      name: spaceName,
      key: "user-student-parent-space",
      route: "/user-student-parent-space/report-records-view",
      icon: <CreditCard size="12px" />,
      component: <UserStudentParentRecordView />,
      noCollapse: true,
    },
    //------ Admin
    {
      type: accessType_Admin.includes(role) ? "collapse" : "",
      name: "Activity Logs",
      key: "activity-logs",
      route: "/activity-logs",
      icon: <Workspaces size="12px" />,
      component: <ActivityLogs />,
      noCollapse: true,
    },
    {
      type: accessType_Admin.includes(role) ? "collapse" : "",
      name: "Manage Modules",
      key: "modules",
      route: "/modules",
      icon: <AccountTree size="12px" />,
      component: <ManageModules />,
      noCollapse: true,
    },
    {
      type: accessType_Admin.includes(role) ? "collapse" : "",
      name: "Manage Users",
      key: "manage-users",
      route: "/manage-users",
      icon: <ManageAccounts size="12px" />,
      component: <PreManageUsers />,
      noCollapse: true,
    },

    //======= Account Pages ==========
    { type: "title", title: "Account Pages", key: "account-pages" },
    {
      type: "collapse",
      name: "Profile",
      key: "profile",
      route: "/profile",
      icon: <Person size="12px" />,
      component: <UserProfile />,
      noCollapse: true,
      user_type: ["Admin", "Professional", "Student", "Parent"],
    },
    {
      // type: "collapse",
      type: "",
      name: "Edit Profile",
      key: "edit-profile",
      route: "/profile/edit-profile",
      icon: <CustomerSupport size="12px" />,
      component: <EditProfile />,
      noCollapse: true,
    },
    {
      type: "collapse",
      name: "Sign Out",
      key: "sign-out",
      route: "/authentication/sign-out",
      icon: <Logout size="12px" />,
      component: <SignOut />,
      noCollapse: true,
    },

    //============ Public Pages
    {
      type: "",
      name: "Home",
      key: "welcome",
      route: "/",
      icon: <Document size="12px" />,
      component: <Welcome />,
      noCollapse: true,
    },
    //======= Welcome Page for Testers ==========
    {
      type: "",
      name: "Home",
      key: "welcome",
      route: "/welcome-testers",
      component: <WelcomeTester />,
      noCollapse: true,
    },
    {
      type: "",
      name: "Blog",
      key: "blog",
      route: "/blog",
      icon: <Document size="12px" />,
      component: <Blog />,
      noCollapse: true,
    },
    {
      type: "",
      name: "Blog Information",
      key: "blog-information",
      route: "/blog-information",
      icon: <Document size="12px" />,
      component: <BlogInformation />,
      noCollapse: true,
    },
    {
      type: "",
      name: "Blog Information",
      key: "blog-information",
      route: "/blog-information/Blogs/index2.js",
      icon: <Document size="12px" />,
      component: <BlogInformation2 />,
      noCollapse: true,
    },
    {
      type: "",
      name: "Blog Information",
      key: "blog-information",
      route: "/blog-information/Blogs/index3.js",
      icon: <Document size="12px" />,
      component: <BlogInformation3 />,
      noCollapse: true,
    },
    {
      type: "",
      name: "Blog Information",
      key: "blog-information",
      route: "/blog-information/Blogs/index4.js",
      icon: <Document size="12px" />,
      component: <BlogInformation4 />,
      noCollapse: true,
    },
    {
      type: "",
      name: "Blog Information",
      key: "blog-information",
      route: "/blog-information/Blogs/index5.js",
      icon: <Document size="12px" />,
      component: <BlogInformation5 />,
      noCollapse: true,
    },

    {
      type: "",
      name: "Partnered Organization",
      key: "partneredOrg",
      route: "/partnered-organization",
      icon: <Document size="12px" />,
      component: <PartneredOganization />,
      noCollapse: true,
    },
    {
      type: "",
      name: "Contact Information",
      key: "contact-information",
      route: "/contact-information",
      icon: <Shop size="12px" />,
      component: <ContactInformation />,
      noCollapse: true,
    },
    {
      type: "",
      name: "Sign In",
      key: "sign-in",
      route: "/authentication/sign-in",
      icon: <Document size="12px" />,
      component: <SignIn />,
      noCollapse: true,
    },
    {
      type: "",
      name: "Auth",
      key: "auth",
      route: "/auth",
      component: <Auth />,
      user_type: ["Admin", "Professional", "Student", "Parent"],
    },
    {
      type: "",
      name: "Sign Up",
      key: "sign-up",
      route: "/authentication/sign-up",
      icon: <SpaceShip size="12px" />,
      component: <SignUp />,
      noCollapse: true,
    },
    {
      name: "Forgot Password",
      key: "forgot-password",
      route: "/authentication/forgot-password",
      icon: <SpaceShip size="12px" />,
      component: <ForgotPassword />,
      noCollapse: true,
    },
  ];

  return routes;
};

export default Routes;
