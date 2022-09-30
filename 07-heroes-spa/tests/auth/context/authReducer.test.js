const { screen, render } = require("@testing-library/react");
const { authReducer } = require("../../../src/auth/context/authReducer");
const { types } = require("../../../src/auth/types/types");

describe('Pruebas en el authReducer', () => {

    const initialState = {
        logged: false,
        user: null,
    }

    test('debe retornar el estado por defecto', () => {

        const newState = authReducer(initialState,);

        expect(newState).toBe(initialState);

    })

    test('la funcion login debe de llamar el AUTH_LOGIN y establecer el user', () => {

        const userLogged = {
            id: 123,
            name: 'Santiago Sanchez'
        }

        const action = {
            type: types.login,
            payload: userLogged
        }

        const { user } = authReducer(initialState, action);
        expect(user).toBe(userLogged)

    })

    test('la funcion login debe de borrar el name del user y poner el logged en false', () => {

        const action = {
            type: types.logout
        }

        const { logged } = authReducer(initialState, action);
        expect(logged).toBeFalsy();

    })

})