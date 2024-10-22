'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { useLiff } from '@/components/LiffProvider';


export default function Login() {
    const { liff } = useLiff();

  useEffect(() => {
    if (liff?.isLoggedIn()) {
        console.log("loginしました")
    } else {
        console.log("loginしてません")
        //liff?.login()
    }
  }, [liff]);

  return (
    <div className="flex justify-center h-screen bg-gray-300 ">
      {(liff?.isLoggedIn()) ? (
        <div>
        <p>Home</p>
        <Link href="/booking">予約ページへ</Link>
        </div>
      ):(
        <div className="fixed bottom-10 w-2/3 h-10 py-2 mx-2 text-center text-white bg-green-500 text-lg shadow-lg">
        <Link href="/booking">予約ページへ</Link>
        </div>
      )} 

    </div>
  );
}