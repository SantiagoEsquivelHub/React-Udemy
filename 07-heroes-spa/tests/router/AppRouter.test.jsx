import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../src/auth";
import { AppRouter } from "../../src/router/AppRouter";


describe('Pruebas en <AppRouter />', () => {

    test('debe de mostrar el LoginPage si no esta autenticado', () => {

        const contextValue = {
            logged: false,
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //screen.debug();
        expect(screen.getByText('LoginPage')).toBeTruthy();
    })

    test('debe de mostrar el componente de MarvelPage si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Santiago Sanchez'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/login']}>
                    <AppRouter />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        //screen.debug();
        expect(screen.getByText('Marvel')).toBeTruthy();

    })

})