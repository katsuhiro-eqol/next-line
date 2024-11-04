"use client"
import { useState, useEffect } from "react"


const Alert = ({alertDetails,setAlertState}:{alertDetails:string,setAlertState:(alertState: boolean) => void}
) => {

    const closeAlert = () => {
        setAlertState(false);
    };


    return (
        <>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <div className="flex flex-col w-64 h-64 bg-white p-6 rounded-lg shadow-lg relative mx-auto mt-20 mb-auto">
            <div>
            <p className="font-bold text-lg text-center">お知らせ</p>
            <br/>
            <p className="text-center">{alertDetails}</p>
            </div>
            <button className="w-24 mx-auto mt-auto mb-2 border-2" onClick={closeAlert}>ok</button>
            </div>
        </div>
 
        </>
    )
}

export default Alert;

/*
       {canReserve ? (
            <div className="flex flex-col w-64 h-96 bg-white p-6 rounded-lg shadow-lg relative ml-auto mr-5 mt-auto mb-5">
            <div>
            <p className="font-bold text-lg">予約確定画面</p>
            <br/>
            <p>店舗：{shopName}</p>
            <p>担当スタッフ：{staff}</p>
            <p>日付：{day}</p>
            <p>{start}から{end}</p>
            <br/>
            <p>で予約しますか？</p>
            </div>
            <div className="flex justify-between item-center mt-auto mb-5">
            <button className="border-2 rounded-sm" onClick={closeModal} >キャンセル</button>
            <button className="border-4 border-double rounded-sm bg-emerald-400" onClick={sendMessage} >予約する</button>
            </div>
        </div>
        ):(
            <div className="flex flex-col w-64 h-96 bg-white p-6 rounded-lg shadow-lg relative ml-auto mr-5 mt-auto mb-5">
            <div>
            <p className="font-bold text-lg">予約確定画面</p>
            <br/>
            <p>{shopName}</p>
            <p>{staff}</p>
            <p>{day}</p>
            <p>{start}から{end}</p>
            <br/>
            <p>は予約できません</p>
            </div>
            <div className="flex justify-between item-center mt-auto mb-5">
            <button className="border-2 rounded-sm" onClick={closeModal} >キャンセル</button>
            
            </div>
        </div>        
        )}
        </div>

        */