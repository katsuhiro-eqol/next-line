'use client';

import { useEffect } from 'react';
import { useLiff } from '@/components/LiffProvider';


export default function Login() {
    const { liff } = useLiff();

    const loginUrl = `https://next-line.onrender.com/profile?redirect_uri=${encodeURIComponent(liff?.permanentLink.createUrl())}`;


  useEffect(() => {
    if (liff?.isLoggedIn()) {
        liff?.openWindow({
            url: loginUrl,
            external: true
        });

    } else {
        console.log("loginしてません")
        console.log(liff?.getOS())
        //liff?.login()
    }
  }, [liff]);

  return (
    <div>
      Login
    </div>
  );
}