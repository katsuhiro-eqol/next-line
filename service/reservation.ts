import { supabase } from "@/utils/supabase/supabase"
import { Reservation } from "@/type/type"



export default async function reservation(obj:Reservation){
    try {
        let { data: Reservation, error } = await supabase
          .from('reservation')
          .insert(obj)
      } catch (error) {
        console.log(error)
      }
}