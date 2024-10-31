"use client"
import deleteReservation from "@/service/deleteRevervation"
import { redirect } from "next/navigation";


type Props = {
  searchParams: {
    userId?: string
    shopName?: string
    staff?: string
    day?:string
    start?:string
    end?:string
  }
}

export default function Cancel({ searchParams }: Props) {
    const userId = searchParams.userId ?? ""
    const shopName = searchParams.shopName ?? ""
    const staff = searchParams.staff ?? ""
    const day = searchParams.day ?? ""
    const start = searchParams.start ?? ""
    const end = searchParams.end ?? ""
    const bookingDate = day + " " + start + " - " + end
    const startStr = day + "T" + start
    const endStr = day + "T" + end

    const cancelBooking = () => {
        deleteReservation(shopName, staff, userId, startStr, endStr)
        redirect("/")
    }

    return (
        <div className="w-full h-full">
            <div className="mt-3 mb-10 font-bold text-xl text-center">予約キャンセル</div>
            <p className="text-center">予約日時: {bookingDate}</p>
            <p className="text-center">店舗: {shopName}</p>
            <p className="text-center">担当スタッフ: {staff}</p>
            <div className="flex justify-center">
                <button className="mt-20 mx-auto border-4" onClick={cancelBooking}>この予約をキャンセル</button>
            </div>
        </div>
    )
}