import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../../actions/auth.action';
import { useAuthContext } from '../../contexts/auth.context';

const Register = () => {

    const history = useHistory();
    const { authDispatch } = useAuthContext();

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    const handleRegisterFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        register(authDispatch, {email, name, password, password_confirmation: passwordConfirmation})
        .then(() => {history.push('/')})
        .catch((error) => {console.log(error)});
    }

    return <>
        <h2>Register Page</h2>

        <form onSubmit={(e) => handleRegisterFormSubmit(e)}>
            <input
                type="email"
                name="email"
                id="registerEmail"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Enter email address"
            />
            <br/>
            <input
                type="text"
                name="name"
                id="registerName"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                placeholder="Enter name"
            />
            <br/>
            <input
                type="password"
                name="password"
                id="registerPassword"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Enter password"
            />
            <br/>
            <input
                type="password"
                name="password_confirmation"
                id="registerPasswordConfirmation"
                value={passwordConfirmation}
                onChange={(e)=>setPasswordConfirmation(e.target.value)}
                placeholder="Enter password confirmation"
            />
            <br/>
            <input  type="submit" value="Register"/>
        </form>
    </>
}

export default Register;