import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { login } = useSelector((store) => store.product);
  return login.role === "admin" ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoute;
