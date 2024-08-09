import playButton from "../../assets/playBoton.svg"
import pauseButton from "../../assets/pausaBoton.svg"
import { useState } from "react"
import ReactPlayer from "react-player"
import DropdownSong from "./DropDownSong"
function SongItem({song_id,nombre,album,duracion,file_song}){
    const [playingButton,setPlayingButton] = useState(false)
    return(
        <div className="bg-gray-800 flex flex-col rounded-lg">
            <div className="w-full h-14 flex flex-row relative">
                <div onClick={()=>setPlayingButton(!playingButton)} className="p-2 cursor-pointer">
                    <img className="h-full h-full" src={playingButton? pauseButton  : playButton} alt="" />
                </div>
                <div className="p-2">
                    <p className="text-sm text-slate-500">{album ?? "Desconocido"}</p>
                    <p className="text-lg text-slate-300">{nombre}</p>
                </div>
                <div className="absolute top-0 right-0 p-2">
                    <DropdownSong song_id={song_id} />
                </div>
                {/* <div className="p-2 text-sm text-slate-300 ml-auto"> 
                    Duracion: {duracion ?? "Desconocida"}
                </div>  */}
                           
            </div>
            <div className="w-full bg-gray-700 p-2" >                
                <ReactPlayer url={file_song} style={{backgroundColor: "black", color: "blue"}} playing={playingButton} controls={true} width='100%' height="20px" />
            </div>
        </div>
    )
}
export default SongItem