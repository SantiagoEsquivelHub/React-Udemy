import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../../src/auth/context/AuthContext";
import { PublicRoute } from "../../../src/router/public/PublicRoute";

describe('Pruebas en <PublicRoute />', () => {

    test('debe de mostrar el children si no esta autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        );

        //screen.debug();

        expect(screen.getByText('Ruta publica')).toBeTruthy();
    })

    test('debe de navegar si esta autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Santiago Sanchez'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>
                    <Routes>

                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta publica</h1>
                            </PublicRoute>
                        } />

                        <Route path='marvel' element={<h1>Marvel Page</h1>} />

                    </Routes>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        screen.debug();
        expect(screen.getAllByText('Marvel Page')).toBeTruthy();
    })

})