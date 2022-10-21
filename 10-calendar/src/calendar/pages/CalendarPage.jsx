import { Calendar } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from "date-fns"
import { NavBar } from '../'
import { localizer, getMessagesES } from "../../helpers"
import { CalendarEvent } from "../components/CalendarEvent"

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

const eventStyleGetter = (event, start, end, isSelected) => {
  // console.log({ event, start, end, isSelected })

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

export const CalendarPage = () => {
  return (
    <>
      <NavBar />

      <Calendar
        culture="es"
        messages={getMessagesES()}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        eventPropGetter={eventStyleGetter}
        components={{
        event: CalendarEvent
        }}
      />

    </>
  )
}
