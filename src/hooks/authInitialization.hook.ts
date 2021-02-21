import axios from "axios";
import { useEffect } from "react";
import { fetchProfile } from "../actions/auth.action";
import { useAuthContext } from "../contexts/auth.context";

const useAuthInitialization = (): void => {
  const { authState, authDispatch } = useAuthContext();
  if (authState.token) {
    axios.defaults.headers.common.Authorization = `Bearer ${authState.token}`;
  }

  useEffect(() => {
    if (authState.token && authState.user === null) {
      fetchProfile(authDispatch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useAuthInitialization;
