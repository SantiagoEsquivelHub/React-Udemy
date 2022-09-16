import { getGifs } from "../../helpers/getGifs"

describe('Pruebas con getGifs', () => {

    test('Debe traer 10 elementos', async() => {

        const gifs = await getGifs('Dragon Ball');
        console.log(gifs);
        expect(gifs.length).toBe(10);

    })

})