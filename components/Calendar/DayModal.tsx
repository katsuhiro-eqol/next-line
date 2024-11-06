"use client"
import {useState} from "react";
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import jaLocale from '@fullcalendar/core/locales/ja'
import TimeModal from "@/components/Calendar/TimeModal";
import Cancel from "@/components/Calendar/Cancel";

import {Event} from "@/type/type"
import { judgeAvailability, judgeCanReserve } from "@/service/functions";
//import loadDayReservation from "@/service/loadDayReservation";

const DayModal = ({day, shopName, staff, events, showModal, setShowModal, openning, closing, time, user, userId}:
    {day:string,shopName:string|null,staff:string|null,events:any[],showModal:boolean, setShowModal:(show: boolean) => void,openning:string,closing:string,time:number,user:string, userId:string}) => {
    const [isOpenTM, setIsOpenTM] = useState<boolean>(false)
    const [cancelFlag, setCancelFlag] = useState<boolean>(false)
    const [cancelEvent, setCancelEvent] = useState<Event | null>(null)
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
        const title = arg.event._def.title
        const startStr = new Date(arg.event._instance.range.start).toISOString()
        const startArray = startStr.split(":")
        console.log(startArray[0]+":"+startArray[1])
        const selected = events.filter((obj) => {
            return obj.title===title && obj.start===startArray[0]+":"+startArray[1]
        })
        if (selected.length != 0 && selected[0].userId === userId){
            setCancelFlag(true)
            setStartTime(startStr)
            setCancelEvent(selected[0])
        } else {
            alert("既に予約されています");
        }
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
                    slotMinTime={openning}
                    slotMaxTime={closing}
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
                {isOpenTM && (<TimeModal setIsOpenTM={setIsOpenTM} setShowModal={setShowModal} startTime={startTime} day={day} shopName={shopName} staff={staff} time={time} user={user} userId={userId} events={events} openning={openning} closing={closing}/>)}
                {cancelFlag && (<Cancel setCancelFlag={setCancelFlag} setShowModal={setShowModal} cancelEvent={cancelEvent} day={day} shopName={shopName} staff={staff} time={time} user={user} userId={userId} events={events} openning={openning} closing={closing}/>)}
                </div>
            </div>
        </>
    )
}

export default DayModal;
