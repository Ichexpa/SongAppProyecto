import { AuthProvider } from "../contexts/AuthContext";
import MainPage from "../components/MainPage";
import LoginPage from "../components/Login";

function Layout(){
    return(
        <AuthProvider>
            <LoginPage/>
            <MainPage/>
        </AuthProvider>
    )
}
export default Layout;