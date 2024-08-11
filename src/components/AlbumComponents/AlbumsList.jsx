import { useEffect,useState,useRef } from "react"
import useFetch from "../../hooks/useFetch"
import AlbumItem from "./AlbumItem"
import LoadingSpinner from "../Utils/LoadingSpinner"
import Paginador from "../Utils/Paginador"
import { useSearchParams,useNavigate } from "react-router-dom"
import searchIcon from "../../assets/search.svg"
import closeSearch from "../../assets/closeSearchIcon.svg"
function AlbumList({idAlbum=""}){
    let urlFetch=`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/albums/`
    const [searchParams] = useSearchParams()
    const navigator = useNavigate()
    const paginaParam = searchParams.get("page")
    const [{data:dataAlbums, isLoading, isError},doFetch] = useFetch()
    const [pageNumber,setPageNumber]  = useState(paginaParam ?? 1)
    const [albumValueSearch,setAlbumValueSearch] = useState("")
    let refInputBusqueda = useRef()
    function hadleKeyPress(e){
        if(e.key == "Enter" && refInputBusqueda.current.value != ""){
            setAlbumValueSearch(refInputBusqueda.current.value)
            setPageNumber(1)
        }
    }
    function handleCancelSearch(){
        setAlbumValueSearch("")
        setPageNumber(1)
    }
    useEffect(()=>{
         if(albumValueSearch==""){
           urlFetch += `?page=${pageNumber}`
        }
        else{
           urlFetch += `?page=${pageNumber}&title=${albumValueSearch}`
        }
        navigator(`?page=${pageNumber}`)
        doFetch({},urlFetch)
    },[pageNumber,albumValueSearch])

    if(isLoading){
        return <LoadingSpinner/>        
    }
    return(
        <div className="w-100 flex flex-col gap-3">
            <div className="flex flex-row items-center">       
                <div className="bg-gray-700 p-2 w-1/4 flex flex-row rounded-lg items-center">
                    <img src={searchIcon} alt="buscar" className="w-6 h-6"/>
                    <input ref={refInputBusqueda} onKeyDown={hadleKeyPress} placeholder="Busca tu album favorito.." className="text-slate-300 ml-2 w-full bg-inherit focus:outline-none ml-1 text-sm" type="text" name="" id="" />
                </div>
                {albumValueSearch && 
                <div className="ml-4">                    
                    <div className="text-sm flex flex-row items-center bg-slate-950 p-2 rounded-lg hover:bg-slate-800">
                        <p className="text-slate-400">{albumValueSearch}</p>
                        <button className="ml-2 h-6 w-6 hover:bg-red-300 hover:rounded-lg" onClick={handleCancelSearch}>
                            <img className="w-full h-full" src={closeSearch} alt="" />
                        </button>
                    </div>
                </div>
                }
            </div> 
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