export type Shop = {
    id:number, 
    created_at:any, 
    name:string, 
    address:string, photos: string[], 
    staffs:string[], 
    openning:string, 
    closing:string
}

export type Reservation = {
    user: string,
    userId:string,
    staff: string,
    shop: string,
    day: string,
    start: string,
    end: string
  }

export type Event = {
    title: string,
    start: string, 
    end: string,
    userId: string,
    backgroundColor:string
}