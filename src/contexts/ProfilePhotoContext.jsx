import { createContext, useContext,useState } from "react";

const ProfilePhotoContext = createContext()

function ProfilePhotoProvider({children}){
    const [profilePhoto, setProfilePhoto] = useState("XDD");
    return(
         <ProfilePhotoContext.Provider value={{profilePhoto,setProfilePhoto}}>
            {children}
         </ProfilePhotoContext.Provider>
    )
    }
function useProfilePhotoContext(){
    return useContext(ProfilePhotoContext)
}
export {ProfilePhotoProvider,useProfilePhotoContext};