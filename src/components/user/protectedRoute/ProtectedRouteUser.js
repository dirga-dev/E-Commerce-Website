import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteUser = () => {
  const { login } = useSelector((store) => store.product);
  return login === null || login.role === "user" || JSON.parse(!localStorage.getItem("login")) || JSON.parse(localStorage.getItem("login")).role === "user" ? <Outlet /> : <Navigate to="/admin" />;
};
export default ProtectedRouteUser;
