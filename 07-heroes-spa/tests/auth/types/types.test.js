import { types } from "../../../src/auth/types/types"

describe('Pruebas en types.js', () => {

    test('debe regresar estos tpyes', () => {

        expect(types).toEqual({
            login: 'AUTH_LOGIN',
            logout: "AUTH_LOGOUT"
        })

    })

})