import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"

describe('Pruebas en uiSlice', () => {

    test('debe de mostrar el nombre del uiSlice correctamente', () => {
        const uiName = 'ui'
        expect(uiSlice.name).toBe(uiName);
    })

    test('debe de mostrar el estado por defecto', () => {

        const initialState = uiSlice.getInitialState();

        expect(initialState).toEqual({ isDateModalOpen: false })
    })

    test('debe de cambiar el isDateModalOpen correctamente', () => { 

        let state = uiSlice.getInitialState();

        state = uiSlice.reducer(state, onOpenDateModal());
        expect(state.isDateModalOpen).toBeTruthy();

        state = uiSlice.reducer(state, onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy();


     })
}) 