"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { shallowEqual, useSelector } from "react-redux";

import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import { getCookie } from "cookies-next";
import History from "@/components/dashboard/History";

const Home = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
      localStorage.removeItem("expenso_user_profile");
    }
  }, [user, router]);

  return (
    <>
      <div className={`col-span-9`}>
        <Dashboard />
      </div>

      <div className={`col-span-3`}>
        <History />
      </div>
    </>
  );
};

export default Home;
