import { useContext } from "react";
import { authContext } from "../ContextProvider/AuthContextProvider";
import { Navigate, useNavigate } from "react-router-dom";

export default function PrivateRoutes({ children }) {
  const { isAuth } = useContext(authContext);

  if (!isAuth) {
    return <Navigate to={"/signin"} />;
  }

  return <>{children}</>;
}
