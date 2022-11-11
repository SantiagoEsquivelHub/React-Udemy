import calendarApi from "../../src/api"

describe('Pruebas con la configuracion de Axios', () => {
    test('debe de tener la configuración por defecto', () => {
        const { VITE_API_URL } = process.env;

        expect(calendarApi.defaults.baseURL).toBe(VITE_API_URL);

    })

    test('debe tener el x-token en el header de todas las peticiones', async() => { 

        const token = 'ABC-123';
        localStorage.setItem('token', token);
        const resp = await calendarApi.get('/auth');
        expect(resp.config.headers['x-token']).toBe(token);

     })
})