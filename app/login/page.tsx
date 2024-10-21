'use client';

import { useState, useEffect } from 'react';
import { useLiff } from '@/components/LiffProvider';


export default function Login() {
    const [isLogin, setIsLogin] = useState<boolean>(false)
    const { liff } = useLiff();

  useEffect(() => {
    if (liff?.isLoggedIn()) {
        console.log("loginしました")
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        console.log("token", token)
        setIsLogin(true)
    } else {
        console.log("loginしてません")
        console.log(liff?.getOS())
        setIsLogin(false)
        //liff?.login()
    }
  }, [liff]);

  return (
    <div>
        {(isLogin) ? (
            <div>ログインしました</div>
        ):(
            <button onClick={() => liff?.login()} className='bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600'>
            login
            </button>
        )}
    </div>
  );
}