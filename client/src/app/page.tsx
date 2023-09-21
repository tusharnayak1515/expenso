"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { shallowEqual, useSelector } from "react-redux";

import Sidebar from "@/components/Sidebar";
import History from "@/components/History";
import Dashboard from "@/components/Dashboard";

const Home = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    }
  }, [user, router]);

  return (
    <>
      <div
        className={`h-[calc(100vh-80px)] w-full p-6 grid grid-cols-12 gap-6 bg-slate-600`}
      >
        <div className={`col-span-2`}>
          <Sidebar />
        </div>

        <div className={`col-span-7`}>
          <Dashboard />
        </div>

        <div className={`col-span-3`}>
          <History />
        </div>
      </div>
    </>
  );
};

export default Home;
