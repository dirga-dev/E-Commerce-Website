import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteLogin = () => {
  const { login } = useSelector((store) => store.product);
  return JSON.parse(!localStorage.getItem("login")) || login === null ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRouteLogin;
