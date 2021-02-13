import { useState } from "react";
import { useAuthContext } from "../../contexts/auth.context";
import { login } from '../../actions/auth.action';
import { useHistory } from "react-router-dom";

const Login = () => {
    const { authDispatch } = useAuthContext();
    const history = useHistory();

    const [email, setEmail] = useState("pjmessi2504@gmail.com");
    const [password, setPassword] = useState("password");

    const loginUser = (e:any) => {
        e.preventDefault();
        login(authDispatch, {email, password})
        .then(() => {
            history.push('/');
        })
        .catch((error) => {console.log(error)});
    }

    return <>
        <h2>Login Page</h2>

        <form onSubmit={(e) => {loginUser(e)}}>
            <input 
                type="email" 
                name="email" 
                id="loginEmail" 
                placeholder="Enter email address" 
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />
            <br />

            <input 
                type="password" 
                name="password" 
                id="loginPassword"
                placeholder="Enter password" 
                onChange={(e) => setPassword(e.target.value)}
                value={password}
            />

            <br />

            <input type="submit" value="Login" />
        </form>
    </>
}

export default Login;