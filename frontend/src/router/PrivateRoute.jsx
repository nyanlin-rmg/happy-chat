import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore"

const PrivateRoute = () => {
    const {isAuthenticate} = useAuthStore();
    return isAuthenticate ? <Outlet/> : <Navigate to={'/login'}/>
}

export default PrivateRoute;