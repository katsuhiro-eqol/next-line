import { supabase } from "@/utils/supabase/supabase"
import { Reservation } from "@/type/type"



export default async function deleteReservation(shopName:string, staff:string, userId:string, startStr:string, endStr:string){
    try {
        let { error } = await supabase
          .from('reservation')
          .delete()
          .eq("shop", shopName)
          .eq("staff", staff)
          .eq("userId", userId)
          .eq("start", startStr)
          .eq("end", endStr)
      } catch (error) {
        console.log(error)
      }
}