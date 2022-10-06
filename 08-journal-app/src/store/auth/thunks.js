import { signInWithGoogle } from "../../firebase/providers";
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