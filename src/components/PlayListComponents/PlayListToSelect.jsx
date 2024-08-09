import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { data } from "autoprefixer"
import lockIcon from "../../assets/lockIcon.svg"
import unlockIcon from "../../assets/unlockIcon.svg"
import LoadingSpinner from "../Utils/LoadingSpinner"
import { useRef } from "react"
function PlayListToSelect({refreshStatus,refinputSelects,song_id}){
    const token = localStorage.getItem("authToken")
    const id_user = localStorage.getItem("id_user")
    const  [{data: dataPlayList, isLoading , isError},doFetch] = useFetch(
        `${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/playlists/?owner=${id_user}`
    )
    useEffect(()=>{
        doFetch({
            method : 'GET',
            headers : {
                'Authorization': `Token ${token}`                
            } 
        })
    },[refreshStatus])

    return(
        <div className="relative flex flex-col w-full bg-zinc-900 rounded-lg">
           {dataPlayList &&
                dataPlayList.results.map((playList)=>{
                    return (!playList.entries.includes(song_id) && 
                                <div key={playList.id} className="h-14 flex flex-row items-center p-2 hover:rounded-lg hover:bg-zinc-800">        
                                    <div className="text-zinc-300 text-md">
                                        {playList.name}
                                    </div>
                                    <div className="ml-auto flex flex-row items-center ml-4">
                                        <div className="h-8 w-8 flex items-center justify-center">
                                            <img src={playList.public? unlockIcon : lockIcon } alt="public" />
                                        </div>
                                        <div className="h-8 w-8 flex items-center justify-center">
                                            <input ref={(el)=>{
                                                    if(el){
                                                    refinputSelects.current[playList.id] = el
                                                    }
                                                }}   className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" type="checkbox" />
                                        </div>
                                    </div>
                                </div>
                            )
                })
           }
           {isLoading && <LoadingSpinner/>}
        </div>
    )
}
export default PlayListToSelect