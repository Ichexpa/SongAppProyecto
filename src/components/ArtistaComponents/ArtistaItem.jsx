import { Link } from "react-router-dom"
import useSpeakIcon from "../../assets/userSpeakIcon.svg"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"

export default function ArtistaItem({idArtista=""}){
    const [{data: dataArtist , isLoading, isError},doFetch] = useFetch("https://sandbox.academiadevelopers.com/harmonyhub/artists/"+idArtista)
    useEffect(()=>doFetch(),[])
    if(isLoading){
        return <div>Cargando..</div>
    }
    return(  
        <>
         {dataArtist &&              
            <div className="w-full flex flex-row gap-2">       
            <div className="w-16 h-16 ml-2">
                <img className="w-full h-full" src={dataArtist.image?? useSpeakIcon} alt={dataArtist.name} />
            </div>
            <div className="text-sm flex flex-col gap-2">
                <h1 className="text-md font-semibold">{dataArtist.name}</h1>
                <p className="text-sm">{dataArtist.bio}</p>
                <Link to={dataArtist.website ?? "#"} >
                    {dataArtist.website? 
                        <span className="text-cyan-400">{dataArtist.website}</span> 
                        : <span className="text-zinc-400">No posee web</span>}
                </Link>
            </div>
          </div>  
         }
        </>
         
    )
}