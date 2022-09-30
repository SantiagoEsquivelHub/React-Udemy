import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from "../../../src/auth";
import { PrivateRoute } from "../../../src/router/private/PrivateRoute";
import { PublicRoute } from "../../../src/router/public/PublicRoute";

describe('Pruebas en el <PrivateRoute />', () => {

    test('debe de mostrar el children si esta autenticado', () => {

        Storage.prototype.setItem = jest.fn(); //se hace referencia a la funcion de setItem del localStorage

        const contextValue = {
            logged: true,
            user: {
                id: 123,
                name: 'Santiago Sanchez'
            }
        }

        render(
            <AuthContext.Provider value={contextValue}>

                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>

            </AuthContext.Provider>
        );

        //screen.debug();

        expect(screen.getByText('Ruta privada')).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/search?q=batman');
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

        /*     screen.debug();
            expect(screen.getAllByText('Marvel Page')).toBeTruthy(); */
    })

})