import { Navigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const isTokenExpired = (token) => {
  if (!token) return true;
  const decoded = JSON.parse(atob(token.split(".")[1]));
  return decoded.exp * 1000 < Date.now();
};

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) =>
    state.auth.token ? state.auth.token : localStorage.getItem("token")
  );

  console.log(">>", token);

  const dispatch = useDispatch();
  if (isTokenExpired(token)) {
    dispatch(logout());
  }
  return token ? children : <Navigate to="/customer/account/login" replace />;
};

export default ProtectedRoute;
