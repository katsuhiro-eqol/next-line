import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabase/supabase"
import issueChannelAccessToken from "@/service/Line/issueAccessToken";
import sendServiceMessage2 from "@/service/Line/sendServiceMessage2";
import { updateReservation } from "@/service/reservation";
import {Message2} from "@/type/type"

//予約日の一日前にリマインドメッセージを送るための関数。前日の正午に送信することを念頭におく
//POSTでapiToken?を送信することでセキュリティを強化する
export async function POST(request: NextRequest) {
  const params = await request.json();
  if (params.key !=="cronToken"){
    return NextResponse.json({ error: "エラー" }, { status: 500 });
  } else {
  let date = new Date() //予約前日の日時が取得されたとする。この日の翌日の予約のユーザーに送信
  date.setDate(date.getDate()+1)
  const tomorrowStr = date.toISOString() //標準時で9時間遅れ。正午ならば日付は日本と同じ
  const tomorrow = tomorrowStr.split("T")[0]

  const accessToken = await issueChannelAccessToken()

  try {
      let { data: reservations, error } = await supabase
        .from('reservation')
        .select("*")
        .eq("day",tomorrow)

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
  } catch (error) {
      return NextResponse.json({ error: "エラー" }, { status: 500 });
  }
}
}

//予約日の一日前にリマインドメッセージを送るための関数。前日の正午に送信することを念頭におく
export async function GET(request: NextRequest) {
    let date = new Date() //予約前日の日時が取得されたとする。この日の翌日の予約のユーザーに送信
    date.setDate(date.getDate()+1)
    const tomorrowStr = date.toISOString() //標準時で9時間遅れ。正午ならば日付は日本と同じ
    const tomorrow = tomorrowStr.split("T")[0]

    const accessToken = await issueChannelAccessToken()

    try {
        let { data: reservations, error } = await supabase
          .from('reservation')
          .select("*")
          .eq("day",tomorrow)

          if (reservations){
            //map関数の中でasync/awaitは使えない
            for (const reservation of reservations){
                const date = reservation.start.split("T")[0] + " " + reservation.start.split("T")[1]
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
                const postData = await sendServiceMessage2(accessToken, message)
                updateReservation(reservation.id, postData.notificationToken)
            }
            return NextResponse.json({date:tomorrowStr, reservation:reservations})
          } else {
            return NextResponse.json({ error: "エラー" }, { status: 500 });
          }
    } catch (error) {
        return NextResponse.json({ error: "エラー" }, { status: 500 });
    }
}
