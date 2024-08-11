import { useState,useEffect,useRef } from "react";
import iconOptions from "../../assets/optionsIcon.svg"
import ModalPlayListAvailable from "../PlayListComponents/ModalPlayListAvailable.jsx";
import ModalConfirmDelete from "../Utils/ModalConfirmDelete.jsx"
import useFetch from "../../hooks/useFetch.js";
import ModalEditSong from "./ModalEditSong.jsx";
function DropdownSong({song_id,id_owner,is_deleted}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false)
  const [confirmDelete,setConfirmDelete] = useState(false)
  const dropdownRef = useRef(null);
  const id_user = localStorage.getItem("id_user")
  const token = localStorage.getItem("authToken")
  const [openPlayListAvailables, setOpenPlayListAvailables] = useState(false)

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  useEffect(()=>{
    if(confirmDelete){      
      fetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/songs/${song_id}/`,{
            method : "DELETE",
            headers : {
                Authorization : `Token ${token}`
            }
            })
            .then((response) => {
                if (response.status === 204) {                   
                    is_deleted(true)                                
                }
                else{                                
                    throw new Error('Error al eliminar el elemento');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
  },[confirmDelete])

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button onClick={toggleDropdown}>
                    <img className="w-8 h-8" src={iconOptions} alt="Mas opciones" />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-slate-900 ring-1 ring-black ring-opacity-5  z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {id_owner == id_user &&
            <>
              <a onClick={()=>setIsOpenUpdate(true)} href="#" className="block px-4 py-2 text-sm text-gray-50 hover:bg-slate-700" role="menuitem">
                Editar
              </a>
              <a onClick={()=>setIsOpenDelete(true)} href="#" className="block px-4 py-2 text-sm text-gray-50 hover:bg-slate-700" role="menuitem">
                Borrar
              </a>
            </>
            }
            <a onClick={()=>setOpenPlayListAvailables(true)} href="#" className="block px-4 py-2 text-sm text-gray-50 hover:bg-slate-700" role="menuitem">
              Agregar a la lista de reproducción
            </a>
          </div>
        </div>
      )}
      {openPlayListAvailables &&
        <ModalPlayListAvailable song_id={song_id} isOpenModal={openPlayListAvailables} onClose={setOpenPlayListAvailables}/>
      }
      {isOpenDelete &&
        <ModalConfirmDelete isOpen = {isOpenDelete} onClose={setIsOpenDelete} tituloEliminacion = {"Esta seguro que deseas eliminar esta canción"} actionSelected = {setConfirmDelete} />
      } 
      {isOpenUpdate &&
        <ModalEditSong isOpen={isOpenUpdate} onClose={setIsOpenUpdate} id_song={song_id} />
      }
    </div>
  );
}

export default DropdownSong;