import { dataValues } from './dataValues';
import React, { useState } from 'react';
import SoftTypography from 'components/SoftTypography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Icon from '@mui/material/Icon';
import SoftBox from 'components/SoftBox';
import UpdateModal from './updateModal';

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
  //       id="simple-menu"
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
      <SoftTypography variant="button" color="text" fontWeight="medium">
        {dataValue.name}
      </SoftTypography>
    ),
    ID: (
      <SoftTypography variant="button" color="text" fontWeight="medium">
        {dataValue.ID}
      </SoftTypography>
    ),
    grade: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {dataValue.grade}
      </SoftTypography>
    ),
    section: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {dataValue.section}
      </SoftTypography>
    ),
    email: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {dataValue.email}
      </SoftTypography>
    ),
    // action: (
    //   <ActionMenu />
    // ),
  };
});
