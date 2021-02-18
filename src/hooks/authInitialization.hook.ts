import axios from "axios";
import { useEffect } from "react";
import { fetchProfile } from "../actions/auth.action";
import { useAuthContext } from "../contexts/auth.context";

const useAuthInitialization = () => {
    const { authState, authDispatch } = useAuthContext();
    if (authState.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${authState.token}`;
    }

    useEffect(() => {
        if (authState.token && authState.user === null) {
            fetchProfile(authDispatch);
        }
    }, [])
}

export default useAuthInitialization;