import { useRef, useState } from "react";
import PlayListToSelect from "./PlayListToSelect";
import useFetch from "../../hooks/useFetch";
const ModalPlayListAvailable = ({ isOpenModal, onClose , song_id}) => {
    const token  = localStorage.getItem("authToken")
    const [{data: dataPlayListUpdate , isLoading , isError},doFetch]  = useFetch()
    const [uploadSucces,setUploadSucces]  = useFetch()
    const [refreshList,setRefreshList] = useState(1)
    const refinputSelects = useRef({})
    function getIdPlayListSelected(inputsSelect){
        const objectInputs = inputsSelect.current
        const idArraySelected = Object.keys(objectInputs).reduce((acc,idInput)=>{
            if(objectInputs[idInput].checked){
               acc.push(idInput)     
            }
            return acc
        },[])
        return idArraySelected
    }
    function addToPlayListsHandler(){
        const idArraySelected = getIdPlayListSelected(refinputSelects)
        const promesasPorResolver = idArraySelected.map((plaListId)=>{
            const bodyData = {
                order: song_id,
                playlist : plaListId,
                song : song_id
              }  
           return doFetch({
              method : 'POST',
              headers : {
                'Authorization' : `Token ${token}`,
                'Content-type' : 'application/json'
              },
              body : JSON.stringify(bodyData)
            },
            `${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/playlist-entries/`)            
        })
        Promise.all(promesasPorResolver).then(()=>{
            setTimeout(()=>{                
                setRefreshList((prev)=>prev+1)
            },500)
        }).catch((e)=>{
            console.log("Se produjo un erorr",e)
        })
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-cyan-900 rounded-xl shadow-lg p-3 w-2/5">
                <div className="h-full w-full p-4 relative">
                    <div className="flex flex-col gap-4 w-full">
                        <h1 className="text-3xl tracking-wide">Selecciona las PlayLists</h1>
                        <div className="mt-2">
                           <PlayListToSelect refreshStatus={refreshList} song_id={song_id} refinputSelects={refinputSelects} />
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
                    onClick={()=>onClose(!isOpenModal)}
                    >
                    &times;
                    </button>
                </div>
            </div>
        </div>
  );
}
export default ModalPlayListAvailable