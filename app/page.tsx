'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLiff } from '@/components/LiffProvider';
import loadPhoto from '@/service/loadPhoto'

export default function Login() {
  const { liff } = useLiff();
  const [url, setUrl] = useState<string>("")
  const file = "photos/eqol_hp.jpg"
  
  const urlPath = async () => {
    const path = await loadPhoto(file)
    setUrl(path)
  }

  useEffect(() => {
    urlPath()
  },[])
  
  useEffect(() => {
    if (liff?.isLoggedIn()) {
        console.log("loginしました")
        const profile = liff?.getProfile()
        console.log(profile)
    } else {
        console.log("loginしてません")
        liff?.login()
    }
  }, [liff]);

  return (
    <div className="h-screen  bg-white ">
      <img className="object-cover max-h-60 w-screen shadow-lg" src={"eqol_hp.jpg"} />
      <img className="fixed top-44 right-7 w-1/5" src={"eqol_logo_purple.png"} />

        <div className="w-4/5 mt-10 mx-auto">
          <h2 className="mb-3 font-bold">🔳 LINE機能を使った予約アプリ（デモアプリ）</h2>
          <p className="text-base">このLINEアプリは、ヘアサロンや整体院などのサービスのための予約デモを体験できます。</p>
          <p className="text-base">LINEメッセージを自動配信するなど、LINEアプリならではメリットが数多くあります。</p>
          <p className="mt-4 text-xs">このデモアプリではお客様のLINEアカウントの「プロフィール情報」（表示名、ユーザーID）を取得します。デモのために一旦サーバーに保存しますが、データは毎日削除されます。</p>
        </div>
      {(liff?.isLoggedIn()) ? (
        <div className="flex justify-center">
        <div className="fixed bottom-10 w-2/3 h-100 py-2 mx-2 text-center text-white bg-green-500 text-lg shadow-lg">
        <Link href="/booking">デモアプリを試す</Link>
        </div>
        </div>
      ):(
        <div className="flex justify-center">
        <div className="fixed bottom-10 w-2/3 h-10 py-2 mx-2 text-center text-white bg-green-800 text-lg shadow-lg">
        <Link href="/booking">デモアプリを試す</Link>
        </div>
        </div>
      )} 
    </div>
  );
}