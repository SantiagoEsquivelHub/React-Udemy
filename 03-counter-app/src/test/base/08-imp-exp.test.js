import { getHeroeById, getHeroesByOwner } from '../../base/08-imp-exp';
import heroes from '../../data/heroes';


describe('Pruebas en funciones de heroes', () => {

    test('getHeroeById debe retornar un heroe por id', () => {

        const id = 1;
        const heroe = getHeroeById(id);

        const heroeData = heroes.find(heroe => heroe.id === id);
        expect(heroeData).toBe(heroe);

    })

    test('getHeroesByOwner debe retornar undifined si el heroe no existe', () => {

        const id = 10;
        const heroe = getHeroeById(id);

        expect(undefined).toBe(heroe);

    })


    test('getHeroeById debe retornar un heroe por owner de DC', () => {

        const owner = 'DC';
        const heroe = getHeroesByOwner(owner);

        const heroeFilter= heroes.filter(heroe => heroe.owner === owner);
        expect(heroe).toEqual(heroeFilter);

    })

    test('getHeroeById debe retornar un heroe por owner de Marvel', () => {

        const owner = 'Marvel';
        const heroe = getHeroesByOwner(owner);

        const heroeFilter= heroes.filter(heroe => heroe.owner === owner);
        expect(heroe.length).toBe(heroeFilter.length);

    })

})