import { createContext, useReducer } from "react";

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
       isAuthenticated : false 
    })

    const actions = {
        login: (token) => dispatch({ type: ACTION.LOGIN, payload: token }),
        logout: () => dispatch({ type: ACTION.LOGOUT }),
    };

    return (
        <AuthContext.Provider value={{state,actions}}>
            {children}
        </AuthContext.Provider>)
}


export {AuthProvider,AuthContext}