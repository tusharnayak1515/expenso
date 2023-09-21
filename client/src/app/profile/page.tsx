"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import dynamic from "next/dynamic";
const Details = dynamic(() => import("@/components/profile/Details"), {
  ssr: false,
});

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, profile } = useSelector(
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

export default Profile;
