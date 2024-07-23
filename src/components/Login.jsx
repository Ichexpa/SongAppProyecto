
function Login(){
    return(
        <div className="flex w-5/6 mx-auto flex-col p-2 text-xl">
            <h1 className="font-medium my-2">Inciar Sesión</h1>
            <div className="text-zinc-400 flex flex-col gap-1">
                <label htmlFor="name-input">Documento</label>
                <input className="focus:outline-none border-b-2 border-white-100 bg-gray-900 p-2" type="text" name="user-name" id="name-input"/>
                <label htmlFor="password-input">Contraseña</label>
                <input className="focus:outline-none border-b-2 border-white-100 bg-gray-900 p-2" type="password" name="user-password" id="password-input" />            
            </div>
            <button className="text-zinc-40 mt-2 bg-transparent hover:bg-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Ingresar
            </button>
        </div>
    )
}
export default Login;