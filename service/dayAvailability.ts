import { supabase } from "@/utils/supabase/supabase"

type obj1 = {
  day: string,
  shop: string,
  staff: string,
  available: boolean,
}


export async function dayAvailability(obj:obj1){
    try {
        let { data: dayAvailability, error } = await supabase
          .from('day_available')
          .upsert(obj)
          .select()
      } catch (error) {
        console.log(error)
      }
}

export async function loadDayAvailability(today:string, shop:string, staff:string){
    try {
        let { data: availability, error } = await supabase
          .from('day_available')
          .select("*")
          .eq("shop",shop)
          .eq("staff",staff)
          .gte("day", today)
          .order('day', { ascending: true })
        if (error) throw error
        let day_availability:any[] = []
        if (availability){
            availability.map((day) => {
                const data = {title: "満", start: day["day"], backgroundColor: "red"}
                day_availability.push(data)
            })
        }

        return day_availability
      } catch (error) {
        console.log(error) 
        return null
      }
}