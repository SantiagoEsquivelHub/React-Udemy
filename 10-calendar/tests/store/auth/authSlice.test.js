import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates"
import { testUser } from "../../fixtures/testUser"

describe('Pruebas en authSlice', () => {
    test('debe de regresar el estado inicial', () => {

        expect(authSlice.getInitialState()).toEqual(initialState)

    })

    test('debe de realizar un login', async () => {

        let state = authSlice.reducer(initialState, onLogin(testUser));
        expect(state).toEqual({
            status: 'authenticated',
            user: testUser,
            errorMessage: undefined
        });
    })


    test('debe de realizar el logout sin errorMessage', () => {

        let state = authSlice.reducer(authenticatedState, onLogout());

        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: undefined
        });
    })

    test('debe de realizar el logout con errorMessage', () => {

        const errorMessage = 'Credenciales no válidas'
        let state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

        expect(state).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage
        });
    })

    test('debe de limpiar el errorMessage', () => {

        const errorMessage = 'Credenciales no válidas'
        let state = authSlice.reducer(authenticatedState, onLogout(errorMessage));

        let newState = authSlice.reducer(state, clearErrorMessage());

        expect(newState.errorMessage).toBe(undefined)
    })
})