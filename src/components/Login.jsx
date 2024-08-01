import { AuthContext } from "../contexts/AuthContext.jsx"
import { useContext,useEffect,useRef } from "react"
import useFetch from "../hooks/useFetch.js"
import { useNavigate } from "react-router-dom"


function Login(){
    const username = useRef("")
    const password = useRef("")
    const {actions} = useContext(AuthContext)
    const [{data : dataToken,isLoading,isError},doFetch] = useFetch("https://sandbox.academiadevelopers.com/api-auth/")
    const redireccion = useNavigate()
    function handleSubmit(e){
        const credentials = {
            username: username.current,
            password: password.current
            };
        const bodyJSON = JSON.stringify(credentials)
        doFetch({method : "POST",
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
            actions.login(dataToken.token)
            redireccion("/");
        }
    },[dataToken])

    return(
        <div className="flex w-5/6 mx-auto flex-col p-2 text-xl">
            <h1 className="text-3xl font-semibold my-2">Iniciar Sesión</h1>
            <div className="mt-2 text-zinc-400 flex flex-col gap-1">
                <label htmlFor="name-input">Documento</label>
                <input onChange={handleOnChangeInput} className="text-xl text-white focus:outline-none border-b-2 border-white-100 bg-gray-900 p-2" type="number" name="user-name" id="name-input"/>
                <label htmlFor="password-input">Contraseña</label>
                <input onChange={handleOnChangeInput} className="text-xl text-white focus:outline-none border-b-2 border-white-100 bg-gray-900 p-2" type="password" name="user-password" id="password-input" />            
            </div>
            <button onClick={handleSubmit} className="transition ease-in-out delay-250 mt-5 mt-2 bg-transparent hover:bg-gray-700 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
                Ingresar
            </button>
            {dataToken && <div>Hola: {dataToken.token}</div>}
        </div>
    )
}
export default Login;