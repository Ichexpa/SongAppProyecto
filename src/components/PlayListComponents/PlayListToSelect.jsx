import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import { data } from "autoprefixer"
import lockIcon from "../../assets/lockIcon.svg"
import unlockIcon from "../../assets/unlockIcon.svg"
import LoadingSpinner from "../Utils/LoadingSpinner"
function PlayListToSelect(){
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
    },[])
    return(
        <div className="relative flex flex-col w-full bg-zinc-900 rounded-lg">
           {dataPlayList &&
                dataPlayList.results.map((playList)=>{
                    return (<div className="h-14 flex flex-row items-center p-2 hover:rounded-lg hover:bg-zinc-800" key={playList.id}>
                                <div className="text-slate-500 text-md">
                                    {playList.name}
                                </div>
                                <div className="ml-auto flex flex-row items-center ml-4">
                                    <div className="h-8 w-8 flex items-center justify-center">
                                        <img src={playList.public? unlockIcon : lockIcon } alt="public" />
                                    </div>
                                    <div className="h-8 w-8 flex items-center justify-center">
                                        <input className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" type="checkbox" />
                                    </div>
                                </div>
                           </div>)
                })
           }
           {isLoading && <LoadingSpinner/>}
        </div>
    )
}
export default PlayListToSelect