import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react"
import { Provider } from "react-redux";
import { useUiStore } from "../../../src/hooks/useUiStore";
import { uiSlice } from "../../../src/store"

//We build a mock of our store to manipulate its properties how we need it that receive an initialState
const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}

describe('Pruebas en useUiStore', () => {

    test('debe de regresar el estado por defecto', () => {

        const mockStore = getMockStore({
            isDateModalOpen: true
        });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>

        });

        expect(result.current).toEqual({
            isDateModalOpen: true,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function)
        });

    })

    test('onOpenDateModal debe de modificar el estado del isDateModalOpen en true', () => {

        //isDateModalOpen: false
        const mockStore = getMockStore({
            isDateModalOpen: false
        });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>

        });

        const { openDateModal } = result.current;

        act(() => {
            openDateModal();
        });

        expect(result.current.isDateModalOpen).toBeTruthy();
    })

    test('closeDateModal debe de modificar el estado del isDateModalOpen en true', () => {

        //isDateModalOpen: true
        const mockStore = getMockStore({
            isDateModalOpen: true
        });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>

        });

        const { closeDateModal } = result.current;

        act(() => {
            closeDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();

    })

    test('toggleDateModal debe de cambiar el estado respectivamente', () => {

        //isDateModalOpen: true
        const mockStore = getMockStore({
            isDateModalOpen: true
        });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>

        });

        act(() => {
            result.current.toggleDateModal();
        });

        expect(result.current.isDateModalOpen).toBeFalsy();

        act(() => {
            result.current.toggleDateModal();
        });

        expect(result.current.isDateModalOpen).toBeTruthy();

    })
})