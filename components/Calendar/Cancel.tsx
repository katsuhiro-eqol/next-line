"use client"
import {useState, useEffect} from "react"
import deleteReservation from "@/service/deleteRevervation"
import {Event} from "@/type/type"

const Cancel = ({cancelEvent, setCancelFlag, day, shopName, staff, setShowModal, time, user, userId, events, openning, closing}:{
    cancelEvent:Event|null,setCancelFlag:(isOpenTM: boolean) => void, day:string, shopName:string|null, staff:string|null, setShowModal:(showModal: boolean) => void,time:number, user:string, userId:string, events:any[], openning:string,closing:string
}
) => {
    const [start, setStart] = useState<string>("09:00")
    const [end, setEnd] = useState<string>("10:00")

    const closeModal = () => {
        setCancelFlag(false);
    };

    //deleteReservation(shopName:string, staff:string, userId:string, startStr:string, endStr:string)
    const cancelBooking = () => {
        if (cancelEvent && shopName && staff){
            deleteReservation(shopName, staff, userId, cancelEvent.start, cancelEvent.end)
            setCancelFlag(false);
            setShowModal(false)
        }
    }

    useEffect(() => {
        if (cancelEvent){
            console.log(cancelEvent.start)
            const startSplit = cancelEvent.start.split("T")[1].split(":")
            const startStr = startSplit[0]+":"+startSplit[1]
            setStart(startStr)
            const endSplit= cancelEvent.end.split("T")[1].split(":")
            const endStr = endSplit[0]+":"+endSplit[1]
            setEnd(endStr)        
        }
    },[])

    return (
        <>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col w-64 h-96 bg-white p-6 rounded-lg shadow-lg relative ml-auto mr-5 mt-auto mb-5">
            <div>
            <p className="font-bold text-lg">予約キャンセル画面</p>
            <br/>
            <p>店舗：{shopName}</p>
            <p>担当スタッフ：{staff}</p>
            <p>日付：{day}</p>
            <p>{start}から{end}</p>
            <br/>
            <p>の予約を取り消しますか？</p>
            </div>
            <div className="flex justify-between item-center mt-auto mb-5">
            <button className="border-2 rounded-sm" onClick={closeModal} >閉じる</button>
            <button className="border-4 border-double rounded-sm bg-emerald-400" onClick={cancelBooking} >予約を取り消す</button>
            </div>
        </div>
        </div>
        </>
    )
}

export default Cancel;