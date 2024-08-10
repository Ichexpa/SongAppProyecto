import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"
import SongItem from "./SongItem"
import LoadingSpinner from "../Utils/LoadingSpinner"
function ListSongArtist({idAlbum}){
    const API_URL_BASE = import.meta.env.VITE_API_URL_SANDBOX
    let urlFetch=`${API_URL_BASE}/harmonyhub/albums/${idAlbum}/songs/`
    const  [{data : songData,isLoading,isError},doFetch] = useFetch(urlFetch)
    useEffect(()=>{     
        doFetch();        
    },[])
    return(
       <div>
            <div className="flex flex-col h-96 overflow-auto gap-1">
                {songData &&
                    songData.results.filter(song=> song.song_file!=null).map((song)=>{
                        return (
                            <SongItem key={song.id} 
                                    nombre = {song.title}
                                    file_song = {song.song_file}
                                    album = {song.album}
                                    song_id = {song.id}
                                    isMainPage = {false} />
                        )
                    }
                    )
                }
                {isLoading &&
                    <div className="w-full h-full">
                        <LoadingSpinner/>
                    </div>
                }
                {isError &&
                    <h1>Ocurrio un error</h1>
                }                
            </div>
        </div> 
    )
}
export default ListSongArtist