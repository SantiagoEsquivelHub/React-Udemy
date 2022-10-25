import { useState } from "react"
import { Calendar } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from "date-fns"
import { NavBar, CalendarModal } from '../'
import { localizer, getMessagesES } from "../../helpers"
import { CalendarEvent } from "../components/CalendarEvent"
import { useUiStore } from "../../hooks"

const events = [{
  title: 'birthday',
  notes: 'we must to buy the cake',
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    _id: 'ABC123',
    name: 'Santiago'
  }
}]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month');

  const { openDateModal } = useUiStore();


  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
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
    console.log({ click: event })

  }

  const onViewChanged = (event) => {
    console.log({ viewChanged: event })
    localStorage.setItem('lastView', event);
  }


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
    </>
  )
}
