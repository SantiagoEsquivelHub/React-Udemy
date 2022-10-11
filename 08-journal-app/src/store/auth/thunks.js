import { async } from "@firebase/util";
import { loginWithEmailPassword, logoutFirebase, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./";

export const checkingAuthetication = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

    }
}

export const startGoogleSignIt = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

        const result = await signInWithGoogle();
        console.log(result.errorMessage)

        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({ displayName, email, password }) => {

    return async (dispatch) => {

        dispatch(checkingCredentials());

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ displayName, email, password });

        if (!ok) return dispatch(logout(errorMessage));

        dispatch(login({ displayName, email, ok, uid, photoURL }))


    }
}

export const startLoginWithUserWithEmailPassword = ({ email, password }) => {

    return async (dispatch) => {

        dispatch(checkingCredentials());

        const { ok, displayName, photoURL, uid, errorMessage } = await loginWithEmailPassword({ email, password });

        if (!ok) return dispatch(logout(errorMessage));

        dispatch(login({ displayName, email, ok, uid, photoURL }))


    }
}

export const startLogout = () => {

    return async (dispatch) => {
        await logoutFirebase();

        dispatch(logout());

    }

}