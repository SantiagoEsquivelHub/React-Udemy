import { retornaArreglo } from "../../base/07-deses-arr";

describe('Pruebas de desestructuracion', () => {

    test('Debe retornar un string y un numero en un arreglo', () => {
        
        const arr = retornaArreglo();

        expect(arr).toEqual(['ABC', 123]);
    })

})