import { Route, RouteProps } from "react-router-dom";
import AuthLayout from "../components/layouts/auth.layout";

type PublicRouteProp = { children: JSX.Element } & RouteProps;

const PublicRoute = ({ children, ...rest }: PublicRouteProp): JSX.Element => {
  return (
    <>
      <AuthLayout>
        <Route {...rest}>{children}</Route>
      </AuthLayout>
    </>
  );
};

export default PublicRoute;
