import { Navigate, Outlet } from "react-router-dom";
import { useToken } from "../../hooks/useToken";

const PrivateRoute = () => {
  const { locValue } = useToken();
  return (
    <>
      {locValue.accessToken ? (
        <>
          <Outlet />
        </>
      ) : (
        <Navigate to="login" />
      )}
    </>
  );
};

export default PrivateRoute;
