import { useState,useRef,useEffect } from "react";
import ModalConfirmDelete from "../Utils/ModalConfirmDelete";
import iconOptions from  "../../assets/optionsIcon.svg"
import ModalEditPlayList from "./ModalEditPlayList";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { data } from "autoprefixer";
function DropDownPlayList({id_playList,refreshMainComponent}){
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigator = useNavigate();
    const token = localStorage.getItem("authToken")
    const idUser = localStorage.getItem("id_user")
    const [{data:dataDelete,isLoading: isLoadingDelete, isError:isErrorDelete},doFetchDeletePlayList] = useFetch()
    const [openDeletePlayList, setOpenDeletePlayList] = useState(false)
    const [openUpdatePlayList, setOpenUpdatePlayList] = useState(false)
    const [deleteSucces,setDeleteSucces] = useState(false)
    const [confirmDelete,setConfirmDelete] = useState(false)
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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

    useEffect(()=>{
        if(confirmDelete){
            fetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/playlists/${id_playList}/`,{
                        method : "DELETE",
                        headers : {
                            Authorization : `Token ${token}`
                        }
                        })
                        .then((response) => {
                            if (response.status === 204) {                     
                                setDeleteSucces(true)                                
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
    
    if(deleteSucces){
        navigator(-1)
    }

    return (
        <div ref={dropdownRef} className="relative inline-block text-left">
        <button onClick={toggleDropdown}>
            <img className="w-8 h-8" src={iconOptions} alt="Mas opciones" />
        </button>
        {isOpen && (
            <div className="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-slate-900 ring-1 ring-black ring-opacity-5  z-50">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <a onClick={()=>setOpenUpdatePlayList(true)}  href="#" className="block px-4 py-2 text-sm text-gray-50 hover:bg-slate-700" role="menuitem">
                Editar
                </a>
                <a onClick={()=>setOpenDeletePlayList(true)}  href="#" className="block px-4 py-2 text-sm text-gray-50 hover:bg-red-400" role="menuitem">
                Borrar
                </a>
            </div>
            </div>
        )}
        <ModalConfirmDelete actionSelected={setConfirmDelete} isOpen={openDeletePlayList} onClose={setOpenDeletePlayList}
        tituloEliminacion={"Estas seguro que deseas eliminar esta PlayList?"}/>
        <ModalEditPlayList updateSucces={refreshMainComponent} isOpen={openUpdatePlayList} onClose={setOpenUpdatePlayList} id_playList={id_playList}/>
        </div>
    );
}
export default DropDownPlayList