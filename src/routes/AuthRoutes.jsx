import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import {Navigate, useLocation} from "react-router-dom";
function ProtectedRoute({children}){
    const {state} = useContext(AuthContext)
    console.log("Hola gil",state.token)
    const location  = useLocation()
    if(!state.isAuthenticated){
       console.log("NO esta autenticado")
       return <Navigate to="/login" state = {{from:location}}/>
    }
    return children
}
export default ProtectedRoute