import Logo from "./Logo.jsx"
import ItemMenu from "./ItemMenu.jsx"
import PantallaInfoSolicitud from "./PantallaInfoSolicitud.jsx"
import searchIcon from "../assets/search.svg"
import playListIcon from "../assets/playlist.svg"
import albumIcon from "../assets/album.svg"
import songIcon from "../assets/songIcon.svg"
import artistaIcon from "../assets/artistIcon.svg"
import songNotFoundImg from "../assets/songNotFoundImg.svg"
function MainPage(){
    return(
        <div className="w-screen h-screen text-white bg-gray-900">
            <header className="w-9/12 mx-auto">
                <Logo/>
            </header>
            <div className="w-9/12 mx-auto flex flex-row">
                <nav className="mt-4 w-1/5 flex flex-col gap-2 h-full">
                    <div className="bg-gray-700 p-2 flex flex-row rounded-lg items-center">
                        <img src={searchIcon} alt="buscar" className="w-6 h-6"/>
                        <input className="text-slate-300 ml-2 w-full bg-inherit focus:outline-none ml-1 text-normal" type="text" name="" id="" />
                    </div>
                    <div className="flex flex-col gap-7 font-medium text-lg ml-3 mt-5">
                        <ItemMenu nombreItem="PlayList" iconoItem={playListIcon} />
                        <ItemMenu nombreItem="Albums" iconoItem={albumIcon} />
                        <ItemMenu nombreItem="Canciones" iconoItem={songIcon} />
                        <ItemMenu nombreItem="Artistas" iconoItem={artistaIcon} />
                    </div>
                    
                </nav>
                <main className="w-4/5 pt-5 pl-6">
                    <div className="border">
                        <PantallaInfoSolicitud 
                            errorTitulo="No se encontró la canción solicitada"
                            imgError={songNotFoundImg}
                            descripcionError="La cancion no se encontró"
                        />
                    </div>
                </main>
            </div>           
        </div>
    )
}
export default MainPage