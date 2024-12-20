import { supabase } from "@/utils/supabase/supabase"
import {Event} from "@/type/type"


export default async function loadDayReservation(day:string, shop:string, staff:string, userId:string){

    try {
        let { data: reservations, error } = await supabase
          .from('reservation')
          .select("*")
          .eq("day",day)
          .eq("shop",shop)
          .eq("staff",staff)
          .order('start', { ascending: true })
        if (error) throw error
        let dayReservation:Event[] = []
        if (reservations){
            reservations.map((reservation) => {
                if (reservation["userId"] == userId){
                    const data:Event = {title: reservation["user"], start: reservation["start"], end: reservation["end"], userId:reservation["userId"], backgroundColor:"#4169e1"}
                    dayReservation.push(data)
                } else {
                    const data:Event = {title: "他ユーザー予約済み", start: reservation["start"], end: reservation["end"], userId:reservation["userId"], backgroundColor:"#ff00ff"}
                    dayReservation.push(data)
                }
            })
        }

        console.log(dayReservation)
        return dayReservation
      } catch (error) {
        console.log(error) 
        return null
      }
}