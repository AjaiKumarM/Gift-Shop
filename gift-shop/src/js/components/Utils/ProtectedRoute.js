import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../layouts/Loader";

export default function ProtectedRoute({ children,admin}) {
  const { isLoading = true, isAuthentication = false ,userdata} = useSelector(
    (state) => state.AuthState
  );

  if (isLoading) {
    return <Loader />;
  }
  if (!isAuthentication && !isLoading) {
    return <Navigate to={"/"} />;
  }

  if (isAuthentication) {
    if(admin === true && userdata.role !== 'admin'){
      return <Navigate to={'/'} />
    }
    return children;
  }
}
