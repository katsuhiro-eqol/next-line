"use client"
import { useState, useEffect } from "react"
import reservation from "@/service/reservation"
import issueChannelAccessToken from "@/service/Line/issueAccessToken";
import { judgeAvailability, judgeCanReserve, setNewEvents } from "@/service/functions";
import {dayAvailability} from "@/service/dayAvailability";
import {Reservation} from "@/type/type"

const TimeModal = ({startTime, setIsOpenTM, day, shopName, staff, setShowModal, time, user, userId, events, openning, closing}:{
    startTime:string,setIsOpenTM:(isOpenTM: boolean) => void, day:string, shopName:string|null, staff:string|null, setShowModal:(showModal: boolean) => void,time:number, user:string, userId:string, events:any[], openning:string,closing:string
}
) => {
    const [canReserve, setCanReserve] = useState<boolean>(true)
    const closeModal = () => {
        setIsOpenTM(false);
    };

    const booking = () => {
        if (shopName && staff){
            const data:Reservation = {
                user: user,
                userId: userId,
                staff: staff,
                shop: shopName,
                day: day,
                start: day+"T"+start,
                end: day+"T"+end
            }
            reservation(data)
            setIsOpenTM(false)
            setShowModal(false)
            const updatedEvents = setNewEvents(events, data)
            console.log("update",updatedEvents)
            const judge = judgeAvailability(events, day, openning, closing, time)

            const accessToken = issueChannelAccessToken()
            console.log("access token", accessToken)
        
            if (!judge){
                console.log("もう予約できません")
                const obj = {
                    day: day,
                    shop: shopName,
                    staff: staff,
                    available: judge
                }
                dayAvailability(obj)
            } else {
                console.log("まだ予約できます")
            }
            };
        }


    const startSplit= startTime.split("T")[1].split(":")
    const start = startSplit[0]+":"+startSplit[1]
    
    let endDate = new Date(startTime)
    endDate.setMilliseconds(endDate.getMilliseconds()+time)
    const endString = endDate.toLocaleString()
    const endSplit = endString.split(" ")[1].split(":")
    const end = endSplit[0]+":"+endSplit[1]

    useEffect(() => {
        const can_reserve = judgeCanReserve(events, start, day, openning, closing, time)
        if (can_reserve !== undefined){
            setCanReserve(can_reserve)
        } else {
            setCanReserve(false)
        }
    },[])

    useEffect(() => {
        console.log("canReserve", canReserve)
    },[canReserve])

    return (
        <>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        {canReserve ? (
            <div className="flex flex-col w-64 h-96 bg-white p-6 rounded-lg shadow-lg relative ml-auto mr-5 mt-auto mb-5">
            <div>
            <p className="font-bold text-lg">予約確定画面</p>
            <br/>
            <p>店舗：{shopName}</p>
            <p>担当スタッフ：{staff}</p>
            <p>日付：{day}</p>
            <p>{start}から{end}</p>
            <br/>
            <p>で予約しますか？</p>
            </div>
            <div className="flex justify-between item-center mt-auto mb-5">
            <button className="border-2 rounded-sm" onClick={closeModal} >キャンセル</button>
            <button className="border-4 border-double rounded-sm bg-emerald-400" onClick={booking} >予約する</button>
            </div>
        </div>
        ):(
            <div className="flex flex-col w-64 h-96 bg-white p-6 rounded-lg shadow-lg relative ml-auto mr-5 mt-auto mb-5">
            <div>
            <p className="font-bold text-lg">予約確定画面</p>
            <br/>
            <p>{shopName}</p>
            <p>{staff}</p>
            <p>{day}</p>
            <p>{start}から{end}</p>
            <br/>
            <p>は予約できません</p>
            </div>
            <div className="flex justify-between item-center mt-auto mb-5">
            <button className="border-2 rounded-sm" onClick={closeModal} >キャンセル</button>
            
            </div>
        </div>        
        )}
        </div>
        </>
    )
}

export default TimeModal;
