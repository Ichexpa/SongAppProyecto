import "../index.css"
import Login from "./Login.jsx"
import Logo from "./Logo.jsx"
import AlbumLoginPage from "./AlbumLoginPage.jsx"
/* import InformacionCancion from "./InformacionCancion.jsx" */
import { useEffect } from "react"
import useFetch from "../hooks/useFetch.js"
import LoadingSpinner from "./LoadingSpinner.jsx"

function LoginPage(){
    const [{data :dataAlbum, isLoading :loadingAlbum, isError :errorAlbum},fetchAlbum] = useFetch("https://sandbox.academiadevelopers.com/harmonyhub/albums/")
           
    useEffect(()=>{
        fetchAlbum()
    },[])
    
    return(
        <div className="w-screen h-screen p-0 text-zinc-50">
            <div className="grid grid-cols-2 w-full h-full">
                <div className="flex flex-col bg-gradient-to-b from-gray-700 from-30% to-gray-900 to-%70 p-4">
                    <div className="w-2/4">
                        <Logo/>
                    </div>
                    <div className="my-auto">
                        <h1 className="tracking-wider w-1/2 text-slate-300 ml-7 text-3xl font-semibold ">Ingresa para escuchar los siguientes temas gratis</h1>
                        
                        {loadingAlbum &&
                        <div className="mt-16 p-4 w-full flex justify-center">
                            <LoadingSpinner/>
                        </div>
                        }
                        
                        {dataAlbum &&
                        <div className="overflow-hidden mt-10 w-11/12 mx-auto flex flex-row gap-3 items-center">                             
                                {
                                    dataAlbum.results.map((album)=>(
                                        <div key={album.id} className="border rounded-lg">
                                            <AlbumLoginPage infoAlbum = {album}/>
                                        </div>
                                    ))  
                                }
                                {/* <InformacionCancion nombre="Ejemplo 1" lanzamiento="2022" genero="rap" /> */}
                        </div>}
                        {
                         errorAlbum && <div>Hola</div>
                        }                          
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