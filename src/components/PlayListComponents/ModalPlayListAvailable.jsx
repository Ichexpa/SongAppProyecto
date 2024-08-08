import PlayListToSelect from "./PlayListToSelect";
const ModalPlayListAvailable = ({ isOpen, onClose}) => {
    function addToPlayListsHandler(){
        
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-cyan-900 rounded-xl shadow-lg p-3 w-2/5">
                <div className="h-full w-full p-4 relative">
                    <div className="flex flex-col gap-4 w-full">
                        <h1 className="text-3xl tracking-wide">Selecciona las PlayLists</h1>
                        <div className="mt-2">
                           <PlayListToSelect/>
                        </div>
                        <button onClick={addToPlayListsHandler}  className="transition ease-in-out delay-250 bg-teal-900 hover:bg-teal-950 font-semibold hover:text-white py-2 px-4 border border-cyan-950 hover:border-transparent rounded">
                                Agregar
                        </button>
                        {/* {showMessageInfo.playListAdded &&
                        <div className="text-sm font-bold mx-auto text-lime-700">
                            PlayList Agregada con exito
                        </div>
                        } */}
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
  );
}
export default ModalPlayListAvailable