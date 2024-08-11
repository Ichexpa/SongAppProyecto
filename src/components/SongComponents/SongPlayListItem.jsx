import useFetch from "../../hooks/useFetch"
import { useEffect, useState } from "react"
import musicIcon from "../../assets/musicIcon.svg"
import trashIcon from "../../assets/trashIcon.svg"
import ModalConfirmDelete from "../Utils/ModalConfirmDelete"

function SongPlayListItem({id_song,id_playListItem,selectSong,isOwner,deletedItemPlayList}){
    const API_URL_BASE = import.meta.env.VITE_API_URL_SANDBOX
    const token = localStorage.getItem("authToken")
    const [{data:dataSong , isLoading : isLoadingSong, isError: isErrorSong},doFetchSong] = useFetch(`${API_URL_BASE}/harmonyhub/songs/${id_song}/`)
    const [{data:dataAlbum , isLoading : isLoadingAlbum, isError: isErrorAlbum},doFetchAlbum] = useFetch()
    const [{data:dataDelete , isLoading : isLoadingDelete, isError: isErrorDelete},doFetchDeleteItem] = useFetch()
    const [confirmDelete,setConfirmDelete] = useState(false)
    const [showModalConfirm,setShowModalConfirm] = useState(false)
    useEffect(()=>{
        doFetchSong()
    },[])
    useEffect(()=>{
        if(dataSong){
            if(dataSong.album){                
                doFetchAlbum({},`${API_URL_BASE}/harmonyhub/albums/${dataSong.album}/`)
                
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
    function removeSongPlayList(e,id_playListItem){
        e.stopPropagation()
        setShowModalConfirm(true)
    }
    useEffect(()=>{
        console.log("Confirm delet valor" + confirmDelete)
        if(confirmDelete){
            doFetchDeleteItem({
            method : "DELETE",
            headers : {
                Authorization : `Token ${token}`
            }
            },`${API_URL_BASE}/harmonyhub/playlist-entries/${id_playListItem}/`)
        }

    },[confirmDelete])
    if(!isLoadingDelete && !isErrorAlbum){
        deletedItemPlayList((prev)=>prev+1)
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
                {/* <div className="absolute top-0 right-0 text-sm text-slate-300 p-3    ">
                    Duracion : {formatSecondsToMinutes(dataSong.duration)}

                </div> */}
                {isOwner &&
                <button onClick={(e)=>removeSongPlayList(e,id_playListItem)} className="absolute top-auto right-0 text-sm text-slate-300 p-3 h-14 w-14">
                     <img src={trashIcon} alt="quitarDePlayList" />                       
                </button>
                }
            </div>
            }
            {(isLoadingSong && isLoadingAlbum) && <h1>Cargando...</h1> }   
            <ModalConfirmDelete isOpen={showModalConfirm} onClose={setShowModalConfirm}
                 tituloEliminacion={"Quitar canción de la PlayList?"} actionSelected={setConfirmDelete}/>         
        </div>
    )
}
export default SongPlayListItem