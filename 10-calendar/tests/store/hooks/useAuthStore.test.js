import { configureStore } from "@reduxjs/toolkit"
import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { Provider } from "react-redux"
import { useAuthStore } from "../../../src/hooks/useAuthStore"
import { authSlice } from "../../../src/store"
import { initialState } from "../../fixtures/authStates"

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer
        },
        preloadedState: { ...initialState }
    })
}

describe('Pruebas en useAuthStore', () => {

    test('debe de regresar el estado por defecto', () => {

        const mockStore = getMockStore({
            status: 'checking', //authenticated, not-authenticated
            user: {},
            errorMessage: undefined,
        })

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        })

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            Checking: expect.any(Function),
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            startLogout: expect.any(Function),
            checkingAuthToken: expect.any(Function),
        });
    })

    test('Checking debe de cambiar el status a checking', () => {

        const mockStore = getMockStore({ ...initialState })

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        })

        act(() => {
            result.current.Checking();
        })

        expect(result.current.status).toBe('checking');

    })
})