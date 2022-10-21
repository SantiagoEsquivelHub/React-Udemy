import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { NavBar } from '../'
import { addHours, format, parse, startOfWeek, getDay } from "date-fns"
import enUS from 'date-fns/locale/en-US'

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

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
  return (
    <>
      <NavBar />

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
      />

    </>
  )
}
