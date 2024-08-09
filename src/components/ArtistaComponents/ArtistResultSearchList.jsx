import artistIcon from "../../assets/artistIcon.svg"
import LoadingSpinner from "../Utils/LoadingSpinner"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"
function ArtistResultSearchList({artist_name,setSelectArtist}){
    const [{data: dataArtist , isLoading, isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/artists/?name=${artist_name}`)
    useEffect(()=>{
        console.log("Effecto de artista ejecutado")
        doFetch()}
        ,[artist_name])
    function handleClick(artist){
        setSelectArtist(artist)
    }
    return (
        <div className="mt-2">
            <h1>Resultado de la busqueda {<span className="text-green-600 font-bold">{artist_name}</span>  || "..."}</h1>
            <div className="mt-2 relative w-full flex flex-col h-44 overflow-auto rounded-lg">
            {dataArtist &&
                dataArtist.results.map((artist)=>{
                return(    
                <div key={artist.id} onClick={() => handleClick({id_artist : artist.id, name_artist : artist.name })}  className="cursor-pointer p-2 rounded-lg h-10 flex flex-row bg-gray-900 hover:bg-gray-700 items-center justify-between">
                    <div className="w-8 h-8 rounded-lg">
                        <img src={artist.image ?? artistIcon} alt={artist.name} />
                    </div>
                    <div className="text-slate-200 text-md">
                        {artist.name}
                    </div>
                </div> )     
                })
            
            }
            {isLoading && <LoadingSpinner/>}
            </div>
        </div>
    )
}
export default ArtistResultSearchList