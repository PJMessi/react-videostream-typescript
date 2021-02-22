import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useAuthContext } from "../../contexts/auth.context";
import { login } from "../../actions/auth.action";
import ValidationErrorMessage from "../../components/validation/errorMessage";

const Login = (): JSX.Element => {
  const { authDispatch } = useAuthContext();
  const history = useHistory();

  const { register, handleSubmit, errors } = useForm<{
    email: string;
    password: string;
  }>();

  const handleLoginFormSubmit = (data: { email: string; password: string }) => {
    login(authDispatch, data).then(() => {
      history.push("/");
    });
  };

  return (
    <>
      <h2>Login Page</h2>

      <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
        <div className="formElement">
          <label htmlFor="loginEmail">
            Email <br />
            <input
              type="email"
              name="email"
              id="loginEmail"
              ref={register({ required: "Please enter your email" })}
            />
            <br />
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ message }) => (
                <ValidationErrorMessage message={message} />
              )}
            />
          </label>
        </div>

        <div className="formElement">
          <label htmlFor="loginPassword">
            Password <br />
            <input
              type="password"
              name="password"
              id="loginPassword"
              ref={register({ required: "Please enter your password" })}
            />
            <br />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => (
                <ValidationErrorMessage message={message} />
              )}
            />
          </label>
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

export default Login;
