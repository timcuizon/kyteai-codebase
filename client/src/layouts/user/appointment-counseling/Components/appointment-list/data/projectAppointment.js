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

const projectsTableDateAppointment = {
  columns: [
    { name: 'name', align: 'left' },
    { name: 'refNum', align: 'left' },
    { name: 'email', align: 'left' },
    { name: 'appointmentSchedule', align: 'center' },
    { name: 'status', align: 'center' },
    { name: 'createdBy', align: 'center' },
    // { name: 'action', align: 'center' },
  ],

  rows: rows,
};

export default projectsTableDateAppointment;