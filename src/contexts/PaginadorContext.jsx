import { createContext, useContext,useState } from "react";

const PaginadorContext = createContext()

function PaginadorProvider({children}){
    const [paginaActual, setPaginaActual] = useState(1);
    return(
         <PaginadorContext.Provider value={{paginaActual,setPaginaActual}}>
            {children}
         </PaginadorContext.Provider>
    )
    }
function usePaginadorContext(){
    return useContext(PaginadorContext)
}
export {PaginadorProvider,usePaginadorContext};