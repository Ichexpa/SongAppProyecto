import playButton from "../assets/playBoton.svg"
import pauseButton from "../assets/pausaBoton.svg"
import { useState } from "react"
function SongItem({nombre,album,duracion}){
    const [playPauseButton,setPlayPauseButton] = useState(true)
    
    return(
        <div className="w-full h-14 bg-gray-700 flex flex-row">
            <div onClick={()=>setPlayPauseButton(!playPauseButton)} className="p-2 cursor-pointer">
                <img className="h-full h-full" src={playPauseButton? playButton : pauseButton} alt="" />
            </div>
            <div className="p-2">
                <p className="text-sm text-slate-500">{album}</p>
                <p className="text-lg text-slate-300">{nombre}</p>
            </div>
            <div className="p-2 text-sm text-slate-300 ml-auto"> 
                Duracion: {duracion}
            </div>
        </div>
    )
}
export default SongItem