import { Outlet } from "react-router-dom"
import Logo from "../components/Logo.jsx";
import SideBar from "../components/SideBar.jsx";
function Layout(){
    return(  
          
        <div className="w-screen min-h-screen text-white bg-gray-900">
            <header className="w-9/12 mx-auto">
                <Logo/>
            </header>
            <div className="w-9/12 mx-auto flex flex-row">
                <nav className="mt-4 w-1/5 flex flex-col gap-2 h-full">
                    <SideBar/>
                </nav>
                <main className="w-4/5 pt-5 pl-6">
                    <Outlet/>
                </main>               
            </div>    
        </div>  
    )
}
export default Layout;