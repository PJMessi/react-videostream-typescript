import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuthContext } from "../contexts/auth.context";
import MainLayout from "../components/layouts/main.layout";
import useAuthInitialization from "../hooks/authInitialization.hook";

type PrivateRouteProps = { children: JSX.Element } & RouteProps;

const PrivateRoute = ({
  children,
  ...rest
}: PrivateRouteProps): JSX.Element => {
  const { authState } = useAuthContext();

  useAuthInitialization();

  if (authState.token === null) {
    return (
      <>
        <Route
          {...rest}
          render={(routeProps) => {
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { from: routeProps.location },
                }}
              />
            );
          }}
        />
      </>
    );
  }

  return (
    <>
      <Route {...rest}>
        <MainLayout>{children}</MainLayout>
      </Route>
    </>
  );
};

export default PrivateRoute;
