export type Shop = {
    id:number, 
    created_at:any, 
    name:string, 
    address:string, photos: string[], 
    staffs:string[], 
    openning:string, 
    closing:string,
    staff_photo:Staff_Photo
}

export type Reservation = {
    user: string,
    userId:string,
    staff: string,
    shop: string,
    day: string,
    start: string,
    end: string,
    continuousNotificationToken:string
  }

export type Event = {
    title: string,
    start: string, 
    end: string,
    userId: string,
    backgroundColor:string
}

export type Staff_Photo = {
    [key: string]: string
}

export type Message = {
    templateName:string,
    params:{
        date:string,
        address:string,
        shop_name:string,
        charge_name:string,
        reservation_contents:string,
        btn1_url:string
    },
    notificationToken:string
}

export type Message2 = {
    templateName:string,
    params:{
        date: string,
        address: string,
        daytime: string,
        shop_name: string,
        charge_name: string,
        reservation_contents: string,
        btn1_url: string
      },
    notificationToken:string
}

export type ChannelAccessToken = {
    token_type: "Bearer",
    access_token: string,
    expires_in: number
}

export type NotificationToken ={
    notificationToken: string,
    expiresIn: number,
    remainingCount: number,
    sessionId: string
}