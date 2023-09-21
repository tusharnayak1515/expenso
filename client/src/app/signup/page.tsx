"use client";

import React, {useEffect} from "react";
import { shallowEqual, useSelector } from "react-redux";
import Auth from "@/components/Auth";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const { user } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  useEffect(()=> {
    if(user) {
      router.replace("/");
    }
  }, [user,router]);
  
  return (
    <>
      <Auth type="signup" />
    </>
  );
};

export default Signup;
