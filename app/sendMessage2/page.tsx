"use client"
import { useState, useEffect } from "react"
import { supabase } from "@/utils/supabase/supabase"
import issueChannelAccessToken from "@/service/Line/issueAccessToken"
import { Reservation, Message2 } from "@/type/type"
import sendServiceMessage2 from "@/service/Line/sendServiceMessage2";
import { updateReservation } from "@/service/reservation";

export default function SendMessage2(){
    const [reservations, setReservations] = useState<any[] >([])

    const handleClick = async (item:any) => {
        const accessToken = await issueChannelAccessToken()
        console.log("accessToken", accessToken.access_token)
        const date = item.start.split("T")[0] + " " + item.start.split("T")[1]
        const message:Message2 = {
            templateName:"remind_d_b_ja",
            params:{
                date: date,
                address: "----",
                daytime: "1日",
                shop_name: item.shop,
                charge_name: item.staff,
                reservation_contents: "カット",
                btn1_url: "https://next-line.onrender.com",
              },
            notificationToken: item.continuousNotificationToken
        }
        console.log("notificationToken", item.continuousNotificationToken)
        console.log(message)
        const postData = await sendServiceMessage2(accessToken.access_token, message)
        updateReservation(item.id, postData.notificationToken)
        
    }

    const getTomorrowReserVations = async () => {
        let date = new Date() //予約前日の日時が取得されたとする。この日の翌日の予約のユーザーに送信
        date.setDate(date.getDate()+1)
        const tomorrowStr = date.toISOString() //標準時で9時間遅れ。正午ならば日付は日本と同じ
        const tomorrow = tomorrowStr.split("T")[0]

        try {
            let { data: reservations, error } = await supabase
              .from('reservation')
              .select("*")
              .eq("day",tomorrow)
      
            if (reservations){
                setReservations(reservations)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getTomorrowReserVations()
    },[])

    useEffect(() => {
        console.log(reservations)
    }, [reservations])

    return (
        <>
        <div>
            {(reservations.length !== 0) && (
                reservations.map((item, index) => {
                    return <li key={index} onClick={() => handleClick(item)}>{item.id}: {item.start}</li>
                })                
            )}
        </div>
        </>
    )
}

/*
fetch.js:30 
        
        
       PATCH https://yyqxoeczilrmolivirmk.supabase.co/rest/v1/reservation?id=eq.94

              if (reservations){
                //map関数の中でasync/awaitは使えない
                for (const reservation of reservations){
                    const date = reservation.start.split("T")[0] + " " + reservation.start.split("T")[1]
                    if (reservation.notificationToken){
                    const message:Message2 = {
                        templateName:"book_request_d_b_ja",
                        params:{
                            "date": date,
                            "address": "----",
                            "daytime": "1日",
                            "shop_name": reservation.shop,
                            "charge_name": reservation.staff,
                            "reservation_contents": "カット"
                          },
                        notificationToken: reservation.notificationToken
                    }
                    const postData = await sendServiceMessage2(accessToken.access_token, message)
                    updateReservation(reservation.id, postData.notificationToken)
                  }
                }
                return NextResponse.json({date:tomorrowStr, reservation:reservations, accessToken:accessToken})
              } else {
                return NextResponse.json({ error: "エラー" }, { status: 500 });
              }
            */