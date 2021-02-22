import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../actions/auth.action";
import ValidationErrorMessage from "../../components/validation/errorMessage";
import { useAuthContext } from "../../contexts/auth.context";

const Register = (): JSX.Element => {
  const history = useHistory();
  const { authDispatch } = useAuthContext();

  type ResisterFormAttributes = {
    email: string;
    password: string;
    name: string;
    passwordConfirmation: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    errors,
  } = useForm<ResisterFormAttributes>();

  const handleRegisterFormSubmit = (data: ResisterFormAttributes) => {
    registerUser(authDispatch, data).then(() => {
      history.push("/");
    });
  };

  const confirmPassword = (passwordConfirmation: string): true | string => {
    return (
      passwordConfirmation === watch("password") || "Password does not match."
    );
  };

  return (
    <>
      <h2>Register Page</h2>

      <form onSubmit={handleSubmit(handleRegisterFormSubmit)}>
        <div className="formElement">
          <label htmlFor="registerName">
            Name <br />
            <input
              type="type"
              name="name"
              id="registerName"
              ref={register({ required: "Please enter your name" })}
            />
            <br />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <ValidationErrorMessage message={message} />
              )}
            />
          </label>
        </div>

        <div className="formElement">
          <label htmlFor="registerEmail">
            Email <br />
            <input
              type="email"
              name="email"
              id="registerEmail"
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
          <label htmlFor="registerPassword">
            Password <br />
            <input
              type="password"
              name="password"
              id="registerPassword"
              ref={register({
                required: "Please enter your password",
                minLength: {
                  value: 5,
                  message: "Password must be atleast 5 characters long.",
                },
                maxLength: {
                  value: 255,
                  message: "Password must be atmax 255 characters long.",
                },
              })}
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

        <div className="formElement">
          <label htmlFor="registerPasswordConfirmation">
            Confirm Password <br />
            <input
              type="password"
              name="passwordConfirmation"
              id="registerPasswordConfirmation"
              ref={register({
                required: "Please confirm your password",
                validate: (value) => confirmPassword(value),
              })}
            />
            <br />
            <ErrorMessage
              errors={errors}
              name="passwordConfirmation"
              render={({ message }) => (
                <ValidationErrorMessage message={message} />
              )}
            />
          </label>
        </div>

        <input type="submit" value="Register" />
      </form>
    </>
  );
};

export default Register;
