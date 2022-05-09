import { getUser, getUsuarioActivo } from "../../base/05-funciones";

describe('Pruebas en 05-funciones', () => {

    test('getUser debe de retornar un objeto', () => {

        const userTest = {
            uid: 'ABC123',
            username: 'El_Papi1502'
        }

        const user = getUser();
        expect(userTest).toEqual(user);
    })

    test('getUsuarioActivo debe de retornar un objeto', () => {

        const nombre = 'Santiago';
        const userTest = {
            uid: 'ABC567',
            username: nombre
        }

        const user = getUsuarioActivo(nombre);
        expect(userTest).toEqual(user);
    })


})