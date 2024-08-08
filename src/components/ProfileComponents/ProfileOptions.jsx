import { useNavigate } from "react-router-dom"
import profileIconDefault from "../../assets/profileIcon.svg"

function ProfileOptions(){
    const navigate = useNavigate()    
    return(
        <div onClick={()=>navigate("profile")}  className="cursor-pointer h-4/5 w-20 rounded-full">
            <img className="my-auto w-full h-full" src={profileIconDefault} alt="perfil" />
        </div>
    )

}
export default ProfileOptions