function ModalConfirmDelete({ isOpen, onClose, tituloEliminacion, actionSelected }){
    if (!isOpen) return null;
    function buttonHandlerSelected(value){
            actionSelected(value)
            onClose(!isOpen)
    }
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-cyan-900 rounded-xl shadow-lg p-3 w-1/4">
                <div className="h-full w-full p-4 relative">
                    <div className="flex flex-col gap-4 w-full">
                        <h1 className="text-3xl tracking-wide">{tituloEliminacion}</h1>
                        <div className="w-full flex justify-center">
                            <div className="flex flex-row w-1/2 justify-items-center gap-2">
                                <button onClick={()=>buttonHandlerSelected(true)}  className="transition ease-in-out delay-250 bg-sky-800 hover:bg-sky-600 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded">
                                        Confirmar
                                </button>                                                               
                                <button onClick={()=>buttonHandlerSelected(false)} className="transition ease-in-out delay-250 bg-red-800 hover:bg-red-700 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded">
                                        Cancelar
                                </button>
                            </div>
                        </div>
                    </div> 
                    
                    
                    <button 
                    className="absolute text-3xl top-2 right-2 text-red-500 hover:text-gray-700"
                    onClick={()=>onClose(!isOpen)}
                    >
                    &times;
                    </button>
                </div>
            </div>            
        </div>

    )
}
export default ModalConfirmDelete