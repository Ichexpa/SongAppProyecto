import SongItem from "./SongItem.jsx"
import ListSongs from "./ListSongs.jsx"
function MainPage(){
    return(            
        <div className="">
{/*             <PantallaInfoSolicitud 
                errorTitulo="No se encontró la canción solicitada"
                imgError={songNotFoundImg}
                descripcionError="La cancion no se encontró"
            /> */}
            <ListSongs/>
        </div>
    )
}
export default MainPage