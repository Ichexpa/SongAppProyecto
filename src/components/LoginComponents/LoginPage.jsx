import Login from "./Login.jsx"
import Logo from "../Utils/Logo.jsx"
import AlbumLoginPage from "../AlbumComponents/AlbumLoginPage.jsx"
import { useEffect } from "react"
import useFetch from "../../hooks/useFetch.js"
import LoadingSpinner from "../Utils/LoadingSpinner.jsx"

function LoginPage(){
    const [{data :dataAlbum, isLoading :loadingAlbum, isError :errorAlbum},fetchAlbum] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/albums/`)
           
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
                        <h1 className="tracking-wider w-1/2 text-slate-300 ml-7 text-3xl font-semibold ">Ingresa para escuchar las siguientes álbumes gratis</h1>
                        
                        {loadingAlbum &&
                        <div className="relative mt-16 p-4 w-full flex justify-center">
                            <LoadingSpinner/>
                        </div>
                        }
                        
                        {dataAlbum &&
                        <div className="overflow-auto mt-10 w-11/12 mx-auto flex flex-row gap-3 items-center">                             
                                {
                                    dataAlbum.results.map((album)=>(
                                        <div key={album.id} className="border rounded-lg">
                                            <AlbumLoginPage infoAlbum = {album}/>
                                        </div>
                                    ))  
                                }
                        </div>}
                         
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