import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { AppRouter } from "../../src/router/AppRouter"
import { store } from "../../src/store";

jest.mock("../../src/hooks/useAuthStore");
jest.mock("../../src/calendar", () => ({
    CalendarPage: () => <h1>CalendarPage</h1>
}));

describe('Pruebas en <AppRouter />', () => {

    const mockCheckingAuthToken = jest.fn();
    beforeEach(() => jest.clearAllMocks());

    test('debe de mostrar la pantalla de carga y cargar el checkingAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkingAuthToken: mockCheckingAuthToken
        });

        render(
            <AppRouter />
        );

        const loading = screen.getByText('Loading...');

        expect(loading).toBeTruthy();
        expect(mockCheckingAuthToken).toHaveBeenCalled();


    })

    test('debe de mostrar la pantalla de login en caso de no estar autenticado', () => {

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkingAuthToken: mockCheckingAuthToken
        });

        const { container } = render(
            <MemoryRouter>
                <AppRouter />
            </MemoryRouter>
        );

        const ingreso = screen.getByText('Ingreso');

        expect(ingreso).toBeTruthy();
        expect(container).toMatchSnapshot();

    })

    test('debe de mostrar la pantalla del calendario en caso de estar autenticado', () => {

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkingAuthToken: mockCheckingAuthToken
        });

        const { container } = render(
            <Provider store={store}>
                <MemoryRouter>
                    <AppRouter />
                </MemoryRouter>
            </Provider>
        );

        const calendar = screen.getByText('CalendarPage');

        expect(calendar).toBeTruthy();
    })

})