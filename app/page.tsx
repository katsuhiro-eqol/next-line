'use client';
import { useEffect } from 'react';
import { redirect } from "next/navigation";
import { useLiff } from '@/components/LiffProvider';


export default function Login() {
    const { liff } = useLiff();

  useEffect(() => {
    if (liff?.isLoggedIn()) {
        console.log("loginしました")
        const urlParams = new URLSearchParams(window.location.search);
        console.log("params", urlParams)
        redirect("/booking")
    } else {
        console.log("loginしてません")
        liff?.login()
    }
  }, [liff]);

  return (
    <div className="w-full h-hull flex justify-center bg-gray-300 ">
      {(liff?.isLoggedIn()) ? (
        <p>loading...</p>
      ):(
        <p>ログインしました</p>
      )} 

    </div>
  );
}