import { getHeroeByIdAsync } from "../../base/09-promesas";
import heroes from "../../data/heroes";

describe('Pruebas en 09-promesas', () => {

    test('getHeroeByIdAsync debe de retornar un heroe async', (done) => {


        const id = 1;
         getHeroeByIdAsync(id)
         .then(heroe => {
            expect(heroe).toEqual(heroes[0]);
            done();
         })

       

    });

    test('getHeroeByIdAsync debe de retornar un mensaje si no se le envia un id', (done) => {


         getHeroeByIdAsync()
         .catch(err => {
            expect(err).toBe( 'No se pudo encontrar el héroe' );
            done();
         })

       

    });

});