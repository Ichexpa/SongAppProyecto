import playButton from "../../assets/playBoton.svg"
import pauseButton from "../../assets/pausaBoton.svg"
import { useEffect, useState } from "react"
import ReactPlayer from "react-player"
import DropdownSong from "./DropDownSong"
import useFetch from "../../hooks/useFetch"
function SongItem({song_id,nombre,album,file_song,isMainPage=true,id_owner}){
    
    const [isDeleted, setIsDeleted]  = useState(false)
    const [playingButton,setPlayingButton] = useState(false)
    const [{data , isLoading, isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/albums/${album}/`)
    
    if(album){  
        useEffect(()=>{
            doFetch()
        },[])

    }
    return(
        (!isDeleted &&
        <div className="bg-gray-800 flex flex-col rounded-lg">
            <div className="w-full h-14 flex flex-row relative">
                <div onClick={()=>setPlayingButton(!playingButton)} className="p-2 cursor-pointer">
                    <img className="h-full h-full" src={playingButton? pauseButton  : playButton} alt="" />
                </div>
                <div className="p-2">
                    <p className="text-sm text-slate-500">{album ? (data? data.title : "Cargando...") : "Desconocido"}</p>
                    <p className="text-lg text-slate-300">{nombre}</p>
                </div>
                {isMainPage &&
                <div className="absolute top-0 right-0 p-2">
                    <DropdownSong song_id={song_id} id_owner={id_owner} is_deleted = {setIsDeleted}  />
                </div>
                }
                           
            </div>
            <div className="w-full bg-gray-700 p-2" >                
                <ReactPlayer url={file_song} style={{backgroundColor: "black", color: "blue"}} playing={playingButton} controls={true} width='100%' height="20px" />
            </div>
        </div>)
    )
}
export default SongItem