import { Navigate } from "react-router-dom";
import withRouter from "../../hoc/withRouter";
import auth from "../../services/authService";

const ProtectedRoute = ({ children, location }) => {
  return auth.getCurrentUser() ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default withRouter(ProtectedRoute);
