import { supabase } from "@/utils/supabase/supabase"

export default async function getShops(){
    try {
        let { data: shops, error } = await supabase
          .from('shops')
          .select("*")
        if (shops){
            return shops
        } else {
            return []
        }
      } catch (error) {
        console.log(error) 
        return null
      }
}