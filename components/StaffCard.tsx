"use client"
import {useState, useEffect} from "react"
import loadPhoto from "@/service/loadPhoto"
import { RiAccountCircleFill } from "react-icons/ri";

export default function StaffCard({key, item,  setStaff, staffPhoto}:{key:number, item:string, setStaff:(staff:string)=>void, staffPhoto:string}){
    const card_click = () => {
        setStaff(item)
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
        if (staffPhoto){
            urlPath(staffPhoto)
        }
      },[])

      useEffect(() => {
        if (staffPhoto){
            urlPath(staffPhoto)
        }
      },[staffPhoto])

    return (
        <div onClick={card_click} className="flex flex-col justify-center w-full h-16 bg-white rounded-lg shadow-lg mb-3">
        <div className="flex justify-between items-center px-10">
            {(url!=="") ? (
                <img className="w-12 h-12 rounded-full" src={url} />
            ):(
                <RiAccountCircleFill size={12} className="w-12 h-12" />
            )}
            
            <div key={key} className="text-center">{item}</div>
        </div>
        </div>        
    )
}

/*
        
        <div onClick={card_click} className="flex flex-col justify-center w-full h-20 bg-white rounded-lg shadow-lg mb-5">
        <div className="flex justify-between items-center px-5">
            <img className="w-16 h-16" src={"katsu.JPG"} />
            <div key={key} className="text-center">{item}</div>
        </div>
*/