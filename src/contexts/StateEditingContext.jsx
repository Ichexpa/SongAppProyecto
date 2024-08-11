import { createContext,useContext,useState } from "react";

const ContextClickEdit = createContext()

function ContextClickEditProvider({children}){
    const [isEditing, setIsEditing]  = useState(false)
    return (
        <ContextClickEdit.Provider value={{isEditing,setIsEditing}}>
            {children}
        </ContextClickEdit.Provider>
    )
}
function useClickEditContext(){
    return useContext(ContextClickEdit)
}

export {ContextClickEditProvider,useClickEditContext}