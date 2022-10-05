import { checkingCredentials } from "./";

export const checkingAuthetication = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

    }
}

export const startGoogleSignIt = () => {
    return async (dispatch) => {

        dispatch(checkingCredentials());

    }
}