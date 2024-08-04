import { useEffect } from "react"
import useFetch from "../hooks/useFetch"
import AlbumItem from "./AlbumItem"
import LoadingSpinner from "./LoadingSpinner"
import ModalSongList from "./ModalSongList"
import { useState } from "react"
import mostrarMasIcon from "../assets/mostrarMasIcon.svg"

function AlbumList({idAlbum=""}){
    const [{data:dataAlbums, isLoading, isError},doFetch] = useFetch("https://sandbox.academiadevelopers.com/harmonyhub/albums/")
    useEffect(()=>doFetch(),[])
    if(isLoading){
        return <LoadingSpinner/>        
    }
    return(
        <div className="w-100 flex flex-col gap-3">
            {dataAlbums &&
                dataAlbums.results.filter((album)=>album.title != null)
                .map((album)=>{
                    return( 
                    <div className="bg-slate-800 rounded-md" key={album.id}>
                        <AlbumItem 
                        idAlbum={album.id}
                        title={album.title}
                        year={album.year}
                        portadaImg={album.cover}
                        artista_id={album.artist}/>
                    </div>)
                })
            }
        </div>
    )
}
export default AlbumList