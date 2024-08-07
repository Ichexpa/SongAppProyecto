import { useEffect, useState } from "react"
import { useRef } from "react"
import editIcon from "../assets/editIcon.svg"
export default  function ItemInfoProfileUser({refInput,nameField,valueContent="Test",typeInput="text", isTextarea=false}){
    const [showInput, setShowInput]  = useState(false)
    const refContainer = useRef()
    
    function changeVisibilityElements(){
        refContainer.current.style.display = "None"
        refInput.current.style.display = "block"
    }

   /*  useEffect(()=>{
        if (showInput) {
            console.log(refContainer.current)
            console.log(refInput.current)
            if (refContainer.current && refInput.current) {
                console.log("Hola")
                refContainer.current.innerText = refInput.current.value;
            }
            }
            else {
            // Si estamos mostrando el div, cargamos el valor del div en el input
                if (refContainer.current && refInput.current) {
                    console.log("Hola 2")
                    refInput.current.value = refContainer.current.innerText;
                }
            }
    },[showInput]) */



    return(<div className={!isTextarea? "mt-5 flex flex-col w-1/2" : "mt-5 flex flex-col w-full"}>
                <div className="flex flex-row gap-2">
                    <div className="text-lg text-slate-400">
                        {nameField}
                    </div>
                    <div onClick={changeVisibilityElements} className="cursor-pointer w-7 h-7">
                        <img src={editIcon} alt="editarNombre" />
                    </div>
                </div>
                <div className="mt-2 text-lg">
                    {!isTextarea ?
                    <input defaultValue={valueContent} className="hidden p-2 border rounded-lg none bg-sky-900" ref={refInput} type={typeInput} name="" id="" />
                    : 
                    <textarea defaultValue={valueContent} className="hidden p-2 border rounded-lg none bg-sky-900" ref={refInput}  rows="4" cols="100">
                           
                    </textarea>
                }
                    <div ref={refContainer} className={!isTextarea? "text-center min-w-80 p-2 w-auto rounded-lg bg-cyan-950 inline-block" :
                                                                  "w-full h-32 p-2 w-auto rounded-lg bg-cyan-950 inline-block" }>
                        {valueContent}
                    </div>
                </div>
          </div> )
}