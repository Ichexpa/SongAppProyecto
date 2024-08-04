import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import {Navigate, useLocation} from "react-router-dom";
function ProtectedRoute({children}){
    const {state} = useContext(AuthContext)
    const location  = useLocation()
    if(!state.isAuthenticated){
       return <Navigate to="/login" state = {{from:location}}/>
    }
    return children
}
export default ProtectedRoute