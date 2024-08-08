import PlayListItem from "./PlayListItem.jsx"
import useFetch from "../../hooks/useFetch.js"
import LoadingSpinner from "../Utils/LoadingSpinner.jsx"
import { useEffect } from "react"
export default function PlayList(){
    //Despues verificar playlist privadas y publicas
    const [{data: dataPlayList , isLoading , isError},doFetch] = useFetch("http://sandbox.academiadevelopers.com/harmonyhub/playlists/")
    
    useEffect(()=>{
        doFetch()
    },[])
    return(
        <div className="flex flex-row flex-nowrap w-full">
            {dataPlayList &&
                dataPlayList.results.filter((playList)=>playList.entries.length > 0).
                map((playList)=>{
                    return(                            
                        <PlayListItem key={playList.id}
                                      nombre={playList.name}
                                      descripcion={playList.description}
                                      listaDeCanciones={playList.entries} />
                    )
                })
            }
            {isLoading && <LoadingSpinner/>}
            {isError && <h1>Ocurrio un error</h1> }
        </div>
    )
}   