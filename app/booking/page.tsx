"use client"
import {useState, useEffect} from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja'
//import DayModal from "@/components/Calendar/DayModal";
//import loadDayReservation from "@/service/loadDayReservation";
//import { loadDayAvailability } from "@/service/dayAvailability";

import './styles.css';

export default function Booking() {
    const [showModal, setShowModal] = useState<boolean>(false)
    //const [day, setDay] = useState<string>("")
    //const [shop, setShop] = useState<string>("shop_1")
    //const [staff, setStaff] = useState<string>("staff_1")
    //const [time, setTime] = useState<number>(3600000)//１サービスあたりの時間
    //const [user, setUser] = useState<string>("me")
    //const [events, setEvents] = useState([])
    //const [availability, setAvailability] = useState([])

    const openning = "09:00"
    const closing = "17:00"

    /*
    const loadReservations = async (day,shop,staff) => {
        const data = await loadDayReservation(day, shop,staff)
        let events = []
        for (let i = 0; i < data.length; i++){
            events.push(data[i])
            console.log("i, data]i]: ", data[i])
        }
        console.log(events)
        setEvents(events)
    }

    const load_availability = async(shop, staff) => {
        const today = new Date().toLocaleString().split("/")
        const todayString = today[0] + "-" + today[1] + "-" + today[2]
        const availability = await loadDayAvailability(todayString,shop,staff)
        setAvailability(availability)
    }

    //const reservations = loadReservationData()
    //console.log(reservations)
    */
    const handleDateClick = (arg:any) => {
        // ここで日付クリック時の処理を行います
        console.log('Clicked on date:', arg.dateStr)
        //setShowModal(true)
        //setDay(arg.dateStr)
        alert(arg.dateStr)
        //loadReservations(arg.dateStr,shop,staff)

        //console.log("data", reservations(arg.dateStr,shop,staff))
      };

    const renderPastDays = (arg:any) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (arg.date < today) {
        return ['past-day'];
    }
    return [];
    };

    useEffect(() => {
        //load_availability(shop, staff)
    },[])

    /*
    useEffect(() => {
        console.log("events", events)
    }, [events])

    useEffect(() => {
        console.log("availability", availability)
    }, [availability])
    */

    return (
        <div className="w-full h-full">
            <div className="mt-3 mb-2 font-bold text-xl text-center">予約カレンダー</div>
            <div className="m-5 h-auto">
            {showModal ? (
            <p>日毎のスケジュール</p>
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
            events={[]}
            />
            </div>
            )}
            </div>
        </div>
    );
  }
         
  /*
  <DayModal showModal={showModal} setShowModal={setShowModal} day={day} shop={shop} staff={staff} events={events} openning={openning} closing={closing} time={time} user={user}/>
  */
