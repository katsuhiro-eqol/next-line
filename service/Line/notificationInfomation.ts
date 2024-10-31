import { supabase } from "@/utils/supabase/supabase"
import {NotificationToken} from "@/type/type"


export async function loadNotificationInformation(userId:string){

    try {
        let { data: UserInformation, error } = await supabase
          .from('userInformation')
          .select("*")
          .eq("userId",userId)

        if (error) throw error
        console.log("userInfo", UserInformation)
        return UserInformation
      } catch (error) {
        console.log(error) 
        return null
      }
}

export async function saveNotificationInformation(user:string,userId:string,notificationToken:string,remainingCount:number){
  const obj = {
    userName:user,
    userId:userId,
    notificationToken:notificationToken,
    remainingCount:remainingCount
  }

  try {
    let { data: notification, error } = await supabase
      .from('userInformation')
      .insert(obj)
  } catch (error) {
    console.log(error)
  }
}