'use client';

import { useEffect } from 'react';
import { useLiff } from '@/components/LiffProvider';


export default function Login() {
    const { liff } = useLiff();

  useEffect(() => {
    if (liff?.isLoggedIn()) {
        
    } else {
        console.log("loginしてません")
        console.log(liff?.getOS())
        //liff?.login()
    }
  }, [liff]);

  return (
    <div>
        <button
        onClick={() => liff?.login()}
        className='bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600'
        >
        login
        </button>
    </div>
  );
}