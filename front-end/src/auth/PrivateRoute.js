import { Navigate, Route, useNavigate } from "react-router-dom";

export const PrivateRoute = (props) => {
  const user = null;
  const navigate = useNavigate();
  if (!user) return navigate("/login");
  return <Navigate to={props.element} />;
};
