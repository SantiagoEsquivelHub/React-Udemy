import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns'

const tempEvent = {
    _id: new Date().getTime(),
    title: 'birthday',
    notes: 'we must to buy the cake',
    start: new Date(),
    end: addHours(new Date(), 2),
    user: {
        _id: 'ABC123',
        name: 'Santiago'
    }
}


export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [tempEvent],
        activeEvent: null,
    },
    reducers: {
        onSetActiveEvent: (state, { payload }) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, { payload }) => {
            state.events.push(payload);
            state.activeEvent = null;
        },
        onUploadEvent: (state, { payload }) => {
            state.events = state.events.map(event => event._id === payload._id ? payload : event);
        },
        onDeleteEvent: (state) => {

            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent._id)
                state.activeEvent = null;
            }

        },
    },
})
// Action creators are generated for each case reducer function
export const {
    onAddNewEvent,
    onDeleteEvent,
    onSetActiveEvent,
    onUploadEvent,
} = calendarSlice.actions