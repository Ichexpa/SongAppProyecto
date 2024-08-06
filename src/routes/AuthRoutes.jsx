import { useAuth } from "../contexts/AuthContext";
import {Navigate, useLocation} from "react-router-dom";
function ProtectedRoute({children}){
    const { isAuthenticated } = useAuth("state");
    const location  = useLocation()
    if(!isAuthenticated){
       return <Navigate to="/login" state = {{from:location}}/>
    }
    return children
}
export default ProtectedRoute