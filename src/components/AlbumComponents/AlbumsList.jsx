import { useEffect,useState } from "react"
import useFetch from "../../hooks/useFetch"
import AlbumItem from "./AlbumItem"
import LoadingSpinner from "../Utils/LoadingSpinner"
import Paginador from "../Utils/Paginador"
import { useSearchParams,useNavigate } from "react-router-dom"
function AlbumList({idAlbum=""}){
    let urlFetch=`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/albums/`
    const [searchParams] = useSearchParams()
    const navigator = useNavigate()
    const paginaParam = searchParams.get("page")
    const [{data:dataAlbums, isLoading, isError},doFetch] = useFetch()
    const [pageNumber,setPageNumber]  = useState(paginaParam ?? 1)
    useEffect(()=>{
        navigator(`?page=${pageNumber}`)
        urlFetch += `?page=${pageNumber}`
        doFetch({},urlFetch)
    },[pageNumber])

    if(isLoading){
        return <LoadingSpinner/>        
    }
    return(
        <div className="w-100 flex flex-col gap-3">
            {dataAlbums &&
                dataAlbums.results.filter((album)=>album.title != null)
                .map((album)=>{
                    return( 
                    <div className="bg-slate-800 rounded-md" key={album.id}>
                        <AlbumItem 
                        idAlbum={album.id}
                        title={album.title}
                        year={album.year}
                        portadaImg={album.cover}
                        artista_id={album.artist}/>
                    </div>)
                })
            }            
            {dataAlbums &&
            <Paginador paginaHandler={setPageNumber} isNext= {dataAlbums.next ? true : false} defaultValue = {paginaParam}  />    
            }  
        </div>
    )
}
export default AlbumList