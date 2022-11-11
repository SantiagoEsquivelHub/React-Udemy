import { calendarSlice, onAddNewEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUploadEvent } from "../../../src/store/calendar/calendarSlice";
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('Pruebas en calendarSlice', () => {
    test('debe de regresar el estado por defecto', () => {

        const state = calendarSlice.getInitialState();

        expect(state).toEqual(initialState);
    })

    test('onSetActiveEvent debe de activar el evento', () => {

        const state = calendarSlice.reducer(calendarWithEventsState, onSetActiveEvent(events[0]));
        expect(state.activeEvent).toEqual(events[0])

    })

    test('onAddNewEvent debe de agregar un nuevo evento', () => {

        const newEvent = {
            id: '3',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Cumpleaños de Sara',
            notes: 'Comprar las comida'
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onAddNewEvent(newEvent));

        expect(state).toEqual({
            isLoadingEvents: false,
            events: [...events, newEvent],
            activeEvent: null
        });

    })

    test('onUploadEvent debe de actualizar un evento', () => {

        const oldEvent = {
            id: '2',
            start: new Date('2022-10-21 13:00:00'),
            end: new Date('2022-10-21 15:00:00'),
            title: 'Cumpleaños de Meliza',
            notes: 'Comprar las papitas y la salsa tambien'
        }

        const state = calendarSlice.reducer(calendarWithEventsState, onUploadEvent(oldEvent));

        expect(state.events).toContain(oldEvent);

    })

    test('onDeleteEvent debe de eliminar el evento activo', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onDeleteEvent());
        expect(state.activeEvent).toBe(null);
        expect(state.events[0]).not.toContain(events[0])

    })

    test('onLoadEvents debe de cargar todos los eventos', () => {

        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state).toEqual(calendarWithEventsState);

    })

    test('onLogoutCalendar debe de limpiar el estado', () => {

        const state = calendarSlice.reducer(calendarWithActiveEventState, onLogoutCalendar());
        expect(state).toEqual(initialState);

    })
})