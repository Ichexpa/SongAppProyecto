import addIcon from "../assets/addIcon.svg"

function ItemMenu({nombreItem,iconoItem}){
    return(
       <div className="text-slate-400 hover:text-slate-100 cursor-pointer flex flex-row items-center gap-1">
            <img className="w-6 h-6" src={iconoItem} alt="" />
            <h5>{nombreItem}</h5>
       </div>
       
    )
}
export default ItemMenu