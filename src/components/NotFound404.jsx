import Img404 from "../assets/404NotFoundIMG.png"
function NotFound404(){
    return(
        <div className="h-screen w-screen bg-gradient-to-t from-gray-700 from-30% to-gray-900 to-%70 flex flex-col justify-center">
            <h1 className="font-bold tracking-wider text-5xl text-white mx-auto">No se encontró la ruta solicitada</h1>
            <main className="w-4/12 h-9/12 mx-auto">
                <img className="w-full" src={Img404} alt="" />
            </main>
        </div>
    )
}
export default NotFound404