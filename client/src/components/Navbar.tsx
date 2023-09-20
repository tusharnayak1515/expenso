"use client";

import React from "react";
import Image from "next/image";

import { HiOutlineMenu } from "react-icons/hi";

const Navbar = () => {
  return (
    <div
      className={`sticky top-0 left-0 right-0 h-[80px] w-full py-2 px-8
    text-slate-400 flex justify-between items-center
    bg-slate-900 z-[500]`}
    >
      <p className={`text-2xl font-bold cursor-pointer`}>Expenso</p>

      <div className={`flex justify-start items-center gap-6`}>
        <div className={`flex justify-start items-center gap-2`}>
          <div className={`relative h-10 w-10 rounded-full`}>
            <Image
              src={`https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png`}
              alt="DP"
              fill
              className="rounded-full"
            />
          </div>
          <p>John Doe</p>
        </div>
        <HiOutlineMenu className={`block md_link:hidden text-3xl cursor-pointer`} />
      </div>
    </div>
  );
};

export default Navbar;
