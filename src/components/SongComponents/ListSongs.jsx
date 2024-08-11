import useFetch from "../../hooks/useFetch.js"
import SongItem from "./SongItem.jsx"
import LoadingSpinner from "../Utils/LoadingSpinner.jsx"
import { useEffect } from "react"
import Paginador from "../Utils/Paginador.jsx"
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { useState,useRef } from "react"
import searchIcon from "../../assets/search.svg"
import closeSearch from "../../assets/closeSearchIcon.svg"
import toggleOn from "../../assets/toggleOnIcon.svg"
import toggleOff from "../../assets/toggleOffIcon.svg"
function ListSongs(){
    const API_URL_BASE = import.meta.env.VITE_API_URL_SANDBOX
    let urlFetch=`${API_URL_BASE}/harmonyhub/songs/`
    const idUser = localStorage.getItem("id_user")
    const  [{data : songData,isLoading,isError},doFetch] = useFetch()      
    const [searchParams] = useSearchParams()
    const paginaParam = searchParams.get("page")
    const [pageNumber,setPageNumber] = useState(paginaParam ?? 1)
    const navigator = useNavigate()
    let refInputBusqueda = useRef()
    const [songValueSearch,setSongValueSearch] = useState("")
    const [toggleStatus,setToggleStatus] = useState(false)
    function toggleHandler(){
        setToggleStatus(!toggleStatus)
    }
    function hadleKeyPress(e){
        if(e.key == "Enter" && refInputBusqueda.current.value != ""){
            setSongValueSearch(refInputBusqueda.current.value)
            setPageNumber(1)
            setToggleStatus(false)
        }
    }
    function pageNumberValueHandler(valor){
        setPageNumber(valor)
    }
    function handleCancelSearch(){
        setSongValueSearch("")
        setPageNumber(1)
    }
    useEffect(()=>{
        if(!toggleStatus){     
            if(songValueSearch==""){
            urlFetch += `?page=${pageNumber}`
            }
            else{
            urlFetch += `?page=${pageNumber}&title=${songValueSearch}`
            }   
            navigator(`?page=${pageNumber}`)
            doFetch({},urlFetch);
        }
    },[pageNumber,songValueSearch,toggleStatus])
    useEffect(()=>{
        if(toggleStatus){               
            doFetch({},`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/songs/?owner=${idUser}`)
            setPageNumber(1)
        }
    },[toggleStatus])

    return(
       <div> 
            <div className="flex flex-row items-center">       
                <div className="bg-gray-700 p-2 w-1/4 flex flex-row rounded-lg items-center">
                    <img src={searchIcon} alt="buscar" className="w-6 h-6"/>
                    <input ref={refInputBusqueda} onKeyDown={hadleKeyPress} placeholder="Explora tu música favorita.." className="text-slate-300 ml-2 w-full bg-inherit focus:outline-none ml-1 text-sm" type="text" name="" id="" />
                </div>
                {songValueSearch && 
                <div className="ml-4">                    
                    <div className="text-sm flex flex-row items-center bg-slate-950 p-2 rounded-lg hover:bg-slate-800">
                        <p className="text-slate-400">{songValueSearch}</p>
                        <button className="ml-2 h-6 w-6 hover:bg-red-300 hover:rounded-lg" onClick={handleCancelSearch}>
                            <img className="w-full h-full" src={closeSearch} alt="" />
                        </button>
                    </div>
                </div>
                }
                <div className="flex flex-row h-10 ml-auto items-center mb-4">
                    <div className="text-slate-400 text-md mr-4">
                        Mi música: 
                    </div>
                    <button onClick={toggleHandler}>
                    <img className="h-10 w-10" src={toggleStatus? toggleOn : toggleOff} alt="" />
                    </button>
                </div>
            </div>            
            <div className="mt-5 w-full flex flex-col gap-1">
                {songData &&
                    songData.results.filter(song=> song.song_file!=null).map((song)=>{
                        return (
                            <SongItem key={song.id} 
                                    nombre = {song.title}
                                    file_song = {song.song_file}
                                    album = {song.album}
                                    song_id = {song.id} 
                                    id_owner = {song.owner}/>
                        )
                    }
                    )
                }
                {isLoading &&
                    <div className="w-full h-full my-auto mx-auto">
                        <LoadingSpinner/>
                    </div>
                }
                {isError &&
                    <h1>Ocurrio un error</h1>
                }
                
            </div>
            {songData &&
            <div className="mt-2">
                <Paginador paginaHandler={pageNumberValueHandler} isNext= {songData.next ? true : false} defaultValue = {paginaParam} />
            </div>
            }
        </div>
     
    )
}
export default ListSongs