import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import calendarApi from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector(state => state.auth);

    const Checking = () => {
        dispatch(onChecking);
    }

    const startLogin = async ({ email, password }) => {

        dispatch(onChecking);

        try {

            const { data } = await calendarApi.post('/auth', {
                email,
                password
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));


        } catch (error) {
            dispatch(onLogout("Login failed"));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);

        }
    }

    const startRegister = async ({ name, email, password }) => {

        dispatch(onChecking);

        try {

            const { data } = await calendarApi.post('/auth/register', {
                name,
                email,
                password
            });

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            console.log(error)
            dispatch(onLogout(error.response.data?.msg || '--'));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 1000);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }

    const checkingAuthToken = async () => {
        dispatch(onChecking())

        const token = localStorage.getItem('token');

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await calendarApi.get('/auth/renew');

            localStorage.setItem('token', data.newToken);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }


    return {
        //Properties
        errorMessage,
        status,
        user,

        //Functions
        Checking,
        startLogin,
        startRegister,
        startLogout,
        checkingAuthToken
    }
}