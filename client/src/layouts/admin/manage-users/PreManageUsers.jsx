import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Soft UI Dashboard React components
import "jspdf-autotable";

import Footer from "examples/Footer";
import React, { useState, useEffect } from "react";

import UserList from "./component/UserList";

function PreManageUsers() {
  return (
    <DashboardLayout>
      <DashboardNavbar /> {/* Record Keeping List */}
      <UserList />
      <Footer />
    </DashboardLayout>
  );
}

export default PreManageUsers;
