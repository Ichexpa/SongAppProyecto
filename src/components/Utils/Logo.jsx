import logoApp from "../../assets/logoApp.png"
function Logo(){
    return(
        <div className="flex flex-row items-center">
            <div className="w-24 h-24" >
                <img className="w-full h-full object-cover" src={logoApp} alt="cevlaRythm"/>
            </div>            
            <h1 className="font-extrabold text-2xl ml-1">CevlaRythm</h1>
        </div>
    )
}
export default Logo;