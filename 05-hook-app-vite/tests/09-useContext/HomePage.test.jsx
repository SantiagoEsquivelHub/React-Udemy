import { HomePage } from "../../src/09-useContext/HomePage";
import { render, screen } from '@testing-library/react'
import { UserContext } from "../../src/09-useContext/context/UserContext";

describe('Pruebas en el componente <HomePage />', () => {

    test('debe de mostrar el componente SIN el usuario', () => {
        render(
            <UserContext.Provider value={{ user: null }}>
                <HomePage />
            </UserContext.Provider>
        );
        //screen.debug()

        const preTag = screen.getByLabelText('pre');

        expect(preTag.innerHTML).toBe('null');
    })

    test('debe de mostrar el componente CON el usuario', () => {

        const user = {
            id: 123,
            name: 'Santiago Sanchez',
            email: 'santi@gmail.com'
        }

        render(
            <UserContext.Provider value={{ user }}>
                <HomePage />
            </UserContext.Provider>
        );
        screen.debug()

        const preTag = screen.getByLabelText('pre');

        expect(preTag.innerHTML).toContain(user.name);
    })

})