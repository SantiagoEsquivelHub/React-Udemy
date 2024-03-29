import { configureStore } from "@reduxjs/toolkit"
import { render, renderHook, waitFor } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import { Provider } from "react-redux"
import calendarApi from "../../../src/api"
import { useAuthStore } from "../../../src/hooks/useAuthStore"
import { authSlice, calendarSlice } from "../../../src/store"
import { authenticatedState, initialState, notAuthenticatedState } from "../../fixtures/authStates"
import { testUser } from "../../fixtures/testUser"

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
            calendar: calendarSlice.reducer
        },
        preloadedState: { ...initialState }
    })
}

describe('Pruebas en useAuthStore', () => {

    beforeEach(() => localStorage.clear());

    test('debe de regresar el estado por defecto', () => {

        const mockStore = getMockStore({
            status: 'checking', //authenticated, not-authenticated
            user: {},
            errorMessage: undefined,
        })

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        })

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            Checking: expect.any(Function),
            startLogin: expect.any(Function),
            startRegister: expect.any(Function),
            startLogout: expect.any(Function),
            checkingAuthToken: expect.any(Function),
        });
    })

    test('Checking debe de cambiar el status a checking', () => {

        const mockStore = getMockStore({ ...initialState })

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        })

        act(() => {
            result.current.Checking();
        })

        expect(result.current.status).toBe('checking');

    })

    test('startLogin debe de fallar la autenticación', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const unregisterUser = {
            email: 'isa@gmail.com',
            password: 'isa12345'
        }

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        });

        await act(async () => {
            await result.current.startLogin(unregisterUser);
        })

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Login failed',
            status: 'not-authenticated',
            user: {},
        });

        expect(localStorage.getItem('token')).toEqual(null);
        expect(localStorage.getItem('token-init-date')).toEqual(null);

        waitFor(() => expect(result.current.errorMessage).toBe(undefined))


    })

    test('startLogin debe de realizar el login correctamente', async () => {

        //Not Authenticated State
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        });


        act(() => {
            //Sync function
            result.current.startLogin(testUser);
        })

        expect(result.current.status).toBe('checking');

        await act(async () => {
            //Async function
            await result.current.startLogin(testUser);
        })

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {
                uid: '636ab98d0f19c57dcbc8dbc7',
                name: "Test User",
            }
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));

    })

    test('startRegister debe crear un nuevo usuario', async () => {

        //Not Authenticated State
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const newUser = {
            email: 'testing2@gmail.com',
            password: 'isa12345',
            name: 'Test User 2'
        }

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        });

        act(() => {
            //Sync function
            result.current.startRegister(newUser);
        })

        expect(result.current.status).toBe('checking');

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: "some-id",
                name: "Test User 2",
                token: "some-token"
            }
        });

        await act(async () => {
            //Async function
            await result.current.startRegister(newUser);
        })

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {
                uid: "some-id",
                name: "Test User 2",
            }
        });

        //Delete spy
        spy.mockRestore()
    })

    test('startRegister debe de fallar la creación de un nuevo usuario', async () => {

        //Not Authenticated State
        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        });

        act(() => {
            //Sync function
            result.current.startRegister(testUser);
        })

        expect(result.current.status).toBe('checking');

        await act(async () => {
            //Async function
            await result.current.startRegister(testUser);
        })

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'The user already exists with this email',
            status: 'not-authenticated',
            user: {}
        });

    })

    test('checkingAuthToken debe de fallar si no hay token', async () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        });


        await act(async () => {
            //Async function
            await result.current.checkingAuthToken();
        })

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });

    })

    test('checkingAuthToken debe de autenticar al usuario si hay un token con spyOn', async () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        });

        localStorage.setItem('token', 'some_id');

        const spy = jest.spyOn(calendarApi, 'get').mockReturnValue({
            data: {
                ok: true,
                msg: "renew",
                uid: "some-id",
                name: "Test User",
                newToken: "some-token"
            }

        });


        await act(async () => {
            //Async function
            await result.current.checkingAuthToken();
        })

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {
                name: 'Test User',
                uid: 'some-id'
            }
        })

        spy.mockRestore();

    })

    test('checkingAuthToken debe de autenticar al usuario si hay un token con petición a backend', async () => {


        const { data } = await calendarApi.post('/auth/', testUser);

        const { token } = data;

        // We set the test user token to do the request 
        localStorage.setItem('token', token);

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        });

        await act(async () => {
            //Async function
            await result.current.checkingAuthToken();
        })

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: {
                name: 'Test User',
                uid: '636ab98d0f19c57dcbc8dbc7'
            }
        })
    })

    test('startLogout debe de limpiar el localStorage y limpiar los estados del redux del calendar y del auth', () => {

        const mockStore = getMockStore({ ...authenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) =>
                <Provider store={mockStore}>
                    {children}
                </Provider>
        });

        localStorage.setItem('token', 'some-token');
        localStorage.setItem('token-init-date', 'some-token-init-date');


        act(() => {
            //Sync function
            result.current.startLogout();
        })

        const { errorMessage, status, user } = result.current;


        expect(localStorage.getItem('token')).toBe(null);
        expect(localStorage.getItem('token-init-date')).toBe(null);
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        });

    })

})