import React, { useEffect, useState  } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import SoftBadge from 'components/SoftBadge'
import { Grid } from '@mui/material'
import SoftTypography from 'components/SoftTypography'
import SoftBox from 'components/SoftBox'
import { useNavigate } from 'react-router-dom'
import { getCookie } from 'helpers/CookieHelper'

const Calendar = (events) => {

  const navigate = useNavigate();

  const handleEventClick = (yeah) => {
    const refNum = yeah.event._def.extendedProps.refNum

    if(getCookie("role") == "Admin" || getCookie("role") == "Professional") {
      navigate(`/appointment/schedule-management?id=${refNum}`)
    } else {
      navigate(`/appointment-counseling/appointment-summary?id=${refNum}`)
    }
  }

  return (
    <div
    id="dashboard">
      
      <SoftBox mb={2}mt={2}>
        <Grid
          container
          alignItems="center"
          justifyContent="left"
        >
          <Grid item>
            <SoftTypography variant="h6" fontWeight="text" color="info">Tags</SoftTypography>
          </Grid>
          <Grid item m={1} >
            <SoftBadge badgeContent="Approved" color="approvedTag"container circular  />
          </Grid>
          <Grid item m={1}>
            <SoftBadge badgeContent="Pending"  color='pendingTag'container circular />
          </Grid>
          <Grid item m={1}>
            <SoftBadge badgeContent="Time-out"  color='activityTag'container circular />
          </Grid>
        </Grid>
      </SoftBox>
      <div style={{ maxWidth: '100%', overflow: 'auto' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable="true"
          height={600}
          selectable="true"
          titleFormat={{ year: 'numeric', month: 'short', day: '2-digit' }}
          eventClick={handleEventClick}
          eventBorderColor="#1EAB89"
          eventReceive="testing"
          //dateClick={}
          dayMaxEvents={1}
          headerToolbar={{
            left: 'prev,next',
            center: 'title',
            themeSystem: '#1EAB89',
            right: 'dayGridWeek,dayGridMonth,dayGridDay'
          }}
          events={events}
          aspectRatio="auto"
          contentHeight="auto"
          updateSize="true"
        />
      </div>
      
     
    </div>
  )
}

export default Calendar;
