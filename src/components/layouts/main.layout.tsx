import { useAuthContext } from "../../contexts/auth.context";
import { logout } from '../../actions/auth.action';
import { useHistory } from "react-router-dom";

const MainLayout = ({children}: {children: JSX.Element}) => {
    const { authDispatch } = useAuthContext();
    const history = useHistory();

    const clickLogoutButton = () => {
        logout(authDispatch);
        history.push('/');
    }

    return <>
        <h1>Main Layout</h1>

        {children}

        <button onClick={() => {clickLogoutButton()}}>
            Logout
        </button>
    </>;
}

export default MainLayout;