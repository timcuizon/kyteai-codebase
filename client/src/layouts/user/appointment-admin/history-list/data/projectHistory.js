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
    { name: 'name', align: 'left' },
    { name: 'ID', align: 'left' },
    { name: 'grade', align: 'center' },
    { name: 'section', align: 'center' },
    { name: 'email', align: 'center' },
    // { name: 'action', align: 'center' },
  ],

  rows: rows,
};

export default projectsTableDataHistory;
