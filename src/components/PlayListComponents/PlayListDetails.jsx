import SongPlayListItem from "../SongComponents/SongPlayListItem"
import useFetch from "../../hooks/useFetch"
import { useEffect,useState } from "react"
import musicIcon from "../../assets/musicIcon.svg"
import { useParams } from "react-router-dom"
import { useRef } from "react"
function PlayListDetails(){    
    const params = useParams()
    const idPlayList = params.idPlayList
    /* Necesito hacer la peticion en playList entries para podes eliminar la cancion desde esta pantalla a traves de su ID */
    const [{data:dataPlayListEntries , isLoading: isLoadingPlayListEntries, isError: isErrorPlayListEntries},doFetchPlayListEntries] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/playlist-entries/?playlist=${idPlayList}`)
    const [{data:dataPlayList , isLoading: isLoadingPlayList, isError : isErrorPlayList},doFetchPlayList] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/playlists/${idPlayList}`)
    const [selectSong,setSelectSong] = useState()
    const [songURL,setSongURL] = useState()
    const [coverImg,setCoverImg] = useState()
    const audioRef = useRef()
    function setValuesCoverAndSong(data){       
       const song = data[0].song_file
       const coverImg = data[1] ? (data[1].cover?? musicIcon) : musicIcon 
       console.log("Cancion " + song  + "\n Album img " + coverImg)
       setSongURL(song)
       setCoverImg(coverImg)
    }
    useEffect(()=>{
        doFetchPlayListEntries()
        doFetchPlayList()
    },[])
    useEffect(()=>{
        console.log("Desde la principal valores traidos" , selectSong)
        if(selectSong){            
            setValuesCoverAndSong(selectSong)
        }
    },[selectSong])
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load(); // Recargar la fuente de audio
            audioRef.current.play(); // Iniciar la reproducción automáticamente
        }
    }, [songURL]);
    return(
            <div className="flex flex-row w-full rounded-xl">
                <div className="flex flex-col w-3/5">
                    <div className="h-96">
                        <img className = "w-full h-full object-cover " src={coverImg?? musicIcon} alt="" />
                    </div>       
                    {songURL &&
                    <audio ref={audioRef} style={{backgroundColor : "rgb(245, 245, 245)"}} className="w-full " controls preload="auto">
                        <source src={songURL} type="audio/mpeg" />
                    </audio>
                    }
                </div>
                <div className="flex flex-col w-2/5 overflow-auto">
                    <div className="p-3 bg-gray-800 rounded-r-xl">
                        <p className="text-xl font-bold p-1">{dataPlayList ? dataPlayList.name : "Cargando"}</p>
                        <p className="p-1 text-slate-400 text-sm">Nombre Autor</p>
                    </div>
                    <div className="bg-gray-950 flex-1 overflow-auto">
                        <div className="flex flex-col h-80 overflow-auto">
                            {dataPlayListEntries &&
                            dataPlayListEntries.results.map((playListItem)=>{
                                return(
                                    <SongPlayListItem key={playListItem.id}
                                         id_playListItem={playListItem.id}
                                         id_song={playListItem.song}
                                         selectSong = {setSelectSong}
                                          />
                                )
                            })
                            }
                        </div>
                    </div>    
                </div>
           </div>
           )
}
export default PlayListDetails