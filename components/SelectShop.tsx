"use client"
import {useState, useEffect} from "react"
import ShopCard from "@/components/ShopCard"
import StaffCard from "@/components/StaffCard"
import {Shop} from "@/type/type"

//type Shop = {id:number, created_at:any, name:string, address:string, shotos: string[], staffs:string[], openning:string, closing:string}

export default function SelectShop({shop, setShop, shops, setStaff, staffs}:{shop:Shop|null, setShop:(shop:Shop|null)=>void, shops:Shop[], setStaff:(staff:string)=>void, staffs:string[]}){

    const handleShopChange = () => {
        setShop(null)
    }

    return (
        <>
            {shop ? (
                <div>
                <div className="mt-3 mb-2 font-bold text-xl text-center">担当スタッフを選択</div>   
                <div className="m-5 h-auto">
                    {staffs.map((item, index)=>{
                        return <StaffCard key={index} item={item} setStaff={setStaff} staffPhoto={shop.staff_photo[item]} />
                    })}
                </div>
                <div className="flex justify-center">
                <button onClick={handleShopChange} className="mt-16 w-1/3 text-sm border-2 bg-lime-200">店舗変更</button>
                </div>
                </div>
            ):(
                <div>
                <div className="mt-3 mb-2 font-bold text-xl text-center">利用する店舗を選択</div>   
                <div className="m-5 h-auto">
                { shops && shops.map((item) => {
                    return <ShopCard key={item.id} item={item} setShop={setShop} />
                })}
                </div>
                </div>
            )}

        </>
    )
}