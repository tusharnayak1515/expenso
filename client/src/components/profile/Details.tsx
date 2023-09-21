"use client";

import Image from "next/image";
import React from "react";
import { useSelector, shallowEqual } from "react-redux";

const Details = () => {
  const { profile } = useSelector(
    (state: any) => state.userReducer,
    shallowEqual
  );

  return (
    <>
      <div className={`relative h-[12rem] w-[12rem] rounded-full`}>
        <Image src={profile?.dp} alt="DP" fill className={`rounded-full`} />
      </div>
      <p>Name: {profile?.name}</p>
      <p>Email: {profile?.email}</p>
    </>
  );
};

export default Details;
