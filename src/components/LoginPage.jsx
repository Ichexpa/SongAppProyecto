import "../index.css"
import Login from "./Login.jsx"
import Logo from "./Logo.jsx"
import Album from "./Album.jsx"
function LoginPage(){
    return(
        <div className="w-screen h-screen p-0 text-zinc-50">
            <div className="grid grid-cols-2 w-full h-full">
                <div className="bg-gradient-to-b from-gray-700 from-30% to-gray-900 to-%70">
                    <div className="w-2/4">
                        <Logo/>
                    </div>
                    <div className="w-11/12 mx-auto h-1/3">
                        <Album nombre="Hola" />
                    </div>   
                </div>
                <div className="bg-gray-900">
                    <div className="flex items-center h-full w-full">
                        <Login/>
                    </div>                     
                </div>
            </div>
          
        </div>
    )
}
export default LoginPage;