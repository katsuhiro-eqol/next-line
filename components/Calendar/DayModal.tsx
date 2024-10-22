"use client"
import {useState} from "react";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja'
import TimeModal from "@/components/Calendar/TimeModal";
import { judgeAvailability, judgeCanReserve } from "@/service/functions";
//import loadDayReservation from "@/service/loadDayReservation";

const DayModal = ({day, shop, staff, events, showModal, setShowModal, openning, closing, time, user}:
    {day:string,shop:string,staff:string,events:any[],showModal:boolean, setShowModal:(show: boolean) => void,openning:string,closing:string,time:number,user:string}) => {
    const [isOpenTM, setIsOpenTM] = useState<boolean>(false)
    const [startTime, setStartTime] = useState<string>("")

    //予約単位を1h=3600000msとした場合。施術メニューによって変更することもできる
    //const judge = judgeAvailability(events, day, openning, closing, time)
    //console.log("judge", judge)

    const closeModal = () => {
        setShowModal(false);
      };
    if (!showModal){
        return null
    }

    const handleTimeClick = (arg:any) => {
        console.log(arg.dateStr)
        setIsOpenTM(true)
        setStartTime(arg.dateStr)
    };
    
    const handleEventClick = (arg:any) => {
        const user = arg.event._def.title
        console.log(arg.event._def.title)
        console.log(typeof(arg.event._instance.range.start))
        const start = new Date(arg.event._instance.range.start)
        console.log(start)
        alert("既に予約が入っています");
    };

    return (
        <>
            <div className="flex justify-center">
                <div className="w-full h-5/6 mx-5 border-2 rounded overflow-hidden shadow-lg bg-lime-200">
                <div className="text-center">予約する時間帯をクリックしてください</div>
                <div className="text-center">営業時間 {openning}〜{closing}</div>
                <div className="m-2 h-full">
                <FullCalendar
                    plugins={[timeGridPlugin, interactionPlugin]}
                    initialView="timeGridDay"
                    initialDate={day}
                    headerToolbar={{
                        left: '',
                        center: '',
                        right: ''
                      }}
                    titleFormat={{ month: 'long', day: 'numeric' }}
                    dayHeaderFormat={{ weekday: 'long', month: 'numeric', day: 'numeric', omitCommas: true }}
                    slotLabelFormat={{
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      }}
                    slotMinTime="9:00"
                    slotMaxTime="17:00"
                    allDaySlot={false}
                    locales={[jaLocale]}     
                    locale="ja"
                    height="auto"
                    dateClick={handleTimeClick}
                    eventClick={handleEventClick}
                    events={events}
                />
                </div>
                <div className="flex justify-center ">
                <button className="mt-3 mb-2 border-spacing-2 border-2 rounded-sm bg-white" onClick={closeModal}>閉じる</button>
                </div>
                {isOpenTM && (<TimeModal setIsOpenTM={setIsOpenTM} setShowModal={setShowModal} startTime={startTime} day={day} shop={shop} staff={staff} time={time} user={user} events={events} openning={openning} closing={closing}/>)}
                </div>
            </div>
        </>
    )
}

export default DayModal;
