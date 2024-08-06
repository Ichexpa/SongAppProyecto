import nextIcon from "../assets/sigPagina.svg"
import backIcon from "../assets/paginaAnt.svg"
import { useEffect, useState } from "react";

import { useRef } from "react";
function Paginador({paginaHandler,isNext=true,defaultValue=1}){   
    let pageNumber = useRef() 
    let isVisible = useRef(defaultValue > 1)
    function changeVisibleAnchor(valuePage){
        valuePage > 1 ? isVisible.current = true : isVisible.current = false
    }
    function nextHandler(){
        let valuePage = Number(pageNumber.current.innerText) + 1
        pageNumber.current.innerText = valuePage
        changeVisibleAnchor(valuePage)
        paginaHandler(valuePage)
    }
    function backHandler(){
        let valuePage = Number(pageNumber.current.innerText) - 1  
        pageNumber.current.innerText = valuePage
        changeVisibleAnchor(valuePage)
        paginaHandler(valuePage)  
    }
    

    return(
        <div className="mt-10 w-full">
            <div className="w-1/4 h-8 relative mx-auto flex items-center justify-center">
                {isVisible.current &&
                    <img
                        onClick={backHandler}
                        className="w-6 h-6 cursor-pointer absolute left-0"
                        src={backIcon}
                        alt="atras"
                    />
                }
                <span ref={pageNumber} className="absolute text-xl">{defaultValue}</span>
                {isNext &&
                <img
                    onClick={nextHandler}
                    className="w-6 h-6 cursor-pointer absolute right-0"
                    src={nextIcon}
                    alt="siguiente"
                />
                }
            </div>
        </div>
    )
}
export default Paginador