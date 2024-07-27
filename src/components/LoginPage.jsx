import "../index.css"
import Login from "./Login.jsx"
import Logo from "./Logo.jsx"
import Album from "./Album.jsx"
import InformacionCancion from "./InformacionCancion.jsx"
function LoginPage(){

    return(
        <div className="w-screen h-screen p-0 text-zinc-50">
            <div className="grid grid-cols-2 w-full h-full">
                <div className="flex flex-col bg-gradient-to-b from-gray-700 from-30% to-gray-900 to-%70 p-4">
                    <div className="w-2/4">
                        <Logo/>
                    </div>
                    <div className="my-auto">
                        <h1 className="tracking-wider w-1/2 text-slate-300 ml-7 text-3xl font-semibold ">Ingresa para escuchar los siguientes temas gratis</h1>
                        <div className="drop-shadow-md mt-10 w-11/12 mx-auto flex flex-row gap-3 items-center">
                            <div className="border rounded-lg">
                                <Album nombre="Hola" />
                                <InformacionCancion nombre="Ejemplo 1" lanzamiento="2022" genero="rap" />
                            </div>
                            <div className="border rounded-lg">
                                <Album nombre="Hola" />
                                <InformacionCancion nombre="Ejemplo 2" lanzamiento="2021" genero="rap" />
                                
                                
                            </div>
                        </div>   
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