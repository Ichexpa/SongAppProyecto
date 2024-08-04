import disk from "../assets/disk.png"
import userSpeakIcon from "../assets/userSpeakIcon.svg"
import { useEffect } from "react";
import useFetch from "../hooks/useFetch";
function AlbumLoginPage({infoAlbum}){
    const [{data :dataArtist, isLoading :loadingArtist, isError : errorArtist},fetchArtist] = useFetch(`https://sandbox.academiadevelopers.com/harmonyhub/artists/${infoAlbum.artist}/`);
    useEffect(()=>fetchArtist(),[])    
    return(
        <div className="p-3 w-52 h-52 relative">
            <img className="w-full h-full object-cover rounded-md" src={infoAlbum.cover ?? disk} alt={infoAlbum.title} />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                {loadingArtist &&
                    <div>
                    <p className="text-sm">{infoAlbum.year}</p>
                    <p className="text-ss">Nombre: {infoAlbum.title}</p>
                    </div>
                }
                {dataArtist &&
                    <div className="p-2 flex flex-row w-full">
                        <div className="w-6/12 h-6/12 flex flex-row gap-2">
                            <img className="p-2 W-6/12 H-6/12" src={dataArtist.image?? userSpeakIcon} alt={dataArtist.name} />                        
                        </div>   
                        <div className="w-6/12 gap-y ">
                            <p className="text-sm">{infoAlbum.year}</p>
                            <p className="text-sm">Nombre: {infoAlbum.title}</p>                                    
                            <p className="text-sm">Artista: {dataArtist.name}</p>
                        </div>
                    </div>
                }
                             
            </div>
        </div>
    );    
}
export default AlbumLoginPage;