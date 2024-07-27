function PantallaInfoSolicitud({errorTitulo, imgError, descripcionError}){
    return(
        <div className="w-full flex justify-center">
            <div className="w-1/2 flex flex-col gap-5">
                <h1 className="text-3xl text-center text-white">{errorTitulo}</h1>
                <img className="mx-auto w-96 h-96" src={imgError} alt="" /> 
                <div className="w-full text-center ">
                    {descripcionError}
                </div>
            </div>
        </div>
    )
}
export default PantallaInfoSolicitud