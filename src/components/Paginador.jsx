import nextIcon from "../assets/sigPagina.svg"
import backIcon from "../assets/paginaAnt.svg"
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { usePaginadorContext } from "../contexts/PaginadorContext";
function Paginador(){
    const {paginaActual,setPaginaActual} =usePaginadorContext()
    function nextHandler(){
        setPaginaActual((paginaActual)=>paginaActual+1)
    }
    function backHandler(){
        setPaginaActual((paginaActual)=>paginaActual-1)
    }
    
    return(
        <div className="mt-10 w-full">
            <div className="w-1/4 h-8 relative mx-auto flex items-center justify-center">
                {paginaActual > 1 && (
                    <img
                        onClick={backHandler}
                        className="w-6 h-6 cursor-pointer absolute left-0"
                        src={backIcon}
                        alt="atras"
                    />
                )}
                <span className="absolute text-xl">{paginaActual}</span>
                <img
                    onClick={nextHandler}
                    className="w-6 h-6 cursor-pointer absolute right-0"
                    src={nextIcon}
                    alt="siguiente"
                />
            </div>
        </div>
    )
}
export default Paginador