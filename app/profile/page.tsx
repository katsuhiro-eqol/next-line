'use client';

import { useState, useEffect } from 'react';
import { useLiff } from '@/components/LiffProvider';


export default function Profile() {
  const { liff } = useLiff();

  useEffect(() => {
    if (liff?.isLoggedIn()) {
      console.log("loginしました")
    } else {
        console.log("loginしてません")
        console.log(liff?.getOS())
        //liff?.login()
    }
  }, [liff]);

  return (
    <div>
      profile
    </div>
  );
}

/*
export default function Profile() {
  const [profile, setProfile] = useState(null);
  const { liff } = useLiff();

  useEffect(() => {
    if (liff?.isLoggedIn()) {
      (async () => {
        const profile = await liff.getProfile();
        setProfile(profile);
        console.log(profile)
      })();
    } else {
        console.log("loginしてません")
        console.log(liff?.getOS())
        //liff?.login()
    }
  }, [liff]);

  return (
    <div>
      {profile && (
        <>

          <img
            src={profile.pictureUrl}
            alt='profile'
            className='rounded-full w-20 h-20 mx-auto mb-4'
          />
          <p className='text-center font-bold text-xl'>userId: {profile.userId}</p>
          <p className='text-center text-gray-500'>displayName: {profile.displayName}</p>
        </>
      )}
      {profile ? (
        <button
          onClick={() => {
            liff?.logout();
            location.reload();
          }}
          className='bg-red-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-red-600'
        >
          logout
        </button>
      ) : (
        <button
          onClick={() => liff?.login()}
          className='bg-blue-500 text-white px-4 py-2 mt-4 rounded-md hover:bg-blue-600'
        >
          login
        </button>
      )}
    </div>
  );
}
*/