import { createBrowserRouter } from "react-router-dom"
import LoginPage from "../components/LoginPage.jsx"
import NotFound404 from "../components/NotFound404"
import MainPage from "../components/MainPage.jsx"
import ProtectedRoute from "./AuthRoutes.jsx"
import { AuthProvider } from "../contexts/AuthContext.jsx"
import Layout from "./Layout"
const Router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage/>  
    },
    {
        path: "*",
        element: <NotFound404/>
    },
    {
        path: "/",
        element: (            
                <ProtectedRoute>
                    <MainPage/>
                </ProtectedRoute>
            )
    }

    ])
export default Router