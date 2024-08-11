import { useRef,useState,useEffect } from "react"
import AlbumResultSearchList from "../AlbumComponents/AlbumResultSearchList"
import useFetch from "../../hooks/useFetch";
import songUploadIcon from "../../assets/songIconUpload.svg"
import songNotUpload from "../../assets/songIconNotUpload.svg"
function ModalEditSong({ isOpen, onClose,id_song}){
    const refInputNombre = useRef()
    const refInputAño = useRef()
    const refInputBusqueda = useRef()
    const refAudio = useRef()    
    const [messageInfoName,setMessageInfoName] = useState(false)    
    const [messageAlbumInfo,setMessageAlbumInfo] = useState(false)
    const [messageInfoSong,setMessageInfoSong] = useState(false)
    const token = localStorage.getItem("authToken")
    const [{data:dataSong ,isLoading,isError},doGetSong] = useFetch(
      `${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/songs/${id_song}`)
    const [{data:dataAlbum ,isLoadingAlbum,isErrorAlbum},doGetAlbum] = useFetch()  
    const [{data:dataSongUpdate ,isLoading: isLoadingUpdate ,isError: isErrorUpdate},doUpdateSong] = useFetch(
    `${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/songs/${id_song}`)
    const [albumValueSearch,setAlbumValueSearch] = useState("")
    const [albumSelect,setAlbumSelect] = useState({id_album : null, name_album : null })
    const [audioFile, setAudioFile] = useState(null);   
    const [uploadSucces,setUploadSucces] = useState(false) 
    function handleMessageSuccess(){
        setUploadSucces(true)
        setTimeout(()=>{
            setUploadSucces(false)
        },4000)
    }
    function handleFileChange(event){
        setAudioFile(event.target.files[0]);
    }
    const handleClickAudio = () => {
        refAudio.current.click();
    }; 
    function hadleKeyPress(e){
        if(e.key == "Enter" && refInputBusqueda.current.value != ""){
            setAlbumValueSearch(refInputBusqueda.current.value)
        }
    }
    function UpdateSongHandler(){
        if(refInputNombre.current.value !== "" && audioFile && albumSelect.id_album){
            const formData = new FormData()
                formData.append("title", refInputNombre.current.value)
                formData.append("year", refInputAño.current.value ?? null)
                if(typeof(audioFile) != "string"){                      
                    formData.append("song_file", audioFile )
                }
                formData.append("album", albumSelect.id_album)
            doUpdateSong({
            method: 'PATCH',
            headers: {
                    Authorization: `Token ${token}`,                
                    },
            body : formData
            })
        }
        else{
            if(refInputNombre.current.value == ""){
                setMessageInfoName(true)
                setTimeout(()=>{
                    setMessageInfoName(false)
                },3500)
            }
            if(!albumSelect.id_album){
                setMessageAlbumInfo(true)
                setTimeout(()=>{
                    setMessageAlbumInfo(false)
                },3500)
            }
            if(!audioFile){
                setMessageInfoSong(true)
                setTimeout(()=>{
                    setMessageInfoSong(false)
                },3500)
            }
        }
    }
    useEffect(()=>{
      doGetSong()  
    },[])
    useEffect(()=>{
        if(dataSong){
            if(dataSong.album){
                doGetAlbum({},
                `${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/albums/${dataSong.album}`)
            }
        }
    },[dataSong])
    useEffect(()=>{
        if(dataAlbum && dataSong){
            setAlbumSelect({id_album : dataAlbum.id, name_album : dataAlbum.title })
            setAudioFile(dataSong.song_file)
        }
    },[dataAlbum,dataSong])
    useEffect(()=>{
        if(dataSongUpdate){
            handleMessageSuccess()
        }
    },[dataSongUpdate])
    return(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-cyan-900 rounded-xl shadow-lg p-3 w-2/5">
                <div className="h-full w-full p-4 relative">
                    {(dataAlbum && dataSong) &&
                    <div className="flex flex-col gap-4 w-full">
                        <h1 className="text-3xl tracking-wide">{albumSelect.name_album == null ? 'Agrega un Canción' : "Album " + `"${albumSelect.name_album}"` }</h1>
                            <div className="flex flex-row w-full gap-2 ">
                                <div className="">
                                    <h2 className="text-slate-400 text-md">Nombre: </h2>
                                    <div className="mt-2 overflow-hidden">
                                        <input defaultValue={dataSong.title} placeholder="Nombre de la canción" className="p-2 border-none focus:border-none focus:outline-none rounded-lg none bg-cyan-950"  ref={refInputNombre} type="text" />
                                    </div>                                    
                                    {messageInfoName &&
                                    <div className="text-sm text-red-500 mt-2 mb-2">
                                        Debes agregarle un nombre a la canción
                                    </div>
                                    }
                                </div>
                                <div className="">
                                    <h2 className="text-slate-400 text-md">Año: </h2>
                                    <div className="mt-2 overflow-hidden">
                                        <input defaultValue={dataSong.year}  ref={refInputAño} placeholder="Año" className="p-2 border-none focus:border-none focus:outline-none rounded-lg none bg-cyan-950" type="text" />
                                    </div>
                                </div>
                                <div className="">
                                    <h2 className="text-slate-400 text-md w-full">Sube el archivo de audio: </h2>
                                    <div className="flex justify-center mt-3">
                                        <img className="cursor-pointer w-8 h-8" onClick={handleClickAudio}  src={audioFile ? songUploadIcon : songNotUpload} alt="" />
                                        
                                        <input /* defaultValue={dataSong.song_file} */ ref={refAudio} onChange={handleFileChange}  style={{ display: 'none' }} type="file" accept="audio/*" className="p-2 border-none focus:border-none focus:outline-none rounded-lg none bg-cyan-950" />
                                    
                                    </div>
                                    {messageInfoSong && <div className="flex justify-center text-red-600">Debes subir un archivo de audio</div> }
                                    {audioFile && <div className="flex justify-center text-green-400">Cargada</div>}

                                </div>
                            </div>
                          <div className="flex flex-col">
                                <h2 className="text-slate-400 text-md">Buscar Album: </h2>
                                <input ref={refInputBusqueda} onKeyDown={hadleKeyPress} type="text" placeholder="Ingresa el nombre del album que deseas buscar" className="mt-2 p-2 border-none focus:border-none focus:outline-none rounded-lg none bg-cyan-950" />
                                {messageAlbumInfo &&
                                <div className="text-red-600">Debes seleccionar un álbum</div>
                                }
                                <div>                            
                                    <AlbumResultSearchList setAlbumSelect={setAlbumSelect} album_name={albumValueSearch}/>
                                </div>
                          </div>
                        <button onClick={UpdateSongHandler}  className="transition ease-in-out delay-250 bg-teal-900 hover:bg-teal-950 font-semibold hover:text-white py-2 px-4 border border-cyan-950 hover:border-transparent rounded">
                               Confirmar modificación
                        </button>
                        {uploadSucces &&
                        <div className="text-sm font-bold mx-auto text-lime-400">
                            Canción modificada con éxito
                        </div>
                        }
                    </div>
                    }
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

export default ModalEditSong