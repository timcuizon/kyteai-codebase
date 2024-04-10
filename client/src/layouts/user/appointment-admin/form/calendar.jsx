import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import SoftBadge from 'components/SoftBadge'
import { Grid } from '@mui/material'
import colors from 'assets/theme/base/colors'
import SoftTypography from 'components/SoftTypography'
import SoftBox from 'components/SoftBox'

const Calendar = () => {
  const handleEventClick = (yeah) => {
    alert('Event: ' + yeah.event.title);
    alert('Coordinates: ' + yeah.jsEvent.pageX + ',' + yeah.jsEvent.pageY);
    alert('View: ' + yeah.view.type);
  }

  const handleEventClickDate = (info) => {
    alert('Clicked on: ' + info.dateStr);
    alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
    alert('Current view: ' + info.view.type);
  }

  // Function to determine event background color
  const getEventBackgroundColor = (event) => {
    const eventStartDate = new Date(event.start);
    const today = new Date();
    if (eventStartDate < today) {
      return colors.secondary.main; // Gray for past events
    }
    else if (eventStartDate.toDateString() === today.toDateString()) {
      return colors.success.main; // Green for today's events
    } 
    else {
      return colors.primary.main; // Blue for future events
    }
  }

  return (
    <div id="userAppointment">
      
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
            <SoftBadge badgeContent="Approved" style={{ color: '#1EAB89'}} container circular  />
          </Grid>
          <Grid item m={1}>
            <SoftBadge badgeContent="Pending" color="info" container circular variant="contained"/>
          </Grid>
          <Grid item m={1}>
            <SoftBadge badgeContent="Archived" color="dark" container circular variant="contained"/>
          </Grid>
          <Grid item m={1}>
            <SoftBadge badgeContent="Pending"  color='activityTag'container circular />
          </Grid>
        </Grid>
      </SoftBox>
       
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable="true"
        height={400}
        validRange={{start:dayjs().format("YYYY-MM-DD")}}
        selectable="true"
        eventClick={handleEventClick}
        eventBorderColor="#1EAB89"
        eventReceive="testing"
        dateClick={handleEventClickDate}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          themeSystem: '#1EAB89',
          right: 'dayGridWeek,dayGridMonth,dayGridDay'
        }}
        events={[
          {
            title: "Andre Apilado",
            start: "2023-09-11",
            end: "2023-09-13",
            className: "success",
            url: '/appointment/schedule-management',
            backgroundColor: getEventBackgroundColor({
              start: "2023-09-11"
            })
          },
          {
            title: "Timothy Cuizon",
            start: "2023-10-13",
            end: "2023-10-13",
            className: "success",
            url: '/appointment/schedule-management',
            backgroundColor: getEventBackgroundColor({
              start: "2023-10-13"
            })
          },
          {
            title: "Zeke Ojerio",
            start: "2023-10-13",
            end: "2023-10-13",
            className: "success",
            url: '/appointment/schedule-management',
            backgroundColor: getEventBackgroundColor({
              start: "2023-10-13"
            })
          },
          {
            title: "Justin Barcos",
            start: "2023-10-23",
            end: "2023-10-23",
            className: "success",
            url: '/appointment/schedule-management',
            backgroundColor: getEventBackgroundColor({
              start: "2023-10-23"
            })
          },
          {
            title: "Ben Lucido",
            start: "2023-10-20",
            end: "2023-10-20",
            className: "info",
            url: '/appointment/schedule-management',
            backgroundColor: colors.success.main,
          },
          {
            title: "John Quintal",
            start: "2023-10-17",
            end: "2023-10-17",
            className: "success",
            url: '/appointment/schedule-management',
            backgroundColor: getEventBackgroundColor({
              start: "2023-10-17"
            })
          },
          {
            title: "Andre Apilado",
            start: "2023-10-18",
            end: "2023-10-18",
            className: "success",
            url: '/appointment/schedule-management',
            backgroundColor: getEventBackgroundColor({
              start: "2023-10-18"
            })
          },
          {
            title: "John Micheal Vargas",
            start: "2023-11-10",
            end: "2021-11-10",
            className: "info",
            backgroundColor: getEventBackgroundColor({
              start: "2023-11-10"
            })
          },
          {
            title: "Winter Hackaton",
            start: "2023-11-22",
            end: "2021-11-25",
            className: "error",
            backgroundColor: getEventBackgroundColor({
              start: "2023-11-22"
            })
          },
        ]}
      />
     
    </div>
  )
}

export default Calendar;
