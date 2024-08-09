import albumMusicIcon from "../../assets/albumMusic.svg"
import LoadingSpinner from "../Utils/LoadingSpinner"
import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
function AlbumResultSearchList({setAlbumSelect,album_name}){
const [{data: dataAlbum , isLoading, isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/albums/?title=${album_name}`)
    useEffect(()=>{
        console.log("Effecto de album ejecutado")
        doFetch()}
        ,[album_name])
    function handleClick(album){
        console.log("Ingreso " , album)
        setAlbumSelect(album)
    }
    return (
        <div className="mt-2">
            <h1>Resultado de la busqueda {<span className="text-green-600 font-bold">{album_name}</span>  || "..."}</h1>
            <div className="mt-2 relative w-full flex flex-col h-44 overflow-auto rounded-lg">
            {dataAlbum &&
                dataAlbum.results.map((album)=>{
                return(    
                <div key={album.id} onClick={() => handleClick({id_album : album.id, name_album : album.title })}  className="cursor-pointer p-2 rounded-lg h-10 flex flex-row bg-gray-900 hover:bg-gray-700 items-center justify-between">
                    <div className="w-8 h-8 rounded-lg">
                        <img src={album.cover ?? albumMusicIcon} alt={album.title} />
                    </div>
                    <div className="text-slate-200 text-md">
                        {album.title}
                    </div>
                </div> )     
                })
            
            }
            {isLoading && <LoadingSpinner/>}
            </div>
        </div>
    )
}
export default AlbumResultSearchList