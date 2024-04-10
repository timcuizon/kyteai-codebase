import { dataValues } from "./dataValues";
import React, { useState } from "react";
import SoftTypography from "components/SoftTypography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import UpdateModal from "./updateModal";
import { Link } from "react-router-dom";

const ActionMenu = () => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const openMenu = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
  };

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
    closeMenu();
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  // return (
  //   <SoftBox>
  //     <Icon
  //       sx={{ cursor: 'pointer', fontWeight: 'bold' }}
  //       fontSize="small"
  //       onClick={openMenu}
  //     >
  //       more_vert
  //     </Icon>
  //     <Menu
  //       refNum="simple-menu"
  //       anchorEl={menuAnchor}
  //       anchorOrigin={{
  //         vertical: 'top',
  //         horizontal: 'left',
  //       }}
  //       transformOrigin={{
  //         vertical: 'top',
  //         horizontal: 'right',
  //       }}
  //       open={Boolean(menuAnchor)}
  //       onClose={closeMenu}
  //     >
  //       <MenuItem onClick={openUpdateModal}>Update</MenuItem>
  //       <MenuItem onClick={closeMenu}>Delete</MenuItem>
  //     </Menu>
  //     {isUpdateModalOpen && (
  //       <UpdateModal isOpen={isUpdateModalOpen} onClose={closeUpdateModal} />
  //     )}
  //   </SoftBox>
  // );
};

export const rows = dataValues.map((dataValue) => {
  return {
    name: (
      <Link to="/appointment/schedule-management">
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {dataValue.name}
        </SoftTypography>
      </Link>
    ),
    refNum: (
      <Link to="/appointment/schedule-management">
        <SoftTypography variant="button" color="text" fontWeight="medium">
          {dataValue.refNum}
        </SoftTypography>
      </Link>
    ),
    email: (
      <Link to="/appointment/schedule-management">
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {dataValue.email}
        </SoftTypography>
      </Link>
    ),
    appointmentSchedule: (
      <Link to="/appointment/schedule-management">
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {dataValue.appointmentSchedule}
        </SoftTypography>
      </Link>
    ),
    status: (
      <Link to="/appointment/schedule-management">
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {dataValue.status}
        </SoftTypography>
      </Link>
    ),
    createdBy: (
      <Link to="/appointment-counseling/schedule-form">
        <SoftTypography variant="caption" color="text" fontWeight="medium">
          {dataValue.createdBy}
        </SoftTypography>
      </Link>
    ),
    // action: (
    //   <ActionMenu />
    // ),
  };
});
