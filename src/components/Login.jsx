
function Login(){
    return(
        <div className="flex w-5/6 mx-auto flex-col p-2 text-xl">
            <h1 className="text-3xl font-semibold my-2">Iniciar Sesión</h1>
            <div className="mt-2 text-zinc-400 flex flex-col gap-1">
                <label htmlFor="name-input">Documento</label>
                <input className="text-xl text-white focus:outline-none border-b-2 border-white-100 bg-gray-900 p-2" type="number" name="user-name" id="name-input"/>
                <label htmlFor="password-input">Contraseña</label>
                <input className="text-xl text-white focus:outline-none border-b-2 border-white-100 bg-gray-900 p-2" type="password" name="user-password" id="password-input" />            
            </div>
            <button className="transition ease-in-out delay-250 mt-5 mt-2 bg-transparent hover:bg-gray-700 font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded">
                Ingresar
            </button>
        </div>
    )
}
export default Login;