"use client"
import {useState, useEffect} from "react"
import ShopCard from "@/components/ShopCard"
import StaffCard from "@/components/StaffCard"
import {Shop} from "@/type/type"

//type Shop = {id:number, created_at:any, name:string, address:string, shotos: string[], staffs:string[], openning:string, closing:string}

export default function SelectShop({shop, setShop, shops, staffs, setStaff}:{shop:Shop|null, setShop:(shop:Shop|null)=>void, shops:Shop[], staffs:string[], setStaff:(staff:string)=>void}){

    return (
        <>
            {shop ? (
                <div>
                <div className="mt-3 mb-2 font-bold text-xl text-center">担当スタッフを選択</div>   
                <div className="m-5 h-auto">
                    {staffs.map((item, index)=>{
                        return <StaffCard key={index} item={item} setStaff={setStaff}/>
                    })}
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