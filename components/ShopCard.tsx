import {Shop} from "@/type/type"

export default function ShopCard({key, item, setShop}:{key:number, item:any, setShop:(shop:Shop)=>void}){
    console.log(item)
    const card_click = () => {
        setShop(item)
    }

    return (
        <div onClick={card_click} className="flex flex-col justify-center w-full h-20 bg-white rounded-lg shadow-lg mb-5">
        <div className="flex justify-between items-center px-5">
            <div key={key} className="m-2">{item.name}</div>
            <div key={key} className="m-2">{item.address}</div>
        </div>
        </div>
    )
}