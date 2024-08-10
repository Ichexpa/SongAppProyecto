import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"
import musicIcon from "../../assets/musicIcon.svg"

function SongPlayListItem({id_song,id_playListItem,selectSong}){
    const API_URL_BASE = import.meta.env.VITE_API_URL_SANDBOX
    let albumAsignado;
    const [{data:dataSong , isLoading : isLoadingSong, isError: isErrorSong},doFetchSong] = useFetch(`${API_URL_BASE}/harmonyhub/songs/${id_song}/`)
    const [{data:dataAlbum , isLoading : isLoadingAlbum, isError: isErrorAlbum},doFetchAlbum] = useFetch()
    useEffect(()=>{
        doFetchSong()
    },[])
    useEffect(()=>{
        if(dataSong){
            if(dataSong.album){                
                doFetchAlbum({},`${API_URL_BASE}/harmonyhub/albums/${dataSong.album}/`)
                
            }
            else{
                albumAsignado = false 
            }          
        }
    },[dataSong])
    function formatSecondsToMinutes(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
        return `${minutes}:${paddedSeconds}`;
    }
    function dataItemPlaylist(dataSong){
        selectSong(dataSong)
    }
    function removeSongPlayList(id_playListItem){
        console.log("ID DE LA PLAYLIST ", id_playListItem)
    }
    return(
        <div>
            {(dataSong || dataAlbum) &&
            <div onClick={()=>dataItemPlaylist([dataSong,dataAlbum])} className="cursor-pointer relative hover:bg-gray-800 flex h-16 flex-row p-1 items-center">
                <img className="h-full" src={dataAlbum ? (dataAlbum.cover?? musicIcon) : musicIcon} alt="" />
                <div className="ml-2">
                    <p className="text-slate-200 font-bold">{dataSong.title}</p>
                    <p className="text-slate-500">{dataAlbum ? dataAlbum.title : "Desconocido"}</p>
                </div>
                <div className="absolute top-0 right-0 text-sm text-slate-300 p-3    ">
                    Duracion : {formatSecondsToMinutes(dataSong.duration)}
                </div>
                {/* Estilizar DPS */}
                <div onClick={()=>removeSongPlayList(id_playListItem)} className="absolute bottom-0 right-0 text-sm text-slate-300 p-3    ">
                    X
                </div>
            </div>
            }
            {(isLoadingSong && isLoadingAlbum) && <h1>Cargando...</h1> }
        </div>
    )
}
export default SongPlayListItem