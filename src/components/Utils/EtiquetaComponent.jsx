export default function EtiquetaComponent({contenido,color="bg-slate-800"}){
    return(
        <div className={`${color} rounded-lg p-2 text-white text-center`}>
            {contenido}
        </div>
    )
}