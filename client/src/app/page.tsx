"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Dashboard = dynamic(()=> import("@/components/dashboard/Dashboard"), {ssr: false});
const History = dynamic(()=> import("@/components/dashboard/History"), {ssr: false});
import { getProfile } from "@/apiCalls/auth";
import { actionCreators } from "@/redux";
import dynamic from "next/dynamic";
import { getCookie, setCookie } from "cookies-next";

const Home = () => {
  const query:any = useSearchParams();
  const router = useRouter();
  const dispatch:any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);
  const [isUpdated, setIsUpdated] = useState(false);

  const fetchProfile = async()=> {
    try {
      const res:any = await getProfile();
      if(res?.success) {
        localStorage.setItem("expenso_user_profile", JSON.stringify(res?.user));
        dispatch(actionCreators.userSignin(res?.user));
      }
    } catch (error:any) {
      console.log("Error in fetching profile, in page.tsx: ", error.response.data.error);
    }
  }

  useEffect(() => {
    console.log("query token: ",query.get("token"));
    console.log("cookie token: ",getCookie("authorization"));
    if(query.get("token")) {
      if(!getCookie("authorization")) {
        setCookie("authorization",query.get("token"));
        dispatch(actionCreators.setToken(query.get("token")));
        router.replace("/");
        return;
      }
    }
    console.log("user: ",user);

    if (!getCookie("authorization")) {
      router.replace("/signin");
      localStorage.removeItem("expenso_user_profile");
    }
    else {
      fetchProfile();
    }
  }, [user, router, query.get("token")]);

  return (
    <>
      <div className={`col-span-12 md_link:col-span-8 xl1:col-span-9`}>
        <Dashboard isUpdated={isUpdated} setIsUpdated={setIsUpdated} />
      </div>

      <div className={`col-span-12 md_link:col-span-4 xl1:col-span-3`}>
        <History setIsUpdated={setIsUpdated} />
      </div>
    </>
  );
};

export default Home;
