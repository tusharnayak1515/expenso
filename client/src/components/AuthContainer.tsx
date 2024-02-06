"use client";

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import Auth from './Auth';

const AuthContainer = ({type}:any) => {
    const router = useRouter();
    const { user } = useSelector(
      (state: any) => state.userReducer,
      shallowEqual
    );
  
    useEffect(()=> {
      if(user) {
        router.replace("/dashboard");
      }
    }, [user,router]);
  
    return (
      <div className={`h-full col-span-12`}>
        <Auth type={type} />
      </div>
    );
}

export default AuthContainer;