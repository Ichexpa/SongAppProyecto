function SongFilePlayer({file_song}){
    return(
        <audio controls preload="auto">
            <source src={file_song} type="audio/mpeg" />
        </audio>
    )
}
export default SongFilePlayer