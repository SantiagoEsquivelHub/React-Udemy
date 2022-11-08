import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import calendarApi from "../api";
import { convertEventToDateEvent } from "../helpers";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUploadEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        try {
            if (calendarEvent.id) {
                //Uploading event
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
                dispatch(onUploadEvent({ ...calendarEvent, user }));

            } else {
                //Creating event
                const { data } = await calendarApi.post('/events', calendarEvent)

                dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }));
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Save error', error.response.data.msg, 'error')
        }

    }

    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error)
            Swal.fire('Save error', error.response.data.msg, 'error')
        }
    }

    const startLoadingEvents = async () => {

        try {
            const { data } = await calendarApi.get('/events');
            const datedEvents = convertEventToDateEvent(data.events);
            dispatch(onLoadEvents(datedEvents));

        } catch (error) {
            console.log(error);
        }

    }

    return {
        //Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //Functions
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent,
        startLoadingEvents
    }
}