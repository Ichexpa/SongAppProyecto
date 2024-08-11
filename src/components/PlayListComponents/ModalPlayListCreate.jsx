import { useEffect, useRef } from "react";
import { useState } from "react";
import lockIcon from "../../assets/lockIcon.svg"
import unlockICon from "../../assets/unlockIcon.svg"
import useFetch from "../../hooks/useFetch";

const ModalPlayListCreate= ({ isOpen, onClose}) => {
  if (!isOpen) return null;
  const token = localStorage.getItem("authToken")
  const [{data:dataUpdate,isLoading,isError},doUpdatePlayList] = useFetch(
      `${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/playlists/`)
  const [isPublic,setisPublic]  = useState(true)  
  const [showMessageSuccess,setShowMessageSuccess] = useState(false)
  const [showMessageError,setShowMessageError] = useState(false)
  let refInputNombre = useRef()
  let refInputDescripcion = useRef()

  function handleSubmitPlayList(){
    if(refInputNombre.current.value !== ""){
      const bodyData = {
        name : refInputNombre.current.value,
        description : refInputDescripcion.current.value || null,
        public : isPublic
      }
      doUpdatePlayList({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(bodyData)
      })
    }
    else{
      setShowMessageError(true)
      setTimeout(()=>{
        setShowMessageError(false)
      },3500)
    }
  }
  useEffect(()=>{
    if(dataUpdate){
      setShowMessageSuccess(true)
      setTimeout(()=>{
        setShowMessageSuccess(false)
      },4500)
    }    
  },[dataUpdate])
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-cyan-900 rounded-xl shadow-lg p-3 w-2/5">
        <div className="h-full w-full p-4 relative">
            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-3xl tracking-wide">Agrega una nueva PlayList</h1>
                <div className="flex-col w-full">
                  <div className="flex flex-row">
                      <div className="w-3/6">
                          <h2 className="text-slate-400 text-md">Nombre: </h2>
                          <div className="mt-2 overflow-hidden">
                            <input placeholder="PlayList" className="p-2 border-none focus:border-none focus:outline-none rounded-lg none bg-cyan-950"  ref={refInputNombre} type="text" />
                          </div>
                          {showMessageError &&
                          <div className="text-sm text-red-500 mt-2 mb-2">
                            Debes agregarle un nombre a la lista
                          </div>
                          }
                      </div>
                      <div className="w-3/6">
                          <h2 className="text-slate-400 text-md">Privacidad: </h2>
                          <button onClick={()=>setisPublic(!isPublic)} className="mt-2">
                            <img className="w-10 h-10" src={isPublic? unlockICon : lockIcon } alt="privado" />
                          </button>
                      </div>
                  </div>
                  <div className="w-full">
                    <h2 className="text-slate-400 text-md">Descripción: </h2>
                    <div className="mt-2">
                      <textarea  placeholder="Agregue una descripcion" className="w-full p-3 border-none focus:border-none focus:outline-none rounded-lg none bg-cyan-950"  ref={refInputDescripcion} type="text" />
                    </div>
                  </div>  
                </div>
                <button onClick={handleSubmitPlayList}  className="transition ease-in-out delay-250 bg-teal-900 hover:bg-teal-950 font-semibold hover:text-white py-2 px-4 border border-cyan-950 hover:border-transparent rounded">
                        Agregar PlayList
                </button>
                {showMessageSuccess &&
                  <div className="text-sm font-bold mx-auto text-lime-700">
                    PlayList Agregada con exito
                  </div>
                }
            </div>
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
};

export default ModalPlayListCreate;