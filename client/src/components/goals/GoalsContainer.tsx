"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";
import MyGoals from "./MyGoals";

const GoalsContainer = () => {
  const router = useRouter();
  const { user } = useSelector((state: any) => state.userReducer, shallowEqual);

  useEffect(() => {
    if (!user) {
      router.replace("/signin");
    }
  }, [user, router]);

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

export default GoalsContainer;
