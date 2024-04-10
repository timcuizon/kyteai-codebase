import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import SoftBadge from 'components/SoftBadge'
import { Grid } from '@mui/material'
import colors from 'assets/theme/base/colors'
import SoftTypography from 'components/SoftTypography'
import SoftBox from 'components/SoftBox'
import dayjs from 'dayjs'
import { useNavigate } from 'react-router-dom'

const Calendar = ({Events}) => {
  
  const [appEvents, setAppEvents] = useState([]);

  useEffect(() => {
    if(Events != ''){
      setAppEvents(Events)
    }
  })
  
  const navigate = useNavigate()

  const handleEventClick = (yeah) => {
    const refNum = yeah.event._def.extendedProps.refNum
    
    navigate(`/appointment-counseling/appointment-summary?id=${refNum}`)
  }

  return (
    <div id = "userAppointment">
      
      <SoftBox m={2}>
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
        </Grid>
      </SoftBox>
      <div style={{ maxWidth: '100%', overflow: 'auto' }}>
      <FullCalendar
        dayMaxEventRows={2}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height={700}
        selectable="true"
        eventClick={handleEventClick}
        titleFormat={{ year: 'numeric', month: 'short', day: '2-digit' }}
        eventBorderColor="#1EAB89"
        eventReceive="testing"
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          themeSystem: '#1EAB89',
          right: 'dayGridWeek,dayGridMonth,dayGridDay'
        }}
        events={appEvents}
        aspectRatio="auto"
        contentHeight="auto"
        updateSize="true"
      />
      </div>
     
    </div>
  )
}

export default Calendar;
