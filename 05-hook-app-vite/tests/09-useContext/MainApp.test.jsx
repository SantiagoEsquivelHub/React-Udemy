import { MainApp } from "../../src/09-useContext/MainApp";
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { LoginPage } from "../../src/09-useContext";

describe('Pruebas del componente <MainApp />', () => {

    test('debe de mostrar el componente <HomePage />', () => {
        render(
            <MemoryRouter>
                <MainApp />
            </MemoryRouter>
        );

        //screen.debug();

        expect(screen.getByText('HomePage')).toBeTruthy();
    })

    test('debe de mostrar el componente <LoginPage />', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <MainApp />
            </MemoryRouter>
        );

        screen.debug();

        expect(screen.getByText('LoginPage')).toBeTruthy();
    })

})