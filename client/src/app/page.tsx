"use client";

import React from "react";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import History from "@/components/History";
import Dashboard from "@/components/Dashboard";

const Home = () => {
  return (
    <>
      <Navbar />
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
