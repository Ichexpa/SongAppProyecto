
function Login(){
    return(
        <div className="flex w-5/6 mx-auto flex-col p-2">
            <h1 className="font-medium my-2">Inciar Sesión</h1>
            <div className="flex flex-col gap-1">
                <label htmlFor="name-input">Documento</label>
                <input type="text" name="user-name" id="name-input"/>
                <label htmlFor="password-input">Contraseña</label>
                <input type="password" name="user-password" id="password-input" />            
            </div>
            <button className="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Ingresar
            </button>
        </div>
    )
}
export default Login;