function ItemMenu({nombreItem,iconoItem}){
    console.log({nombreItem})
    return(
       <div className="cursor-pointer flex flex-row items-center gap-1">
            <img className="w-6 h-6" src={iconoItem} alt="" />
            <h5>{nombreItem}</h5>
       </div>
    )
}
export default ItemMenu