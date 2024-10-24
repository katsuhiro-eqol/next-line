"use client"
import {useState, useEffect} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja'
import DayModal from "@/components/Calendar/DayModal";
import loadDayReservation from "@/service/loadDayReservation";
import getShops from "@/service/getShops"
import { loadDayAvailability } from "@/service/dayAvailability";
import { useLiff } from '@/components/LiffProvider';
import '@/components/Calendar/styles.css';
import SelectShop from "@/components/SelectShop";
import {Shop, Event} from "@/type/type"


export default function Booking() {
    const { liff } = useLiff();

    const [showModal, setShowModal] = useState<boolean>(false)
    const [day, setDay] = useState<string>("")
    const [shops, setShops] = useState<Shop[]>([])
    const [shop, setShop] = useState<Shop | null>(null)
    const [shopName, setShopName] = useState<string | null>(null)
    const [staffs, setStaffs] = useState<string[]>([])
    const [staff, setStaff] = useState<string | null>(null)
    const [flag, setFrag] = useState<boolean>(false)
    const [time, setTime] = useState<number>(3600000)//１サービスあたりの時間
    const [user, setUser] = useState<string>("me")
    const [openning, setOpenning] = useState<string>("09:00")
    const [closing, setClosing] = useState<string>("17:00")
    const [userId, setUserId] = useState<string>("xxxxxx")
    const [events, setEvents] = useState<any[]>([])
    const [availability, setAvailability] = useState<any[]>([])

    const loadShops = async () => {
        const data = await getShops()
        if (data){
            setShops(data)
        }
    }

    const loadReservations = async (day:string,shopName:string,staff:string,userId:string) => {
        const data = await loadDayReservation(day, shopName, staff,userId)
        if (data){
            setEvents(data)
        } else {
            setEvents([])
        }
    }

    const load_availability = async(shopName:string, staff:string) => {
        const today = new Date().toLocaleString().split("/")
        const todayString = today[0] + "-" + today[1] + "-" + today[2]
        const availability = await loadDayAvailability(todayString,shopName,staff)
        if (availability){
            console.log("avail",availability)
            setAvailability(availability)
        } else {
            setAvailability([])
        }
    }

    const handleDateClick = (arg:any) => {
        setShowModal(true)
        setDay(arg.dateStr)
        if (shopName && staff){
            loadReservations(arg.dateStr,shopName,staff,userId)
        }
      };

    const handleShopClick = () => {
        setShop(null)
        setShopName(null)
        setStaff(null)
    }

    const handleStaffClick = () => {
        setStaff(null)
    }

    const renderPastDays = (arg:any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (arg.date < today) {
        return ['past-day'];
    }
    return [];
    };

    useEffect(() => {
        loadShops()
    },[])

    useEffect(() => {
      console.log(shops)
    },[shops])

    useEffect(() => {
      console.log(shop)
      if (shop){
        setShopName(shop.name)
        setStaffs(shop.staffs)
        setOpenning(shop.openning)
        setClosing(shop.closing)
      }else{
        setShopName(null)
        setStaff(null)
      }
      if (shop && staff){
        setFrag(true)
        load_availability(shop.name, staff)
      } else {
        setFrag(false)
      }
  },[shop, staff])

  useEffect(() => {
    console.log("staffs", staffs)
}, [staffs])

    useEffect(() => {
        console.log("events", events)
    }, [events])

    useEffect(() => {
        console.log("availability", availability)
    }, [availability])

    useEffect(() => {
        console.log("user", user)
        console.log("userId", userId)
    }, [user])

    useEffect(() => {
        if (liff?.isLoggedIn()) {
            console.log("loginしました")
            liff.getProfile()
                .then((profile) => {
                    const name = profile.displayName
                    setUser(name)
                    setUserId(profile.userId)
                })
                .catch((err) => {
                    console.log("error", err);
                });
        } else {
            console.log("loginしてません")
            //liff?.login()
        }
      }, [liff]);

    return (
      <>
      {!flag ? (
      <div className="w-full h-full bg-orange-100">    
        <SelectShop shop={shop} setShop={setShop} shops={shops} staffs={staffs} setStaff={setStaff}/>
      </div>
      ):(
        <div className="w-full h-full bg-orange-100">
            <div className="mt-3 mb-2 font-bold text-xl text-center">予約カレンダー</div>
            <div className="flex justify-between px-12 mb-5">
                <p className="font-bold text-sm">店舗: {shopName}</p>
                <p className="font-bold text-sm">担当スタッフ: {staff}</p>
            </div>
            <div className="m-5 h-auto">
            {showModal ? (
            <DayModal showModal={showModal} setShowModal={setShowModal} day={day} shopName={shopName} staff={staff} events={events} openning={openning} closing={closing} time={time} user={user} userId={userId}/>
            ):(
            <div className="calendar-container">
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locales={[jaLocale]}     
            locale="ja"
            dayCellClassNames={renderPastDays}
            height="auto"
            dateClick={handleDateClick}
            events={availability}
            />
            <div className="flex justify-between px-5 mt-5">
                <button onClick={handleShopClick} className="w-1/3 text-sm border-2 bg-lime-200">店舗変更</button>
                <button onClick={handleStaffClick} className="w-1/3 text-sm border-2 bg-lime-200">担当変更</button>
            </div>
            </div>
            )}
            </div>
        </div>
      )}

      </>
    );
  }

  /*
      const loadReservations = async (day:string,shopName:string,staff:string) => {
        const data = await loadDayReservation(day, shopName, staff)
        let events:Event[] = []
        if (data){
            for (let i = 0; i < data.length; i++){
                events.push(data[i])
                console.log("i, data]i]: ", data[i])
            }
            setEvents(events)
        } else {
            setEvents([])
        }
    }

              <div className="w-full h-full bg-orange-100">     
            <div className="mt-3 mb-2 font-bold text-xl text-center">予約カレンダー</div>
            <div className="flex justify-between px-12 mb-5">
                <p className="font-bold">shop: {shop}</p>
                <p className="font-bold">staff: {staff}</p>
            </div>
            <div className="m-5 h-auto">
            {showModal ? (
            <DayModal showModal={showModal} setShowModal={setShowModal} day={day} shop={shop} staff={staff} events={events} openning={openning} closing={closing} time={time} user={user}/>
            ):(
            <div className="calendar-container">
            <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            locales={[jaLocale]}     
            locale="ja"
            dayCellClassNames={renderPastDays}
            height="auto"
            dateClick={handleDateClick}
            events={availability}
            />
            </div>
            )}
            </div>
        </div>
        */