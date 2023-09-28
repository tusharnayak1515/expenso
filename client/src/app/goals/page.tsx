"use client";

import React from "react";
import MyGoals from "@/components/goals/MyGoals";

const Goals = () => {
  return (
    <div
      className={`col-span-12 p-6 text-slate-400 
  flex flex-col justify-start items-center gap-4
  rounded-md bg-slate-900`}
    >
      <h1 className={`text-3xl font-bold`}>My Goals</h1>
      <MyGoals />
    </div>
  );
};

export default Goals;
