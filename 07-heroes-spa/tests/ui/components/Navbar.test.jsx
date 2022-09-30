import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { AuthContext } from "../../../src/auth/context"
import { Navbar } from "../../../src/ui/components/Navbar"

const mockedUSeNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUSeNavigate
}))

describe('Pruebas en <Navbar />', () => {

    beforeEach(
        () => jest.clearAllMocks()
    )

    test('debe mostrar el nombre del usuario', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Santiago Sanchez'
            },
            logout: jest.fn()
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel', '/dc']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        //screen.debug();
        expect(screen.getByText('Santiago Sanchez')).toBeTruthy();

    })

    test('debe de llamar el logout y navigate cuando se hace click en el boton', () => {

        const logoutMock = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Santiago Sanchez'
            },
            logout: logoutMock
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel', '/dc']}>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        )

        //screen.debug();

        const btnLogout = screen.getByRole('button')
        fireEvent.click(btnLogout);

        expect(logoutMock).toHaveBeenCalled();
        expect(mockedUSeNavigate).toHaveBeenCalledWith("/login", { "replace": true });
    })

})