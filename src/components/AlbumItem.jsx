import ArtistaItem from "./ArtistaItem"
import albumMusicIcon from "../assets/albumMusic.svg"
import mostrarMasIcon from "../assets/mostrarMasIcon.svg"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Outlet } from "react-router-dom"
function AlbumItem({idAlbum="",title,year,portadaImg,artista_id}){ 
    const navigate = useNavigate()
    function albumOpenHandler(){
        navigate(`${idAlbum}`)
    }
    return(
        <div className="relative w-100 flex flex-row p-3">
            <div className="w-28 h-28 p-1">
                <img className="w-full h-full" src={portadaImg ?? albumMusicIcon} alt={title} />
            </div>
            <div className="w-full">
                <div className="flex flex-row gap-1 p-2">
                    <div className="w-2/5 flex flex-col gap-2">
                        <h6 className="text-l text-slate-400">Informacion del Album</h6>
                        <h1 className="text-md font-semibold">Titulo: {title}</h1>
                        <p className="mt-2 text-sm text-gray-400">Año: {year}</p>
                    </div>
                    <div className="w-3/5">
                        <h6 className="text-l text-slate-400 mb-2">Informacion del Artista</h6>
                        <ArtistaItem idArtista={artista_id}/>
                    </div>
                </div>
            </div>
            <div onClick={albumOpenHandler} className="cursor-pointer">
                <img className="cursor-pointer absoulte left-0 top-0 w-10 h-10" src={mostrarMasIcon} />
            </div>
        </div>
        
    )
};
export default AlbumItem