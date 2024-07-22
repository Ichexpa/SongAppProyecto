import "../index.css"
import Login from "./Login.jsx"
function LoginPage(){
    return(
        <div className="container w-screen">
            <div className="grid grid-cols-2 border border-sky-500 w-screen h-screen p-2">
                <div className="border border-red-500">
                        <p>Reproductor musicca</p>
                </div>
                <div className="border border-red-500">
                    <div className="flex items-center h-full w-full border border-red-500">
                        <Login/>
                    </div>                        
                </div>
            </div>
          
        </div>
    )
}
export default LoginPage;