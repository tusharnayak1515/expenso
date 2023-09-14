"use client";

import React from "react";

import { RxDashboard } from "react-icons/rx";
import { FaMoneyBill, FaUserAlt } from "react-icons/fa";
import { GiExpense } from "react-icons/gi";
import { AiFillGold } from "react-icons/ai";
import { GoGoal } from "react-icons/go";
import { RiShutDownLine } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div
      className={`h-[calc(100vh-120px)] w-full p-3 text-[17px] text-slate-400 
    flex flex-col justify-start items-start gap-2 rounded-md bg-slate-900`}
    >
      <div className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md bg-transparent hover:bg-slate-600 transition-all`}>
        <RxDashboard className={`text-2xl`} />
        <p>Dashboard</p>
      </div>

      <div className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md bg-transparent hover:bg-slate-600 transition-all`}>
        <FaMoneyBill className={`text-2xl`} />
        <p>Credit</p>
      </div>

      <div className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md bg-transparent hover:bg-slate-600 transition-all`}>
        <GiExpense className={`text-2xl`} />
        <p>Expenses</p>
      </div>

      <div className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md bg-transparent hover:bg-slate-600 transition-all`}>
        <AiFillGold className={`text-2xl`} />
        <p>Investments</p>
      </div>

      <div className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md bg-transparent hover:bg-slate-600 transition-all`}>
        <GoGoal className={`text-2xl`} />
        <p>Goals</p>
      </div>

      <div className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md bg-transparent hover:bg-slate-600 transition-all`}>
        <FaUserAlt className={`text-2xl`} />
        <p>Profile</p>
      </div>

      <div className={`w-full p-3 flex justify-start items-center gap-4 
      cursor-pointer rounded-md bg-transparent hover:bg-slate-600 transition-all`}>
        <RiShutDownLine className={`text-2xl`} />
        <p>Logout</p>
      </div>
    </div>
  );
};

export default Sidebar;
