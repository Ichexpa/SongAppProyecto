import { useState,useEffect,useRef } from "react";
import iconOptions from "../../assets/optionsIcon.svg"
import ModalPlayListAvailable from "../PlayListComponents/ModalPlayListAvailable.jsx";
function DropdownSong({song_id}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [openPlayListAvailables, setOpenPlayListAvailables] = useState(false)
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

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <button onClick={toggleDropdown}>
                    <img className="w-8 h-8" src={iconOptions} alt="Mas opciones" />
      </button>
      {isOpen && (
        <div className="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-slate-900 ring-1 ring-black ring-opacity-5  z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a onClick={()=>setOpenPlayListAvailables(true)}  href="#" className="block px-4 py-2 text-sm text-gray-50 hover:bg-slate-700" role="menuitem">
              Editar
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-50 hover:bg-slate-700" role="menuitem">
              Borrar
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-50 hover:bg-slate-700" role="menuitem">
              Agregar a la lista de reproducción
            </a>
          </div>
        </div>
      )}
      {openPlayListAvailables &&
        <ModalPlayListAvailable isOpen={openPlayListAvailables} onClose={setOpenPlayListAvailables}/>
      } 
    </div>
  );
}

export default DropdownSong;