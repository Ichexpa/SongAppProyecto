import { createContext, useContext } from "react"
import { useState } from "react"
const ModalContext = createContext()

function ModalContextProvider({children}){
    const [isOpen,setIsOpen] = useState(false)
    return(
       <ModalContext.Provider value={{isOpen,setIsOpen}}>
            {children}
       </ModalContext.Provider>
    )
}
function useModalContext(){
    return useContext(ModalContext)
}
export  {ModalContext,ModalContextProvider,useModalContext};