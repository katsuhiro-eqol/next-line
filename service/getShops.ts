import { supabase } from "@/utils/supabase/supabase"

type Shop = {id:number, created_at:any, name:string, address:string, shotos: string[], staffs:string[], openning:string, closing:string}

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