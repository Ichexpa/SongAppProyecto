import disk from "../assets/disk.png"
function Album({infoAlbum}){
    console.log("hola",{infoAlbum})
    return(
        <div className="p-3 w-52 h-52 relative">
            <img className="w-full h-full object-cover rounded-md" src={infoAlbum.cover==null? disk : infoAlbum.cover} alt={infoAlbum.title} />
            <div className="absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-sm">{infoAlbum.year}</p>
            </div>
        </div>
    );    
}
export default Album;