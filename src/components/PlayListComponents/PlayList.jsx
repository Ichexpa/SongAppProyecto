import PlayListItem from "./PlayListItem.jsx"
import useFetch from "../../hooks/useFetch.js"
import LoadingSpinner from "../Utils/LoadingSpinner.jsx"
import { useEffect, useState } from "react"
import Paginador from "../Utils/Paginador.jsx"
import { useSearchParams,useNavigate } from "react-router-dom"
import privateIcon from "../../assets/privateIcon.svg"
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
            <div className="text-slate-300 text-xl mr-4">
                Mostrar mis PlayList: 
            </div>
            <button onClick={toggleHandler}>
            <img className="h-14 w-12" src={toggleStatus? toggleOn : toggleOff} alt="" />
            </button>
        </div>
        <div className="flex flex-row flex-nowrap w-full">
            {dataPlayList &&
                dataPlayList.results.filter((playList)=>(playList.entries.length > 0 && (playList.public || playList.owner == idUser))).
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