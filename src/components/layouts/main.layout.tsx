import { useAuthContext } from "../../contexts/auth.context";
import { logout } from '../../actions/auth.action';
import { useHistory } from "react-router-dom";

const MainLayout = ({children}: {children: JSX.Element}) => {
    const { authState, authDispatch } = useAuthContext();
    const history = useHistory();

    const clickLogoutButton = () => {
        logout(authDispatch);
        history.push('/');
    }

    return <>
        <h1>Main Layout</h1>
        <span>{authState.user?.name}</span>

        {children}

        <button onClick={() => {clickLogoutButton()}}>
            Logout
        </button>
    </>;
}

export default MainLayout;