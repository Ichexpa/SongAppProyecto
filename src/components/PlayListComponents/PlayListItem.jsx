import playListIconPage from "../../assets/playListIconPage.svg"
import EtiquetaComponent from "../Utils/EtiquetaComponent"
import playIcon from "../../assets/playIcon.svg"
import privateIcon from "../../assets/privateIcon.svg"
import { Link } from "react-router-dom"
export default function PlayListItem({id_playlist,isPublic,nombre,descripcion,listaDeCanciones}){

    return(
        <div className="flex-col ml-4 w-full">
            <div className="relative p-2 w-full h-48">
                <img className="w-full h-full" src={playListIconPage} alt={nombre} />
                <Link to={`${id_playlist}`}>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 hover:cursor-pointer transition-opacity duration-300">
                        <div className="flex flex-col items-center justify-center">
                            <div className="w-12 h-12 flex items-center justify-center">
                                <img className="w-full h-full" src={isPublic ? playIcon : privateIcon} alt="Reproducir" />
                            </div>
                            <div className="text">{isPublic ? "Reproducir" : "Privada" }</div>
                        </div>                        
                </div>
                </Link>
                <div className="p-1 absolute bottom-2 right-2">
                    <EtiquetaComponent contenido={listaDeCanciones.length + " Pistas"} color="bg-black"></EtiquetaComponent>
                </div>
            </div>
            <div className="mt-2">
                <h1>{nombre}</h1>
                <p className="text-sm text-slate-400">{descripcion}</p>
            </div>
        </div>

    )
}