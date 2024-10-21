'use client';
import { useEffect } from 'react';
import { useLiff } from '@/components/LiffProvider';

export default function eqol () {
    const { liff } = useLiff();

    useEffect(() => {
        if (liff?.isLoggedIn()) {
            console.log("ログインしました")
            const urlParams = new URLSearchParams(window.location.search);
            const token = urlParams.get('token');
            console.log("token", token)
        } else {
            console.log("loginしてません")
            console.log(liff?.getOS())
            //liff?.login()
        }
      }, [liff]);
      
      return (
        <div>
          eQOL予約
        </div>
      );
}