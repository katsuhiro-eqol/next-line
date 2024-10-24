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
                    const data:Event = {title: reservation["user"], start: reservation["start"], end: reservation["end"], userId:reservation["userId"], backgroundColor:"green"}
                    dayReservation.push(data)
                } else {
                    const data:Event = {title: reservation["user"], start: reservation["start"], end: reservation["end"], userId:reservation["userId"], backgroundColor:"blue"}
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