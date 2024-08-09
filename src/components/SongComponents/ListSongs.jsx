import useFetch from "../../hooks/useFetch.js"
import SongItem from "./SongItem.jsx"
import LoadingSpinner from "../Utils/LoadingSpinner.jsx"
import { useEffect } from "react"
import Paginador from "../Utils/Paginador.jsx"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useAuth } from "../../contexts/AuthContext.jsx"
function ListSongs({idAlbum=""}){
    const API_URL_BASE = import.meta.env.VITE_API_URL_SANDBOX
    const {token,id_user} = useAuth("state")
    console.log(token , id_user)
    let urlFetch=`${API_URL_BASE}/harmonyhub/songs/`
    const  [{data : songData,isLoading,isError},doFetch] = useFetch()      
    const [searchParams] = useSearchParams()
    const paginaParam = searchParams.get("page")
    const [pageNumber,setPageNumber] = useState(paginaParam ?? 1)
    const navigator = useNavigate()
    const pageNumberValueHandler = (valor)=>{
        setPageNumber(valor)
    }
    if(idAlbum){
        urlFetch = `${API_URL_BASE}/albums/${idAlbum}/songs/`
    } 

    useEffect(()=>{     
        navigator(`?page=${pageNumber}`)
        urlFetch += `?page=${pageNumber}`
        doFetch({},urlFetch);
        
    },[idAlbum,pageNumber])
    
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
                                    duracion={song.duration}
                                    song_id = {song.id} />
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
            {songData &&
            <div className="mt-2">
                <Paginador paginaHandler={pageNumberValueHandler} isNext= {songData.next ? true : false} defaultValue = {paginaParam} />
            </div>
            }
        </div> 
    )
}
export default ListSongs