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
    id: (
      <SoftTypography variant="button" color="text" fontWeight="medium" pl={2}>
        {dataValue.id}
      </SoftTypography>
    ),
    userType: (
      <SoftTypography variant="button" color="text" fontWeight="medium" pl={2}>
        {dataValue.userType}
      </SoftTypography>
    ),
    email: (
      <SoftTypography variant="button" color="text" fontWeight="medium">
        {dataValue.email}
      </SoftTypography>
    ),
    givenName: (
      <SoftTypography variant="button" color="text" fontWeight="medium">
        {dataValue.givenName}
      </SoftTypography>
    ),
    familyName: (
      <SoftTypography variant="button" color="text" fontWeight="medium">
        {dataValue.familyName}
      </SoftTypography>
    ),
  
    birthDate: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {dataValue.birthDate}
      </SoftTypography>
    ),
    sex: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {dataValue.sex}
      </SoftTypography>
    ),
    contactNumber: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {dataValue.contactNumber}
      </SoftTypography>
    ),
    address: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {dataValue.address}
      </SoftTypography>
    ),
    createdAt: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {dataValue.createdAt}
      </SoftTypography>
    ),
    createdBy: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {dataValue.createdBy}
      </SoftTypography>
    ),
    updatedAt: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {dataValue.updatedAt}
      </SoftTypography>
    ),
    updatedBy: (
      <SoftTypography variant="caption" color="text" fontWeight="medium">
        {dataValue.updatedBy}
      </SoftTypography>
    ),
    // action: (
    //   <ActionMenu />
    // ),
  };
});
