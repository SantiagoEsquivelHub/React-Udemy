import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUploadEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    }

    const startSavingEvent = async (calendarEvent) => {

        if (calendarEvent._id) {
            //Uploading event
            dispatch(onUploadEvent({ ...calendarEvent }));

        } else {
            //Creating event
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
        }
    }

    const startDeletingEvent = async() => {
        dispatch(onDeleteEvent());
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
    }
}