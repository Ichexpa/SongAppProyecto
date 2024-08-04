import ListSongs from "./ListSongs"
import closeIcon from "../assets/closeIcon.svg"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import {useModalContext} from "../contexts/ModalContext" 
function ModalSongList(/* {isOpen,closeModal,nombreAlbum} */){
    const param = useParams()
    const navigate = useNavigate()
    const {setIsOpen} = useModalContext()
    function closeHandler(){
        setIsOpen(false)
        navigate(-1)
    }
    return(
        <div className="absoulte w-screen h-screen bg-sky-950 opacity-25">
            <div className="relative p-3 w-2/5 h-2/5 my-auto mx-auto rounded-lg bg-indigo-950 flex flex-col">
                <div className="text-2xl">
                    Ejemplo
                </div>
                <div className="w-full h-10/12 overflow-auto">
                    <ListSongs idAlbum={param.idAlbum}/>
                </div>
                <div onClick={closeHandler} className="absolute left-0 top-0 cursor-pointer">
                    <img className="w-10 h-10" src={closeIcon} alt="" />
                </div>
            </div>
            {/* <h1>id nro {param.idAlbum}</h1>
            <button onClick={closeHandler}>volver</button> */}
        </div>
    )
}
export default ModalSongList