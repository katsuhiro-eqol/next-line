import { supabase } from "@/utils/supabase/supabase"

/*
export async function getStaffPhotos(name:string, shop:string){
    try {
        let { data: staffs, error } = await supabase
          .from('shops')
          .select("*")
          .eq("name",name)
          .eq("shop", shop)
        if (staffs){
            return staffs.photos
        } else {
            return []
        }
      } catch (error) {
        console.log(error) 
        return null
      }
}
      */