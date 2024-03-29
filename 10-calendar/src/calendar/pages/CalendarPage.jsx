import { useState } from "react"
import { Calendar } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { NavBar, CalendarModal, FabAddNew, FabDelete } from '../'
import { localizer, getMessagesES } from "../../helpers"
import { CalendarEvent } from "../components/CalendarEvent"
import { useAuthStore, useCalendarStore, useUiStore } from "../../hooks"
import { useEffect } from "react"


export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { user } = useAuthStore();

  const eventStyleGetter = (event, start, end, isSelected) => {

    const myEvent = user.uid === event.user.uid || user.uid === event.user._id;

    const style = {
      backgroundColor: myEvent ? '#347CF7' : '#465660',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    console.log({ dobleClick: event })
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent(event);
  }

  const onViewChanged = (event) => {
    console.log({ viewChanged: event })
    localStorage.setItem('lastView', event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])


  return (
    <>
      <NavBar />

      <Calendar
        culture="es"
        messages={getMessagesES()}
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
