import { useParams } from "react-router-dom";

function AlbumSongList(){
    const params = useParams()
    return(
        <h1>El id es {params.idAlbum}</h1>
    )
}
export default AlbumSongList