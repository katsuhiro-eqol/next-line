"use client"
import {useState, useEffect} from "react"
import loadPhoto from "@/service/loadPhoto"
import { RiAccountCircleFill } from "react-icons/ri";
import {Shop} from "@/type/type"

export default function ShopCard({key, item, setShop}:{key:number, item:any, setShop:(shop:Shop)=>void}){
    console.log(item)
    const card_click = () => {
        setShop(item)
    }

    const [url, setUrl] = useState<string>("")

    const urlPath = async (file:string) => {
        if (file==""){
            setUrl("")
        } else {
        const path = await loadPhoto("photos/"+file)
        setUrl(path)
        }
      }
    
      useEffect(() => {

        if (item.photos[0]){
            urlPath(item.photos[0])
            console.log("shopPhoto",item.photos[0])
        }
      },[])

    return (
        <div onClick={card_click} className="flex flex-col justify-center w-full h-20 bg-white rounded-lg shadow-lg mb-5">
        <div className="flex justify-between items-center px-5">
        {(url!=="") ? (
                <img className="w-12 h-12 rounded-full" src={url} />
            ):(
                <RiAccountCircleFill size={12} className="w-12 h-12" />
            )}
            <div className="flex flex-col justify-center">
            <div key={key} className="m-2 text-center font-bold">{item.name}</div>
            <div key={key} className="m-2 text-xs">{item.address}</div>
            </div>
        </div>
        </div>
    )
}