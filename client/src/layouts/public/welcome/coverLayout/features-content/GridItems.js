// GridItem.js
import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import SoftTypography from 'components/SoftTypography';

const GridItem = ({ title, subtext }) => {
  return (
    <Card
      sx={{
        width: '250px',
        height: '250px',
        backgroundColor: '#212427',
        color: '#FDB813',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <SoftTypography variant="h5" color='light' align='center'>{title}</SoftTypography>
      <SoftTypography variant="body2" color='light' align='center'>{subtext}</SoftTypography>
    </Card>
  );
};

export default GridItem;
