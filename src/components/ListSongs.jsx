import useFetch from "../hooks/useFetch.js"
import SongItem from "./SongItem.jsx"
import LoadingSpinner from "./LoadingSpinner.jsx"
import { useEffect } from "react"
import Paginador from "./Paginador.jsx"
import { useSearchParams } from "react-router-dom";
import { usePaginadorContext } from "../contexts/PaginadorContext.jsx"
import { useNavigate } from "react-router-dom"
function ListSongs({idAlbum=""}){
    let urlFetch="https://sandbox.academiadevelopers.com/harmonyhub/songs/"
    const  [{data : songData,isLoading,isError},doFetch] = useFetch()     
    const {paginaActual,setPaginaActual} = usePaginadorContext()
    const [searchParams] = useSearchParams()
    const paginaParam = searchParams.get("page")
    const navigator = useNavigate()
    /* if(paginaParam){
       setPaginaActual(paginaParam)
    } */
    useEffect(()=>{
        navigator(`?page=${paginaActual}`)
        urlFetch += `?page=${paginaActual}`
        
        console.log(paginaActual)    
    },[paginaActual])
        
    if(idAlbum){
        urlFetch = `https://sandbox.academiadevelopers.com/harmonyhub/albums/${idAlbum}/songs/`
    }
    
    useEffect(()=>{
        console.log(urlFetch)
        doFetch({},urlFetch);
        
    },[idAlbum,paginaActual])
    if(songData){
        console.log(songData)
    }
    return(
       <div>
            <div className="w-full flex flex-col gap-1">
                {songData &&
                    songData.results.filter(song=> song.song_file!=null).map((song)=>{
                        return (
                            <SongItem key={song.id} 
                                    nombre = {song.title}
                                    file_song = {song.song_file}
                                    album = {song.album}
                                    duracion={song.duration} />
                        )
                    }
                    )
                }
                {isLoading &&
                    <div className="w-full h-full my-auto mx-auto">
                        <LoadingSpinner/>
                    </div>
                }
                {isError &&
                    <h1>Ocurrio un error</h1>
                }
                
            </div>
            <div className="mt-2">
                <Paginador/>
            </div>
        </div> 
    )
}
export default ListSongs