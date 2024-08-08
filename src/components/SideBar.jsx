import ItemMenu from "./ItemMenu"
import searchIcon from "../assets/search.svg"
import playListIcon from "../assets/playlist.svg"
import albumIcon from "../assets/album.svg"
import songIcon from "../assets/songIcon.svg"
import artistaIcon from "../assets/artistIcon.svg"
import { Link } from "react-router-dom"
import addIcon from "../assets/addIcon.svg"
import { useState } from "react"
import ModalPlayList from "./ModalPlayList"
export default function SideBar(){
    const [showModalPlayList,setShowModalPlayList] = useState(false)
    return(
        <div>
            <div className="bg-gray-700 p-2 flex flex-row rounded-lg items-center">
                <img src={searchIcon} alt="buscar" className="w-6 h-6"/>
                <input className="text-slate-300 ml-2 w-full bg-inherit focus:outline-none ml-1 text-normal" type="text" name="" id="" />
            </div>
            <div className="flex flex-col gap-7 font-medium text-lg ml-3 mt-5">
                <div className="flex flex-row w-full">
                    
                    <Link to="/playlists">
                        <ItemMenu nombreItem="PlayList" iconoItem={playListIcon}/>
                    </Link>
                    <button onClick={()=>setShowModalPlayList(true)} className="ml-auto">                   
                        <img className="w-8 h-8" src={addIcon} alt="" />   
                    </button>                 
                </div>
                <div className="flex flex-row w-full">
                    <Link to="/albums">
                        <ItemMenu nombreItem="Albums" iconoItem={albumIcon} />
                    </Link>
                    <button className="ml-auto">                   
                            <img className="w-8 h-8" src={addIcon} alt="" />   
                    </button>                 
                </div>
                <div className="flex flex-row w-full">
                    <Link to="/canciones">                    
                        <ItemMenu nombreItem="Canciones" iconoItem={songIcon} />
                    </Link>
                    <button className="ml-auto">                   
                        <img className="w-8 h-8" src={addIcon} alt="" />   
                    </button>                 
                </div>
                <div className="flex flex-row w-full">
                    <Link to="/artistas">
                        <ItemMenu nombreItem="Artistas" iconoItem={artistaIcon} />
                    </Link>            
                    <button className="ml-auto">                   
                        <img className="w-8 h-8" src={addIcon} alt="" />   
                    </button>                 
                </div>                
            </div>
            <ModalPlayList isOpen={showModalPlayList} onClose={setShowModalPlayList} />
        </div>)
}
