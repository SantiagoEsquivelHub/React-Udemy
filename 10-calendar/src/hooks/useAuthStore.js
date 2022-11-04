import { useReducer } from "react";
import { useDispatch } from "react-redux";
import calendarApi from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

    const dispatch = useDispatch();
    const { status, user, errorMessage } = useReducer(state => state.auth);

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
            }, 10);
        }
    }

    return {
        //Properties
        status,
        user,
        errorMessage,

        //Functions
        Checking,
        startLogin
    }
}