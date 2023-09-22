"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {useSelector,shallowEqual} from "react-redux";

import { HiOutlineMenu } from "react-icons/hi";

const Navbar = () => {
  const {profile} = useSelector((state:any)=> state.userReducer, shallowEqual);
  return (
    <div
      className={`sticky top-0 left-0 right-0 h-[80px] w-full py-2 px-8
    text-slate-400 flex justify-between items-center
    bg-slate-900 z-[500]`}
    >
      <Link href={"/"} className={`text-2xl font-bold cursor-pointer`}>Expenso</Link>

      <div className={`flex justify-start items-center gap-6`}>
        {profile && <div className={`flex justify-start items-center gap-2`}>
          <div className={`relative h-10 w-10 rounded-full`}>
            <Image
              src={profile?.dp}
              alt="DP"
              fill
              className="rounded-full"
            />
          </div>
          <p>{profile?.name}</p>
        </div>}
        <HiOutlineMenu className={`block md_link:hidden text-3xl cursor-pointer`} />
      </div>
    </div>
  );
};

export default Navbar;
