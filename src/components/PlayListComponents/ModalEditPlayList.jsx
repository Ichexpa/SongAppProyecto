import { useEffect, useRef } from "react";
import { useState } from "react";
import lockIcon from "../../assets/lockIcon.svg"
import unlockICon from "../../assets/unlockIcon.svg"
import useFetch from "../../hooks/useFetch";
import LoadingSpinner from "../Utils/LoadingSpinner";

function ModalEditPlayList({updateSucces,isOpen, onClose,id_playList}){
    if (!isOpen) return null;
    const URL_BASE = import.meta.env.VITE_API_URL_SANDBOX
    const token = localStorage.getItem("authToken")
    const [{data:dataPlayList,isLoading : isLoadingPlayList,isError: isErrorPlayList},doFetchPlayList] = useFetch(
        `${URL_BASE}/harmonyhub/playlists/${id_playList}/`)
    const [{data:dataPlayListUpdate,isLoading : isLoadingPlayListUpdate,isError: isErrorPlayListUpdate},doFetchPlayListUpdate] = useFetch(
        `${URL_BASE}/harmonyhub/playlists/${id_playList}/`)    
    const [isPublic,setisPublic]  = useState(true)  
    const [showMessageInfo,setShowMessageInfo] = useState({
    nameRequiredMessage : false,
    playListAdded : false, 
    })
    let refInputNombre = useRef()
    let refInputDescripcion = useRef()

    useEffect(()=>{
        doFetchPlayList()
    },[])
    useEffect(()=>{
        if(dataPlayList){        
        setisPublic(dataPlayList.public)
        } 
    },[dataPlayList])
    function handleSubmitPlayList(){
    if(refInputNombre.current.value !== ""){
        const bodyData = {
        name : refInputNombre.current.value,
        description : refInputDescripcion.current.value || null,
        public : isPublic
        }
        doFetchPlayListUpdate({
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(bodyData)
        })
    }
    else{
        setShowMessageInfo({
        playListAdded : !showMessageInfo.playListAdded ?? false,
        nameRequiredMessage: true
        })      
    }
    }
    useEffect(()=>{
    if(dataPlayListUpdate){
        setShowMessageInfo({
        nameRequiredMessage : false,
        playListAdded : true, 
        })
        refInputNombre.current.value = ''
        refInputDescripcion.current.value = ''
        updateSucces((prev)=>prev+1)
    }    
    },[dataPlayListUpdate])

    return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-cyan-900 rounded-xl shadow-lg p-3 w-2/5">
            <div className="h-full w-full p-4 relative">
                {dataPlayList &&
                <div className="flex flex-col gap-4 w-full">
                    <h1 className="text-3xl tracking-wide">Edita tu PlayList</h1>
                    <div className="flex-col w-full">                                           
                        <div className="flex flex-row">
                            <div className="w-3/6">
                                <h2 className="text-slate-400 text-md">Nombre: </h2>
                                <div className="mt-2 overflow-hidden">
                                <input defaultValue={dataPlayList.name} placeholder="PlayList" className="p-2 border-none focus:border-none focus:outline-none rounded-lg none bg-cyan-950"  ref={refInputNombre} type="text" />
                                </div>
                                {showMessageInfo.nameRequiredMessage &&
                                <div className="text-sm text-red-500 mt-2 mb-2">
                                Debes agregarle un nombre a la lista
                                </div>
                                }
                            </div>
                            <div className="w-3/6">
                                <h2 className="text-slate-400 text-md">Privacidad: </h2>
                                <button onClick={()=>setisPublic(!isPublic)} className="mt-2">
                                    <img className="w-10 h-10" src={ isPublic? unlockICon : lockIcon } alt="privado" />
                                </button>
                            </div>
                        </div>                        
                        <div className="w-full">
                            <h2 className="text-slate-400 text-md">Descripción: </h2>
                            <div className="mt-2">
                            <textarea defaultValue={dataPlayList.description}  placeholder="Agregue una descripcion" className="w-full p-3 border-none focus:border-none focus:outline-none rounded-lg none bg-cyan-950"  ref={refInputDescripcion} type="text" />
                            </div>
                        </div>  
                        </div>
                        <button onClick={handleSubmitPlayList}  className="transition ease-in-out delay-250 bg-teal-900 hover:bg-teal-950 font-semibold hover:text-white py-2 px-4 border border-cyan-950 hover:border-transparent rounded">
                                Modificar PlayList
                        </button>
                        {showMessageInfo.playListAdded &&
                        <div className="text-sm font-bold mx-auto text-lime-700">
                            PlayList Modificada con exito
                        </div>
                        }
                </div>
                }
                {isLoadingPlayList && <LoadingSpinner/> }
                <button 
                className="absolute text-3xl top-2 right-2 text-red-500 hover:text-gray-700"
                onClick={()=>onClose(!isOpen)}
                >
                &times;
                </button>
            </div>
        </div>
    </div>
        );
}
export default ModalEditPlayList