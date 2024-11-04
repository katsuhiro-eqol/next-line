"use client"
import { useState, useEffect } from "react"
import {reservation} from "@/service/reservation"
import { judgeAvailability, judgeCanReserve, setNewEvents } from "@/service/functions";
import {dayAvailability} from "@/service/dayAvailability";
import issueChannelAccessToken from "@/service/Line/issueAccessToken";
import issueNotifierToken from "@/service/Line/issueNotifierToken";
import sendServiceMessage from "@/service/Line/sendServiceMessage";
import {saveNotificationInformation} from "@/service/Line/notificationInfomation"
import { useLiff } from '@/components/LiffProvider';
import {Reservation, Message, NotificationToken} from "@/type/type"

const TimeModal = ({startTime, setIsOpenTM, day, shopName, staff, setShowModal, time, user, userId, events, openning, closing}:{
    startTime:string,setIsOpenTM:(isOpenTM: boolean) => void, day:string, shopName:string|null, staff:string|null, setShowModal:(showModal: boolean) => void,time:number, user:string, userId:string, events:any[], openning:string,closing:string
}
) => {
    const { liff } = useLiff();
    const [canReserve, setCanReserve] = useState<boolean>(true)
    const [liffToken, setLiffToken] = useState<string | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [notifier, setNotifier] = useState<NotificationToken | null>(null)
    const closeModal = () => {
        setIsOpenTM(false);
    };

    const issueToken = async () => {
        const token =await issueChannelAccessToken()
        console.log(token)
        setAccessToken(token.access_token)
    }

    const sendMessage = async () => {
        if (liffToken && accessToken){
            const notifier_token:NotificationToken = await issueNotifierToken(liffToken, accessToken)
            console.log("notifier", notifier_token)
            console.log("notificationToken", notifier_token.notificationToken)
            if (notifier_token.notificationToken){
                const message:Message = {
                    templateName:"book_request_d_b_ja",
                    params:{
                        date:day+" "+ start,
                        address:"----",
                        shop_name:shopName!,
                        charge_name:staff!,
                        reservation_contents:"カット",
                        btn1_url:"https://next-line.onrender.com",
                    },
                    notificationToken: notifier_token.notificationToken
                }
                const postData = await sendServiceMessage(accessToken, message)
                console.log(postData.notificationToken)

                booking(postData.notificationToken)
                saveNotificationInformation(user, userId, postData.notificationToken, postData.remainingCount)
                   
            }
        } else {
            console.log("送信失敗")
        }
    }


    const booking = (continuousNotificationToken:string) => {
        if (shopName && staff){
            const data:Reservation = {
                user: user,
                userId: userId,
                staff: staff,
                shop: shopName,
                day: day,
                start: day+"T"+start,
                end: day+"T"+end,
                continuousNotificationToken:continuousNotificationToken,
            }
            reservation(data)
            setIsOpenTM(false)
            setShowModal(false)
            const updatedEvents = setNewEvents(events, data)
            console.log("update",updatedEvents)
            const judge = judgeAvailability(events, day, openning, closing, time)

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

        issueToken()
    },[])

    useEffect(() => {
        if (liff?.isLoggedIn()) {
            const liffToken = liff.getAccessToken()
            console.log("liff", liffToken)
            setLiffToken(liffToken)
        }
    }, [liff])

    useEffect(() => {
        console.log("token", liffToken)
    },[liffToken])

    useEffect(() => {
        console.log("access_token", accessToken)
    },[accessToken])

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
            <button className="border-4 border-double rounded-sm bg-emerald-400" onClick={sendMessage} >予約する</button>
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