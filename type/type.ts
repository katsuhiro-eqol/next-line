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
    staff: string,
    shop: string,
    day: string,
    start: string,
    end: string
  }