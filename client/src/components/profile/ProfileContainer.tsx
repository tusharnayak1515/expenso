"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { shallowEqual, useSelector } from "react-redux";
const Details = dynamic(() => import("@/components/profile/Details"), {
  ssr: false,
});

const ProfileContainer = () => {
  const router = useRouter();
  const { user } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

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
      <Details />
    </div>
  );
};

export default ProfileContainer;
