import { Outlet } from "react-router-dom"
import Logo from "../components/Utils/Logo.jsx";
import SideBar from "../components/SideBar.jsx";
import ProfileOptions from "../components/ProfileComponents/ProfileOptions.jsx";
import { ProfilePhotoProvider } from "../contexts/ProfilePhotoContext.jsx";
import {ContextClickEditProvider} from "../contexts/StateEditingContext.jsx"
function Layout(){
    return(  
        <ProfilePhotoProvider> 
            <ContextClickEditProvider>
                <div className="w-screen min-h-screen text-white bg-gray-900">
                    <header className="w-9/12 mx-auto">
                        <div className="flex flex-row justify-between items-center w-full">
                            <div className="p-2">
                                <Logo/>
                            </div>
                            <div className="p-2">                        
                                    <ProfileOptions/>
                            </div>
                        </div>
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
            </ContextClickEditProvider>
        </ProfilePhotoProvider>
    )
}
export default Layout;