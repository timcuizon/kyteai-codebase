import React, { useState } from 'react';
import Icon from '@mui/material/Icon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import SoftBox from 'components/SoftBox';
import SoftTypography from 'components/SoftTypography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import SoftInput from 'components/SoftInput';
import SoftButton from "components/SoftButton";
import { rows } from './rowData';

const projectsTableDataHistory = {
  columns: [
    { name: 'id', align: 'left'},
    { name: 'userType', align: 'left' },
    { name: 'email', align: 'left' },
    { name: 'givenName', align: 'left' },
    { name: 'familyName', align: 'left' },
    { name: 'birthDate', align: 'center' },
    { name: 'sex', align: 'center' },
    { name: 'contactNumber', align: 'center' },
    { name: 'createdAt', align: 'center' },
    { name: 'createdBy', align: 'center' },
    { name: 'updatedAt', align: 'center' },
    { name: 'updatedBy', align: 'center' },
    // { name: 'action', align: 'center' },
  ],

  rows: rows,
};

export default projectsTableDataHistory;
