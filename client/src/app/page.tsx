"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { shallowEqual, useSelector } from "react-redux";

import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import { getCookie } from "cookies-next";
import History from "@/components/dashboard/History";

const Home = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
      localStorage.removeItem("expenso_user_profile");
    }
  }, [user, router]);

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
