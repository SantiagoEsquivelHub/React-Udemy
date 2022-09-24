import { UserContext } from "../../src/09-useContext/context/UserContext";
import { fireEvent, render, screen } from '@testing-library/react';
import { LoginPage } from "../../src/09-useContext/LoginPage";

describe('Pruebas en el componente <LoginPage />', () => {

    test('debe de mostrar el componente SIN el usuario', () => {
        render(
            <UserContext.Provider value={{ user: null }}>
                <LoginPage />
            </UserContext.Provider>
        );
        //screen.debug()

        const preTag = screen.getByLabelText('pre');

        expect(preTag.innerHTML).toBe('null');
    })

    test('debe de llamar el setUser cuando se hace click en el boton', () => {

        const setUserMock = jest.fn();

        render(
            <UserContext.Provider value={{ user: null, setUser: setUserMock }}>
                <LoginPage />
            </UserContext.Provider>
        );
        //screen.debug()

        const btnTag = screen.getByRole('button');
        fireEvent.click(btnTag);

        expect(setUserMock).toHaveBeenCalled();
    })

})