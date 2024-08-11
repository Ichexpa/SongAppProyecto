import PlayListItem from "./PlayListItem.jsx"
import useFetch from "../../hooks/useFetch.js"
import LoadingSpinner from "../Utils/LoadingSpinner.jsx"
import { useEffect, useState } from "react"
import Paginador from "../Utils/Paginador.jsx"
import { useSearchParams,useNavigate } from "react-router-dom"
import toggleOn from "../../assets/toggleOnIcon.svg"
import toggleOff from "../../assets/toggleOffIcon.svg"

export default function PlayList(){
    //Despues verificar playlist privadas y publicas
    const idUser = localStorage.getItem("id_user")
    let urlFetch=`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/playlists/`
    const [searchParams] = useSearchParams()
    const navigator = useNavigate()
    const paginaParam = searchParams.get("page")
    const [{data: dataPlayList , isLoading , isError},doFetch] = useFetch()
    const [pageNumber,setPageNumber]  = useState(paginaParam ?? 1)
    const [toggleStatus,setToggleStatus] = useState(false)
    function toggleHandler(){
        setToggleStatus(!toggleStatus)
    }
    useEffect(()=>{
       if(!toggleStatus){
        navigator(`?page=${pageNumber}`)
        urlFetch += `?page=${pageNumber}`
        doFetch({},urlFetch)
       }        
    },[pageNumber,toggleStatus])
    
    useEffect(()=>{
        if(toggleStatus){               
            doFetch({},`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/playlists/?owner=${idUser}`)
            setPageNumber(1)
        }
    },[toggleStatus])
    return(
    <>
        <div className="flex flex-row h-10 justify-end items-center mb-4">
            <div className="text-slate-400 text-md mr-4">
                Mostrar mis PlayList: 
            </div>
            <button onClick={toggleHandler}>
            <img className="h-10 w-10" src={toggleStatus? toggleOn : toggleOff} alt="" />
            </button>
        </div>
        <div className="grid grid-cols-4 gap-4 w-full">
            {dataPlayList &&
                dataPlayList.results.filter((playList)=>(playList.public || playList.owner == idUser)).
                map((playList)=>{
                    return(                            
                        <PlayListItem key={playList.id}
                                      id_playlist={playList.id}
                                      nombre={playList.name}
                                      descripcion={playList.description}
                                      listaDeCanciones={playList.entries}
                                      isPublic={playList.public} />
                    )
                })
            }
            {isLoading && <LoadingSpinner/>}
            {isError && <h1>Ocurrio un error</h1> }
        </div>
        {dataPlayList &&
        <Paginador paginaHandler={setPageNumber} isNext= {dataPlayList.next ? true : false} defaultValue = {pageNumber}  />    
        }    
    </>
    )
}   