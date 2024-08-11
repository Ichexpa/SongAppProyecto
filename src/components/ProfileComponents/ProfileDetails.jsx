import profileIcon from "../../assets/profileIcon.svg"
import editIcon from "../../assets/editIcon.svg"
import {useEffect, useRef } from "react"
import { useState } from "react";
import ItemInfoProfileUser from "./ItemInfoProfileUser.jsx";
import useFetch from "../../hooks/useFetch.js"
import { useAuth } from "../../contexts/AuthContext.jsx";
import LoadingSpinner from "../Utils/LoadingSpinner.jsx"
import { useClickEditContext } from "../../contexts/StateEditingContext.jsx";
import {useProfilePhotoContext} from "../../contexts/ProfilePhotoContext.jsx"
function ProfileDetails(){
    const {setProfilePhoto} = useProfilePhotoContext()
    const API_URL_BASE = `${import.meta.env.VITE_API_URL_SANDBOX}`
    const {isEditing,setIsEditing} = useClickEditContext()
    const [imageSrc, setImageSrc] = useState(null);
    const token = localStorage.getItem("authToken")
    const [{data: dataUser , isLoading: isLoadingDataUser, isError : isErrorDataUser}, doFetch] = useFetch()
    const [{data: dataUpdate, isLoading: isLoadingUpdate, isError : isErrorUpdate},doFetchUpdate] = useFetch()
    let refInputNombre = useRef()
    let refInputApellido  = useRef()
    let refInputEmail = useRef()
    let refInputFechaNac = useRef()
    let refTextAreaBio = useRef()
    let refImagen = useRef()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
            setImageSrc(e.target.result);
            setIsEditing(true)
            };
            reader.readAsDataURL(file);
        }
        };

    const handleClickImage = () => {
        refImagen.current.click();
    }; 
    useEffect(()=>{
        doFetch(
        {
            method: "GET",
            headers: {
                Authorization: `Token ${token}`,
            },  
        },
        `${API_URL_BASE}/users/profiles/profile_data/`)        
        /* setProfilePhoto("Hola desde options profile") */
    },[])
    const getValueInput = () =>{
        const valorBio = refTextAreaBio.current.value == "Aun no se posee descripción..."?
                         null : refTextAreaBio.current.value
        const dataBody ={
            first_name : refInputNombre.current.value || dataUser.first_name,
            last_name : refInputApellido.current.value || dataUser.last_name,
            email : refInputEmail.current.value || dataUser.email,
            dob : refInputFechaNac.current.value || dataUser.dob,
            bio :  valorBio,           
        }
        /* console.log(body) */
       if(refImagen.current.files[0]){
            const formData = new FormData()
            formData.append("first_name", dataBody.first_name)
            formData.append("last_name", dataBody.last_name)
            formData.append("email", dataBody.email)
            formData.append("dob", dataBody.dob)
            formData.append("bio", dataBody.bio)
            formData.append("image", refImagen.current.files[0])
            doFetchUpdate({
                method : "PATCH",
                headers: {
                Authorization: `Token ${token}`,                
                },
                body : formData
            },
            `${API_URL_BASE}/users/profiles/${dataUser.user__id}`
            )
            refImagen.current.value = '';

        }
        else{
            console.log("Se ejecuto sin imagen se envio un json")

            doFetchUpdate({
                method : "PATCH",
                headers: {
                Authorization: `Token ${token}`, 
                'Content-Type' : 'application/json'               
                },
                body : JSON.stringify(dataBody) 
            },
            `${API_URL_BASE}/users/profiles/${dataUser.user__id}`
            )
        }
    }
    useEffect(()=>{
        if(dataUpdate){            
            setProfilePhoto(dataUpdate.image)
        }
    },[dataUpdate])
    return(
        <div className="relative p-2 w-full flex flex-col gap-5">
            {dataUser &&
            <>
                <div className="flex items-center justify-center rounded-lg w-full h-44 bg-gradient-to-r from-stone-50 via-cyan-700 to-gray-900">
                    <div className="relative">
                        <div className="h-32 w-32 rounded-full overflow-hidden">
                            <img className="w-full h-full object-cover" src={ imageSrc ?? `${API_URL_BASE}/${dataUser.image}`  ?? profileIcon} alt="" />
                            
                                <input
                                    type="file"
                                    ref={refImagen}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />                        
                        </div>
                        <div className="absolute top-1 right-2">
                            <div onClick={handleClickImage} className="bg-black rounded-full p-1 cursor-pointer w-10 h-10">
                                    <img src={editIcon} alt="editarImg" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>      
                    <div className="w-full flex flex-row flex-wrap">                        
                            <ItemInfoProfileUser refInput={refInputNombre} nameField={"Nombre"} valueContent={dataUser.first_name}/>
                            <ItemInfoProfileUser refInput={refInputApellido} nameField={"Apellido"} valueContent={dataUser.last_name}/>
                            <ItemInfoProfileUser refInput={refInputEmail} nameField={"Email"} valueContent={dataUser.email}/>
                            <ItemInfoProfileUser refInput={refInputFechaNac} nameField={"Fecha de nacimiento"} valueContent={dataUser.dob?? "No definida"} typeInput="date"/>
                            <ItemInfoProfileUser refInput={refTextAreaBio} nameField={"Biografia"} valueContent={dataUser.bio?? "Aun no se posee descripción..."} isTextarea={true}/>
                    </div>  
                </div>
                {isEditing &&
                <div className="w-full flex justify-end">
                    <button onClick={getValueInput} className="transition ease-in-out delay-250 mt-5 mt-2 bg-teal-900 hover:bg-teal-950 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
                        Confirmar cambios
                    </button>
                </div>
                }
            </>
            }
            {isLoadingDataUser && <LoadingSpinner/>}
            {isErrorDataUser && <h1>Ocurrio un error</h1>}
            {isErrorUpdate && <h1>Ocurrio un error al intentar actualizar el usuario</h1>}
        </div>
    )
}

export default ProfileDetails