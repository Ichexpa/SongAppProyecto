import { useState,useEffect, useRef } from "react";
import ArtistResultSearchList from "../ArtistaComponents/ArtistResultSearchList";
import useFetch from "../../hooks/useFetch";
import uploadPhotoImg from "../../assets/subirFoto.png"
function AlbumModalCreate({ isOpen, onClose}){
    if (!isOpen) return null; 
    const token = localStorage.getItem("authToken")   
    const [{data: dataAlbum, isLoading, isError},doFetch] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/harmonyhub/albums/`)
    const refInputNombre = useRef()
    const refInputAño = useRef()
    const refInputBusqueda = useRef()
    const refImagen = useRef()
    const [imageSrc, setImageSrc] = useState(null);
    const [artistValueSearch,setArtistValueSearch] = useState("")
    const [artistSelect,setArtistSelect] = useState({id_artist : null, name_artist : null })
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
            setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
        };
    const handleClickImage = () => {
        refImagen.current.click();
    }; 
    function hadleKeyPress(e){
        if(e.key == "Enter" && refInputBusqueda.current.value != ""){
            setArtistValueSearch(refInputBusqueda.current.value)
        }
    }
    function crateAlbumHandler(){
      if(refInputNombre.current.value !== "" && artistSelect.id_artist !== null){
        const formData = new FormData()
            formData.append("title", refInputNombre.current.value)
            formData.append("year", refInputAño.current.value ?? null)
            formData.append("cover", refImagen.current.files[0] ?? null )
            formData.append("artist", artistSelect.id_artist)
        doFetch({
          method: 'POST',
          headers: {
                Authorization: `Token ${token}`,                
                },
          body : formData
        })
      }
      else{
        alert("faltan valores")
      }
    }
    return(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-cyan-900 rounded-xl shadow-lg p-3 w-2/5">
        <div className="h-full w-full p-4 relative">
            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-3xl tracking-wide">{artistSelect.name_artist ?? "Agrega un Album"}</h1>
                <div className="flex-col w-full">
                    <div className="flex flex-row w-full justify-between p-3">
                      <div className="text-slate-400 text-md">
                        <h6 className="mb-3">Sube una imagen para el album (Opcional)</h6>
                        <div className="mb-3 mx-auto h-32 w-32 rounded-full overflow-hidden">
                            <img onClick={handleClickImage} className="cursor-pointer w-full h-full object-cover" src={ imageSrc ?? uploadPhotoImg} alt="" />
                                <input
                                    type="file"
                                    ref={refImagen}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />                        
                        </div>
                      </div>
                      <div className="flex flex-col ">
                          <div className="h-3/6 w-full">
                            <h2 className="text-slate-400 text-md">Nombre: </h2>
                            <div className="mt-2 overflow-hidden">
                              <input ref={refInputNombre} placeholder="Album" className="p-2 border-none focus:border-none focus:outline-none rounded-lg none bg-cyan-950"  ref={refInputNombre} type="text" />
                            </div>
                          </div>
                          <div className="h-3/6 w-full">
                            <h2 className="text-slate-400 text-md">Año: </h2>
                            <div className="mt-2 overflow-hidden">
                              <input ref={refInputAño} placeholder="Año" className="p-2 border-none focus:border-none focus:outline-none rounded-lg none bg-cyan-950"  ref={refInputAño} type="text" />
                            </div>
                            {/* {showMessageInfo.nameRequiredMessage &&
                            <div className="text-sm text-red-500 mt-2 mb-2">
                              Debes agregarle un nombre a la lista
                            </div>
                            } */}
                          </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-2">
                        <h2 className="text-slate-400 text-md">Buscar al Artista: </h2>
                        <input ref={refInputBusqueda} onKeyDown={hadleKeyPress} type="text" placeholder="nombreArtista" className="mt-2 p-2 border-none focus:border-none focus:outline-none rounded-lg none bg-cyan-950" />
                        {artistValueSearch.name == null &&
                        <div className="text-red-600">Debes escribir el nombre del artista </div>
                        }
                        <div>                            
                            <ArtistResultSearchList setSelectArtist={setArtistSelect} artist_name={artistValueSearch}/>
                        </div>
                    </div>
                </div>
                <button onClick={crateAlbumHandler} className="transition ease-in-out delay-250 bg-teal-900 hover:bg-teal-950 font-semibold hover:text-white py-2 px-4 border border-cyan-950 hover:border-transparent rounded">
                        Crear album 
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
    )
}
export default AlbumModalCreate