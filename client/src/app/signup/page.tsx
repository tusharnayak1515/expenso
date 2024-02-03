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
      router.replace("/dashboard");
    }
  }, [user,router]);
  
  return (
    <div className={`h-full col-span-12`}>
      <Auth type="signup" />
    </div>
  );
};

export default Signup;
