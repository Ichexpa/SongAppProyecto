import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ListSongs from "../SongComponents/ListSongs";
import LoadingSpinner from "../Utils/LoadingSpinner";
import { useEffect } from "react";
import EtiquetaComponent from "../Utils/EtiquetaComponent";
import albumMusicIcon from "../../assets/albumMusic.svg"
import ListSongArtist from "../SongComponents/ListSongsArtist";
export default function AlbumDetails(){
    const params = useParams()
    const idAlbum = params.idAlbum
    const [{data: dataCanciones,isLoading,isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/albums/${idAlbum}/`)

    useEffect(()=>doFetch(),[])

    return(
        <div>
            {dataCanciones &&
            <>
                <div className="bg-gradient-to-r from-slate-600 to-slate-950 w-full p-3 rounded-t-lg">
                    <div className="relative p-1">
                        <div className="h-52 w-52">
                            <img className="w-full h-full" src={dataCanciones.cover?? albumMusicIcon} alt={dataCanciones.title} />
                        </div>
                        <div>
                            <div className="w-16 mt-2">
                               <EtiquetaComponent contenido={dataCanciones.year} />
                            </div>
                        </div>
                        <div className="text-2xl tracking-wider text-slate-300 p-3 absolute top-0 right-0">
                            {dataCanciones.title}
                        </div>
                        <div className="absolute bottom-0 right-0">
                            <div className="p-3 text-md font-semibold rounded-full h-20 w-20 bg-slate-600 text-center">
                                3 Pistas                            
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-100 h-full overflow-auto">
                    <ListSongArtist idAlbum={idAlbum}/>
                </div>
            </>}
            {isLoading && <LoadingSpinner/>}
        </div>
    )
}
