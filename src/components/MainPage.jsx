import ProfileDetails from "./ProfileComponents/ProfileDetails"
function MainPage(){
    return(            
        <div className="">
{/*             <PantallaInfoSolicitud 
                errorTitulo="No se encontró la canción solicitada"
                imgError={songNotFoundImg}
                descripcionError="La cancion no se encontró"
            /> */}
            <ProfileDetails/>
        </div>
    )
}
export default MainPage