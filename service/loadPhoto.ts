import { supabase } from "@/utils/supabase/supabase"

export default async function loadPhoto (file:string){
    const {data} = await supabase.storage.from('LINE-Photos').getPublicUrl(file)
    return data.publicUrl
}
