import { useAuth } from "../../contexts/AuthContext.jsx"
import { useContext,useEffect,useRef } from "react"
import useFetch from "../../hooks/useFetch.js"
import { redirect, useNavigate } from "react-router-dom"
import { data } from "autoprefixer"


function Login(){
    const username = useRef("")
    const password = useRef("")
    const {login} = useAuth("actions")
    /* const {token,id_user} = useAuth("state") */
    const [{data : dataToken,isLoading,isError}, doFetchToken] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/api-auth/`)
    const [{data : dataUser,isLoading: isLoadingDataUser,isError : isErrorDataUser},doFetchUser] = useFetch(`${import.meta.env.VITE_API_URL_SANDBOX}/users/profiles/profile_data/`)
    const redireccion = useNavigate()
    function handleSubmit(e){
        const credentials = {
            username: username.current,
            password: password.current
            };
        const bodyJSON = JSON.stringify(credentials)
        doFetchToken({method : "POST",
                headers : {
                    'Content-Type': 'application/json',
                },
                body : bodyJSON
            }) 
    }

    function handleOnChangeInput(e){
        if(e.target.name == "user-name"){
            username.current = e.target.value
        }
        if(e.target.name == "user-password"){
            password.current = e.target.value
        }
    }
    
    useEffect(()=>{
        if(dataToken){
            login(dataToken.token)
            doFetchUser(
                {
                    method: "GET",
                    headers: {
                        Authorization: `Token ${dataToken.token}`,
                    },  
                }
            )
        }
    },[dataToken])
    useEffect(()=>{
        if(dataUser){
            login(dataToken.token,dataUser.user__id)
            redireccion("/")           
        }
    },[dataUser])
    
    
    return(
        <div className="flex w-5/6 mx-auto flex-col p-2 text-xl">
            <h1 className="text-3xl font-semibold my-2">Iniciar Sesión</h1>
            <div className="mt-2 text-zinc-400 flex flex-col gap-1">
                <label htmlFor="name-input">Username</label>
                <input onChange={handleOnChangeInput} className="text-xl text-white focus:outline-none border-b-2 border-white-100 bg-gray-900 p-2" type="text" name="user-name" id="name-input"/>
                <label htmlFor="password-input">Contraseña</label>
                <input onChange={handleOnChangeInput} className="text-xl text-white focus:outline-none border-b-2 border-white-100 bg-gray-900 p-2" type="password" name="user-password" id="password-input" />            
            </div>
            <button onClick={handleSubmit} className="transition ease-in-out delay-250 mt-5 mt-2 bg-transparent hover:bg-gray-700 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
                Ingresar
            </button>
            {isError &&
            <div className="mt-2 text-center text-red-500 text-md">
                Verifica que tu nombre de usuario y contraseña sean correctos
            </div>
            }
        </div>
    )
}
export default Login;