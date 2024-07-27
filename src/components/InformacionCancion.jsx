function InformacionCancion({nombre,genero, lanzamiento}){
    return(
        <div className="p-3 flex flex-col gap-2">
            <p className="font-semibold text-center">{nombre}</p>
            <p className="font-medium">Año de lanzamiento: <span className="text-gray-500">{genero}</span></p>
            <p className="font-medium">Genero: <span className="text-gray-500">{lanzamiento}</span></p>
        </div>
    )
}
export default InformacionCancion;