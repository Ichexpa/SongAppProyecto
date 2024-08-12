import SongPlayListItem from "../SongComponents/SongPlayListItem"
import useFetch from "../../hooks/useFetch"
import { useEffect,useState } from "react"
import musicIcon from "../../assets/musicIcon.svg"
import { useParams } from "react-router-dom"
import { useRef } from "react"
import DropDownPlayList from "./DropdownPlayList"
import { data } from "autoprefixer"
import privateIcon from "../../assets/privateIcon.svg"
import unlockIcon from "../../assets/unlockIconDetails.svg"
function PlayListDetails(){    
    const params = useParams()
    const idPlayList = params.idPlayList
    const idUser =  localStorage.getItem("id_user")
    const token = localStorage.getItem("authToken")
    const [{data:dataPlayListEntries , isLoading: isLoadingPlayListEntries, isError: isErrorPlayListEntries},doFetchPlayListEntries] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/playlist-entries/?playlist=${idPlayList}`)
    const [{data:dataPlayList , isLoading: isLoadingPlayList, isError : isErrorPlayList},doFetchPlayList] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/playlists/${idPlayList}`)
    const [{data:dataUser , isLoading: isLoadingUser, isError : isErrorUser},doFetchUser] = useFetch()
    const [selectSong,setSelectSong] = useState()
    const [songURL,setSongURL] = useState()
    const [coverImg,setCoverImg] = useState()
    const [refreshPlayListData,setRefreshPlayListData] = useState(0)
    const audioRef = useRef()
    function setValuesCoverAndSong(data){       
       const song = data[0].song_file
       const coverImg = data[1] ? (data[1].cover?? musicIcon) : musicIcon 
       setSongURL(song)
       setCoverImg(coverImg)
    }    
    useEffect(()=>{
        doFetchPlayListEntries()
    },[]) 
    useEffect(()=>{
        doFetchPlayList()
    },[refreshPlayListData])
    useEffect(()=>{
        if(selectSong){            
            setValuesCoverAndSong(selectSong)
        }
    },[selectSong])
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.load();
            audioRef.current.play(); 
        }
    }, [songURL]);
    useEffect(()=>{
        if(dataPlayList){            
            doFetchUser({
                method: "GET",
                headers: {
                    Authorization: `Token ${token}`,
                },  
            },`${import.meta.env.VITE_API_URL_SANDBOX}/users/profiles/${dataPlayList.owner}`)
            }
    },[dataPlayList])
    return(
        <div>
            <div className="flex flex-row w-full rounded-xl">
                <div className="flex flex-col w-7/12">
                    <div className="h-96">
                        <img className = "w-full h-full object-cover " src={coverImg?? musicIcon} alt="" />
                    </div>       
                    {songURL &&
                    <audio ref={audioRef} style={{backgroundColor : "rgb(245, 245, 245)"}} className="w-full " controls preload="auto">
                        <source src={songURL} type="audio/mpeg" />
                    </audio>
                    }
                </div>
                {(dataPlayList && dataUser) &&
                <div className="flex flex-col w-5/12 overflow-auto">
                    <div className="relative p-3 bg-gray-800 rounded-tr-lg">
                        <p className="text-xl font-bold p-1">{dataPlayList ? dataPlayList.name : "Cargando"}</p>
                        <p className="p-1 text-slate-400 text-sm">{isLoadingUser? "Cargando..." :  (dataUser ? dataUser.username : "Desconocido")}</p>
                        { dataPlayList.owner == idUser &&
                        <div className="absolute top-2 right-2 p-1">
                            <DropDownPlayList id_playList={dataPlayList.id} refreshMainComponent={setRefreshPlayListData}/>
                        </div>}
                        {dataPlayList.public ? 
                        <div className="absolute bottom-2 right-2 p-2">
                            <div className="bg-green-600 p-2 h-8 flex flex-row items-center rounded-lg">
                                <p className="text-white text-sm">Publico</p>
                                <img className="ml-2 w-5 h-5" src={privateIcon} alt="" />
                            </div>
                        </div> :
                        <div className="absolute bottom-2 right-2 p-2">
                            <div className="bg-slate-900 p-2 h-8 flex flex-row items-center rounded-lg">
                                <p className="text-slate-400 text-sm">Privado</p>
                                <img className="ml-2 w-5 h-5" src={privateIcon} alt="" />
                            </div>
                        </div>
                        }
                        
                    </div>
                    <div className="bg-gray-950 flex-1 overflow-auto">
                        <div className="relative flex flex-col h-80 overflow-auto">
                            {dataPlayListEntries && dataPlayListEntries.results.length == 0 &&
                             <h1 className="my-auto mx-auto text-slate-400">Esta PlayList no posee canciones</h1>
                            }
                            {dataPlayListEntries && dataPlayListEntries.results.length > 0 &&
                            dataPlayListEntries.results.map((playListItem)=>{
                                return(
                                    <SongPlayListItem key={playListItem.id}
                                         id_playListItem={playListItem.id}
                                         id_song={playListItem.song}
                                         selectSong = {setSelectSong}
                                         isOwner = {dataPlayList.owner == idUser}
                                          />
                                )
                            })
                            }
                        </div>
                    </div>       
                </div>
                }
           </div>                               
            <div className="flex flex-col w-full bg-gray-800 rounded-b-lg p-3">
                <h1 className="font-bold text-md text-white">Descripción</h1>
                {dataPlayList && 
                    <p className ="text-sm ml-2 p-2" >{dataPlayList.description ?? "Sin descripción..."}</p>
                }
                {isLoadingPlayList &&
                 <p className ="text-sm ml-2 p-2" >Cargando...</p>}    
            </div> 
        </div>        
           )
}
export default PlayListDetails