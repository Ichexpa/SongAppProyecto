import { useNavigate } from "react-router-dom"
import profileIconDefault from "../../assets/profileIcon.svg"
import { useAuth } from "../../contexts/AuthContext"
import useFetch from "../../hooks/useFetch"
import { useEffect } from "react"
import {useProfilePhotoContext} from "../../contexts/ProfilePhotoContext.jsx"
function ProfileOptions(){
    const {profilePhoto,setProfilePhoto} = useProfilePhotoContext()
    const navigate = useNavigate() 
    const {logout} = useAuth("actions")
    const token = localStorage.getItem("authToken")
    const API_URL_BASE = import.meta.env.VITE_API_URL_SANDBOX
    const [{data: dataUser , isLoading: isLoadingDataUser, isError : isErrorDataUser}, doFetch] = useFetch()
    useEffect(()=>{
        ("Se ejecuto el efecto de profileOptions")
        doFetch(
        {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },  
        },
        `${API_URL_BASE}/users/profiles/profile_data/`)
    },[])
    useEffect(()=>{
        console.log("Se ejecuto el segundo efecto de profile")
        if(dataUser){
            setProfilePhoto(dataUser.image)
        }
    },[dataUser])
    return(
        <div className="flex flex-row items-center bg-gray-800 rounded-2xl p-1">
            <div className="p-3 flex flex-col space-y-2">
                <button onClick={()=>navigate("profile")} className="text-center text-sm text-white bg-gray-900 rounded-lg p-1 hover:bg-cyan-950">
                    Ver perfil
                </button>
                <button onClick={()=>logout()} className="text-sm text-white bg-gray-900 rounded-lg p-1 hover:bg-cyan-950">
                    Cerrar Sesión
                </button>
            </div>
            <div className="cursor-pointer w-20 h-20 rounded-full overflow-hidden ">
                <img className="w-full h-full object-cover" src={profilePhoto ? `${API_URL_BASE}/${profilePhoto}` : profileIconDefault} alt="perfil" />
            </div> 
        </div>
    )

}
export default ProfileOptions