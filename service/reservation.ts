import { supabase } from "@/utils/supabase/supabase"
import { Reservation } from "@/type/type"



export async function reservation(obj:Reservation){
    try {
        let { data: Reservation, error } = await supabase
          .from('reservation')
          .insert(obj)
      } catch (error) {
        console.log(error)
      }
}

export async function updateReservation(id:number, notificationToken:string){
    try {
        let { data: Reservation, error } = await supabase
          .from('reservation')
          .update({notificationToken: notificationToken})
          .eq("id", id)
      } catch (error) {
        console.log(error)
      } 

}