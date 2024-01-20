"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

const Dashboard = dynamic(() => import("@/components/dashboard/Dashboard"), {
  ssr: false,
});
const History = dynamic(() => import("@/components/dashboard/History"), {
  ssr: false,
});
import { getProfile } from "@/apiCalls/auth";
import { actionCreators } from "@/redux";
import dynamic from "next/dynamic";

const Home = () => {
  const router = useRouter();
  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);
  const [isUpdated, setIsUpdated] = useState(false);
  const date = new Date();
  const [activeDate, setActiveDate]: any = useState(
    `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`
  );

  const fetchProfile = useCallback(async () => {
    try {
      const res: any = await getProfile();
      if (res?.success) {
        localStorage.setItem("expenso_user_profile", JSON.stringify(res?.user));
        dispatch(actionCreators.userSignin(res?.user));
      }
    } catch (error: any) {
      console.log(
        "Error in fetching profile, in page.tsx: ",
        error.response.data.error
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("expenso_user_profile");
      router.replace("/signin");
    } else {
      fetchProfile();
    }
  }, [user, router, dispatch, fetchProfile]);

  return (
    <>
      <div className={`col-span-12 md_link:col-span-8 xl1:col-span-9`}>
        <Dashboard
          isUpdated={isUpdated}
          setIsUpdated={setIsUpdated}
          activeDate={activeDate}
          setActiveDate={setActiveDate}
        />
      </div>

      <div className={`col-span-12 md_link:col-span-4 xl1:col-span-3`}>
        <History setIsUpdated={setIsUpdated} activeDate={activeDate} />
      </div>
    </>
  );
};

export default Home;
