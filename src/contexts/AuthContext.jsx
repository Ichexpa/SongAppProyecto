import { createContext, useReducer } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
const AuthContext = createContext({
                                    state: {},
                                    actions : {}
                                    })

const ACTION = {
    LOGIN : "LOGIN",
    LOGOUT : "LOGOUT"
}                    

function reducer(state,action){
    switch(action.type){
        case ACTION.LOGIN:
            return (
                {
                    ...state,
                    id_user : action.payload.id_user,
                    token: action.payload,
                    isAuthenticated : true
                }
            )
        case ACTION.LOGOUT:
            return({
                isAuthenticated : false
            })
        default:
            return state
    }
}

function AuthProvider({children}){
    const [state,dispatch] =  useReducer(reducer,{
       token : localStorage.getItem("authToken"), 
       isAuthenticated : localStorage.getItem("authToken") ? true : false,
       id_user : localStorage.getItem("id_user") 
    })
    
   /*  const navigate = useNavigate();
    const location = useLocation(); */

    const actions = {
        login: (token,id_user) =>{
            dispatch({ type: ACTION.LOGIN, payload:{token, id_user} })
            localStorage.setItem("authToken",token)
            localStorage.setItem("id_user",id_user)
            /* const origin = location.state?.from?.pathname || "/";
            console.log(origin)
            navigate(origin); */
        } ,
        logout: () =>{
            dispatch({ type: ACTION.LOGOUT })
            localStorage.removeItem("authToken")
            localStorage.removeItem("idUser")
        }
    };

    return (
        <AuthContext.Provider value={{state,actions}}>
            {children}
        </AuthContext.Provider>)
}
function useAuth(type) {
    const context = useContext(AuthContext);
    console.log(context);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context[type];
}


export {AuthProvider,AuthContext,useAuth}